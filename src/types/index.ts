import { UseFormRegister } from "react-hook-form";

export interface SignUpFormData {
  first_name: string;
  last_name: string;
  organisation: string;
  organisation_id: string;
  address: string;
  email: string;
  password: string;
  confirm_password: string;
  payment: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface GetProfileResponseApi {
  message: string;
  result: boolean;
  user: Record<string, unknown>;
  user_list: Record<string, unknown>;
}

interface IField {
  label: string;
  name?: string;
  type?: string;
  value?: string;
}

export interface IProfileCommonSection {
  title: string;
  fields: IField[];
  data?: any;
}

export interface ProfileCardProps {
  id?: number;
  name?: string;
  last_name?: string;
  designation?: string;
  phone?: number;
  email?: string;
  profile_photo?: string;
  line_manager?: string;
  joining_date?: string;
  employeeprofile?: string;
}

export interface EditableFormProps {
  fields: IField[];
  onSubmit: (values: any) => void;
  defaultValues?: any;
  // validationSchema: Yup.ObjectSchema; // Pass validation schema as a prop
}

export interface InputWithLabelProps {
  label?: string;
  type: string;
  id?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean; // Optional, some fields might not be required
  register: UseFormRegister<any>;
  options?: any;
  labelAnimated?: boolean;
  serachIcon?: boolean;
  isLoading?: boolean;
}

interface EmployeeDetails {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  designation: string;
  phone: number;
  email: string;
  employee_id: string;
  profile_photo: string;
  line_manager: string;
  joining_date: string;
  employeeprofile?: string;
  date_of_birth?: Date;
  gender?: string;
  address?: string;
  leaves?: {
    leave_data: {
      paid_leaves: {
        Taken: number;
        Total: string;
        Pending: string;
      };
      sick_leaves: {
        Taken: number;
        Total: string;
        Pending: string;
      };
      unpaid_leaves: {
        Taken: number;
        Total: string;
        Pending: string;
      };
    };
    overall_total_leaves: string;
  };
}

export interface EmployeeCardProps extends EmployeeDetails {}

export interface EmployeeDeleteData {
  id: number;
}

export interface CategoryDeleteData {
  id: number;
}
