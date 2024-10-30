import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import ThemeIcon from "@/components/backend/header/ThemeIcon";
import LanguageSection from "./LanguageSection";



const HeaderTop = () => {

  return (
    <div className="bg-bgLightSecondary dark:bg-bgDarkSecondary px-4 md:px-8 lg:px-16 xl:px-24 flex items-center justify-between py-2 text-sm">
        <div className="absolute top-2 right-4">
        <ThemeIcon />
        </div>
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <FaEnvelope />
            <span>info@localhost.com</span>
        </div>
        <div className="bg-gray-300 border-l h-4"></div>
        <div>Free Shipping for all Order of $99</div>
      </div>
      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaPinterestP />
        </div>
        <div className="bg-gray-300 border-l h-4"></div>
        <LanguageSection />
        <div className="border-gray-300 border-l h-4"></div>
        <div className="flex gap-2 items-center">
            <FaUser />
            <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default HeaderTop
