import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function EvaluationEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/events/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEvents(res.data);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white pt-10 px-12">
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Select Event for Evaluation
        </h1>

        <p className="text-gray-600">
          Choose which event you want to manage judging for.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((e) => (
          <div
            key={e._id}
            onClick={() => navigate(`/evaluation/${e._id}`)}
            className="relative p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-purple-200 shadow-xl hover:shadow-purple-300 hover:scale-105 transition duration-300 cursor-pointer"
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              {e.eventName}
            </h3>

            <p className="text-gray-500 text-sm mb-1">{e.eventType}</p>

            <p className="text-gray-600 text-sm">{e.organisation}</p>

            <p className="text-xs text-gray-400 mt-4">
              Click to open evaluation →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
