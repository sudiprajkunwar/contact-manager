const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    full_name: { type: String, default: null },
    address: { type: String, default: null },
    email: { type: String },
    phone: { type: Number, default: null },
    favourite: { type: Number, default: 0 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("contact", contactSchema);
