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
      onPageChange={handlePageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="<"
      pageClassName="pagination__item"
      pageLinkClassName="pagination__link"
      previousClassName="pagination__item"
      previousLinkClassName="pagination__link"
      nextLabel=">"
      nextClassName="pagination__item"
      nextLinkClassName="pagination__link"
      breakLabel="..."
      breakClassName="pagination__item"
      breakLinkClassName="pagination__link"
      containerClassName="pagination"
      activeClassName="pagination__item--active"
      renderOnZeroPageCount={null}
    />
  );
}
