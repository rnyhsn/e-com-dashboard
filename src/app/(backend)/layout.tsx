import Header from '@/components/backend/header/Header'
import Sidebar from '@/components/backend/sidebar/Sidebar'



const BackendLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 p-5 flex flex-col gap-5">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default BackendLayout
