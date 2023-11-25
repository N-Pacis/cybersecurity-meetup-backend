import Joi from 'joi';
import _ from "lodash";

export async function validateSendContactMessage(req, res, next) {
    try {
        const schema = Joi.object({
            Names: Joi.string().min(5).required().label("Names"),
            Email: Joi.string().min(5).required().label("Email"),
            Message: Joi.string().required().label("Message"),
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to send the contact message."
            })
        }
        
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}