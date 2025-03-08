// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import useFetchHoldings from "../services/holdingService";

// const COLORS = ["#A59D84", "#C1BAA1", "#D7D3BF", "#ECEBDE", "#2C3930"];

// const HoldingsChart: React.FC = () => {
//   const holdings = useFetchHoldings();

//   return (
//     <div>
//       <h3>Holdings Distribution</h3>
//       {holdings.length > 0 ? (
//         <PieChart width={400} height={400}>
//           <Pie
//             data={holdings}
//             dataKey="quantity"
//             nameKey="symbol"
//             cx="50%"
//             cy="50%"
//             outerRadius={120}
//             fill="#8884d8"
//             label
//           >
//             {holdings.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// };

// export default HoldingsChart;

import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { fetchHoldings, Holding } from "../services/chartService";
import { useSelector } from "react-redux";

const COLORS = ["#A59D84", "#C1BAA1", "#D7D3BF", "#ECEBDE", "#2C3930"];

const HoldingsChart: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    if (userId) {
      fetchHoldings(userId).then(setHoldings);
    }
  }, [userId]);

  return (
    <div style={{ paddingRight: "40px" }}>
      <h3>Holdings Distribution</h3>
      {holdings.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={holdings}
              dataKey="quantity"
              nameKey="symbol"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {holdings.map((entry: Holding, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default HoldingsChart;
