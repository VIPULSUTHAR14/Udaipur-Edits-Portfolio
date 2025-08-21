import Footer from "./components/Footer"
import Contect from "./Sections/Contect"
import Hero from "./Sections/Hero"
import Project from "./Sections/Project"

export default function Home(){
  return(
    <div className="bg-black" >
      <Hero/>
      <Project/>
      <Contect/>
      <Footer/>
    </div>
  )
};