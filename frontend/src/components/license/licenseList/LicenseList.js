import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./licenseList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_LICENSES,
  selectFilteredLicenses,
} from "../../../redux/features/license/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteLicense,
  getLicenses,
} from "../../../redux/features/license/licenseSlice";
import { Link } from "react-router-dom";

const LicenseList = ({ licenses, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredLicenses = useSelector(selectFilteredLicenses);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delLicense = async (id) => {
    console.log(id);
    await dispatch(deleteLicense(id));
    await dispatch(getLicenses());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete License",
      message: "Are you sure you want to delete this license.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delLicense(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredLicenses.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredLicenses.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredLicenses]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredLicenses.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_LICENSES({ licenses, search }));
  }, [licenses, search, dispatch]);

  return (
    <div className="license-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Dashboard Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && licenses.length === 0 ? (
            <p>-- No license found, please add a license...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((license, index) => {
                  const { _id, name, category, price, quantity } = license;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/license-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-license/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default LicenseList;
