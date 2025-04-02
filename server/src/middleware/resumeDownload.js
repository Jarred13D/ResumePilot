import path from "path";
import fs from "fs";
const downloadResume = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, `../../uploads/${filename}`);
    if (!filename) {
        return res.status(400).json({ message: "Filename is required" });
    }
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
    }
    res.download(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error downloading file" });
        }
    });
};
export default downloadResume;
