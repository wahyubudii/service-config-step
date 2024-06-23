import mongoose from "mongoose";

var dataSchema = new mongoose.Schema(
  {
    table_name: {
      type: String,
      required: true,
    },
    primary_key: {
      type: String,
      required: true,
    },
    varian: [
      {
        key: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    target: [
      {
        key: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
    delay: {
      //
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("m_step", dataSchema, "m_step");
