import expressAsyncHandler from "express-async-handler";
import response from "../utils/response.js";
import MStep from "../models/m_step.js";

export const getMStep = expressAsyncHandler(
  async ({ query, params }, res, next) => {
    try {
      const perPage = 10,
        page = query.page == "-" ? "-" : Math.max(0, query.page || 1);

      const slaFilters = {};
      if (params.id_sla) {
        slaFilters.id_sla = {
          $regex: new RegExp("^" + params.id_sla.toLowerCase(), "i"),
        };
      }
      const countData = {
        total: await MStep.find(slaFilters).count(),
        page,
      };
      const data =
        page == "-"
          ? await MStep.find(slaFilters)
          : await MStep.find(slaFilters)
              .limit(perPage * page)
              .skip(perPage * (page - 1));

      return response(
        res,
        200,
        "Get SLA Success",
        true,
        slaFilters.id_sla ? data[0] : data,
        countData
      );
    } catch (err) {
      next(err);
    }
  }
);

export const addMStep = expressAsyncHandler(async ({ body }, res) => {
  try {
    const data = await MStep.create(body);

    response(res, 200, "Add SLA Success...", true, data);
  } catch (error) {
    console.log(error);
    response(res, 400, "Add SLA Failed...");
  }
});

export const updateMStep = expressAsyncHandler(
  async ({ params, body }, res) => {
    try {
      const data = await MStep.updateOne({ id_sla: params.id_sla }, body);

      response(res, 200, "Update SLA Success...", true, data);
    } catch (error) {
      console.log(error);
      response(res, 400, "Update SLA Failed...");
    }
  }
);

export const deleteMStep = expressAsyncHandler(async ({ params }, res) => {
  try {
    const data = await MStep.deleteOne({ id_sla: params.id_sla });

    response(res, 200, "Delete SLA Success...", true, data);
  } catch (error) {
    console.log(error);
    response(res, 400, "Delete SLA Failed...");
  }
});
