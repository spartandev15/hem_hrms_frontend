import React, { useMemo, useState } from "react";
import {
  useDeleteTrainingMutation,
  useGetAllTrainingQuery,
} from "../../redux/api/training";

import ConfirmDialog from "../../components/ConfirmDialog";
import { useAppDispatch } from "../../hooks/reduxHook";
import { setToast } from "../../redux/slices/toastSlice";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const ListTrainingInternship = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const [isOpenDialog, setIsOpenDialog] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  // =========================
  // GET LIST
  // =========================

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllTrainingQuery();

  // =========================
  // DELETE API
  // =========================

  const [deleteTraining, { isLoading: deleteLoading }] =
    useDeleteTrainingMutation();

  // =========================
  // FILTER DATA
  // =========================

  const trainingList = useMemo(() => {
    const list =
      data?.data ||
      data?.result ||
      data ||
      [];

    return list?.filter((item: any) => {
      const value = search.toLowerCase();

      return (
        item?.first_name
          ?.toLowerCase()
          ?.includes(value) ||
        item?.last_name
          ?.toLowerCase()
          ?.includes(value) ||
        item?.email
          ?.toLowerCase()
          ?.includes(value) ||
        item?.department
          ?.toLowerCase()
          ?.includes(value) ||
        item?.training_program_name
          ?.toLowerCase()
          ?.includes(value) ||
        item?.program_category
          ?.toLowerCase()
          ?.includes(value)
      );
    });
  }, [data, search]);

  // =========================
  // CONFIRM DELETE
  // =========================

  const handleClose = async (
    isConfirm: boolean
  ) => {
    if (isConfirm) {
      try {
        setIsOpenDialog(false);

        dispatch(setIsLoading(true));

        if (!selectedId) return;

        const response = await deleteTraining(
          selectedId
        ).unwrap();

        dispatch(
          setToast(
            response?.message ||
              "Deleted Successfully"
          )
        );

        refetch();

        setSelectedId(null);
      } catch (error: any) {
        console.log(error);

        dispatch(
          setToast(
            error?.data?.message ||
              "Something went wrong"
          )
        );
      } finally {
        dispatch(setIsLoading(false));
      }
    } else {
      setIsOpenDialog(false);

      setSelectedId(null);
    }
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow rounded-4">
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="p-4 border-bottom">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <h3
                className="fw-bold mb-1"
                style={{
                  color: "#134d75",
                }}
              >
                Training / Internship List
              </h3>

              <p className="text-muted mb-0">
                Manage all training and
                internship programs
              </p>
            </div>

            {/* SEARCH */}

            <div
              style={{
                minWidth: "300px",
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* BODY */}
        {/* ========================= */}

        <div className="p-4">
          {isLoading || isFetching ? (
            <div className="text-center py-5">
              <div
                className="spinner-border text-primary"
                role="status"
              ></div>

              <p className="mt-3 mb-0">
                Loading data...
              </p>
            </div>
          ) : trainingList.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead
                  style={{
                    backgroundColor: "#134d75",
                  }}
                >
                  <tr>
                    <th className="text-nowrap ">
                      #
                    </th>

                    <th className="text-nowrap ">
                      Name
                    </th>

                    <th className="text-nowrap ">
                      Email
                    </th>

                    <th className="text-nowrap ">
                      Program Type
                    </th>

                    <th className="text-nowrap ">
                      Department
                    </th>

                    <th className="text-nowrap ">
                      Program Name
                    </th>

                    <th className="text-nowrap ">
                      Status
                    </th>

                    <th className="text-center text-nowrap ">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {trainingList?.map(
                    (
                      item: any,
                      index: number
                    ) => (
                      <tr key={item?.id}>
                        <td>{index + 1}</td>

                        <td className="text-nowrap">
                          {item?.first_name}{" "}
                          {item?.last_name}
                        </td>

                        <td className="text-nowrap">
                          {item?.email}
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              item?.program_category ===
                              "Training"
                                ? "bg-primary"
                                : "bg-success"
                            }`}
                          >
                            {
                              item?.program_category
                            }
                          </span>
                        </td>

                        <td>
                          {item?.department}
                        </td>

                        <td>
                          {item?.training_program_name ||
                            item?.internship_type ||
                            "-"}
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              item?.status ===
                              "active"
                                ? "bg-success"
                                : item?.status ===
                                  "pending"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                          >
                            {item?.status}
                          </span>
                        </td>

                        {/* ACTIONS */}

                        <td>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            {/* EDIT */}

                              <div className="action-btn-container">
                                            <TiEdit
                                              size={22}
                                              // color="#6C757D"
                                              title="edit"
                                            //   onClick={() => {
                                            //     setIsEdit(true);
                                            //   }}
                                            />
                                          </div>

                            {/* DELETE */}
  <div className="action-btn-container action-btn-delete">
                <RiDeleteBin6Line
                  size={22}
                  title="delete"
                 onClick={() => {
                                setSelectedId(
                                  item?.id
                                );

                                setIsOpenDialog(
                                  true
                                );
                              }}
                />
              </div>
                           
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt="No Data"
                width={120}
                className="mb-3"
              />

              <h5 className="fw-bold">
                No Records Found
              </h5>

              <p className="text-muted mb-0">
                No training or internship
                data available.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* CONFIRM DIALOG */}
      {/* ========================= */}

      <ConfirmDialog
        message="Are you sure you want to delete this item?"
        header="Confirm Deletion"
        isOpen={isOpenDialog}
        onClose={handleClose}
      />
    </div>
  );
};

export default ListTrainingInternship;