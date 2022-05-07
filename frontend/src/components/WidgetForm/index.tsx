import { useCallback, useState } from "react";

import bugImage from "../../assets/bug.svg";
import ideaImage from "../../assets/idea.svg";
import thoughtImage from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackType";
import { FeedbackContentStep } from "./Steps/FeedbackContent";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccess";

export const feedbackTypes = {
  BUG: {
    title: "Bug",
    image: {
      source: bugImage,
      alt: "Imagem de um inseto"
    }
  },

  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImage,
      alt: "Imagem de uma lâmpada"
    }
  },

  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImage,
      alt: "Imagem de um balão de pensamento"
    }
  }
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleRestartFeedback = useCallback(() => {
    setFeedbackSent(false);
    setFeedbackType(null);
  }, []);

  return (
    <div
      className={`w-[calc(100vw-2rem)] md:w-auto relative flex flex-col 
      items-center p-4 mb-4 rounded-2xl bg-zinc-900 
      shadow-lg
    `}
    >
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer>
        <span className={`text-xs`}>
          Feito com amor por&nbsp;
          <a href="#" className={`underline underline-offset-2`}>
            Rocketseat
          </a>
        </span>
      </footer>
    </div>
  );
}
