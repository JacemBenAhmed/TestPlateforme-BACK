const { exec } = require('child_process');
const path = require('path');

const runSnykScan = async (req, res) => {
    try {
        const projectPath = path.resolve(__dirname, '../../'); // Adjust path as needed

        exec(`snyk test --json > snyk-report.json`, { cwd: projectPath }, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: "Snyk scan failed", details: stderr });
            }
            res.json({ message: "Snyk scan completed", report: "snyk-report.json" });
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to run Snyk", details: error.message });
    }
};

const generateSnykHtmlReport = async (req, res) => {
    try {
        const projectPath = path.resolve(__dirname, '../../');

        exec(`snyk-to-html -i snyk-report.json -o snyk-report.html`, { cwd: projectPath }, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: "Failed to generate Snyk HTML report", details: stderr });
            }
            res.json({ message: "Snyk HTML report generated", report: "snyk-report.html" });
        });

    } catch (error) {
        res.status(500).json({ error: "Error generating report", details: error.message });
    }
};

module.exports = { runSnykScan, generateSnykHtmlReport };
