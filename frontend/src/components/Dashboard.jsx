import { useState, useEffect } from "react";
import axios from "axios";
import PaymentForm from "./PaymentForm";
import PaymentTable from "./PaymentTable";
import SummaryCards from "./SummaryCards";

export default function Dashboard() {
  const [payments, setPayments] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [summary, setSummary] = useState({
    total_spending: 0,
    last_7_days_spending: 0,
    today_spending: 0,
  });

  // Fetch payments from backend
  const fetchPayments = async () => {
    const res = await axios.get("http://127.0.0.1:8000/payments");
    setPayments(res.data);
  };

  // Fetch summary from backend
  const fetchSummary = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/summary");
      const data = res.data;
      const summaryData =
        data.total_spending && typeof data.total_spending === "object"
          ? data.total_spending
          : data;
      setSummary({
        total_spending: summaryData.total_spending || 0,
        last_7_days_spending: summaryData.last_7_days_spending || 0,
        today_spending: summaryData.today_spending || 0,
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchSummary();
  }, []);

  const filtered = searchId
    ? payments.filter((p) => p.id === Number(searchId))
    : payments;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="bg-blue-600 text-white px-8 py-5 flex justify-between items-center shadow">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          💼 Payments Dashboard
        </h1>
        <input
          type="number"
          placeholder="Search by ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="p-3 rounded-full text-black text-lg shadow outline-none border-0 min-w-[220px]"
        />
      </header>

      {/* SUMMARY BLOCKS */}
      <div className="px-8 py-6 bg-transparent flex flex-row gap-8">
        <SummaryCards summary={summary} />
      </div>

      {/* MAIN CONTENT (FORM + TABLE) */}
      <div className="px-8 pb-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <PaymentForm fetchPayments={fetchPayments} fetchSummary={fetchSummary} />
          <PaymentTable
            payments={filtered}
            fetchPayments={fetchPayments}
            fetchSummary={fetchSummary}
          />
        </div>
      </div>
    </div>
  );
}
