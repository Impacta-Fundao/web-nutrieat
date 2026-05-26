'use client'
import LoginView from "./view";
import useLoginFormModel from "./viewModel";

export default function LoginPage(){
    const {errors,handleSubmit,isSubmitting,onSubmit,register,serverError} = useLoginFormModel()
    return <LoginView errors={errors} handleSubmit={handleSubmit} isSubmitting={isSubmitting} onSubmit={onSubmit} register={register} serverError={serverError}/>
}