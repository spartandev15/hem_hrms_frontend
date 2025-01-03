import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
import { z } from "zod";
import "../../assets/styles/category.css";
import InputWithLabel from "../../components/ui/InputWithLabel";
import { useAppDispatch } from "../../hooks/ReduxHook";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  usePostCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/api/category";
import { setIsLoading } from "../../redux/slices/loadingSlice";
import { setToast } from "../../redux/slices/toastSlice";
import ConfirmDialog from "../../components/ConfirmDialog";

const categorySchema = z.object({
  category: z
    .string()
    .min(1, { message: "Category is required*" }) // Ensure the category is a non-empty string
    .max(100, { message: "Category must be less than 100 characters" }), // Optional: Limit category length
});

const Category = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });
  const dispatch = useAppDispatch();

  const [confirmPopup, setConfirmPopup] = useState(false);
  const [categoryId, setCategoryId] = useState(-1);

  const { data: allCategory, isLoading } = useGetAllCategoryQuery();
  const [postCategory, { data: getCategoryDataDetails }] =
    usePostCategoryMutation();
  const [deleteCategory, { data: deleteCategoryDataDetails }] =
    useDeleteCategoryMutation();

  const [showCreateForm, setCreateShowFrom] = useState(false);

  const hanldeFormSubmit = (data) => {
    dispatch(setIsLoading(true));
    const formData = {
      name: data.category,
    };
    postCategory(formData);
    reset();
  };

  const handleDeleteCategory = (id: number) => {
    setCategoryId(id);
    setConfirmPopup(true);
  };

  const handleCloseDialog = (isYesClcik) => {
    setConfirmPopup(false);
    if (isYesClcik) {
      dispatch(setIsLoading(true));
      deleteCategory({ id: categoryId });
      setConfirmPopup(false);
    }
  };

  if (getCategoryDataDetails) {
    dispatch(setIsLoading(false));
    dispatch(setToast(getCategoryDataDetails.message));
  }

  if (deleteCategoryDataDetails) {
    dispatch(setIsLoading(false));
    dispatch(setToast(deleteCategoryDataDetails.message));
  }

  return (
    <div>
      <div className="container category-wrapper py-3">
        <div className="d-flex justify-content-between">
          <h2>Add Category</h2>
          <button
            className="btn w-auto px-4"
            onClick={() => setCreateShowFrom(!showCreateForm)}
            style={{
              opacity: showCreateForm ? "0.4" : "1",
            }}
          >
            {showCreateForm ? " Cancel" : " Create"}
          </button>
        </div>

        {showCreateForm && (
          <form
            action=""
            className=""
            onSubmit={handleSubmit(hanldeFormSubmit)}
          >
            <div className="row d-flex gap-md-0 gap-2 mt-4">
              <div className="col-md-10">
                <InputWithLabel
                  register={register}
                  type="text"
                  label="Enter Category...."
                  name="category"
                />

                {errors && errors.category?.message && (
                  <p className="text-danger">
                    {errors?.category?.message as string}
                  </p>
                )}
              </div>

              <div className="col-md-2">
                <button className="btn py-2">Submit</button>
              </div>
            </div>
          </form>
        )}

        <div>
          <div className="container mt-5">
            <h1 className="mb-4 text-center">Categories Lists</h1>

            {isLoading ? (
              <p>Loading....</p>
            ) : (
              <table className="category-table ">
                <thead className="thead-dark">
                  <tr>
                    <th className="text-medium px-3">Category</th>
                    <th className="text-medium text-center actions-column">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allCategory?.category?.map((category, index) => (
                    <TableRow
                      name={category.name}
                      id={category.id}
                      onClick={handleDeleteCategory}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <ConfirmDialog isOpen={confirmPopup} onClose={handleCloseDialog} />
      </div>
    </div>
  );
};

export default Category;

const TableRow = ({ name, id, onClick }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: name,
    },
    resolver: zodResolver(categorySchema),
  });
  const dispatch = useAppDispatch();
  const [updateCategory, { data: updateCategoryDataDetails }] =
    useUpdateCategoryMutation();

  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );

  const handleEditClick = (categoryId: number, currentName: string) => {
    setEditingCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId
    );
  };

  const hanldeEditFormSubmit = (data) => {
    dispatch(setIsLoading(true));
    updateCategory({
      id: id,
      name: data.category,
    });
    setEditingCategoryId(null);
  };

  if (updateCategoryDataDetails) {
    dispatch(setIsLoading(false));
    dispatch(setToast(updateCategoryDataDetails?.message));
  }

  return (
    <tr key={id}>
      <td className="px-3 text-small font-medium ">
        {editingCategoryId === id ? (
          <form
            onSubmit={handleSubmit(hanldeEditFormSubmit)}
            className="d-flex gap-1 justify-content-between"
          >
            <div className="w-100">
              <InputWithLabel
                type="text"
                register={register}
                label="Category"
                name="category"
                value={name}
              />
            </div>
            <button className="btn w-25">Submit</button>
          </form>
        ) : (
          name
        )}
      </td>

      <td className="d-flex gap-2  justify-content-center align-items-center">
        <MdEdit
          size={20}
          color="#417090"
          className=""
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleEditClick(id, name)}
        />
        <MdDelete
          size={20}
          color="#D11A2A"
          className=""
          style={{
            cursor: "pointer",
          }}
          onClick={() => onClick(id)}
        />
      </td>
    </tr>
  );
};
