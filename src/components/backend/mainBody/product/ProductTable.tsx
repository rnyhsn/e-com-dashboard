import { deleteProduct, getProducts } from '@/utils/actions/product'
import Image from 'next/image'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import ItemNotFound from '../ItemNotFound'
import DeleteItem from './DeleteItem'
import Link from 'next/link'

const ProductTable =async () => {
    const resp = await getProducts();

    if(resp.success === false && resp.statusCode === 404) {
        return <ItemNotFound message={resp.message} />
    }
  return (
    <div className="p-5 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md text-sm">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Product</th>
                <th>SKU</th>
                <th>Desc</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Colors</th>
                <th>Sizes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
            resp.payload  && resp.payload.map((product, index) => (

              <tr key={index} className="text-txtLightSecondary dark:text-txtDarkSecondary odd:bg-bgLightPrimary odd:dark:bg-bgDarkPrimary">
                <td> {index+1} </td>
                <td className="flex items-center gap-2 py-1">
                  <Image src={product.images[0]} alt="" width={32} height={32} className="object-cover rounded-full w-8 h-8" />
                  <span> {product.name} </span>
                </td>
                <td>
                  {product.sku}
                </td>
                <td> {product.shortDesc?.substr(0, 20) || product.description?.substr(0,20)} ... </td>
                <td> {product.sellingPrice? product.sellingPrice : product.price} <span className="text-[10px] line-through"> ({product.sellingPrice && product.price}) </span>   </td>
                <td> {product.category.name} </td>
                <td> {product?.stock} </td>
                <td className="text-xs"> {product?.colors.map((color: string) => <span key={color}> {color}, </span>)}  </td>
                <td className="text-xs"> {product?.sizes.map((size: string) => <span> {size}, </span>)}  </td>
                <th className="flex gap-2 items-center text-lg">
                  <Link href={`/dashboard/product/update/${product.slug}`} className="text-green-500"> <FaRegEdit /> </Link>
                  <DeleteItem action={deleteProduct} id={product._id.toString()} />
                </th>
              </tr>
            ))
            }
           
            </tbody>
          </table>
      </div>
  )
}

export default ProductTable
