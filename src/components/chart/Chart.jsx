import { CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import style from "./chart.module.scss";

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <div className={style.Chart}>
      <h1 className={style.Title}>{title}</h1>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey={"name"} stroke="#5550bd" />
          <Line dataKey={dataKey} type={"monotone"} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e7e5e5" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
      {!data?.length > 0 && (
        <div className={style.Loading}>
          <CircularProgress color="inherit" />
        </div>
      )}
    </div>
  );
};

export default Chart;
