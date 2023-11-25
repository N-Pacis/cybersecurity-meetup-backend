import Joi from 'joi';
import _ from "lodash";

export async function validateRoleRegistration(req, res, next) {
    try {
        const schema = Joi.object({
            name: Joi.string().required().label("name")
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to register the role."
            })
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}