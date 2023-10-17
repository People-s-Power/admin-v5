import { body, query } from "express-validator";
import { catchError } from "../../common/utils";

const categories = [
  'human right awareness',
  'social policy',
  'criminal justice',
  'environment',
  'health',
  'Politics',
  'discrimination',
  'development',
  'disability',
  'equality',
  'human right action',
  'Accounting',
  'Design',
  'Marketing',
  'Education',
  'Coaching and Mentoring',
  'Information Technology',
  'Law',
  'Admin/Office Assistant',
]

export const createPostRule = () => [
  body('orgId').isString().withMessage('Enter orgId').notEmpty(),
  body('body').isString().withMessage('Enter body').notEmpty(),
  body('assets').isArray().withMessage('Enter assets').notEmpty(),
  body('categories').isArray().custom(value => {
    value.map(item => {
      if (!categories.includes(item)) {
        throw catchError('Not a valid category', 400);
      }
    })
    return true;
  }),
]