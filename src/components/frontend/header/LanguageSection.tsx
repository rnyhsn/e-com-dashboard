import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineLanguage } from "react-icons/md";


const LanguageSection = () => {
    // const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 relative group cursor-pointer">
            {/* <Image src="" alt="" width={25} height={18} /> */}
            <MdOutlineLanguage />
            <span>English</span>
            <div className="hidden group-hover:flex flex-col text-sm absolute top-6 bg-bgDarkPrimary dark:bg-bgLightPrimary dark:text-txtLightPrimary text-txtDarkPrimary w-full px-2 py-1 gap-0.5">
                <span className="cursor-pointer">English</span>
                <span className="cursor-pointer">Spanish</span>
            </div>
            <IoIosArrowDown />
        </div>
  )
}

export default LanguageSection
