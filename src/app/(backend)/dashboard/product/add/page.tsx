import PageTitle from '@/components/backend/mainBody/PageTitle'
import AddProductForm from '@/components/backend/mainBody/product/AddProductForm'
import { getCategories } from '@/utils/actions/category'
import React from 'react'

const AddProductPage = async () => {

  const resp: any = await getCategories();
  console.log(resp);
  
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Add Product" btn={true} path="/product/add"  />
      {
        resp.success && (
          <AddProductForm categories={resp.payload} />
        )
      }

    </div>
  )
}

export default AddProductPage
