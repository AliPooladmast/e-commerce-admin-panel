import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import style from "./home.module.scss";
import WidgetLarge from "../../components/widgetLarge/WidgetLarge";
import WidgetSmall from "../../components/widgetSmall/WidgetSmall";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/apiCalls";
import AddMarginToPage from "../../hoc/AddMarginToPage";
import { setMessage } from "../../redux/uxSlice";

const Home = () => {
  const [stats, setStats] = useState([]);
  const [statsLoading, setStatesLoading] = useState(false);
  const dispatch = useDispatch();
  const { users, isFetching } = useSelector((state) => state.user);

  const MONTH = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getStats = async () => {
      try {
        setStatesLoading(true);
        const res = await userRequest.get("/users/stats");
        if (res) {
          const data = res.data?.sort((a, b) => a._id - b._id);
          setStats([]);
          data.forEach((item) => {
            setStats((prev) => [
              ...prev,
              { name: MONTH[item._id - 1], "active user": item.total },
            ]);
          });
          setStatesLoading(false);
        }
      } catch (err) {
        dispatch(
          setMessage({ type: "error", text: err?.response?.data?.toString() })
        );
      }
    };
    getStats();
  }, [MONTH]); //eslint-disable-line

  return (
    <>
      <FeaturedInfo />
      <Chart
        title="User Analytics"
        data={stats}
        dataKey="active user"
        grid
        loading={statsLoading}
        className={style.Chart}
      />
      <div className={style.Widgets}>
        <WidgetSmall users={users} isFetching={isFetching} />
        <WidgetLarge users={users} />
      </div>
    </>
  );
};

export default AddMarginToPage(Home);
