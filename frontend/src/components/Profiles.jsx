import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const normalizeName = (name) =>
    name.toLowerCase().replace(/[^a-z0-9]/gi, ""); // remove special chars, spaces, case insensitive

  const fetchProfiles = async () => {
    const res = await axios.get("http://127.0.0.1:8000/payments");
    const data = res.data;

    // Merge same member names (case insensitive + ignoring special chars)
    const merged = Object.values(
      data.reduce((acc, curr) => {
        const key = normalizeName(curr.member_name);
        if (!acc[key]) {
          acc[key] = {
            member_name: curr.member_name,
            total_amount: 0,
            descriptions: [],
          };
        }
        acc[key].total_amount += Number(curr.amount);
        acc[key].descriptions.push(curr.description);
        return acc;
      }, {})
    );

    setProfiles(merged);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">👥 Member Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profiles.map((profile, index) => (
          <div key={index} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold text-lg">{profile.member_name}</h2>
            <p className="text-gray-700 font-medium">
              Total Payment: ₹{profile.total_amount}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Descriptions:</strong>{" "}
              {profile.descriptions.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
