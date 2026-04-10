import React, { useState, useEffect } from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const rotatingTexts = ["technology", "coding", "innovation", "automation"];

const testimonials = [
  {
    name: "Alice",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.dkIi_XHOFfFIcQbb3MizOwHaE8?pid=ImgDet&w=201&h=134&c=7&o=7&rm=3",
    text: "EVORA made organizing my conference so easy!",
  },
  {
    name: "Bob",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.vBxX3z9di1lB6kasWp9mBQHaE8?pid=ImgDet&w=201&h=134&c=7&o=7&rm=3",
    text: "Marketing automation saved me hours every week.",
  },
  {
    name: "Carol",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.3SxB3-CmU1LJJKLm015bHQHaE8?pid=ImgDet&w=203&h=135&c=7&o=7&rm=3",
    text: "The AI agents are simply magical.",
  },
  {
    name: "Dave",
    image:
      "https://thumbs.dreamstime.com/b/close-up-portrait-happy-young-satisfied-indian-woman-face-smiling-friendly-open-eyes-glad-expression-looking-away-dreaming-318574900.jpg",
    text: "I love the scheduler and reminders feature.",
  },
  {
    name: "Eve",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.QfYu30QRis-SoHY1flEGpwHaFW?pid=ImgDet&w=201&h=145&c=7&o=7&rm=3",
    text: "Seamless event hosting with AI support.",
  },
  {
    name: "Frank",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Jw2aaX7BK5oRFtVFZal9nwAAAA?w=442&h=360&rs=1&pid=ImgDetMain&o=7&rm=3",
    text: "Automated emails and social media posts are a game-changer.",
  },
  {
    name: "Grace",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.O5DIk276Gn_Qw0VZsV9KeQHaE7?w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3",
    text: "Time scheduling has never been this efficient.",
  },
  {
    name: "Henry",
    image:
      "https://as1.ftcdn.net/v2/jpg/06/64/95/92/1000_F_664959288_vRbIDJ3AKh1UM1DwxjMRlTUF2VOUp72u.jpg",
    text: "EVORA's platform is intuitive and powerful.",
  },
  {
    name: "Ivy",
    image:
      "https://media.istockphoto.com/id/1309256708/photo/portrait-of-young-male-student-standing-isolated-over-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=upNYeV-2HeyHnxlhcWt019VEJzS-EPdmf-RJyDNdHr8=",
    text: "From marketing to reminders, everything is automated.",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  /* LOGIN / SIGNUP MODAL STATE */

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* HERO SECTION */}

      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-indigo-400 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

        <div className="relative text-center text-white max-w-2xl px-6">
          
          
          <h1 className="evora-title text-9xl font-bold tracking-wide mb-6 relative">
            
            EVORA AI
            
          </h1>
          
          <div className="absolute top-40 left-1/3 w-40 h-40 bg-purple-400/30 blur-3xl rounded-full animate-pulse"></div>
          <div className="absolute top-60 right-1/3 w-32 h-32 bg-indigo-400/30 blur-3xl rounded-full animate-pulse"></div>

          <p key={currentIndex} className="text-2xl mb-6 animate-fade-in">
            Automating {rotatingTexts[currentIndex]}
          </p>

          <p className="text-lg opacity-90 mb-8">
            Host events, automate marketing, manage scheduling, and run your
            organization with AI-powered tools.
          </p>

          <button
            onClick={() => setSignupOpen(true)}
            className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Start Free
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="py-20 bg-white overflow-hidden relative">
        <h2 className="text-3xl font-bold text-center mb-16">Testimonials</h2>

        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-10"></div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10"></div>

        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 px-6 h-[500px] overflow-hidden">
          {[0, 1, 2, 3].map((col) => (
            <div
              key={col}
              className={`flex flex-col gap-6 ${
                col % 2 === 0 ? "animate-scrollUp" : "animate-scrollDown"
              }`}
            >
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-6 rounded-xl shadow-md text-center"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-15 h-14 rounded-full mx-auto mb-3"
                  />
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-gray-600 text-sm">{t.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}

      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">Smart Event Hosting</h3>
            <p className="text-gray-600">
              Create conferences, tech fests, or hackathons with powerful
              automation tools.
            </p>
          </div>
          

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">AI Marketing</h3>
            <p className="text-gray-600">
              Our AI automatically posts on social media and sends marketing
              emails.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              Scheduling Automation
            </h3>
            <p className="text-gray-600">
              Manage reminders, participant schedules and speaker timing
              automatically.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="py-8 bg-gray-800 text-white text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-blue-400">
            <FiFacebook size={24} />
          </a>
          <a href="#" className="hover:text-blue-400">
            <FiTwitter size={24} />
          </a>
          <a href="#" className="hover:text-blue-400">
            <FiInstagram size={24} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} EVORA. All rights reserved.</p>
      </footer>

      {/* POPUPS */}

      {loginOpen && <LoginModal close={() => setLoginOpen(false)} />}

      {signupOpen && <SignupModal close={() => setSignupOpen(false)} />}
    </div>
  );
};

export default Home;
