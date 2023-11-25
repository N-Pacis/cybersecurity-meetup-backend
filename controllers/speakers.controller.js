import lodash from 'lodash';
import { Event } from '../models/event.model.js';
import { Speaker } from '../models/speakers.model.js';
const { pick } = lodash;
import cloudinary from "../utils/cloudinary.js"

export const getSpeakersOfAnEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if(!event) return res.status(404).send({
            status:404,
            message:"Event not found"
        })

        let speakers = await Speaker.find({eventId:req.params.eventId});
        return res.send({
            status: 200,
            message: "ok",
            data: speakers
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const registerSpeaker = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if(!event) return res.status(404).send({
            status:404,
            message:"Event not found"
        })

        let speakerImage = req.file
        const imageInfo = await cloudinary.uploader.upload(speakerImage.path)

        let speaker = new Speaker(pick(req.body, ['name', 'role', 'socialMedia']))
        const time = new Date();
        speaker.createdAt = time;
        speaker.createdBy = req.user._id
        speaker.eventId = req.params.eventId
        speaker.image = imageInfo.secure_url
        speaker.imageId = imageInfo.public_id

        try {
            await speaker.save()
            return res.json({ message: "speaker successfully added", status: 201, data: speaker })
        } catch (ex) {
            res.status(400).send(ex.message);
        }
    } catch (ex) {
        res.status(500).send(ex.message);
    }
}

export const updateSpeakerInformation = async (req, res) => {
    try {
        try {
            let speakerInfo = await Speaker.findById(req.params.speakerId);
            if (!speakerInfo) return res.status(404).send("Speaker not found!")

            let name = (req.body.name) ? req.body.name : speakerInfo.name
            let role = (req.body.role) ? req.body.role : speakerInfo.role
            let socialMedia = (req.body.socialMedia) ? req.body.socialMedia : speakerInfo.socialMedia

            let event = await Speaker.findByIdAndUpdate(req.params.speakerId, {
                name: name,
                role: role,
                socialMedia: socialMedia
            }, { new: true })
            res.status(200).send({
                message: 'Speaker updated successfully',
                data: event
            })
        } catch (ex) {
            res.status(400).send(ex.message)
        }
    } catch (ex) {
        res.status(500).send(ex.message)
    }
}

export const deleteSpeaker = async (req, res) => {
    try {
        let speaker = await Speaker.findById(req.params.speakerId)
        if (!speaker) return res.status(404).send({
            status: 404,
            message: "Speaker not found",
            data: speaker
        })

        await Speaker.findByIdAndRemove(req.params.speakerId)
        res.status(200).send({
            status: 200,
            message: "Speaker deleted successfully"
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}