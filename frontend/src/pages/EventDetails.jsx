import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import EditEventModal from "../components/dashboard/EditEventModal.jsx";
import MediaManager from "../components/dashboard/MediaManager.jsx";
import toast from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";

import ConfirmEmailPopup from "../components/email/ConfirmEmailPopup";
import EditEmailPopup from "../components/email/EditEmailPopup";
import ScheduleForm from "../components/scheduler/ScheduleForm.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [editEmailOpen, setEditEmailOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("media");

  const [emailPrompt, setEmailPrompt] = useState("");

  const [logo, setLogo] = useState(null);

  const [previewEmail, setPreviewEmail] = useState({
    subject: "",
    body: "",
  });

  useEffect(() => {
    load();
  }, []);

  /* LOAD EVENT */

  const load = async () => {
    const res = await api.get("/events/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const found = res.data.find((e) => e._id === id);

    setEvent(found);
  };

  /* DELETE EVENT */

  const deleteEvent = async () => {
    if (!window.confirm("Delete this event?")) return;

    await api.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    navigate("/listings");
  };

  /* LOGO UPLOAD */

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("logo", file);

    try {
      await api.post(`/events/${id}/logo`, formData);

      setLogo(URL.createObjectURL(file));

      toast.success("Logo uploaded successfully");
    } catch (err) {
      toast.error("Logo upload failed");
    }
  };

  /* PARTICIPANT UPLOAD */

  const handleParticipantUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      await api.post(`/participants/${id}/participants-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Participants uploaded successfully");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  /* GENERATE EMAIL PREVIEW */

  const sendEmails = async () => {
    if (!emailPrompt.trim()) {
      toast.error("Write an instruction first");

      return;
    }

    try {
      const res = await api.post(`/email/preview/${id}`, {
        instruction: emailPrompt,
      });

      const sample = res.data.emails[0];

      setPreviewEmail({
        subject: sample.subject,
        body: sample.body,
      });

      setPreviewOpen(true);
    } catch (err) {
      toast.error("Failed to generate email preview");
    }
  };

  /* CONFIRM SEND */

  const confirmSendEmails = async (editedEmail) => {
    try {
      await api.post(`/email/send/${id}`, {
        instruction: emailPrompt,
        override: editedEmail,
      });

      toast.success("Emails sent successfully");

      setPreviewOpen(false);
      setEditEmailOpen(false);
    } catch (err) {
      toast.error("Email sending failed");
    }
  };

  if (!event) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-10">
      <div className="bg-white/70 backdrop-blur-xl border border-purple-100 shadow-xl rounded-2xl p-10">
        {/* HEADER */}

        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {event.eventName}
            </h1>

            <p className="text-purple-600 mt-2">{event.eventType}</p>
          </div>

          {/* RIGHT CONTROLS */}

          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-3">
              <button
                onClick={() => setEditOpen(true)}
                className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg shadow"
              >
                Edit
              </button>

              <button
                onClick={deleteEvent}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
              >
                Delete
              </button>
            </div>

            {/* LOGO */}

            <div className="flex flex-col items-center gap-2">
              <img
                src={
                  logo ||
                  event.logo ||
                  "https://tse4.mm.bing.net/th/id/OIP.0phMzYwB-vfV-DiOEYrW2wHaId?rs=1&pid=ImgDetMain&o=7&rm=3"
                }
                className="w-24 h-24 object-cover rounded-xl border shadow"
              />

              <label className="cursor-pointer text-sm bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition">
                Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* EVENT INFO */}

        <div className="grid md:grid-cols-2 gap-6 mb-10 text-gray-700">
          <p>
            <b>Organisation:</b> {event.organisation}
          </p>

          <p>
            <b>Host:</b> {event.hostName}
          </p>

          <p>
            <b>Email:</b> {event.hostEmail}
          </p>

          <p>
            <b>Phone:</b> {event.hostPhone}
          </p>
        </div>

        <p className="text-gray-600 mb-10">{event.description}</p>

        {/* PARTICIPANT UPLOAD */}

        <div className="mb-10 bg-white/70 backdrop-blur-lg p-8 rounded-2xl border border-purple-100 shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Upload Participants</h2>

          <p className="text-gray-500 mb-4">
            Upload participant list in Excel (.xlsx) or PDF format.
          </p>

          <label className="cursor-pointer inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition">
            Upload File
            <input
              type="file"
              accept=".xlsx,.xls,.pdf"
              className="hidden"
              onChange={handleParticipantUpload}
            />
          </label>
        </div>

        {/* TABS */}

        <div>
          <div className="flex gap-6 border-b mb-6">
            <button
              onClick={() => setActiveTab("media")}
              className={`pb-3 font-medium ${activeTab === "media" ? "border-b-2 border-purple-700 text-purple-700" : "text-gray-500"}`}
            >
              Manage Media
            </button>

            <button
              onClick={() => setActiveTab("emails")}
              className={`pb-3 font-medium ${activeTab === "emails" ? "border-b-2 border-purple-700 text-purple-700" : "text-gray-500"}`}
            >
              Manage Emails
            </button>

            <button
              onClick={() => setActiveTab("schedule")}
              className={`pb-3 font-medium ${activeTab === "schedule" ? "border-b-2 border-purple-700 text-purple-700" : "text-gray-500"}`}
            >
              Manage Schedule
            </button>
          </div>

          {/* TAB CONTENT */}

          {activeTab === "media" && <MediaManager />}

          {activeTab === "emails" && (
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-purple-200 shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Email Generator</h2>

              <div className="text-gray-500 mb-6 text-sm">
                <TypeAnimation
                  sequence={[
                    "Generate professional emails for participants.",
                    2000,
                    "Notify participants about speakers, schedules and deadlines.",
                    2000,
                    "Your AI communication agent sends emails automatically.",
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  className="text-purple-600 font-medium"
                />
              </div>

              <div className="flex gap-4">
                <input
                  value={emailPrompt}
                  onChange={(e) => setEmailPrompt(e.target.value)}
                  placeholder="Example: Inform participants that Raghav Garg will speak today at 7PM..."
                  className="flex-1 px-5 py-4 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none"
                />

                <button
                  onClick={sendEmails}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-7 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  Generate & Send
                </button>
              </div>
            </div>
          )}
          {activeTab === "schedule" && <ScheduleForm eventId={id} />}
        </div>
      </div>

      {/* POPUPS */}

      {previewOpen && (
        <ConfirmEmailPopup
          email={previewEmail}
          close={() => setPreviewOpen(false)}
          onEdit={() => {
            setPreviewOpen(false);
            setEditEmailOpen(true);
          }}
          onSend={() => confirmSendEmails(previewEmail)}
        />
      )}

      {editEmailOpen && (
        <EditEmailPopup
          email={previewEmail}
          close={() => setEditEmailOpen(false)}
          onBack={() => {
            setEditEmailOpen(false);
            setPreviewOpen(true);
          }}
          onConfirm={(data) => confirmSendEmails(data)}
        />
      )}

      {editOpen && (
        <EditEventModal
          event={event}
          close={() => setEditOpen(false)}
          reload={load}
        />
      )}
    </div>
  );
}
