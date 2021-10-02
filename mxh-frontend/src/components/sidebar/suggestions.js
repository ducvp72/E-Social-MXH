import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { SuggestionsProfiles } from "./suggestionsProfiles";

export const Suggestions = () => {
  const [profiles, setProfiles] = useState(null);

  return (
    <div className="rounded flex flex-col">
    <div className="text-sm flex items-center align-items justify-between mb-2">
      <p className="font-bold text-gray-base">Suggestions for you</p>
    </div>
    <div className="mt-4 grid gap-5">
        <SuggestionsProfiles/>
        <SuggestionsProfiles/>
        <SuggestionsProfiles/>
        <SuggestionsProfiles/>
    </div>
  </div>
  );
};
