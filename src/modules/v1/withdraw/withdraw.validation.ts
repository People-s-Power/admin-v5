import { body, query } from "express-validator";
import { catchError } from "../../common/utils";

export const OtpRule = () => [
  body('otp').isString().withMessage('Enter otp').notEmpty(),
  body('transfer_code').isString().withMessage('Enter transfer_code').notEmpty(),
]