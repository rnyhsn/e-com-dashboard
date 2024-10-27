import ItemNotFound from '@/components/backend/mainBody/ItemNotFound'
import PageTitle from '@/components/backend/mainBody/PageTitle'
import UpdateProductForm from '@/components/backend/mainBody/product/UpdateProductForm'
import { getCategories } from '@/utils/actions/category'
import { getProduct } from '@/utils/actions/product'
import React from 'react'

const UpdateProductPage = async ({params}: {params: {id: string}}) => {
  const resp: any = await getCategories();
  if( resp.success === false || resp?.payload.length <= 0) {
      return <ItemNotFound message={resp.message} />
  }

  const productResult: any = await getProduct(params.id);
  if(productResult.success === false && productResult.statusCode === 404) {
    return <ItemNotFound message={resp.message} />
  }
  console.log(productResult.payload);
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Update Product" />
      <UpdateProductForm categories={resp.payload} product={productResult.payload} />
    </div>
  )
}

export default UpdateProductPage
