import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import style from "./chart.module.scss";

const Chart = () => {
  const data = [
    {
      name: "Jan",
      "active user": 4000,
    },
    {
      name: "Feb",
      "active user": 3000,
    },
    {
      name: "Mar",
      "active user": 2000,
    },
    {
      name: "Apr",
      "active user": 4000,
    },
    {
      name: "May",
      "active user": 3000,
    },
    {
      name: "Jun",
      "active user": 1000,
    },
    {
      name: "Jul",
      "active user": 3000,
    },
    {
      name: "Aug",
      "active user": 2000,
    },
    {
      name: "Sep",
      "active user": 4000,
    },
    {
      name: "Oct",
      "active user": 3000,
    },
    {
      name: "Nov",
      "active user": 4000,
    },
    {
      name: "Dec",
      "active user": 2000,
    },
  ];

  return (
    <div className={style.Chart}>
      <h1 className={style.Title}>Active Users</h1>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey={"name"} stroke="#5550bd" />
          <Line dataKey={"active user"} type={"monotone"} stroke="#5550bd" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
