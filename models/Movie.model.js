//  Add your code here
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: {type: String, required: true},
    genre: {type: String, default: 'unknown'},
    plot: {type: String},
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }]
  },
  {
    timestamps: true,
  }
);

module.exports = model("Movie", movieSchema);
