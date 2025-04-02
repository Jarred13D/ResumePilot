import path from "path";
import { Request, Response } from "express";
import fs from "fs";

const downloadResume = (req: Request, res: Response ) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, `../../uploads/${filename}`);

    if (!filename) {
        return res.status(400).json({ message: "Filename is required" });
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
    }

    return res.download(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error downloading file" });
        }
        return;
    });
};

export default downloadResume;