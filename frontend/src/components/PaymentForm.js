import React, { useState } from "react";
import api from "../api";

function PaymentForm() {
  const [form, setForm] = useState({ member_name: "", amount: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/payments", form);
    window.location.reload();
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg mb-4"
>
  <input
    name="member_name"
    placeholder="Member Name"
    value={form.member_name}
    onChange={handleChange}
    className="w-56 px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 text-base"
    required
  />
  <input
    name="amount"
    type="number"
    placeholder="Amount"
    value={form.amount}
    onChange={handleChange}
    className="w-40 px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 text-base"
    required
  />
  <input
    name="description"
    placeholder="Description"
    value={form.description}
    onChange={handleChange}
    className="flex-1 px-4 py-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-400 text-base"
  />
  <button
    type="submit"
    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
  >
    Add
  </button>
</form>

  );
}

export default PaymentForm;