import logger from "winston-korma-logger";

export const logging = (req, res, next) => {
  req.logDBQuery = [];

  logger.intercept(req, res);
  const options = {
    receivedTime: new Date().toISOString(),
    logServerHost: process.env.LOGGER_HOST,
    logServerPort: process.env.LOGGER_PORT,
    logEnvironment: process.env.NODE_ENV,
    logMode: "stdout",
  };
  res.on("finish", () => {
    logger.send(req, res, options);
  });
  next();
};
