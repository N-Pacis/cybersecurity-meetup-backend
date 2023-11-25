import mongoose from "mongoose"
const { Schema,SchemaTypes, model } = mongoose
import idvalidator from "mongoose-id-validator";

const rolesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    eventId:{
        type: SchemaTypes.ObjectId,
        ref: "event",
        required: true
    },
    createdAt: {
        type: Date,
        default: null
    },
    createdBy: {
        type: SchemaTypes.ObjectId,
        ref: "user",
        required: true
    }
})

rolesSchema.plugin(idvalidator)

export const Role = model('role', rolesSchema)
