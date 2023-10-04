import { body, query } from "express-validator";

export const createAdvertRule = () => [
  body('caption').isString().withMessage('Enter caption').notEmpty(),
  body('message').isString().withMessage('Enter message').notEmpty(),
  body('action').isString().withMessage('Enter action').notEmpty(),
  body('audience').isString().withMessage('Enter audience').notEmpty(),
  body('duration').isString().withMessage('Enter duration').notEmpty(),
  body('email').isEmail().withMessage('Enter email').notEmpty(),
  body('link').isString().withMessage('Enter link').notEmpty(),
  body('state').isString().withMessage('Enter state').notEmpty(),
  body('country').isString().withMessage('Enter country').notEmpty(),
  body('assets').isArray().withMessage('Enter assets').notEmpty(),
  
];

export const deleteAdvertRule = () => [
  body('orgId').isString().withMessage('Enter orgId').notEmpty(),
  body('adId').isArray().withMessage('Enter adId').notEmpty(),
]