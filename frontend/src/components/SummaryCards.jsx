import React from "react";
import { FaWallet, FaCalendarWeek, FaCalendarDay } from "react-icons/fa";

const SummaryCards = ({ summary = {} }) => {
  const totalSpending = Number(summary.total_spending || 0);
  const last7DaysSpending = Number(summary.last_7_days_spending || 0);
  const todaySpending = Number(summary.today_spending || 0);

  const cards = [
    {
      title: "Total Spending",
      amount: totalSpending,
      icon: <FaWallet size={36} className="text-blue-600" />,
      color: "from-blue-100 to-blue-400",
    },
    {
      title: "Last 7 Days Spending",
      amount: last7DaysSpending,
      icon: <FaCalendarWeek size={36} className="text-green-600" />,
      color: "from-green-100 to-green-400",
    },
    {
      title: "Today's Spending",
      amount: todaySpending,
      icon: <FaCalendarDay size={36} className="text-purple-600" />,
      color: "from-purple-100 to-purple-400",
    },
  ];

  return (
    <div className="flex flex-row gap-10 mb-6">
      {cards.map((c) => (
        <div
          key={c.title}
          className={`flex items-center bg-gradient-to-r ${c.color} rounded-r-3xl shadow-md p-6 w-[350px]`}
        >
          <div className="mr-5">{c.icon}</div>
          <div className="flex flex-col flex-1">
            <span className="text-lg font-semibold text-gray-700">{c.title}</span>
            <span className="text-3xl font-bold text-gray-900 mt-1">
              ₹{c.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
