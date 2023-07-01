/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getLicense } from "../../../redux/features/license/licenseSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./LicenseDetail.scss";
import DOMPurify from "dompurify";

const LicenseDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { license, isLoading, isError, message } = useSelector(
    (state) => state.license
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getLicense(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="license-detail">
      <h3 className="--mt">License Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {license && (
          <div className="detail">
            <Card cardClass="group">
              {license?.image ? (
                <img
                  src={license.image.filePath}
                  alt={license.image.fileName}
                />
              ) : (
                <p>No image set for this license</p>
              )}
            </Card>
            <h4>License Availability: {stockStatus(license.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {license.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {license.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {license.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {license.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {license.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {license.price * license.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(license.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {license.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {license.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LicenseDetail;
