import lodash from 'lodash';
import moment from 'moment';
import {
    Applicant
} from '../models/applicant.model.js';
import {
    Event
} from '../models/event.model.js';
import {
    sendEmail
} from '../utils/emailConfig.utils.js';
import {
    formatEmail
} from '../utils/emailFormatter.js';
const {
    pick
} = lodash;
import request from 'request'

import {
    Workbook
} from 'excel4node';

export const getApplicantsOfAnEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).send({
            status: 404,
            message: "Event not found"
        })

        if (req.query.status && !req.query.applicantId) {
            let applicants = await Applicant.find({
                status: req.query.status,
                eventId: req.params.eventId
            }).sort([
                ['createdAt', -1]
            ])
            return res.send({
                status: 200,
                message: "ok",
                data: applicants
            })
        } else if (req.query.applicantId && !req.query.status) {
            let applicant = await Applicant.findById(req.query.applicantId).sort([
                ['createdAt', -1]
            ])
            if (!applicant) return res.status(400).send({
                status: 404,
                message: "applicant not found"
            })
            return res.send({
                status: 200,
                message: "ok",
                data: applicant
            })
        } else if (req.query.applicantId && req.query.status) {
            let applicant = await Applicant.findOne({
                _id: req.query.applicantId,
                status: req.query.status,
                eventId: req.params.eventId
            }).sort([
                ['createdAt', -1]
            ])
            if (!applicant) return res.status(400).send({
                status: 404,
                message: "Applicant not found"
            })
            return res.send({
                status: 200,
                message: "ok",
                data: applicant
            })
        } else {
            let applicants = await Applicant.find({
                eventId: req.params.eventId
            }).sort([
                ['createdAt', -1]
            ])
            return res.send({
                status: 200,
                message: "ok",
                data: applicants
            })
        }
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const generateApplicantsExcelFile = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).send({
            status: 404,
            message: "Event not found"
        })

        var wb = new Workbook();
        let statuses = ['pending', 'archived', 'accepted']

        for (let k = 0; k < statuses.length; k++) {
            let stat = statuses[k]
            var applicants = await Applicant.find({
                eventId: req.params.eventId,
                status: stat
            }).sort([
                ['createdAt', -1]
            ])
            var workSheet = wb.addWorksheet(stat)
            var style = wb.createStyle({
                font: {
                    color: '#00a1de',
                    size: 13
                }
            })

            workSheet.cell(1, 1).string('Firstname').style(style)
            workSheet.cell(1, 2).string('Lastname').style(style)
            workSheet.cell(1, 3).string('Email').style(style)
            workSheet.cell(1, 4).string('Phone').style(style)
            workSheet.cell(1, 5).string('Organization').style(style)
            workSheet.cell(1, 6).string('Position').style(style)
            workSheet.cell(1, 7).string('Industry').style(style)
            workSheet.cell(1, 8).string('Status').style(style)
            workSheet.cell(1, 9).string('Application Date').style(style)
            workSheet.cell(1, 10).string('Application Time').style(style)

            applicants.map((applicant, index) => {
                workSheet.cell(index + 2, 1).string(applicant.firstname)
                workSheet.cell(index + 2, 2).string(applicant.lastname)
                workSheet.cell(index + 2, 3).string(applicant.email)
                workSheet.cell(index + 2, 4).string(applicant.phone)
                workSheet.cell(index + 2, 5).string(applicant.organization)
                workSheet.cell(index + 2, 6).string(applicant.position)
                workSheet.cell(index + 2, 7).string(applicant.industry)
                workSheet.cell(index + 2, 8).string(applicant.status)
                workSheet.cell(index + 2, 9).string(moment(applicant.createdAt).format('MM/DD/YYYY'))
                workSheet.cell(index + 2, 10).string(moment(applicant.createdAt).format('hh:mm'))
            })
        }

        wb.write('assets/Applicants.xlsx')
        setTimeout(() => {
            res.download("assets/Applicants.xlsx")
        }, 5000)
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const registerApplication = async (req, res) => {
    try {
        let event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).send({
            status: 404,
            message: "Event not found"
        })
        let applicant = new Applicant(pick(req.body, ['firstname', 'lastname', 'email', 'phone', 'organization', 'position', 'industry']))
        const time = new Date();
        applicant.createdAt = time;
        applicant.eventId = req.params.eventId

        try {
            await applicant.save()
            const subject = "Application Received"
            const message = `Dear Mr/Mrs ${applicant.firstname} ${applicant.lastname},
    
            This email is regarding your application to attend the Cyber security meetup Kigali to be held at ${event.location} on ${moment(event.date).format('Do MMMM YYYY')} from ${event?.agenda[0]?.from}-${event?.agenda[event?.agenda?.length - 1]?.to}, Your registration has been received by the Cyber security meetup Kigali team and confirmation will be sent to you within the next few days.

            `

            await sendApplicationEmail(subject, message, applicant)
            return res.json({
                message: "application submitted successfully",
                status: 201
            })
        } catch (ex) {
            res.status(400).send(ex.message);
        }
    } catch (ex) {
        res.status(500).send(ex.message);
    }
}

export const passApplication = async (req, res) => {
    try {
        let application = await Applicant.findById(req.params.applicantId)
        if (!application) return res.status(404).send({
            status: 404,
            message: "Application not found"
        })
        await Applicant.findByIdAndUpdate(req.params.applicantId, {
            status: 'passed'
        }, {
            new: true
        })
        res.status(200).send({
            status: 200,
            message: "Application passed successfully",
            data: application
        });
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const archiveApplication = async (req, res) => {
    try {
        let application = await Applicant.findById(req.params.applicantId)
        if (!application) return res.status(404).send({
            status: 404,
            message: "Application not found"
        })
        await Applicant.findByIdAndUpdate(req.params.applicantId, {
            status: 'archived'
        }, {
            new: true
        })

        res.status(200).send({
            status: 200,
            message: "Application archived successfully",
            data: application
        });
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const confirmApplication = async (req, res) => {
    try {
        let application = await Applicant.findById(req.params.applicantId)
        if (!application) return res.status(404).send({
            status: 404,
            message: "Application not found"
        })
        let event = await Event.findById(application.eventId)

        await Applicant.findByIdAndUpdate(req.params.applicantId, {
            status: 'accepted'
        }, {
            new: true
        })
        const subject = "Cybersecurity Meetup Rwanda Confirmation"
        const message = `
        
        Dear Mr/Mrs ${application.firstname} ${application.lastname},<br>
        
        Greetings of the day,<br><br>

        Congratulations! You have been accepted to attend <a href="http://cybersecuritymeetup.rw/"> Cybersecurity Meetup Rwanda</a>,
which will take place on <b> ${moment(event.date).format('Do MMMM YYYY')}, from 2:00-5:00 pm at ${event.location} </b> and we look forward to meeting with you to discuss on <b>"Why
Cybersecurity Culture and Gender Inclusion Matter for an Organization."</b> <br><br>
        
        To assist in planning for a great day, we look forward to receiving information regarding your availability by notifying us on <b>Whatsapp or Send Text Message</b> for confirmation on <b>+250785145118.</b> <br> <br>

        <b>N.B: Participants will be tested COVID-19 from 12:45-13:45pm and GIZ will take
care of all costs.</b> <br><br>

We look forward to being with you.<br>
Kind regards,`
        await sendApplicationEmail(subject, message, application)
        res.status(200).send({
            status: 200,
            message: "Application confirmed successfully",
            data: application
        });
    } catch (ex) {
        res.status(400).send(ex.message)
    }
}

export const sendApplicationEmail = async (status, message, applicant) => {
    const subject = `${status}`
    const html = formatEmail(message)
    let emailSent = await sendEmail(applicant.email, subject, html)
    if (emailSent) {
        if (status == "Application Received") {
            await Applicant.findByIdAndUpdate(applicant._id, {
                applicationEmailSent: true
            }, {
                new: true
            })
        } else if (status == "Cybersecurity Meetup Rwanda Confirmation") {
            await Applicant.findByIdAndUpdate(applicant._id, {
                confirmationRejectionEmailSent: true
            }, {
                new: true
            })
        }
    } else {
        if (status == "Application Received") {
            await Applicant.findByIdAndUpdate(applicant._id, {
                applicationEmailSent: false
            }, {
                new: true
            })
        } else if (status == "Application Confirmed") {
            await Applicant.findByIdAndUpdate(applicant._id, {
                confirmationRejectionEmailSent: false
            }, {
                new: true
            })
        }
    }
}