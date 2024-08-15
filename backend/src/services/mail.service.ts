import nodemailer from 'nodemailer'

export class MailService {
	transporter: nodemailer.Transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'User activation ' + process.env.API_URL,
			text: '',
			html: `
						<div>
							<h1>To activate account follow link below</h1>
							<a href=${link}>${link}</a>
						</div>
						`,
		})
	}
}
