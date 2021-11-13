import { SuggestionsProfiles } from "./suggestionsProfiles";

export const Suggestions = () => {
  return (
    <div className="rounded flex flex-col z-10">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        <SuggestionsProfiles />
        <SuggestionsProfiles />
        <SuggestionsProfiles />
        <SuggestionsProfiles />
      </div>
    </div>
  );
};
