import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
    storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
};