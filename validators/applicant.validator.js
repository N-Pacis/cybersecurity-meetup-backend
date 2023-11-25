import Joi from 'joi';
import _ from "lodash";
import { Applicant } from '../models/applicant.model.js';

export async function validateApplicantCreation(req, res, next) {
    try {
        const schema = Joi.object({
            firstname: Joi.string().required().label("firstname"),
            lastname: Joi.string().required().label("lastname"),
            phone: Joi.number().min(10).required().label("phone number"),
            email: Joi.string().required().label("email"),
            organization: Joi.string().required().label("organization"),
            position: Joi.string().required().label("position"),
            industry: Joi.string().required().label("industry")
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to submit the application."
            })
        }
        let checkEmail = await Applicant.findOne({ email: req.body.email,eventId:req.params.eventId })
        if (checkEmail) return res.status(400).send("This email was already used in application!")

        if ((req.body.phone).length < 10 || (req.body.phone).length > 10) return res.status(200).send("phone Number must be 10 characters!")
        req.body.phone = (req.body.phone).toString()
        let validRwandanphoneNumbers = ['078', '079', '072', '073']
        let first3Characters = (req.body.phone.toString()).substring(0, 3)
        if (validRwandanphoneNumbers.includes(first3Characters) != true) {
            return res.status(200).send("phone Number must be a valid Rwandan phone Number!")
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}