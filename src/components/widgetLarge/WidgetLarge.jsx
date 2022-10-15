import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import style from "./widgetLarge.module.scss";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const WidgetLarge = () => {
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <div className={style.WidgetLarge}>
      <h1>Latest Transactions</h1>
      <table className={style.Table}>
        <tbody>
          <tr className={style.Row}>
            <th className={style.Header}>Customer</th>
            <th className={style.Header}>Date</th>
            <th className={style.Header}>Amount</th>
            <th className={style.Header}>Status</th>
          </tr>
          {orders.map((order) => (
            <tr className={style.Row} key={order._id}>
              <td className={style.User}>
                <span>{order.userId}</span>
              </td>
              <td className={style.Date}>
                {timeAgo.format(new Date(order.createdAt))}
              </td>
              <td className={style.Amount}>${order.amount}</td>
              <td className={style[`Status--${order.status}`]}>
                <button>{order.status}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLarge;
