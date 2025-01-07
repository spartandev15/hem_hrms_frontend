import { z } from "zod";

// Define Zod validation schema
export const employeeFormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),

    confirm_Password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),

    designation: z
      .string()
      .min(1, "Designation is required") // Make sure the select has a value selected
      .default("defaultDesignation"), // Ensure a default value

    email: z.string().min(1, "Email is required").email("Invalid email format"),

    employee_id: z.string().min(1, "Employee ID is required"),

    first_name: z.string().min(1, "First name is required"),

    joining_date: z.string().min(1, "Joining date is required"),

    last_name: z.string().min(1, "Last name is required"),

    line_manager: z.string().min(1, "Line manager is required"),

    paid_leaves: z.string().min(1, "Paid leaves is required"),

    phone: z.string().min(1, "Phone is required"),

    sick_leaves: z.string().min(1, "Sick leaves is required"),

    total_leaves: z.string().min(1, "Total leaves is required"),

    unpaid_leaves: z.string().min(1, "Unpaid leaves is required"),
  })
  .refine((data) => data.password === data.confirm_Password, {
    message: "Passwords don't match",
    path: ["confirm_Password"], // This will show the error on the confirm_Password field
  });
