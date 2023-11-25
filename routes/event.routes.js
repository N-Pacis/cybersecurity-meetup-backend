import express from 'express'
const router = express.Router()
import authenticate from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';
import { activateEvent, createEvent, deactivateEvent, deleteEvent, getActiveEvent, getEvents, updateEventInformation } from '../controllers/event.controller.js';
import { validateEventCreation, validateEventUpdate } from '../validators/event.validator.js';
    
router.get("/events", authenticate, getEvents)

router.get("/events/active", getActiveEvent)

router.post("/events/create", authenticate,admin,validateEventCreation, createEvent)

router.put("/events/update/:eventId", authenticate,admin,validateEventUpdate, updateEventInformation)

router.patch("/events/activate/:eventId", authenticate,admin, activateEvent)

router.patch("/events/deactivate/:eventId", authenticate,admin, deactivateEvent)

router.delete("/events/delete/:eventId", authenticate,admin,deleteEvent)

export default router;