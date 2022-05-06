import { feedbackTypes, FeedbackType } from "..";
import { CloseButton } from "../../CloseButton";

type FeedbackTypeStepProps = {
  onFeedbackTypeChange: (type: FeedbackType) => void;
};

export function FeedbackTypeStep({
  onFeedbackTypeChange
}: FeedbackTypeStepProps) {
  return (
    <>
      <header className={`text-xl leading-6`}>
        <span>Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className={`w-full py-8 flex items-center gap-2 `}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <button
            key={key}
            type="button"
            onClick={() => onFeedbackTypeChange(key as FeedbackType)}
            className={`
              w-24 py-5 flex flex-col items-center flex-1 gap-2
            bg-zinc-800 rounded-lg border-2 border-transparent
            hover:border-brand-500 focus:border-brand-500 focus:outline-none
            `}
          >
            <img src={value.image.source} alt={value.image.alt} />
            <span>{value.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
