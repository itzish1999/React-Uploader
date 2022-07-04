const uploadFile = require ("../middleware/upload");
const upload = async (req, res) => {
    try {
        // Call middleware using uploadFile() first.
        await uploadFile (req, res);
        if (req.file == undefined) {
            // If HTTP request doesn't include a file, send 400 status
            return res.status(400).send ({ message: "Please upload a file!" });
        }
        res.status(200).send ({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
        // Catch 500 status with error message
        // How to handle in case that user uploads the file exceeding size limit?
    } catch (err) {
        res.status(500).send ({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    fs.readdir (directoryPath, function (err, files) {
        if (err) {
            res.status(500).send ({
                message: "Unable to scan files",
            });
        }
        let fileInfos = [];
        files.forEach ((file) => {
            fileInfos.push ({
                name: file,
                url: baseUrl + file,
            });
        });
        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/upload/";
    res.download (directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send ({
                message: "Could not download file " + err,
            });
        }
    });
};

module.exports = {
    upload,
    getListFiles,
    download,
};