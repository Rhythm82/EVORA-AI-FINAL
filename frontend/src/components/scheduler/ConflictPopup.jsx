export default function ConflictPopup({ event, close }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white/70 backdrop-blur-xl border border-red-200 shadow-xl rounded-2xl p-8 w-[420px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
            ⚠ Schedule Conflict
          </h2>

          <button onClick={close} className="text-gray-400 hover:text-gray-700">
            ✕
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Another event already exists in this time slot.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="font-semibold text-red-700">{event.eventName}</p>

          <p className="text-sm text-red-500">
            {event.startTime} - {event.endTime}
          </p>
        </div>

        <button
          onClick={close}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl hover:scale-105 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
