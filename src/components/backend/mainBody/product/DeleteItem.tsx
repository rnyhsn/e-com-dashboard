"use client"
import { redirectTo, revalidate } from '@/utils/services/services'
import React from 'react'
import { useFormState } from 'react-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-toastify'

const DeleteItem = ({action, id}: {action: (prev: {success: boolean|string, message: string}, formData: FormData) => void, id: string}) => {
    const initialState: any = {
        success: "",
        message: ""
    }
    const [state, formAction] = useFormState(action, initialState)
    console.log(state);
    if(state.success === false) {
        toast.error(state.message);
    } 
  return (
    <form action={formAction}>
    <input type="hidden" name="id" value={id} />
    <button className="text-red-500"> <RiDeleteBin6Line /> </button>
    
  </form>
  )
}

export default DeleteItem
