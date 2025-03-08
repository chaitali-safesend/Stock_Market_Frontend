import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string; // "Company (Date)"
  quantity: number;
}

interface Props {
  history: {
    companyName: string;
    transactionDate: string;
    stockQuantity: number;
  }[];
}

const UserHistoryChart: React.FC<Props> = ({ history }) => {
  const [userHistory, setUserHistory] = useState<ChartData[]>([]);

  useEffect(() => {
    if (history.length > 0) {
      const formattedData = history
        .filter((entry) => entry.companyName && entry.transactionDate)
        .map((entry) => ({
          name: `${entry.companyName} (${
            entry.transactionDate?.split("T")[0] || "Unknown"
          })`,
          quantity: entry.stockQuantity,
        }));

      setUserHistory(formattedData);
      console.log("Formatted Chart Data:", formattedData);
    }
  }, [history]);

  return (
    <div>
      <h3>User Transaction History</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={userHistory}>
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#2C3930" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserHistoryChart;
