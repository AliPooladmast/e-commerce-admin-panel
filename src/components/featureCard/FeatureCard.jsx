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
          <div className={style.MoneyContainer}>
            <Skeleton sx={{ fontSize: "30px" }} width="100%" />
          </div>
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
              ) : (
                <ArrowDownward className={style["Icon--Negetive"]} />
              )}
            </span>
          </div>
          <span className={style.SubTitle}>Compared to last month</span>
        </>
      )}
    </div>
  );
};

export default FeatureCard;
