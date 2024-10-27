
import { RiHome2Fill } from 'react-icons/ri'
import { FaUser } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { GiBackwardTime } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import Image from 'next/image';
import NavLink from './NavLink';


export const menuList = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <RiHome2Fill/>
    },
    {
        title: "Profile",
        path: "/dashboard/profile",
        icon: <FaUser />
    },
    {
        title: "Category",
        path: "/dashboard/category",
        icon: <BiSolidCategoryAlt />
    },
    {
        title: "Product",
        path: "/dashboard/product",
        icon: <IoBag />
    },
    {
        title: "Order",
        path: "/dashboard/order",
        icon: <FaShoppingCart />
    },
    {
        title: "Message",
        path: "/dashboard/message",
        icon: <RiMessage2Fill />
    },
    {
        title: "Sale Report",
        path: "/dashboard/sale-report",
        icon: <FaChartLine />
    },
    {
        title: "Favorite",
        path: "/dashboard/favorite",
        icon: <IoMdStarOutline />
    },
    {
        title: "History",
        path: "/dashboard/history",
        icon: <GiBackwardTime/>
    },
    {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <IoSettingsOutline />
    },
  ]
  

const Sidebar = () => {
  return (
    <div className="h-full border-r border-gray-600 p-6">
      <div className="flex flex-col my-4">
        <Image src="/sale-logo.png" alt="logo" width={150} height={80} className="mx-auto" />
        <div className="flex flex-col gap-2 mt-6">
          {
            menuList.map(menu => (
              <NavLink item={menu} key={menu.title} />
            ))
          }
        </div>
      </div>
      
    </div>
  )
}

export default Sidebar
