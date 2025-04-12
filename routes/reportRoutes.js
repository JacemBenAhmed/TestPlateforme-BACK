const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.post("/report", reportController.createReport);

router.get("/reports", reportController.getAllReports);

router.get("/reports/user/:username", reportController.getReportsByUser);

router.delete("/report/:id", reportController.deleteReport);

module.exports = router;
