import UpdateCategoryForm from '@/components/backend/mainBody/category/UpdateCategoryForm'
import ItemNotFound from '@/components/backend/mainBody/ItemNotFound'
import PageTitle from '@/components/backend/mainBody/PageTitle'
import { getCategory } from '@/utils/actions/category'
import React from 'react'

const UpdateCategoryPage = async ({params}: {params: {slug: string}} ) => {

  const category = await getCategory(params.slug);
  
  if(!category.success && category.statusCode == 404) {
    return <ItemNotFound message={category.message} />
  }
  
  let {name, description, image} = category.payload;
  const payload = {
    name, description, image, slug: params.slug
  }
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Update Category" />
      <div className="w-[80%] mx-auto">
        <UpdateCategoryForm category={payload} />
      </div>
    </div>
  )
}

export default UpdateCategoryPage
