import { HttpException, HttpStatus } from '@nestjs/common'
import { existsSync, mkdirSync } from 'fs'
import { diskStorage, memoryStorage } from 'multer'
import { extname } from 'path'

export const multerDiskOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true)
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      )
    }
  },
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'src/source/img'
      if (!existsSync(uploadPath)) mkdirSync(uploadPath)
      callback(null, uploadPath)
    },
    filename: (request, file, callback) => {
      callback(
        null,
        `${Date.now()}${getRandomNumber()}${extname(file.originalname)}`,
      )
    },
  }),
  limits: {
    fieldNameSize: 200,
    filedSize: 1024 * 1024,
    fields: 2,
    fileSize: 16777216,
    files: 10,
  },
}
const getRandomNumber = () => {
  let number = Math.floor(Math.random() * 1000000) + 100000
  if (number > 1000000) number -= 100000
  return number
}
