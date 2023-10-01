import { body, query } from "express-validator";
import { catchError } from "../../common/utils";

export const addAdminRule = () => [
  body('firstName').isString().withMessage('Enter admin first name').notEmpty(),
  body('lastName').isString().withMessage('Enter admin last name').notEmpty(),
  body('address').isString().withMessage('Enter admin address').notEmpty(),
  body('email').isEmail().withMessage('Enter admin email').notEmpty(),
  body('phoneNumber').isMobilePhone("en-NG").withMessage('Enter admin phone number').notEmpty(),
  body('role').isIn(['super-admin' , 'admin' , 'operator']).withMessage('Enter admin role. Must be either super-admin, admin or operator').notEmpty(),
  body('password').isStrongPassword({ minLength: 10, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain 1 number, 1 special character and 10 characters long').notEmpty(),
];

export const loginRule = () => [
  body("email").isEmail().withMessage("Enter a valid email").notEmpty(),
  body("password")
    .isString()
    .withMessage("Enter your valid password")
    .notEmpty(),
];

export const editProfileRule = () => [
  body("role")
    .isIn(["super-admin", "admin"])
    .withMessage("Choose a valid role")
    .optional(),
  body("address").isString().withMessage("Add address").optional(),
  body("lastName").isString().withMessage("Add last name").optional(),
  body("isActive")
    .isBoolean()
    .withMessage("isActive status must be boolean")
    .optional(),
  body("firstName").isString().withMessage("Add first name").optional(),
  body("phoneNumber")
    .isMobilePhone("en-NG")
    .withMessage("Enter a valid phone number")
    .optional(),
  body("oldPassword")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Enter your valid password")
    .optional(),
  body("newPassword")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "New password must contain 8 minimum character, 1 number, 1 special character and 1 lowercase"
    )
    .optional()
    .customSanitizer((value, { req }) => {
      if (!value) return value;

      if (value && !req.body.oldPassword) throw catchError('Old password must be provided to change password', 400)

      if (value && req.body.newPassword !== req.body.confirmNewPassword) {
        throw catchError(
          "New password and confirm password must be the same",
          400
        );
      }

      return value;
    }),
];

export const sendDmValidation = () => [
  body('category').isString().withMessage('Enter category').notEmpty(),
  body('message').isString().withMessage('Enter message').notEmpty(),
  body('subCategory').isString().withMessage('Enter subCategory'),
  body('country').isString().withMessage('Enter country').notEmpty(),
  body('city').isString().withMessage('Enter city').notEmpty(),
];

export const assignRule = () => [
  body('userId').isString().withMessage('Enter User id').notEmpty(),
  body('orgId').isString().withMessage('Enter org id').notEmpty(),
];