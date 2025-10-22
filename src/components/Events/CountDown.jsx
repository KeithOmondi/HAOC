import React from "react";

const CountDown = ({ data }) => {
  if (!data?.startDate || !data?.endDate) {
    return <p className="text-red-500">Invalid event dates</p>;
  }

  const formattedStartDate = new Date(data.startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndDate = new Date(data.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-[12px] text-gray-700 font-semibold">
      {formattedStartDate} — {formattedEndDate}
    </div>
  );
};

export default CountDown;
// 