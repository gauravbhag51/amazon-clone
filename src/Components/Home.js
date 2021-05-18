import React, { useState } from "react";
import "./Home.css";
import Product from "./Product";
import{elec,jewel,men,women}from "../products"
// import axios from "axios";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        ></img>
      </div>
      <h1>Electronics</h1>
      <div className="home_row">
      
      {
        elec?.map(item=>(
          <Product 
          id={item?.id}
          image={item?.image}
          rating={4}
          price={Math.floor(item?.price*70)}
          title={item?.title}
          />
        ))
      }
      </div>
      <h1>Jewelery</h1>
      <div className="home_row">
      
      {
        jewel?.map(item=>(
          <Product 
          id={item?.id}
          image={item?.image}
          rating={5}
          price={Math.floor(item?.price*70)}
          title={item?.title}
          />
        ))
      }
      </div>
      <h1>Men's Fashion</h1>
      <div className="home_row">
      
      {
        men?.map(item=>(
          <Product 
          id={item?.id}
          image={item?.image}
          rating={3}
          price={Math.floor(item?.price*70)}
          title={item?.title}
          />
        ))
      }
      </div>
      <h1>Women's Fashion</h1>
      <div className="home_row">
      {
        women?.map(item=>(
          <Product 
          id={item?.id}
          image={item?.image}
          rating={4}
          price={Math.floor(item?.price*70)}
          title={item?.title}
          />
        ))
      }
      </div>
    </div>
  );
}

export default Home;


// 0: "electronics"
// 1: "jewelery"
// 2: "men's clothing"
// 3: "women's clothing"