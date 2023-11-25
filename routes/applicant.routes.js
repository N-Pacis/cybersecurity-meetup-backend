import express from 'express'
const router = express.Router()
import authenticate from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';
import meetup_reviewer from '../middlewares/meetup-reviewer.middleware.js';
import { archiveApplication, confirmApplication, generateApplicantsExcelFile, getApplicantsOfAnEvent, passApplication, registerApplication } from '../controllers/applicant.controller.js';
import { validateApplicantCreation } from '../validators/applicant.validator.js';

router.get("/applicants/all/:eventId", authenticate, getApplicantsOfAnEvent)

router.get("/applicants/generate-excel/:eventId", authenticate, generateApplicantsExcelFile)

router.post("/applicants/create/:eventId", validateApplicantCreation, registerApplication)

router.patch("/applicants/pass/:applicantId", authenticate,meetup_reviewer, passApplication)

router.patch("/applicants/archive/:applicantId", authenticate,admin, archiveApplication)

router.patch("/applicants/confirm/:applicantId", authenticate,confirmApplication)

export default router;