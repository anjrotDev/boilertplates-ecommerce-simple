const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("roles", RolesSchema);
