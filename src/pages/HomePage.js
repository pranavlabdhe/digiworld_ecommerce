import Jumbotron from '../components/cards/Jumbotron';
import CategoryList from '../components/category/CategoryList';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import SubList from '../components/sub/SubList';
const HomePage = () => {
  return (
    <>
      <div className='jumbotron mt-3 text-center display-5 font-weight-bold main_title p-5 '  >
        <Jumbotron text={['WELCOME TO DIGITAL WORLD']}  />
  
        </div>
        <h4 className='text-center p-3 mt-5 mb-5 display-6 jumbotron1'>New Arrivals</h4>
         
         <NewArrivals />
      <br></br>
      <h4 className='text-center p-3 mt-5 mb-5 display-6 jumbotron1'>Best Sellers</h4>
      <BestSellers />
      <h4 className='text-center p-3 mt-5 mb-5 display-6 jumbotron1'>Categories</h4>
      <CategoryList />
      <h4 className='text-center p-3 mt-5 mb-5 display-6 jumbotron1'>Sub Categories</h4>
      <SubList />
      <br></br>
    </>
  )
}

export default HomePage;