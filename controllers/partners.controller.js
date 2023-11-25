import lodash from 'lodash';
import { Event } from '../models/event.model.js';
import { Partner } from '../models/partners.model.js';
import { Role } from '../models/roles.model.js';
const { pick } = lodash;
import cloudinary from "../utils/cloudinary.js"

export const getPartnersOfAnEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if(!event) return res.status(404).send({
            status:404,
            message:"Event not found"
        })

        let partners = await Partner.find({eventId:req.params.eventId});
        return res.send({
            status: 200,
            message: "ok",
            data: partners
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const getPartnersByRole = async (req, res) => {
    try {
        let role = await Role.findById(req.params.roleId);
        if(!role) return res.status(404).send({
            status:404,
            message:"Role not found"
        })

        let partners = await Partner.find({roleId:req.params.roleId});
        return res.send({
            status: 200,
            message: "ok",
            data: partners
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const createPartner = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if(!event) return res.status(404).send({
            status:404,
            message:"Event not found"
        })

        let role = await Role.findById(req.params.roleId);
        if(!role) return res.status(404).send({
            status:404,
            message:"Role not found"
        })

        let partnerImage = req.file
        const imageInfo = await cloudinary.uploader.upload(partnerImage.path)

        let partner = new Partner(pick(req.body, ['name']))
        const time = new Date();
        partner.createdAt = time;
        partner.createdBy = req.user._id
        partner.eventId = req.params.eventId
        partner.roleId = req.params.roleId
        partner.image = imageInfo.secure_url
        partner.imageId = imageInfo.public_id

        try {
            await partner.save()
            return res.json({ message: "partner successfully added", status: 201, data: partner })
        } catch (ex) {
            res.status(400).send(ex.message);
        }
    } catch (ex) {
        res.status(500).send(ex.message);
    }
}

export const deletePartner = async (req, res) => {
    try {
        let partner = await Partner.findById(req.params.partnerId)
        if (!partner) return res.status(404).send({
            status: 404,
            message: "Partner not found",
            data: partner
        })

        await Partner.findByIdAndRemove(req.params.partnerId)
        res.status(200).send({
            status: 200,
            message: "Partner deleted successfully"
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}