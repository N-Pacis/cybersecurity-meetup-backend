import express from 'express'
const router = express.Router()
import authenticate from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';
import { uploadFile } from "../utils/fileUpload.utils.js";
import { createPartner, deletePartner, getPartnersByRole, getPartnersOfAnEvent } from '../controllers/partners.controller.js';
import { validatePartnerRegistration } from '../validators/partner.validator.js';
const upload = uploadFile()

router.get("/partners/:eventId", authenticate,admin, getPartnersOfAnEvent)

router.get("/partners/byRole/:roleId", getPartnersByRole)

router.post("/partners/create/:eventId/:roleId", authenticate,admin,upload.single("image"),validatePartnerRegistration, createPartner)

router.delete("/partners/delete/:partnerId", authenticate,admin,deletePartner)

export default router;