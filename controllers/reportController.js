const Report = require("../models/reportModel");

exports.createReport = async (req, res) => {
  const { username, repoName, reportData, reportQuality, severityData,reportSnyk,issuesData } = req.body;

  try {
    const report = new Report({
      username,
      repoName,
      reportData,
      reportQuality,
      severityData,
      reportSnyk,
      issuesData
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.error("Erreur lors de la création du rapport:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Erreur lors de la récupération des rapports:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getReportsByUser = async (req, res) => {
  const { username } = req.params;

  try {
    const reports = await Report.find({ username }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Erreur lors de la récupération des rapports pour cet utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.getReportByRepo = async (req, res) => {
  const { repoName } = req.params;

  try {
    const reports = await Report.find({ repoName }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Erreur lors de la récupération des rapports pour cet utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getReportByID = async (req, res) => {
  const { _id } = req.params;

  try {
    const report = await Report.findById(_id); 
    res.status(200).json(report);
  } catch (error) {
    console.error("Erreur lors de la récupération des rapports pour cet utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByIdAndDelete(id);
    if (!report) {
      return res.status(404).json({ error: "Rapport non trouvé" });
    }
    res.status(200).json({ message: "Rapport supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du rapport:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
