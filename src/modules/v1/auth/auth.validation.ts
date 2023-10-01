import { body, query } from "express-validator";
import { catchError } from "../../common/utils";

export const createUserRule = () => [
  body('name').isString().withMessage('Enter admin first name').notEmpty(),
  body('email').isEmail().withMessage('Enter admin email').notEmpty(),
  body('accountType').isIn(['Admin' , 'Editor' , 'Staff']).withMessage('Enter accountType. Must be either Editor, Admin or Staff').notEmpty(),
  body('password').isStrongPassword({ minLength: 10, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain 1 number, 1 special character and 10 characters long').notEmpty(),
];

export const loginRule = () => [
  body("email").isEmail().withMessage("Enter a valid email").notEmpty(),
  body("password")
    .isString()
    .withMessage("Enter your valid password")
    .notEmpty(),
];


export const becomeRule = () => [
  body("email").isEmail().withMessage("Enter a valid email").notEmpty(),
  body('accountType').isIn(['Admin' , 'Editor' , 'Staff']).withMessage('Enter accountType. Must be either Editor, Admin or Staff').notEmpty(),
  body("password")
    .isString()
    .withMessage("Enter your valid password")
    .notEmpty(),
];


export const editRule = () => [
  body("password")
  .isEmpty()
];

export const editPasswordRule = () => [
  body('oldPassword').notEmpty(),
  body('password').isStrongPassword({ minLength: 10, minNumbers: 1, minSymbols: 1 }).withMessage('Password must contain 1 number, 1 special character and 10 characters long').notEmpty()
];