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
          style={{ margin: "0 55px", minWidth: "40px", minHeight: "40px" }}
        />
        <Skeleton
          animation="wave"
          style={{ flex: 1, marginRight: "50px", minHeight: "15px" }}
        />
      </div>
    ));

export default LoadingSkeleton;
