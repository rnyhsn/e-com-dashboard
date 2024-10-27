import { IoSearchSharp } from "react-icons/io5";


const SearchBox = () => {
  return (
    <div className="h-12 dark:cardDark cardLight w-[600px] flex items-center gap-2 px-2 transition-c ">
      <IoSearchSharp className="text-lg font-semibold text-txtLightSecondary dark:text-txtDarkSecondary" /> 
      <input type="text" className="outline-none flex-1 bg-inherit" placeholder="Search Here..." />
    </div>
  )
}

export default SearchBox
