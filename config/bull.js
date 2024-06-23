import redis from "redis";
import Queue from "bull";
import { queueKey } from "../common/bullKey.js";

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

export const permohonanPerizinanQueue = new Queue(
  queueKey.permohonan_perizinan,
  {
    redis: redisClient,
  }
);

export const permohonanPencabutanQueue = new Queue(
  queueKey.permohonan_pencabutan,
  {
    redis: redisClient,
  }
);

export const permohonanPengawasanQueue = new Queue(
  queueKey.permohonan_pengawasan,
  {
    redis: redisClient,
  }
);
