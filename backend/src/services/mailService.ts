export type MailServiceData = {
  subject: string;
  body: string;
};

export type MailService = {
  sendMail: (data: MailServiceData) => Promise<void>;
};
