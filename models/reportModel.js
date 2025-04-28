const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    repoName: { type: String, required: true },
    reportData: { type: mongoose.Schema.Types.Mixed, required: true },
    reportQuality: { type: mongoose.Schema.Types.Mixed, required: true },
    severityData: { type: mongoose.Schema.Types.Mixed, required: true },
    reportSnyk: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true } 
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
