import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor(private feedbackRepository: FeedbacksRepository, private mailAdapter: MailAdapter){}

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        if(!type){
            throw new Error('Type is requid.')
        }

        if(!comment){
            throw new Error('Comment is requid.')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbackRepository.create({
            type: type,
            comment: comment,
            screenshot: screenshot,
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        });
    }
}