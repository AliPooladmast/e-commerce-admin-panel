import { useEffect, useRef } from "react";

const useUpdate = (event, dependencies) => {
  const didUpdate = useRef(false);

  useEffect(() => {
    if (didUpdate.current) event();
    else didUpdate.current = true;
  }, dependencies); //eslint-disable-line
};

export default useUpdate;
