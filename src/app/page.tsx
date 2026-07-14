import Footer from "./components/Footer"
import Contect from "./Sections/Contect"
import Hero from "./Sections/Hero"
import MainProject from "./Sections/MainProject"

export default function Home() {
  return (
    <div className="bg-white" >
      <Hero />
      {/* <Project /> */}
      <MainProject />
      <Contect />
      <Footer />
    </div>
  )
};