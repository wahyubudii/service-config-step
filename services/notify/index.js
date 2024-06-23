import { permohonanPerizinanQueue } from "../../config/bull.js";
import { poolPg } from "../../config/dbConfig.js";
import MSla from "../../models/m_step.js";

const readDataFromListener = ({ payload }) => {
  const jsonPayload = JSON.parse(payload);

  console.log("id_permohonan_izin : ", jsonPayload.id_permohonan_izin);
  console.log("id_lic : ", jsonPayload.id_lic);
  console.log("kewenangan : ", jsonPayload.kewenangan);
  console.log("status_respon : ", jsonPayload.status_respon);
};
export const dbListener = (channel_name) => {
  poolPg.connect().then(async (client) => {
    console.log("Successfully connected OLTP");
    try {
      await client.query(`LISTEN ${channel_name}`);
      client.on("notification", async ({ payload }) => {
        const jsonPayload = JSON.parse(payload);
        switch (channel_name) {
          case "permohonan_izin_created":
            console.log(
              "id_permohonan_izin : ",
              jsonPayload.id_permohonan_izin
            );
            console.log("id_lic : ", jsonPayload.id_lic);
            console.log("kewenangan : ", jsonPayload.kewenangan);
            console.log("status_respon : ", jsonPayload.status_respon);

            permohonanPerizinanQueue.add(jsonPayload, {
              delay: params.slaData.slaPengajuan.duration,
            });

            break;
          case "izin_sla_created":
            console.log(payload);
            break;
          default:
            break;
        }
      });
      // client.release();
    } catch (err) {
      // client.release();
      console.log(err.stack);
      next(err);
    }
  });
};
