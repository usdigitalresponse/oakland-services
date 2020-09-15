import { useLocation } from "react-router-dom";
import qs from "query-string";

export const useQueryParams = () => {
  const location = useLocation();
  return qs.parse(location.search);
};

export const queryString = qs;
