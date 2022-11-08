import { Skeleton } from "@mui/material";

const LoadingSkeleton = () =>
  Array(8)
    .fill(null)
    .map((element, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px 0",
        }}
      >
        <Skeleton
          variant="circular"
          height={40}
          width={40}
          style={{ margin: "0 55px" }}
        />
        <Skeleton width={820} height={15} animation="wave" />
      </div>
    ));

export default LoadingSkeleton;
