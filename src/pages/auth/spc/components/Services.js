import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Services1 from "../assets/images/Services1.svg";
import Services2 from "../assets/images/Services2.svg";
import Services3 from "../assets/images/Services3.svg";
import Services4 from "../assets/images/Services4.jpg";
import Services5 from "../assets/images/Services5.jpg";
import Services6 from "../assets/images/Services6.jpg";
import Services7 from "../assets/images/services7.png";
import Services8 from "../assets/images/Services8.jpg";
import Services9 from "../assets/images/Services9.jpg";
import Services10 from "../assets/images/Services10.jpg";
import Services11 from "../assets/images/Services11.jpg";
import Services12 from "../assets/images/Services12.jpg";

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
    {
      label: "CUSTOMER SERVICE",
      heading: "Construction de réseaux",
      img: Services4,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Electricité & Eclairage",
      img: Services5,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Espaces de loisirs",
      img: Services6,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Mobilier urbain",
      img: Services7,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Aménagements paysagers",
      img: Services8,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Signalisation & Sécurité routière",
      img: Services9,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Equipements sportifs",
      img: Services10,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Environnement & Collecte des déchets",
      img: Services11,
    },
    {
      label: "CUSTOMER SERVICE",
      heading: "Ouvrages de génie civil",
      img: Services12,
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
                style={{
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  height: "320px",
                }}
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
