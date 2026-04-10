import { useState } from "react";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function CriteriaForm({ eventId }) {
  const [criteria, setCriteria] = useState([
    { title: "", weight: 0, description: "" },
  ]);

  const addRow = () => {
    setCriteria([...criteria, { title: "", weight: 0, description: "" }]);
  };

  const update = (i, field, value) => {
    const copy = [...criteria];
    copy[i][field] = value;
    setCriteria(copy);
  };

  const submit = async () => {
    try {
      await api.post("/criteria/create", {
        eventId,
        criteria,
      });

      toast.success("Criteria added");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add criteria");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Criteria</h2>

      {criteria.map((c, i) => (
        <div key={i} className="flex gap-3 mb-3">
          <input
            placeholder="Title"
            value={c.title}
            onChange={(e) => update(i, "title", e.target.value)}
            className="border p-2"
          />

          <input
            type="number"
            placeholder="Weight"
            value={c.weight}
            onChange={(e) => update(i, "weight", e.target.value)}
            className="border p-2"
          />

          <input
            placeholder="Description"
            value={c.description}
            onChange={(e) => update(i, "description", e.target.value)}
            className="border p-2"
          />
        </div>
      ))}

      <button onClick={addRow} className="bg-gray-200 px-4 py-2 mr-3">
        Add Row
      </button>

      <button onClick={submit} className="bg-purple-600 text-white px-4 py-2">
        Save Criteria
      </button>
    </div>
  );
}
