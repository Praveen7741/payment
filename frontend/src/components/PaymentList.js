import React, { useEffect, useState } from "react";
import api from "../api";

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/payments");
      setPayments(res.data);
      const sumRes = await api.get("/summary");
      setSummary(sumRes.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>All Payments</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Member</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.member_name}</td>
              <td>{p.amount}</td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Spent by Member</h3>
      <ul>
        {Object.entries(summary).map(([name, total]) => (
          <li key={name}>{name}: ₹{total}</li>
        ))}
      </ul>
    </div>
  );
}
export default PaymentList;