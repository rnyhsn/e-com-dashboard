import Image from 'next/image'
import NavLink from './NavLink'
import { FaHeart } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";


const links = [
  {title: "Home", path: "/"},
  {title: "Shop", path: "/shop"},
  {title: "Blog", path: "/blog"},
  {title: "Contact", path: "/contact"}
]

const HeaderMd = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-24 flex items-center justify-between py-2">
      <Image src="/logo.png" alt="" width={120} height={80} />
      <div className="flex gap-10 font-semibold">
      {
        links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))
      }
      </div>
      <div className="flex items-center gap-5">
        <div className="relative">
          <FaHeart />
          <div className="absolute -top-2.5 -right-2.5 bg-primary rounded-full flex items-center justify-center w-4 h-4 text-white text-xs">0</div>
        </div>
        <div className="relative">
          <FaBriefcase />
          <div className="absolute -top-2.5 -right-2.5 bg-primary rounded-full flex items-center justify-center w-4 h-4 text-white text-xs">0</div>
        </div>
        <div className="flex items-center gap-1 text-sm ml-2">
          <span> Items: </span>
          <span className="font-semibold ">$250.00</span>
        </div>

      </div>
    </div>
  )
}

export default HeaderMd
