const util = require("util");

// Import multer
const multer = require("multer");

// Create a max size and configure to use disk storage
const maxSize = 2 * 1024 * 1024;

// How we configured disk storage
let storage = multer.diskStorage ({
    // Determines to folder to store and upload file
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

let uploadFile = multer ({
    stoarge: storage,
    limits: { fileSize : maxSize },
}).single("file");

// Promisify can be used with async - await so I don't have to create all those functions
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware; 