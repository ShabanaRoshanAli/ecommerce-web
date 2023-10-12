import AppCardOne from "../components/cards/AppCardOne";
import CategoryCard from "../components/cards/CategoryCard";
import FeaturedCard from "../components/cards/FeaturedCard";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomeScreen = () => {
  
  return (
    <>
      <Header />
      <CategoryCard />
      <FeaturedCard />
      <AppCardOne />
      <Footer />
    </>
  )
}
export default HomeScreen;
