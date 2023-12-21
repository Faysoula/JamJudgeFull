const { check } = require("express-validator");

const insertedUserValidation = [
  check("user_firstname").notEmpty().withMessage("please insert first name"),
  check("user_lastname").notEmpty().withMessage("please insert last name"),
  check("user_dob").notEmpty().withMessage("please insert a date of birth"),
  check("user_dob").isDate().withMessage("date of birth must be valid"),
//add it when done testing
  check("user_email").isEmail().withMessage("Invalid Email Format"),
];

const updateUserValidation = [
  check("user_id").notEmpty().withMessage("please insert a valid id"),
  check("user_firstname").notEmpty().withMessage("please insert first name"),
  check("user_lastname").notEmpty().withMessage("please insert last name"),
  check("user_dob").notEmpty().withMessage("please insert a date of birth"),
  check("user_dob").isDate().withMessage("date of birth must be valid"),
  check("user_pass")
    .isLength({ min: 10 })
    .withMessage("password must be atleast 10 characters"),
  check("user_pass")
    .isStrongPassword()
    .withMessage("please insert a strong password"),
  check("user_email").isEmail().withMessage("Invalid Email Format"),
];

const deleteuservalid = [
  check("user_id").notEmpty().withMessage("please insert a valid id"),
];

module.exports = {
  insertedUserValidation,
  updateUserValidation,
  deleteuservalid,
};
