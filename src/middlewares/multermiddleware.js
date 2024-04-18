import multer from "multer";
import { __dirname } from "../dirname.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileType = file.mimetype;

    console.log(req.params.type)

    if (req.params.type === 'profile') {
      cb(null, `${__dirname}/public/uploads/profile`);
    } else if (req.params.type === 'product') {
      cb(null, `${__dirname}/public/uploads/products`);
    }
    else {
      cb(null, `${__dirname}/public/uploads/documents`);
    }
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.replace(/\s/g, "");
    const timestamp = new Date()
      .toLocaleString()
      .replace(/, /g, "")
      .split(/[/:,\s]/)
      .join("-")
      .replace(/"/g, "");
    cb(null, `${timestamp}${originalname}`);
  }
});

export const upload = multer({storage:storage,
onError : function(err, next){
  console.log(err)
  next();
}
})
