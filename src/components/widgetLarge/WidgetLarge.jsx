import style from "./widgetLarge.module.scss";

const WidgetLarge = () => {
  return (
    <div className={style.WidgetLarge}>
      <h1>Latest Transactions</h1>
      <tbody>
        <table className={style.Table}>
          <tr className={style.Row}>
            <th className={style.Header}>Customer</th>
            <th className={style.Header}>Date</th>
            <th className={style.Header}>Amount</th>
            <th className={style.Header}>Status</th>
          </tr>
          <tr className={style.Row}>
            <td className={style.User}>
              <img
                src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
                alt=""
              />
              <span>Mat Walmer</span>
            </td>
            <td className={style.Date}>4 May 2022</td>
            <td className={style.Amount}>$452</td>
            <td className={style["Status"]}>
              <button>Approved</button>
            </td>
          </tr>
          <tr className={style.Row}>
            <td className={style.User}>
              <img
                src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
                alt=""
              />
              <span>Mat Walmer</span>
            </td>
            <td className={style.Date}>4 May 2022</td>
            <td className={style.Amount}>$452</td>
            <td className={style["Status--Declined"]}>
              <button>Declined</button>
            </td>
          </tr>
          <tr className={style.Row}>
            <td className={style.User}>
              <img
                src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
                alt=""
              />
              <span>Mat Walmer</span>
            </td>
            <td className={style.Date}>4 May 2022</td>
            <td className={style.Amount}>$452</td>
            <td className={style["Status--Pending"]}>
              <button>Pending</button>
            </td>
          </tr>
          <tr className={style.Row}>
            <td className={style.User}>
              <img
                src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
                alt=""
              />
              <span>Mat Walmer</span>
            </td>
            <td className={style.Date}>4 May 2022</td>
            <td className={style.Amount}>$452</td>
            <td className={style["Status"]}>
              <button>Approved</button>
            </td>
          </tr>
        </table>
      </tbody>
    </div>
  );
};

export default WidgetLarge;
