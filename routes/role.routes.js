import express from 'express'
const router = express.Router()
import authenticate from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';
import { validateRoleRegistration } from '../validators/role.validator.js';
import { createRole, deleteRole, getRolesOfAnEvent, getRolesOfAnEventWithPartners } from '../controllers/roles.controller.js';

router.get("/roles/:eventId", getRolesOfAnEvent)

router.get("/roles/with-partners/:eventId", getRolesOfAnEventWithPartners)

router.post("/roles/create/:eventId", authenticate,admin,validateRoleRegistration, createRole)

router.delete("/roles/delete/:roleId", authenticate,admin,deleteRole)

export default router;