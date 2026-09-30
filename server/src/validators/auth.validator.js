import { body } from "express-validator";
import validationRequest from "../utils/validate.util.js";

export const registerUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")    
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validationRequest,
];

export const loginUserValidator = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")    
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validationRequest,
];
