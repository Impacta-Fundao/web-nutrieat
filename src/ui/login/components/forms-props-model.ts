import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

export interface FormsModelProps {
  register: UseFormRegister<FormsData>;
  handleSubmit: UseFormHandleSubmit<FormsData, FormsData>;
  onSubmitHandler: (data: FormsData) => void;
  errors: FieldErrors<FormsData>;
  loading: boolean;
  className?: string;
  childrenButtonBack?: string;
  titleChildren?: string;
  childrenButtonGo?: string;
}

export interface FormsData {
  groupOrUser: string | null;
  reportId: string | null;
  pageId: string | null;
  name: string | null;
}

export default interface FormsViewProps {
  register: UseFormRegister<FormsData>;
  handleSubmit: UseFormHandleSubmit<FormsData, FormsData>;
  errors: FieldErrors<FormsData>;
  onSubmit: (data: FormsData) => FormsData | undefined;
  loading: boolean;
}
