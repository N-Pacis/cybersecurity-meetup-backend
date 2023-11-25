import Joi from 'joi';
import _ from "lodash";

export async function validateSpeakerRegistration(req, res, next) {
    try {
        req.body.socialMedia = JSON.parse(req.body.socialMedia)
        const schema = Joi.object({
            name: Joi.string().required().label("name"),
            role: Joi.string().required().label("role"),
            socialMedia:
                Joi.object().keys({
                    twitter: Joi.string().required(),
                    linkedIn: Joi.string().required()
                }).required()
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to register the participant."
            })
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}

export async function validateSpeakerUpdate(req, res, next) {
    try {
        const schema = Joi.object({
            name: Joi.string().label("name"),
            role: Joi.string().label("role"),
            socialMedia: Joi.array().items(
                Joi.object().keys({
                    twitter: Joi.string().required(),
                    linkedIn: Joi.string().required()
                })
            )
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(200).json({
                error: error.message,
                message: "Unable to update the speaker."
            })
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}
