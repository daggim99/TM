import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LicenseList from "../../components/license/licenseList/LicenseList";
import LicenseSummary from "../../components/license/licenseSummary/LicenseSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getLicenses } from "../../redux/features/license/licenseSlice";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { licenses, isLoading, isError, message } = useSelector(
    (state) => state.license
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getLicenses());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div style={{ backgroundColor: "#0B1E21", color: "white" }}>
      <LicenseSummary licenses={licenses} />
      <LicenseList licenses={licenses} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
