export default (
  response,
  status = 200,
  message,
  success = false,
  aditionalData = null,
  countData = null
) => {
  let dataRes = {
    code: status,
    success,
    message: success ? message || "success" : message || "error request...",
  };
  if (countData) {
    dataRes["totalData"] = countData.total;
    // console.log(dataRes);
    if (countData.total > 0) {
      dataRes["page"] = countData.page || 1;
      dataRes["totalPage"] =
        countData.page == "-"
          ? countData.total
          : Math.ceil(countData.total / 10);
    }
  }
  if (aditionalData) {
    dataRes["data"] = aditionalData;
  }
  return response.status(status).send(dataRes);
};
