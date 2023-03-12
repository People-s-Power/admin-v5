import { body } from "express-validator";

export const signUpRule = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .notEmpty()
      .withMessage("Email is compulsory"),
    body("firstName")
      .isString()
      .withMessage("Enter your First Name")
      .notEmpty()
      .withMessage("First Name is compulsory"),
    body("lastName")
      .isString()
      .withMessage("Enter your Last Name")
      .notEmpty()
      .withMessage("Last Name is compulsory"),
    body("phoneNumber")
      .isString()
      .withMessage("Enter your phone number")
      .isLength({ min: 11, max: 11 })
      .withMessage("Your phone number is not valid")
      .notEmpty()
      .withMessage("Phone Number is compulsory"),
    body("password")
      .isStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      })
      .withMessage("Your password must contain 1 lowercase, 1 number, 1 special characters, 1 uppercase")
      .notEmpty()
      .withMessage("Password is compulsory"),
  ];
};

export const loginRule = () => {
    return [
      body("email")
        .isEmail()
        .withMessage("Enter a valid email")
        .notEmpty()
        .withMessage("Email is compulsory"),
      body("password")
        .isStrongPassword({
          minLength: 10,
          minLowercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minUppercase: 1,
        })
        .withMessage("Your password must contain 1 lowercase, 1 number, 1 special characters, 1 uppercase")
        .notEmpty()
        .withMessage("Password is compulsory"),
    ];
  };
