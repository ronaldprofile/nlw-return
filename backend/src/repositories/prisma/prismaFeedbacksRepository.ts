import { prisma } from "../../prisma/prismaClient";
import {
  FeedbacksRepository,
  FeedbackRepositoryData
} from "../feedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackRepositoryData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    });
  }
}
