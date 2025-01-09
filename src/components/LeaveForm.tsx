import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "../components/ui/InputWithLabel"; // Assuming InputWithLabel is your custom component
import {
  useGetAppliedLeavesQuery,
  usePostLeavesMutation,
} from "../redux/api/leave";
import { useAppDispatch } from "../hooks/reduxHook";
import { setIsLoading } from "../redux/slices/loadingSlice";
import { setToast } from "../redux/slices/toastSlice";

// Define Zod schema for validation
const leaveSchema = z.object({
  start_date: z.string().nonempty("Start date is required"),
  end_date: z.string().nonempty("End date is required"),
  leave_type: z.string().nonempty("Leave type is required"),
  reason: z.string().nonempty("Reason is required"),
});

type LeaveFormData = z.infer<typeof leaveSchema>;

const LeaveApplicationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [
    postLeave,
    { data: leaveApplyDetailsData, isSuccess: leaveIsSuccess },
  ] = usePostLeavesMutation();

  // use react hook form for handling forms data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  // Handle form submission
  const onSubmit = (data: LeaveFormData) => {
    dispatch(setIsLoading(true));
    postLeave(data);
  };

  useEffect(() => {
    if (leaveApplyDetailsData?.result && leaveIsSuccess) {
      dispatch(setIsLoading(false));
      dispatch(setToast(leaveApplyDetailsData?.message));
    }
  }, [leaveIsSuccess]);

  return (
    <div>
      <div>
        <h2 className="text-start py-2">Apply for Leave</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="row g-md-3 border p-2 rounded-3 shadow-sm"
        >
          {/* Start Date */}
          <div className="col-md-6">
            <label htmlFor="startDate" className="form-label font-bold">
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              className="form-control"
              {...register("start_date")}
            />
            {errors.start_date && (
              <p className="text-danger">{errors.start_date.message}</p>
            )}
          </div>

          {/* End Date */}
          <div className="col-md-6">
            <label htmlFor="endDate" className="form-label font-bold">
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              className="form-control"
              {...register("end_date")}
            />
            {errors.end_date && (
              <p className="text-danger">{errors.end_date.message}</p>
            )}
          </div>

          {/* Leave Type (using InputWithLabel for custom input) */}
          <div className="col-md-6">
            <label htmlFor="" className="form-label font-bold ">
              Leave Type
            </label>
            <InputWithLabel
              type="select"
              register={register}
              name="leave_type"
              placeholder="Select Leave Type"
              labelAnimated={false}
              serachIcon={false}
              options={[
                { value: "sick_leave", label: "Sick Leave" },
                { value: "paid_leave", label: "Paid Leave" },
              ]}
            />
            {errors.leave_type && (
              <p className="text-danger">{errors.leave_type.message}</p>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="" className="form-label font-bold">
              Upload Documents
            </label>

            <div
              className="border bg-white p-2"
              style={{
                height: "55%",
              }}
            >
              Upload
            </div>
            <input type="file" hidden />
          </div>

          {/* Reason */}
          <div className="col-md-12">
            <label htmlFor="reason" className="form-label">
              Reason
            </label>
            <textarea
              id="reason"
              className="form-control"
              rows={4}
              {...register("reason")}
              placeholder="Explain why you're taking leave"
            />
            {errors.reason && (
              <p className="text-danger">{errors.reason.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-primary">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
