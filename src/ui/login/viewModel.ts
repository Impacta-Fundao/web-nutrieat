import { useForm } from "react-hook-form";
import {
  FormsDataLogin,
  FormsRegisterAdmin,
  FormsRegisterRaw,
} from "@/models/admin/types/admin-props-model";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useRegisterFormsModel() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [status, setStatus] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setStatus(false);
  }, [isLogin]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsRegisterAdmin>();
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm<FormsDataLogin>();

  const postAdmin = async (formsData: FormsRegisterAdmin) => {
    const resp = await fetch("/api/adms/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formsData),
    });
    setStatus(true);
    const data = await resp.json();
    if (!resp.ok) {
      console.error(data);
    }

    return data;
  };

  const authLogin = async (formsData: FormsDataLogin) => {
    const resp = await fetch("/api/adms/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formsData),
    });
    setStatus(true);
    const data = await resp.json();
    localStorage.setItem("id_admin", String(data.data.id));
    if (!resp.ok) {
      console.error(data);
      return;
    }

    return data;
  };

  async function onSubmitCreate(data: FormsRegisterAdmin) {
    if (!data) {
      console.error("Error");
      return;
    }
    await postAdmin(data);
   
    return data;
  }
  async function onSubmitLogin(data: FormsDataLogin) {
    try {
      if (!data) {
        console.error("Error");
        return;
      }
      const result = await authLogin(data);
      if (!result) {
        return;
      }
      router.push("/Products");
      return data;
    } catch (error) {}
  }

  return {
    register, // register
    handleSubmit, // register
    errors,
    onSubmitCreate, // register
    loading,
    isLogin,
    setIsLogin,
    registerLogin, // login
    handleSubmitLogin, // login
    errorsLogin,
    status,
    onSubmitLogin, // login
  };
}
