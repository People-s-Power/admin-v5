import { body, query } from "express-validator";

export const createVictoryRule = () => [
  body('orgId').isString().withMessage('Enter orgId').notEmpty(),
  body('body').isString().withMessage('Enter body').notEmpty(),
  body('assets').isArray().withMessage('Enter assets').notEmpty(),
]