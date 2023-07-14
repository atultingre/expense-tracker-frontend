import CountUp from "react-countup";

const SummeryTable = ({
  todaySpent,
  weekSpent,
  monthSpent,
  yearSpent,
  totalSpent,
  // numberWithCommas,
backgroundColor, color
}) => {
  return (
    <table className="w-full border border-gray-300 table1">
      <thead className="border-gray-300">
        <tr>
          <th
            colSpan={2}
            className="border-b-2 border-gray-300 py-2 text-center">
            Expenses Summery
          </th>
        </tr>
        <tr>
          <th className="border-b-2 border-gray-300 py-2 text-center">
            Duration
          </th>
          <th className="border-b-2 border-gray-300 py-2 text-center">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-center">
          <th className="border-b-2 border-gray-300 py-2 ">Today</th>
          <td className="border-b-2 border-gray-300 py-2 ">
            <CountUp end={todaySpent} prefix="₹ " />
          </td>
        </tr>
        <tr className="text-center">
          <th className="border-b-2 border-gray-300 py-2 ">Weekely</th>
          <td className="border-b-2 border-gray-300 py-2 ">
            <CountUp end={weekSpent} prefix="₹ " />
          </td>
        </tr>
        <tr className="text-center">
          <th className="border-b-2 border-gray-300 py-2 ">Monthly</th>
          <td className="border-b-2 border-gray-300 py-2 ">
            <CountUp end={monthSpent} prefix="₹ " />
          </td>
        </tr>
        <tr className="text-center">
          <th className="border-b-2 border-gray-300 py-2 ">Yearly </th>
          <td className="border-b-2 border-gray-300 py-2 ">
            <CountUp end={yearSpent} prefix="₹ " />
          </td>
        </tr>
        <tr className="text-center">
          <th className="border-b-2 border-gray-300 px-3 py-2 ">Total</th>
          <td className="border-b-2 border-gray-300 px-3 py-2 ">
            <CountUp end={totalSpent} prefix="₹ " />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SummeryTable;
