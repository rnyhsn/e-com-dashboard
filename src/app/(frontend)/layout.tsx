import Footer from "@/components/frontend/footer/Footer"
import Header from "@/components/frontend/header/Header"



const FrontendLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default FrontendLayout
