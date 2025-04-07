import React, { useState } from "react";
import DocumentsTable from "../../components/DocumentsTable";
import { useGetAllDocumentsQuery } from "../../redux/api/documents";
import { PER_PAGE_DOCUMENTS } from "../../utils/constant";
import ReactPaginate from "react-paginate";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";

const HRDocuments = () => {
  const [query, setQuery] = useState({
    search_query: "",
    per_page: PER_PAGE_DOCUMENTS,
    page: 1,
  });

  const { data: allDocuments, isLoading: isAllDocumentLoading } =
    useGetAllDocumentsQuery(query);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setQuery((prev) => ({
      ...prev,
      page: selected + 1,
    }));
    // dispatch(setIsLoading(true));
    // getAllCategoryWithPagination(selected + 1);
  };

  return (
    <div className="container py-4">
      {/* <h1>Documents</h1> */}
      <div>
        <DocumentsTable
          data={allDocuments?.data?.data}
          isLoading={isAllDocumentLoading}
        />

        {allDocuments?.pagination?.last_page > 1 && (
          <div className="bg-gray">
            <ReactPaginate
              className="react-paginate"
              // breakLabel="..."
              nextLabel={<MdOutlineSkipNext />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={allDocuments?.pagination?.last_page}
              // pageCount={allCategory?.pagination?.last_page}
              previousLabel={<MdOutlineSkipPrevious />}
              renderOnZeroPageCount={null}
              disabledClassName="disabled"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDocuments;
