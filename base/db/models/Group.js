const mongoose = require("mongoose");

const Schema = mongoose.Schema;

scheme = {
  objectType: { type: String, required: true, default: "Group" },
  name: String,
  createdTime: { type: Date },
  updatedTime: { type: Date },
  geoJSON: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  }
};

const groupSchema = new Schema(scheme);

// {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-4.713134765624999,52.7163309360463],[-3.8891601562499996,52.7163309360463],[-3.01025390625,53.1072166918934],[-3.7023925781249996,53.716215632472036],[-4.76806640625,53.86548550842127],[-4.559326171875,53.25206880589411],[-4.713134765624999,52.7163309360463]]]}}
groupSchema.index({ geoJSON: "2dsphere" });

// on every save, add the date
groupSchema.pre("save", next => {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updatedTime = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdTime) this.createdTime = currentDate;

  //this is important
  next();
});

module.exports = mongoose.model("Group", groupSchema);
