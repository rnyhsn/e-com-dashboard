"use client";

import { useFormStatus } from "react-dom";

const SubmitBtn = ({text, disabled=false, loading=false}: {text: string, disabled?: boolean, loading?: boolean}) => {
    const {pending} = useFormStatus();
  return (
    <button disabled={disabled || pending || loading}  className={`btn mt-5 ${(disabled || pending || loading) && "disabled:cursor-not-allowed opacity-50"}`}> {pending || loading ? "Wait for a Second" : text} </button>
  )
}

export default SubmitBtn
