"use client";
import { deleteCategory } from '@/utils/actions/category';
import Image from 'next/image'
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ItemNotFound from '../ItemNotFound';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { revalidate } from '@/utils/services/services';

const CategoryRow = ({category, index}: {category: {name: string, description: string, slug: string, image: string}, index: number}) => {
    const initialState: any = {
        success: "",
        message: ""
    }
    const [state, formAction] = useFormState(deleteCategory, initialState)

    if(state.success === false && state?.statusCode === 404) {
        return <ItemNotFound message="Category Not Found" />
    }
    
    useEffect(() => {
        if(state.success === false) {
            toast.error(state.message);
        }
        if(state.success) {
            toast.success(state.message);
            revalidate("/dashboard/category");
        }
    }, [state])

  return (
    <tr className="text-txtLightSecondary dark:text-txtDarkSecondary even:bg-bgLightPrimary even:dark:bg-bgDarkPrimary">
    <td className="px-3"> {index+1} </td>
    <td className="flex gap-3 items-center py-2">
        <Image src={category.image || ""} alt="" width={28} height={28} className="object-cover rounded-full w-8 h-8" />
        <span> {category.name} </span>
    </td>
    <td> {category.description} </td>
    <td> {category.slug} </td>
    <td> 10 </td>
    <th className="flex gap-2 items-center text-lg ">
        <Link href={`/dashboard/category/update/${category.slug}`} className="text-green-500"> <FaRegEdit /> </Link>
        <form action={formAction} className="flex items-center">
            <input type="text" hidden name="slug" value={category.slug} readOnly />
            <button className="text-red-500"> <RiDeleteBin6Line /> </button>
        </form>
    </th>
    </tr>
  )
}

export default CategoryRow
