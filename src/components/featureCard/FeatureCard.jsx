import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import style from "./featureCard.module.scss";

const FeatureCard = ({ amount, percentage, title, loading }) => {
  return (
    <div className={style.FeatureCard}>
      {loading ? (
        <>
          <Skeleton sx={{ fontSize: "20px" }} />
          <Skeleton sx={{ fontSize: "30px" }} style={{ margin: "10px 0" }} />
          <Skeleton />
        </>
      ) : (
        <>
          <span className={style.Title}>{title}</span>
          <div className={style.MoneyContainer}>
            <span className={style.Money}>${amount}</span>
            <span className={style.MoneyRate}>
              % {percentage}
              {percentage > 0 ? (
                <ArrowUpward className={style.Icon} />
              ) : percentage < 0 ? (
                <ArrowDownward className={style["Icon--Negetive"]} />
              ) : null}
            </span>
          </div>
          <span className={style.Subtitle}>Compared to last month</span>
        </>
      )}
    </div>
  );
};

export default FeatureCard;
