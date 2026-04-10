import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Listings() {

  const [events, setEvents] = useState([]);
  const [search,setSearch] = useState("");

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

      console.error("failed to load events", err);

    }

  };

  /* SEARCH FILTER */

  const filtered = events.filter((e) =>
    e.eventName.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white pt-10 pl- px-12">

      {/* HEADER */}

      <div className="max-w-6xl mx-auto mb-10">

        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Your Events
        </h1>

        <p className="text-gray-600 mb-6">
          Manage and explore your created hackathon, Tech events.
        </p>

        {/* SEARCH */}

        <input
          placeholder="Search hackathon by name..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full md:w-96 px-5 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none shadow"
        />

      </div>

      {/* EVENT CARDS */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filtered.map((e) => (

          <div
            key={e._id}
            onClick={() => navigate(`/listings/${e._id}`)}
            className="relative p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-purple-200 shadow-xl hover:shadow-purple-300 hover:scale-105 transition duration-300 cursor-pointer"
          >

            {/* glow effect */}

            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-10 blur-xl rounded-3xl"></div>

            {/* content */}

            <h3 className="text-2xl font-bold text-purple-700 mb-2">
              {e.eventName}
            </h3>

            <p className="text-gray-500 text-sm mb-1">
              {e.eventType}
            </p>

            <p className="text-gray-600 text-sm">
              {e.organisation}
            </p>

            <p className="text-xs text-gray-400 mt-4">
              Click to manage this event →
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}