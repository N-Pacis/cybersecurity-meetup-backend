import lodash from 'lodash';
import { Event } from '../models/event.model.js';
const { pick } = lodash;
import  cloudinary  from "../utils/cloudinary.js"

export const getEvents = async (req, res) => {
    try {
        if (req.query.status && !req.query.eventId) {
            let events = await Event.find({ status: req.query.status });
            return res.send({
                status: 200,
                message: "ok",
                data: events
            })
        }
        else if (req.query.eventId && !req.query.status) {
            let event = await Event.findById(req.query.eventId);
            if (!event) return res.status(400).send({
                status: 404,
                message: "Event not found"
            })
            return res.send({
                status: 200,
                message: "ok",
                data: event
            })
        }
        else if (req.query.eventId && req.query.status) {
            let event = await Event.findOne({ _id: req.query.eventId, status: req.query.status });
            if (!event) return res.status(400).send({
                status: 404,
                message: "Event not found"
            })
            return res.send({
                status: 200,
                message: "ok",
                data: event
            })
        }
        else {
            let events = await Event.find({});
            return res.send({
                status: 200,
                message: "ok",
                data: events
            })
        }
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const getActiveEvent = async (req, res) => {
    try {
        let event = await Event.findOne({ status: 'active' });
        return res.send({
            status: 200,
            message: "ok",
            data: event
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const createEvent = async (req, res) => {
    try {

        let activeEventExists = await Event.findOne({ status: 'active' });
        if(activeEventExists) return res.status(400).send({
            status: 400,   
            message: "You must first deactivate all active events to create another event",
        })
        let event = new Event(pick(req.body, ['name', 'description', 'location', 'date', 'agenda']))
        const time = new Date();
        event.createdAt = time;
        event.createdBy = req.user._id

        try {
            await event.save()
            return res.status(200).json({ message: "event successfully created", status: 201,data:event})
        } catch (ex) {
            res.status(400).send(ex.message);
        }
     } catch (ex) {
        res.status(500).send(ex.message);
    }
}

export const updateEventInformation = async (req, res) => {
    try {
        try {
            let eventInfo = await Event.findById(req.params.eventId);
            if (!eventInfo) return res.status(404).send("Event not found!")

            let name = (req.body.name) ? req.body.name : eventInfo.name
            let description = (req.body.description) ? req.body.description : eventInfo.description
            let location = (req.body.location) ? req.body.location : eventInfo.location
            let date = (req.body.date) ? req.body.date : eventInfo.date
            let agenda = (req.body.agenda) ? req.body.agenda : eventInfo.agenda

            let event = await Event.findByIdAndUpdate(req.params.eventId, {
                name: name,
                description: description,
                location: location,
                date: date,
                agenda: agenda
            }, { new: true })
            res.status(200).send({
                message: 'Event updated successfully',
                data: event
            })
        } catch (ex) {
            res.status(400).send(ex.message)
        }
    } catch (ex) {
        res.status(500).send(ex.message)
    }
}

export const activateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId)
        if(!event) return res.status(404).send({
            status: 404,
            message: "Event not found"
        })
        await Event.findByIdAndUpdate(req.params.eventId, { status: 'active' }, { new: true })
        res.status(200).send({
            status:200,
            message: "Event activated successfully",
            data: event
        });
    }
    catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const deactivateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId)
        if(!event) return res.status(404).send({
            status: 404,
            message: "Event not found"
        })
        await Event.findByIdAndUpdate(req.params.eventId, { status: 'inactive' }, { new: true })
        res.status(200).send({
            status:200,
            message: "Event deactivated successfully",
            data: event
        });
    }
    catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const deleteEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId)
        if (!event) return res.status(404).send({
            status:404,
            message: "Event not found",
            data: event
        })

        await Event.findByIdAndRemove(req.params.eventId)
        res.status(200).send({
            status:200,
            message: "Event deleted successfully"
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}