import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Services1 from "../assets/images/Services1.svg";
import Services2 from "../assets/images/Services2.svg";
import Services3 from "../assets/images/Services3.svg";

const CustomerReviews = () => {
  const Services = [
    {
      label: "CUSTOMER SERVICE",
      heading: "Routes & Autoroutes",
      img: Services1,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Aménagements urbains",
      img: Services2,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Bâtiments",
      img: Services3,
    },
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1438 },
      items: 3,
      //   slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1438, min: 641 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 641, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className="spc_Customerreviewcaruseldiv1">
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={true}
          autoPlay={false}
          className="spc_CustomerreviewCarousel"
        >
          {Services.map((item) => (
            <div className="spc_servicegrid">
              <img
                src={item.img}
                style={{ width: "100%", objectFit: "cover" }}
              ></img>

              <h5 className="spc_customername">{item.label}</h5>
              <p className="spc_customerdescription">{item.heading}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default CustomerReviews;
