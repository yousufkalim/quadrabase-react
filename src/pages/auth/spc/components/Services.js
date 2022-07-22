import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Services1 from '../assets/images/presentation/01-Routes & Autoroutes.png';
import Services2 from '../assets/images/presentation/02-Aménagements Urbains.png';
import Services3 from '../assets/images/presentation/03-Réseaux VRD.png';
import Services4 from '../assets/images/presentation/04-Electricite & Eclairage.png';
import Services5 from '../assets/images/presentation/05-Espaces de loisirs.png';
import Services6 from '../assets/images/presentation/06-Mobilier Urbain.png';
import Services7 from '../assets/images/presentation/07-Aménagements_Paysagers.png';
import Services8 from '../assets/images/presentation/08-Signalisation Routière.png';
import Services9 from '../assets/images/presentation/09-Equipements Sportifs.png';
import Services10 from '../assets/images/presentation/10-Environnement & Collecte des Dechets.png';
import Services11 from '../assets/images/presentation/11-Ouvrages de Genie civil.png';
import Services12 from '../assets/images/presentation/12-Batiment.png';

const CustomerReviews = () => {
  const Services = [
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Routes & Autoroutes',
      img: Services1,
    },

    {
      label: 'CUSTOMER SERVICE',
      heading: 'Aménagements urbains',
      img: Services2,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Bâtiments',
      img: Services12,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Construction de réseaux',
      img: Services3,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Electricité & Eclairage',
      img: Services4,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Espaces de loisirs',
      img: Services5,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Mobilier urbain',
      img: Services6,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Aménagements paysagers',
      img: Services7,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Signalisation & Sécurité routière',
      img: Services8,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Equipements sportifs',
      img: Services9,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Environnement & Collecte des déchets',
      img: Services10,
    },
    {
      label: 'CUSTOMER SERVICE',
      heading: 'Ouvrages de génie civil',
      img: Services11,
    },
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1000 },
      items: 4,
      //   slidesToSlide: 5,
    },
    tablet: {
      breakpoint: { max: 1000, min: 641 },
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
          autoPlay={true}
          className="spc_CustomerreviewCarousel"
        >
          {Services.map((item) => (
            <div className="spc_servicegrid">
              <img
                src={item.img}
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                  height: '320px',
                  marginBottom: 10,
                }}
              ></img>
              <p className="spc_customerdescription">{item.heading}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default CustomerReviews;
