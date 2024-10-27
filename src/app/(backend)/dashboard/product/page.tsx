
import PageTitle from '@/components/backend/mainBody/PageTitle'
import ProductTable from '@/components/backend/mainBody/product/ProductTable'
import Link from 'next/link'
import React from 'react'


const ProductPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Product List" btn={true} path="/product/add"  />
      <ProductTable />
    </div>
  )
}

export default ProductPage
