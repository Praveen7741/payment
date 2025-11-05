import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Operations() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ member_name: "", amount: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await axios.get("http://127.0.0.1:8000/payments");
    setPayments(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://127.0.0.1:8000/payments/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://127.0.0.1:8000/payments", form);
    }
    setForm({ member_name: "", amount: "", description: "" });
    fetchPayments();
  };

  const handleEdit = (p) => {
    setForm({ member_name: p.member_name, amount: p.amount, description: p.description });
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/payments/${id}`);
    fetchPayments();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">⚙️ Payment Operations</h1>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
        <input type="text" placeholder="Member Name" className="border p-2 rounded" value={form.member_name}
          onChange={(e) => setForm({ ...form, member_name: e.target.value })} />
        <input type="number" placeholder="Amount" className="border p-2 rounded" value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <input type="text" placeholder="Description" className="border p-2 rounded" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search by ID"
        className="border mb-4 p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-blue-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Member Name</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments
            .filter((p) => !search || p.id == search)
            .map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.member_name}</td>
                <td className="p-2">₹{p.amount}</td>
                <td className="p-2">{p.description}</td>
                <td className="p-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleEdit(p)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
