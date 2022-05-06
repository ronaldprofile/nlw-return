import { Router, Request, Response } from "express";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { NodemailerMailService } from "./services/nodemailer/nodemailerMailService";
import { SubmitFeedbackUseCase } from "./useCases/submitFeedbackUseCase";

export const routes = Router();

routes.post("/feedbacks", async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailService = new NodemailerMailService();

  const submitFeedbacksUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailService
  );

  await submitFeedbacksUseCase.execute({
    type,
    comment,
    screenshot
  });

  return res.status(201).send();
});
