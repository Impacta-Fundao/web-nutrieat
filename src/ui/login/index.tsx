'use client'
import LoginView from "./view";
import useRegisterFormsModel from "./viewModel";

export default function LoginPage(){
    const {errors,handleSubmit,loading,onSubmit,register} = useRegisterFormsModel()
    return <LoginView errors={errors} handleSubmit={handleSubmit} loading={loading} onSubmit={onSubmit} register={register}/>
}