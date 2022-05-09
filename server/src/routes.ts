import express from 'express';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post('/feedbascks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbackRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbackRepository, nodemailerMailAdapter);

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();
});