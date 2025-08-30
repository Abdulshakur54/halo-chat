import { useState } from "react";

export default function Agreement({setAccepted}) {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    if (agreed) {
      // Save consent (localStorage / API call if needed)
      setAccepted(true)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Welcome to Hallo-Chat
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Before using Hallo-Chat, please review and agree to our Terms of Use & Privacy Policy.
        </p>

        <div className="overflow-y-auto max-h-72 border p-4 mb-6 text-sm text-gray-700 leading-relaxed rounded-md bg-gray-50">
          <h2 className="font-semibold">📜 Terms of Use</h2>
          <p>
            By accessing or using Hallo-Chat, you agree to use the service responsibly.
            Do not share harmful, abusive, or unlawful content. Hallo-Chat reserves the
            right to suspend or terminate accounts that violate these terms.
          </p>

          <h2 className="font-semibold mt-4">🔒 Privacy Policy</h2>
          <p>
            Hallo-Chat respects your privacy. We may collect and store your messages
            to improve service quality and ensure safety. Your personal information
            will never be sold or shared with third parties without your consent.
          </p>
        </div>

        <label className="flex items-start gap-2 mb-6">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-600">
            I have read and agree to the Hallo-Chat Terms of Use & Privacy Policy.
          </span>
        </label>

        <button
          onClick={handleAgree}
          disabled={!agreed}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition cursor-pointer ${
            agreed
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue to Hallo-Chat
        </button>
      </div>
    </div>
  );
}
