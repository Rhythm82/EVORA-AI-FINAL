import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaMicrophone, FaCopy } from "react-icons/fa";
import api from "../lib/api";
export default function MediaPage() {
  const { id } = useParams();

  const [idea, setIdea] = useState("");
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const resultRef = useRef(null);

  /* VOICE INPUT */

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice typing not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIdea((prev) => prev + " " + transcript);
    };

    recognition.onend = () => setListening(false);
  };

  /* GENERATE CONTENT */

  const generateContent = async () => {
    setLoading(true);

    try {
      const res = await api.post("/ai/generate", {
        eventId: id,
        prompt: idea,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-10">
      {/* TITLE */}

      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        AI Media Generator
      </h1>

      <p className="text-gray-600 mb-10 max-w-xl">
        Generate creative promotional ideas to make your event viral.
      </p>

      {/* IDEA CARDS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow border border-purple-200 hover:scale-[1.03] transition">
          <h3 className="font-semibold text-purple-700 mb-2">🚀 Launch Post</h3>
          <p className="text-sm text-gray-500">
            Announce your event with a powerful launch poster.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-purple-200 hover:scale-[1.03] transition">
          <h3 className="font-semibold text-purple-700 mb-2">
            🔥 Countdown Campaign
          </h3>
          <p className="text-sm text-gray-500">
            Build anticipation with countdown posts before registration ends.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-purple-200 hover:scale-[1.03] transition">
          <h3 className="font-semibold text-purple-700 mb-2">
            🏆 Prize Highlight
          </h3>
          <p className="text-sm text-gray-500">
            Showcase prizes and judges to increase participation.
          </p>
        </div>
      </div>

      {/* INPUT CARD */}

      <div className="bg-white p-8 rounded-2xl shadow border border-purple-200 relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Enter Your Idea
        </h2>

        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full h-40 border border-gray-200 rounded-lg p-4 pr-14 mb-6 focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={startVoiceInput}
          className={`absolute bottom-24 right-10 p-3 rounded-full shadow-lg ${
            listening ? "bg-red-500" : "bg-purple-600"
          } text-white`}
        >
          <FaMicrophone />
        </button>

        <button
          onClick={generateContent}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-[1.01]"
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>
      </div>

      {/* RESULT SECTION */}

      {result && (
        <div ref={resultRef} className="mt-20 mb-20 space-y-16">
          {/* GENERATED POSTS */}

          <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded"></span>
              Generated Social Posts
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {result.posts?.map((post, i) => (
                <div
                  key={i}
                  className="group relative backdrop-blur-xl bg-white/30 border border-purple-200/40 rounded-2xl p-6 shadow-xl hover:shadow-purple-400/40 hover:-translate-y-2 transition-all duration-300"
                >
                  {/* glow overlay */}

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition"></div>

                  <p className="text-gray-800 leading-relaxed relative">
                    {post}
                  </p>

                  <button
                    onClick={() => copyText(post)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition"
                  >
                    <FaCopy />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* CAMPAIGN STRATEGY */}

          <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded"></span>
              Campaign Strategy
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {result.campaign_series?.map((item, i) => (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/30 border border-purple-200/40 rounded-2xl p-6 shadow-xl hover:shadow-purple-300/40 hover:-translate-y-2 transition-all duration-300"
                >
                  <p className="text-gray-800 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* BEST POSTING TIME */}

          <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded"></span>
              Best Posting Time
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(result.best_posting_time || {}).map(
                ([platform, time]) => (
                  <div
                    key={platform}
                    className="backdrop-blur-xl bg-white/30 border border-purple-200/40 rounded-2xl p-6 shadow-xl hover:shadow-purple-300/40 hover:-translate-y-2 transition-all duration-300"
                  >
                    <h3 className="font-semibold text-purple-700 capitalize text-lg mb-2">
                      {platform}
                    </h3>

                    <p className="text-gray-700">{time}</p>
                  </div>
                ),
              )}
            </div>
          </section>

          {/* CONTENT SCHEDULE */}

          <section>
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded"></span>
              Content Schedule
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {result.content_queue?.map((item, i) => (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/30 border border-purple-200/40 rounded-2xl p-6 shadow-xl hover:shadow-purple-300/40 hover:-translate-y-2 transition-all duration-300"
                >
                  <p className="text-gray-800 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
