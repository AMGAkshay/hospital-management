const multer = require("multer");
const path = require("path");
let FileName = "";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const FilePath = path.join(__dirname, "./assests");
    cb(null, FilePath);
  },
  filename: (req, file, cb) => {
    // console.log(file);
    FileName = Date.now() + "-" + file.originalname;
    cb(null, FileName);
  },
});

var upload = multer({ storage: storage });
// export default upload;
module.exports = upload;
