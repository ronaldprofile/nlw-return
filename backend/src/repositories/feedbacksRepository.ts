export type FeedbackRepositoryData = {
  type: string;
  comment: string;
  screenshot?: string;
};

export type FeedbacksRepository = {
  create: (data: FeedbackRepositoryData) => Promise<void>;
};
