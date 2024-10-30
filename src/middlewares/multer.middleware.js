import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    }, //req gets json file only, thats why file (which is unqiue multer feature). file stores in case of file input from user
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

 export const upload = multer({
    storage,
})