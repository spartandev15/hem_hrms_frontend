import { z } from "zod";

// Define Zod validation schema
export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password should not empty"),
});

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
      // .min(1, "Designation is required") // Make sure the select has a value selected
      .optional(), // Ensure a default value

    role: z
      .string() // Make sure the select has a value selected
      .optional(),

    email: z.string().min(1, "Email is required").email("Invalid email format"),

    employee_id: z.string().min(1, "Employee ID is required"),

    first_name: z.string().min(1, "First name is required"),

    joining_date: z.string().min(1, "Joining date is required"),
    date_of_birth: z.string().min(1, "dob is required"),
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
    basic_salary: z.string().min(1, "Basic Salary is required"),
    house_rent: z.string().min(1, "House rent is required"),
    medical_allowance: z.string().min(1, "Medical Allowance is required"),
    tax: z.string().min(1, "Tax is required"),
    leave_deduction: z.string().min(1, "Leave Deduction is required"),
    pf: z.string().min(1, "Unpaid leaves is required"),
    employee_state: z.string().min(1, "Employee State is required"),
    insurance: z.string().min(1, "Insurance is required"),
    extra_working: z.string().min(1, "Extra Working is required"),
    gross_total: z.string().min(1, "Gross Total is required"),
    final_total: z.string().min(1, "Final Total is required"),
    gross_salary: z.string().min(1, "Gross Salary is required"),
    bank_name: z.string().min(1, "Bank Name is required"),
    bank_ifsc: z.string().min(1, "IFSC Code is required"),
    account_number: z.string().min(1, "Account number is required"),
    account_holder_name: z.string().min(1, "Account Holder Name is required"),
    profile_photo: z.any().optional(),
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
  // final_balance: z
  //   .string()
  //   .min(1, "Final balance is required")
  //   .regex(/^\d+(\.\d{1,2})?$/, "Invalid balance format")
  //   .transform(Number)
  //   .refine((balance) => balance >= 0, {
  //     message: "Final balance must be greater than or equal to 0",
  //   }),

  final_balance: z.string().optional(),

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

export const noticeFormSchema = z.object({
  title: z.string().min(1, "title is required"),
  email: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        value: z.string().min(1, "Value is required"),
      })
    )
    .nonempty("Email is required"), // Ensure at least one email is selected

  // description: z.string().min(1, "Description is required"),
  screenshot: z
    .any() // Allow either File or FileList
    .optional(), // Allow undefined or null
});

export const scheduleFormSchema = z.object({
  candidate_name: z.string().min(1, "name is required"),
  phone_number: z
    .string()
    .min(1, "phone number is required")
    .refine((data) => data.length > 0),
  position: z.string().min(1, "profile is required"),
  interview_type: z.string().min(1, "interview type is required"),
  interviewer_name: z.string().min(1, "interviewer name is required"),
  interview_date: z.string().min(1, "date time is required"),
  email: z.string().min(1, "email is required").email("email is not correct"),
  resume_file: z.any().refine((file) => file.length > 0, {
    message: "resume is required",
  }),

  // interviewer_email: z.string().min(1, "interviewer email is required"),
  interviewer_email: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        value: z.string().min(1, "Value is required"),
      })
    )
    .refine((emails) => emails && emails.length > 0, {
      message: "At least one interviewer email is required", // Ensure the array is not empty
    }),
  // Ensure at least one email is selected
  // description: z.string().min(1, "Description is required"),
  // Allow undefined or null
});

export const vacancyFormSchema = z.object({
  job_title: z.string().min(1, "Job Title is required"),
  location: z.string().min(1, "Location is required"),
  salary_range: z.string().min(1, "salary Range is required"),
  job_type: z.string().min(1, "Job Type is required"),
  skills_required: z.string().min(1, "Skills required are required"),
  job_responsibilities: z.string().min(1, "Job Responsibilities are required"),
  company_information: z.string().min(1, "Company Information is required"),
  contact_email: z.string().email("Please provide a valid email address"),
  experience: z.string().min(1, "Experience is required"),
  joining_time: z.string().min(1, "joining time is required"),
  status: z.string().min(1, "status is required"),
  // phone_number: z
  //   .string()
  //   .min(1, "Mobile number is required")
  //   .regex(/^\d{10}$/, "Mobile number should be 10 digits"),
});

export const documentsFormSchema = z.object({
  "10th_dmc": z.any(),
  "12th_dmc": z.any(),
});

// {
//   "job_title": "",
//   "location": "",
//   "salary_range": "10-20",
//   "job_type": "Office",
//   "skills_required": "",
//   " job_responsibilities": "",
//   "company_information": "",
//   "contact_email": "",
//   "experience": "1-2",
//   "joining_time": "Immidiate",
//   "phone_number": ""
// }
