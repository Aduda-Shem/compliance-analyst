'use client';

import ReactMarkdown from "react-markdown";
import { useAppSelector } from "../../store";

const ResponseDisplay = () => {
  const { response, loading, error } = useAppSelector((state) => state.prompt);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {error && <p className="text-red-600">{error}</p>}

      {!loading && response && (
        <div className="bg-white border border-gray-200 rounded p-4 shadow-sm prose max-w-none">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;
