import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      
      <HorizontalCardProduct category={"Dairy & Eggs"} heading={"Fresh Dairy & Eggs"}/>
      <HorizontalCardProduct category={"Fruits & Dry Fruits"} heading={"Popular's Fruits & Dry Fruits"}/>

      <VerticalCardProduct category={"Wheat & Grains"} heading={"Wheat & Grains"}/>
      <VerticalCardProduct category={"Organic Food"} heading={"Organic Food"}/>
      <VerticalCardProduct category={"Organic Personal Care"} heading={"Organic Personal Care"}/>
      <VerticalCardProduct category={"Clothing & Textiles"} heading={"Clothing & Textiles"}/>
      <VerticalCardProduct category={"Art & Handicrafts"} heading={"Art & Handicrafts"}/>
 
    </div>
  )
}

export default Home