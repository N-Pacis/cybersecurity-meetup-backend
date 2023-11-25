import lodash from 'lodash';
import { Event } from '../models/event.model.js';
import { Role } from '../models/roles.model.js';
import { Partner } from '../models/partners.model.js';
const { pick } = lodash;

export const getRolesOfAnEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if(!event) return res.status(404).send({
            status:404,
            message:"Event not found"
        })

        let roles = await Role.find({eventId:req.params.eventId});
        
        return res.send({
            status: 200,
            message: "ok",
            data: roles
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const getRolesOfAnEventWithPartners = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if(!event) return res.status(404).send({
            status:404,
            message:"Event not found"
        })

        let roles = await Role.find({eventId:req.params.eventId});
        let rolesPartners = []
        for (let i=0;i<roles.length;i++){
            let partners = await Partner.find({roleId:roles[i]._id})
            partners.push({
                _id: roles[i]._id,
                name:roles[i].name
            })
            rolesPartners.push(partners)
        }
        
        return res.send({
            status: 200,
            message: "ok",
            data: rolesPartners
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const createRole = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if(!event) return res.status(404).send({
            status:404,
            message:"Event not found"
        })
        
        let role = new Role(pick(req.body, ['name']))
        const time = new Date();
        role.createdAt = time;
        role.createdBy = req.user._id
        role.eventId = req.params.eventId

        try {
            await role.save()
            return res.json({ message: "role successfully added", status: 201, data: role })
        } catch (ex) {
            res.status(400).send(ex.message);
        }
    } catch (ex) {
        res.status(500).send(ex.message);
    }
}

export const deleteRole = async (req, res) => {
    try {
        let role = await Role.findById(req.params.roleId)
        if (!role) return res.status(404).send({
            status: 404,
            message: "role not found",
            data: role
        })

        await Role.findByIdAndRemove(req.params.roleId)
        res.status(200).send({
            status: 200,
            message: "Role deleted successfully"
        })
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}