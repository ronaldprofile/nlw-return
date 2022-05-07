import { FormEvent, useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../services/api";

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
};

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [commentFeedback, setCommentFeedback] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    if (!commentFeedback.trim()) {
      alert("preencha o comentário do seu feedback!");
      return;
    }

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment: commentFeedback,
        screenshot
      });

      setIsSendingFeedback(false);
      onFeedbackSent();
    } catch (error) {
      console.log("log do error", error);
    }
  }

  return (
    <>
      <header>
        <button
          type="button"
          title="Voltar"
          onClick={onFeedbackRestartRequested}
          className={`absolute top-5 left-5 text-zinc-400 
          hover:text-zinc-100
        `}
        >
          <ArrowLeft weight="bold" className={`w-4 h-4`} />
        </button>

        <span className={`flex items-center gap-2 text-xl leading-6`}>
          <img
            className={`w-6 h-6`}
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />

          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className={`w-full my-4`}>
        <label htmlFor="feedback" className={`sr-only`}>
          {feedbackTypeInfo.title}
        </label>

        <textarea
          id="feedback"
          value={commentFeedback}
          onChange={e => setCommentFeedback(e.target.value)}
          className={`w-full min-w-[304px] min-h-[112px] py-2 px-3 
            bg-transparent placeholder-zinc-400 text-sm text-zinc-100
            border resize-none border-zinc-600 rounded
          focus:border-brand-500 focus:ring-brand-500 focus:outline-none
          scrollbar-thumb-zinc-700 scrollbar-track-transparent
            scrollbar-thin
          `}
          placeholder="Algo não está funcionando bem? Queremos corrigir. 
        Conte com detalhes o que está acontecendo..."
        />

        <footer className={`mt-2 flex items-center gap-2`}>
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={commentFeedback.length === 0 || isSendingFeedback}
            title="enviar feedback"
            className={`py-2 px-6 flex flex-1 justify-center items-center 
              text-sm leading-6 bg-brand-500 text-white font-bold rounded
              hover:bg-brand-300 transition-colors focus:outline-none
              focus disabled:cursor-not-allowed disabled:opacity-50 
              disabled:hover:bg-brand-500
            `}
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
