import React from "react";
import DocumentsTable from "../../components/DocumentsTable";
import { useGetAllDocumentsQuery } from "../../redux/api/documents";

const HRDocuments = () => {
  const { data: allDocuments, isLoading: isAllDocumentLoading } =
    useGetAllDocumentsQuery();

  return (
    <div className="container py-4">
      <div>
        <DocumentsTable
          data={allDocuments?.data}
          isLoading={isAllDocumentLoading}
        />
      </div>
    </div>
  );
};

export default HRDocuments;
