import { FormsDataLogin, FormsRegisterAdmin } from "@/models/admin/types/admin-props-model";
import { Dispatch, SetStateAction } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface FormsModelProps {
  register: UseFormRegister<FormsRegisterAdmin>;
  handleSubmit: UseFormHandleSubmit<FormsRegisterAdmin, FormsRegisterAdmin>;
  onSubmitHandler: (data: FormsRegisterAdmin) => void;
  errors: FieldErrors<FormsRegisterAdmin>;
  loading: boolean;
  className?: string;
  childrenButtonBack?: string;
  titleChildren?: string;
  childrenButtonGo?: string;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  registerLogin: UseFormRegister<FormsDataLogin>;
  handleSubmitLogin: UseFormHandleSubmit<FormsDataLogin, FormsDataLogin>;
  errorsLogin: FieldErrors<FormsDataLogin>;
  status: boolean
  onSubmitLogin: (data: FormsDataLogin) => Promise<FormsDataLogin | undefined>
  
}




export default interface FormsViewProps {
  register: UseFormRegister<FormsRegisterAdmin>;
  handleSubmit: UseFormHandleSubmit<FormsRegisterAdmin, FormsRegisterAdmin>;
  errors: FieldErrors<FormsRegisterAdmin>;
  onSubmitCreate(data: FormsRegisterAdmin): Promise<FormsRegisterAdmin | undefined>
  loading: boolean;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  registerLogin: UseFormRegister<FormsDataLogin>;
  handleSubmitLogin: UseFormHandleSubmit<FormsDataLogin, FormsDataLogin>;
  errorsLogin: FieldErrors<FormsDataLogin>;
  status: boolean
  onSubmitLogin(data: FormsDataLogin): Promise<FormsDataLogin | undefined>
}
