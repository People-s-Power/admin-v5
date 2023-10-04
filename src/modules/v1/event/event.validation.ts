import { body, query } from "express-validator";
import { catchError } from "../../common/utils";

export const createEventRule = () => [
  body('orgId').isString().withMessage('Enter orgId').notEmpty(),
  body('name').isString().withMessage('Enter name').notEmpty(),
  body('description').isString().withMessage('Enter description').notEmpty(),
  body('time').isString().withMessage('Enter time').notEmpty(),
  body('startDate').isString().withMessage('Enter startDate').notEmpty(),
  body('audience').isString().withMessage('Enter audience').notEmpty(),
  body('endDate').isString().withMessage('Enter endDate').notEmpty(),
  body('assets').isArray().withMessage('Enter assets').notEmpty(), 
  body('type').custom(value => {
    if (value !== 'online' && value !== 'offline') {
      throw catchError('The type must be either "online" or "offline"', 400);
    }
    return true;
  }),
]