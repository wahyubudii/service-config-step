import moment from "moment";
import {
  pengajuanDocQueue,
  persetujuanDocQueue,
  verifikasiDocQueue,
} from "../../config/bull.js";
import Document from "../../models/Document.js";
import Sla from "../../models/Sla.js";

export const bull = () => {
  pengajuanDocQueue.process(async (job, done) => {
    try {
      const document = await Document.findById(job.data.documentId);
      if (document.fgProcess === 1) {
        await Document.findByIdAndUpdate(
          job.data.documentId,
          {
            fgProcess: 2,
          },
          { new: true }
        );

        const sla = await Sla.findByIdAndUpdate(
          job.data._id,
          {
            ...job.data,
            slaData: {
              ...job.data.slaData,
              slaPengajuan: {
                ...job.data.slaData.slaPengajuan,
                duration: 0,
                isPassed: true,
              },
            },
          },
          { new: true }
        );

        const params = {
          ...sla._doc,
        };

        // await verifikasiDocQueue.add(params, {
        //   delay: params.slaData.slaVerifikasi.duration,
        // });

        console.log(
          `PENGAJUAN DOCUMENT EXECUTED AT: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        );

        done();
      }

      console.log(
        `PENGAJUAN DOCUMENT CANCEL AT: ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`
      );
      done();
    } catch (error) {
      console.error("Error updating document:", error);
      done(new Error("error transcoding"));
      throw new Error("some unexpected error");
    }
  });

  verifikasiDocQueue.process(async (job, done) => {
    try {
      const document = await Document.findById(job.data.documentId);
      if (document.fgProcess === 2) {
        const sla = await Sla.findByIdAndUpdate(
          job.data._id,
          {
            ...job.data,
            slaData: {
              ...job.data.slaData,
              slaVerifikasi: {
                ...job.data.slaData.slaVerifikasi,
                duration: 0,
                isPassed: true,
              },
            },
          },
          { new: true }
        );

        await Document.findByIdAndUpdate(
          job.data.documentId,
          {
            fgProcess: 3,
          },
          { new: true }
        );

        const params = {
          ...sla._doc,
        };

        await persetujuanDocQueue.add(params, {
          delay: params.slaData.slaPersetujuan.duration,
        });

        console.log(
          `VERIFIKASI DOCUMENT EXECUTED AT: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        );

        done();
      }

      console.log(
        `VERIFIKASI DOCUMENT CANCEL AT: ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`
      );

      done();
    } catch (error) {
      console.error("Error updating document:", error);
      done(new Error("error transcoding"));
      throw new Error("some unexpected error");
    }
  });

  persetujuanDocQueue.process(async (job, done) => {
    try {
      const document = await Document.findById(job.data.documentId);
      if (document.fgProcess === 3) {
        await Sla.findByIdAndUpdate(
          job.data._id,
          {
            ...job.data,
            slaData: {
              ...job.data.slaData,
              slaPersetujuan: {
                ...job.data.slaData.slaPersetujuan,
                duration: 0,
                isPassed: true,
              },
            },
          },
          { new: true }
        );

        await Document.findByIdAndUpdate(
          job.data.documentId,
          {
            fgProcess: 4,
          },
          { new: true }
        );

        console.log(
          `PERSETUJUAN DOCUMENT EXECUTED AT: ${moment().format(
            "MMMM Do YYYY, h:mm:ss a"
          )}`
        );

        done();
      }

      console.log(
        `PERSETUJUAN DOCUMENT CANCEL AT: ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`
      );

      done();
    } catch (error) {
      console.error("Error updating document:", error);
      done(new Error("error transcoding"));
      throw new Error("some unexpected error");
    }
  });
};
