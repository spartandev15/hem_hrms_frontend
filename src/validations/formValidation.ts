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
    date_of_birth: z.string().min(1, "Joining date is required"),
    last_name: z.string().min(1, "Last name is required"),

    // line_manager: z.string().min(1, "Line manager is required"),

    phone: z
      .string()
      .min(1, "Phone is required")
      .length(10, "Invalid phone number"),

    sick_leaves: z.string().min(1, "Sick leaves is required"),

    total_leaves: z.string().min(1, "Total leaves is required"),

    paid_leaves: z.string().min(1, "Paid leaves is required"),

    unpaid_leaves: z.string().min(1, "Unpaid leaves is required"),
  })
  .refine((data) => data.password === data.confirm_Password, {
    message: "Passwords don't match",
    path: ["confirm_Password"], // This will show the error on the confirm_Password field
  });

export const changePasswordSchema = z
  .object({
    // email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),

    confirm_password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"], // This will show the error on the confirm_Password field
  });

export const overTimeFormSchema = z.object({
  // Overtime Date
  overtime_date: z
    .string()
    .min(1, "Overtime date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),

  // Working Hours
  working_hours: z
    .string()
    .min(1, "Working hours is required")
    .transform(Number) // Ensure it's a number after validation
    .refine((hours) => hours > 0, {
      message: "Working hours must be greater than 0",
    }),

  // Per Hour Rate
  salary_per_hour: z
    .string()
    .min(1, "Per hour rate is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid rate format")
    .transform(Number)
    .refine((rate) => rate > 0, {
      message: "Per hour rate must be greater than 0",
    }),

  // Final Balance
  final_balance: z
    .string()
    .min(1, "Final balance is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid balance format")
    .transform(Number)
    .refine((balance) => balance >= 0, {
      message: "Final balance must be greater than or equal to 0",
    }),

  // Project Name
  project_name: z.string().min(1, "Project name is required"),

  project_url: z
    .string()
    .min(1, "Project URL is required")
    .url("Invalid URL format"),

  // Screenshot
  screenshot: z
    .any() // Allow either File or FileList
    .optional(), // Allow undefined or null

  status: z.string().optional(),
});
