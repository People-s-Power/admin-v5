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
  'Education',
  'Marketing',
  'Coaching and Mentoring',
  'Information Technology',
  'Law',
  'Admin/Office Assistant',
]

export const createPetitionRule = () => [
  body('orgId').isString().withMessage('Enter orgId').notEmpty(),
  body('body').isString().withMessage('Enter body').notEmpty(),
  body('aim').isString().withMessage('Enter aim').notEmpty(),
  body('target').isString().withMessage('Enter target').notEmpty(),
  body('country').isString().withMessage('Enter country').notEmpty(),
  body('assets').isArray().withMessage('Enter assets').notEmpty(),
  body('category').custom(value => {
    if (!categories.includes(value)) {
      throw catchError('Not a valid category', 400);
    }
    return true;
  }),
]