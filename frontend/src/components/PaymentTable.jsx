import axios from "axios";
import { FaTrash } from "react-icons/fa";

export default function PaymentTable({ payments, fetchPayments, fetchSummary }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/payments/${id}`);
    fetchPayments();
    fetchSummary();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        📋 Payment Records
      </h2>
      {/* Custom Column Labels ABOVE the table */}
      <div className="flex justify-between items-center bg-blue-100 rounded-xl shadow mb-2 px-8 py-3 text-base font-bold text-gray-700">
        <span className="w-20 text-center">ID</span>
        <span className="w-40 text-center">Member Name</span>
        <span className="w-32 text-center">Amount</span>
        <span className="w-64 text-center">Description</span>
        <span className="w-32 text-center">Action</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          {/* No column headers now */}
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="bg-white transition hover:bg-blue-50">
                <td className="w-20 px-4 py-2 text-center">{p.id}</td>
                <td className="w-40 px-4 py-2 text-center">{p.member_name}</td>
                <td className="w-32 px-4 py-2 text-center">₹{p.amount}</td>
                <td className="w-64 px-4 py-2 text-center">{p.description}</td>
                <td className="w-32 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4 bg-white rounded">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
