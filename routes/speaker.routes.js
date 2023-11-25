import express from 'express'
const router = express.Router()
import authenticate from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';
import { uploadFile } from "../utils/fileUpload.utils.js";
import { deleteSpeaker, getSpeakersOfAnEvent, registerSpeaker, updateSpeakerInformation } from '../controllers/speakers.controller.js';
import { validateSpeakerRegistration, validateSpeakerUpdate } from '../validators/speaker.validator.js';
const upload = uploadFile()

router.get("/speakers/:eventId", getSpeakersOfAnEvent)

router.post("/speakers/:eventId/create", authenticate,admin,upload.single("image"),validateSpeakerRegistration, registerSpeaker)

router.put("/speakers/:speakerId/update", authenticate,admin,validateSpeakerUpdate, updateSpeakerInformation)

router.delete("/speakers/:speakerId/delete", authenticate,admin,deleteSpeaker)

export default router;