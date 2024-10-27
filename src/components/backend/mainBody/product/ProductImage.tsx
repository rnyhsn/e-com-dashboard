import Image from 'next/image'
import { RxCross2 } from "react-icons/rx";


const ProductImage = ({item, onClick, notAllowed=false}: {item: {file?: File, url: string}, onClick: () => void,notAllowed?: boolean}) => {
  return (
    <div className={`relative h-[100px] shrink-0 ${notAllowed && "border-red-600 border-[4px] animate-pulse"}`}>
        <Image src={item.url} fill alt="" className="object-cover" />
        <div className="absolute w-5 h-5 bg-red-600 text-white rounded-full cursor-pointer flex items-center justify-center -top-2 -right-2 font-bold hover:bg-red-400">
            <RxCross2 size={12} onClick={onClick} />
        </div>
    </div>
  )
}

export default ProductImage
