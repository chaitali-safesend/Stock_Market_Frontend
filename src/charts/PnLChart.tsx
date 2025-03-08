import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchPnL, PnL } from "../services/chartService";

const PnLChart: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [pnlData, setPnLData] = useState<PnL[]>([]);

  useEffect(() => {
    if (userId) {
      fetchPnL(userId).then(setPnLData);
    }
  }, [userId]);

  return (
    <div>
      <h3>Profit & Loss Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={pnlData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="netPnL"
            stroke="#A59D84"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PnLChart;
