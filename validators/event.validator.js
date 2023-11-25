import Joi from 'joi';
import _ from "lodash";

export async function validateEventCreation(req, res, next) {
    try {
        req.body.agenda = JSON.parse(req.body.agenda)
        if(typeof(req.body.agenda) == "string"){
            req.body.agenda = req.body.agenda.replace("}","}|")
            req.body.agenda = req.body.agenda.split("|")
            for(let i=0;i<req.body.agenda.length;i++){
                req.body.agenda[i] = req.body.agenda[i].replace(",{","{")
                req.body.agenda[i] = JSON.parse(req.body.agenda[i])
            }
        }
        const schema = Joi.object({
            name: Joi.string().required().label("name"),
            description: Joi.string().required().label("description"),
            location: Joi.string().required().label("location"),
            date: Joi.string().required().label("date"),
            agenda: Joi.array().items(
                Joi.object().keys({
                    from: Joi.string().required(),
                    to: Joi.string().required(),
                    title: Joi.string().required(),
                    description: Joi.string().required()
                })
            ).required()
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to create the event."
            })
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}

export async function validateEventUpdate(req, res, next) {
    try {
        req.body.agenda = JSON.parse(req.body.agenda)
        if(typeof(req.body.agenda) == "string"){
            req.body.agenda = req.body.agenda.replace("}","}|")
            req.body.agenda = req.body.agenda.split("|")
            for(let i=0;i<req.body.agenda.length;i++){
                req.body.agenda[i] = req.body.agenda[i].replace(",{","{")
                req.body.agenda[i] = JSON.parse(req.body.agenda[i])
            }
        }
        req.body.status && delete req.body.status;
        req.body.createdAt && delete req.body.createdAt;
        req.body.createdBy && delete req.body.createdBy;
        req.body.image && delete req.body.image;
        req.body.imageId && delete req.body.imageId;
        const schema = Joi.object({
            name: Joi.string().label("name"),
            description: Joi.string().label("description"),
            location: Joi.string().label("location"),
            date: Joi.string().label("date"),
            agenda: Joi.array().items(
                Joi.object().keys({
                    _id: Joi.string(),
                    from: Joi.string().required(),
                    to: Joi.string().required(),
                    title: Joi.string().required(),
                    description: Joi.string().required()
                })
            ),
            __v:Joi.number()
        })
        
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
                message: "Unable to update the event."
            })
        }
        return next()
    }
    catch (ex) {
        return res.status(400).send(ex.message)
    }
}
