import { useState } from "react";

export default function ConfirmEmailPopup({
  email,
  close,
  onEdit,
  onSend
}) {

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleSend = async () => {

    setLoading(true);
    setDone(false);

    try {

      const total = 10; // simulate total emails
      let sent = 0;

      const interval = setInterval(() => {

        sent++;

        setProgress(Math.floor((sent / total) * 100));

        if (sent >= total) {
          clearInterval(interval);
          setLoading(false);
          setDone(true);
        }

      }, 300);

      await onSend();

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">

      <div className="relative bg-white w-[600px] rounded-2xl p-8 shadow-xl">

        <h2 className="text-xl font-bold mb-4">
          Email Preview
        </h2>

        <p className="text-sm text-gray-500 mb-2">
          Subject
        </p>

        <div className="border rounded-lg p-3 mb-4 bg-gray-50">
          {email.subject}
        </div>

        <p className="text-sm text-gray-500 mb-2">
          Message
        </p>

        <div className="border rounded-lg p-3 h-40 overflow-auto bg-gray-50 whitespace-pre-line">
          {email.body}
        </div>

        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={close}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={onEdit}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Edit
          </button>

          <button
            onClick={handleSend}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Send
          </button>

        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur flex flex-col items-center justify-center rounded-2xl">

            {/* Animated Dots */}
            <div className="dots mb-6">
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Progress Bar */}
            <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-sm mt-2 text-gray-700">
              Sending Emails... {progress}%
            </p>

          </div>
        )}

        {/* Success Message */}
        {done && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur flex flex-col items-center justify-center rounded-2xl">

            <div className="text-4xl mb-3">✅</div>

            <p className="text-lg font-semibold text-green-600">
              All Emails Sent Successfully!
            </p>

          </div>
        )}

      </div>

    </div>
  );
}