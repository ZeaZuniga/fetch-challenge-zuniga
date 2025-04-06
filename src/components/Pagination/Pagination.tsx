import React, { useEffect, useState } from "react";
import "./Pagination.scss";
import ReactPaginate from "react-paginate";

export default function Pagination(props: {
  totalItems: number;
  currentSearch: string;
  axiosGetRequest: (newParams: string) => void;
}) {
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    setPageCount(Math.ceil(props.totalItems / 25));
  }, [props.totalItems]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    let url = new URL(props.currentSearch);
    let newFrom = `${selectedItem.selected * 25}`;
    url.searchParams.set("from", newFrom);
    props.axiosGetRequest(`/dogs/search${url.search}`.replaceAll(" ", "%20"));
  };

  return (
    <ReactPaginate
      nextLabel="Next >"
      onPageChange={handlePageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="< Previous"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="activePage"
      renderOnZeroPageCount={null}
    />
  );
}
