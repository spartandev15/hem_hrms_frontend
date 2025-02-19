import React, { useEffect } from "react";
import { useGetAllCategoryQuery } from "./redux/api/category";
import { useAppDispatch } from "./hooks/reduxHook";
import { setDropdownData } from "./redux/slices/dropdown";
import { useGetALlEmailsQuery } from "./redux/api/notice";
import { setEmailData } from "./redux/slices/allEmail";

const GlobalState = () => {
  const dispatch = useAppDispatch();
  const {
    data: allCategory,
    isLoading: isAllCategoryLoading,
    isSuccess: isCategorySuceess,
  } = useGetAllCategoryQuery();

  const { data: allEmail, isLoading: isAllEmailsLoading } =
    useGetALlEmailsQuery();

  useEffect(() => {
    if (allCategory) {
      dispatch(setDropdownData(allCategory?.categories));
    }
    if (allEmail) {
      dispatch(setEmailData(allEmail?.data));
    }
  }, [allCategory, allEmail]);
  return null;
};

export default GlobalState;
