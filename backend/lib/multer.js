import multer from "multer"
import path from 'node:path'
import { allowedExtensions, maxUploadFileSize } from './constants.js'
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + extension
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const limits = {fileSize: maxUploadFileSize}
function fileFilter (req, file, cb) {
    const extension = path.extname(file.originalname)
    const mimetype = file.mimetype
    if(allowedExtensions.includes(extension) && mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb(new Error(`Only image files with any of the following extensions: ${allowedExtensions.join(', ')} are allowed`))
    }
}
const upload = multer({ storage, limits, fileFilter })
export default upload