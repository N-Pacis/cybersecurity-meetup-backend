import Joi from 'joi';
import { User } from "../models/user.model.js";
import _ from "lodash";

export async function validateUserRegistration(req, res, next) {
    try {
        const schema = Joi.object({
            Firstname: Joi.string().min(5).required().label("Firstname"),
            Lastname: Joi.string().min(5).required().label("Lastname"),
            Phone: Joi.number().min(10).required().label("Phonenumber"),
            Email: Joi.string().min(5).required().label("Email"),
            Password: Joi.string().min(5).required().label("Password"),
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to create the account."
            })
        }
        let checkEmail = await User.findOne({ Email: req.body.Email })
        if (checkEmail) return res.status(200).send("Email is already registered!")

        if ((req.body.Phone).length < 10 || (req.body.Phone).length > 10) return res.status(200).send("Phone Number must be 10 characters!")
        req.body.Phone = (req.body.Phone).toString()
        let validRwandanPhoneNumbers = ['078', '079', '072', '073']
        let first3Characters = (req.body.Phone.toString()).substring(0, 3)
        if (validRwandanPhoneNumbers.includes(first3Characters) != true) {
            return res.status(200).send("Phone Number must be a valid Rwandan Phone Number!")
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}

export async function validateLogin(req, res, next) {
    try {
        const schema = Joi.object({
            Email: Joi.string().min(5).required().label("Email"),
            Password: Joi.string().min(5).required().label("Password"),
        })

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(200).json({
                error: error.message,
                message: "Unable to login to your account."
            })
        }

        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}

export async function validatePasswordReset(req, res, next) {
    try {
        const schema = Joi.object({
            newPassword: Joi.string().min(6).required()
        })
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to continue with password reset."
            })
        }

        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}

export async function validateProfileUpdate(req, res, next) {
    try {
        const schema = Joi.object({
            Firstname: Joi.string().min(5).label("Firstname"),
            Lastname: Joi.string().min(5).label("Lastname"),
            Phone: Joi.number().min(10).label("Phonenumber"),
        })

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to update profile."
            })
        }
        if (req.body.Phone) {
            if ((req.body.Phone).length < 10 || (req.body.Phone).length > 10) return res.status(400).send("Phone Number must be 10 characters!")
            req.body.Phone = (req.body.Phone).toString()
            let validRwandanPhoneNumbers = ['078', '079', '072', '073']
            let first3Characters = (req.body.Phone.toString()).substring(0, 3)
            if (validRwandanPhoneNumbers.includes(first3Characters) != true) {
                return res.status(400).send("Phone Number must be a valid Rwandan Phone Number!")
            }
        }

        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}

export async function validatePasswordChange(req, res, next) {
    try {
        const schema = Joi.object({
            oldPassword: Joi.string().min(6).required(),
            newPassword: Joi.string().min(6).required()
        })

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to update profile."
            })
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}