import { useState, useEffect } from "react";
import CreateEventModal from "../components/dashboard/CreateEventModal.jsx";
import EditProfileModal from "../components/dashboard/EditProfileModal.jsx";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [username, setUsername] = useState("Organizer");

  /* TEXTS */

  const texts = [
    "Manage your hackathons and tech events effortlessly.",
    "Our AI agents automate communication with participants.",
    "Generate campaigns, emails and schedules instantly.",
    "Focus on innovation while EVORA handles logistics.",
  ];

  const [textIndex, setTextIndex] = useState(0);

  /* EVENT IMAGES */

  const eventImages = [
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    "https://images.unsplash.com/photo-1551818255-e6e10975bc17",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
  ];

  /* FETCH USER */

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("https://evora-backend-dwxd.onrender.com/api/user/profile", {
          credentials: "include",
        });

        const data = await res.json();

        if (data?.username) {
          setUsername(data.username);
          localStorage.setItem("username", data.username);
        }
      } catch (err) {
        const stored = localStorage.getItem("username");
        if (stored) {
          setUsername(stored);
        }
      }
    }

    fetchUser();
  }, []);

  /* TEXT ROTATION */

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* SIDEBAR */}

      <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-purple-700 to-indigo-700 text-white shadow-xl flex flex-col">
        <div className="p-6 border-b border-purple-400/30">
          <h2 className="text-3xl mt-16 font-bold">EVORA</h2>

          <p className="text-xs text-purple-200 mt-1">
            AI Event Automation Platform
          </p>
        </div>

        <div className="flex flex-col gap-3 p-5">
          <a
            href="/dashboard"
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
          >
            Dashboard
          </a>

          <Link
            to="/listings"
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
          >
            My Listings
          </Link>

          <Link
            to="/evaluation"
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
          >
            Evaluation
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="ml-64 flex-1 px-16 py-12">
        {/* HEADER */}

        <h1 className="text-4xl font-bold mb-2">
          Hi
          <span className="text-purple-600 ml-3">{username}</span>
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          <span className="text-purple-600 font-semibold">EVORA AI</span>{" "}
          {texts[textIndex]}
        </p>

        {/* PROFILE */}

        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-lg">
            {username[0]}
          </div>

          <button
            onClick={() => setEditOpen(true)}
            className="text-purple-700 font-semibold hover:underline"
          >
            Edit Profile
          </button>
        </div>

        {/* CREATE EVENT */}

        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition text-white px-10 py-4 rounded-xl text-lg shadow-lg mb-12"
        >
          Create Event
        </button>

        {/* HERO INFO CARD */}

        <div className="w-full p-10 rounded-3xl bg-white/50 backdrop-blur-xl border border-purple-200 shadow-xl mb-12">
          <h3 className="text-3xl font-bold text-purple-700 mb-4">
            EVORA AI Agents
          </h3>

          <p className="text-gray-600 text-lg max-w-4xl">
            EVORA uses intelligent AI agents to automate hackathon and event
            management. From marketing campaigns to automated communication,
            everything is powered by AI so organizers can focus on building
            innovative experiences for participants.
          </p>
        </div>

        {/* EVENT IMAGE STRIP */}

        <div className="flex gap-6 overflow-x-auto pb-6 mb-14">
          {eventImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-64 h-40 object-cover rounded-2xl shadow-lg hover:scale-105 transition"
            />
          ))}
        </div>

        {/* STATS CARDS */}

        <div className="grid md:grid-cols-4 gap-8 mb-14">
          <div className="p-6 bg-white/60 rounded-2xl shadow border border-purple-200">
            <h4 className="text-purple-700 font-semibold text-lg">
              Events Created
            </h4>

            <p className="text-3xl font-bold mt-3">10</p>
          </div>

          <div className="p-6 bg-white/60 rounded-2xl shadow border border-purple-200">
            <h4 className="text-purple-700 font-semibold text-lg">
              Participants
            </h4>

            <p className="text-3xl font-bold mt-3">30</p>
          </div>

          <div className="p-6 bg-white/60 rounded-2xl shadow border border-purple-200">
            <h4 className="text-purple-700 font-semibold text-lg">
              Emails Sent
            </h4>

            <p className="text-3xl font-bold mt-3">60</p>
          </div>

          <div className="p-6 bg-white/60 rounded-2xl shadow border border-purple-200">
            <h4 className="text-purple-700 font-semibold text-lg">
              AI Campaigns
            </h4>

            <p className="text-3xl font-bold mt-3">3</p>
          </div>
        </div>

        {/* AGENT CARDS */}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-3xl bg-white/40 backdrop-blur-xl border border-purple-200 shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-purple-700 mb-3">
              Media Agent
            </h3>

            <p className="text-gray-600 text-lg">
              Automatically creates social media campaigns, captions and
              promotional content to help your event reach more developers.
            </p>
          </div>

          <div className="p-10 rounded-3xl bg-white/40 backdrop-blur-xl border border-purple-200 shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-purple-700 mb-3">
              Communication Agent
            </h3>

            <p className="text-gray-600 text-lg">
              Sends personalized email announcements, speaker updates and
              reminders to all participants automatically.
            </p>
          </div>

          <div className="md:col-span-2 p-10 rounded-3xl bg-white/40 backdrop-blur-xl border border-purple-200 shadow-lg hover:scale-105 transition">
            <h3 className="text-2xl font-bold text-purple-700 mb-3">
              Scheduler Agent
            </h3>

            <p className="text-gray-600 text-lg">
              Manages event timelines, speaker sessions and schedule updates
              automatically, keeping participants informed throughout the event.
            </p>
          </div>
        </div>

        {open && <CreateEventModal close={() => setOpen(false)} />}
        {editOpen && (
          <EditProfileModal
            username={username}
            close={() => setEditOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
