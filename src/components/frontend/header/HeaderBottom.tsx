import { MdCall } from "react-icons/md";

import CategorySection from './CategorySection'
import { getCategories } from "@/utils/actions/category";

const HeaderBottom = async () => {
  const categories = await getCategories();
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-24 flex items-center gap-8 h-14">
      <div className="flex-1 h-full">
        <CategorySection categories={categories.success && categories.payload} />
      </div>
      <div className="flex-[2] h-full">
        <div className="flex items-center h-full border border-gray-300">
          <input type="text" placeholder="What do you need?" className="border-none flex-1 px-4 outline-none bg-transparent" />
          <button className="h-full bg-primary text-white px-6">Search</button>
        </div>
      </div>
      <div className="flex-1 flex items-center gap-6 justify-end">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer">
          <MdCall className="text-primary" size="20" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">+65 11.188.888</span>
          <span className="text-xs text-gray-400">support 24/7 time</span>
        </div>
      </div>
    </div>
  )
}

export default HeaderBottom
