import React from 'react';
import q4 from '../assets/images/q4.png';
import Quadralogo from '../assets/images/Quadralogo.svg';
import { useHistory } from 'react-router-dom';

const Footer = () => {
  const hisory = useHistory();
  return (
    <div className="footer-container">
      <img src={q4} className="q4-logo" />
      <div className="footer-flex-container">
        <div className="footer-left-conatiener">
          <img src={Quadralogo} className="quadrabase-logo" />
          <div className="link-container">
            <span onClick={() => hisory.push('/auth/terms')} style={{ cursor: 'pointer' }}>
              CGU
            </span>
            &nbsp;&nbsp;&nbsp;
            <span onClick={() => hisory.push('/auth/cgv')} style={{ cursor: 'pointer' }}>
              CGV
            </span>
            &nbsp;&nbsp;&nbsp;
            <span onClick={() => hisory.push('/auth/privacy')} style={{ cursor: 'pointer' }}>
              Politique de confidentialité
            </span>
          </div>
        </div>
        <div className="footer-right-conatiener">
          <div onClick={() => hisory.push('/auth/support')} style={{ cursor: 'pointer' }}>
            Supports pédagogiques
          </div>
          <div onClick={() => hisory.push('/auth/documentation')} style={{ cursor: 'pointer' }}>
            Documentation
          </div>
          <div onClick={() => hisory.push('/auth/fabricant')} style={{ cursor: 'pointer' }}>
            Fabricants
          </div>
          <div onClick={() => hisory.push('/auth/libraries')} style={{ cursor: 'pointer' }}>
            Bibliothèques
          </div>
          <div onClick={() => hisory.push('/auth/services')} style={{ cursor: 'pointer' }}>
            Produits
          </div>
        </div>
      </div>
      <div className="footer-copyright-container">
        <div>
          <b> © 2022</b>
          <span style={{ color: '#FF8616' }}> Quadrabase</span> Développé par{' '}
          <b> Falcon Consulting</b> Tous droits réservés
        </div>
      </div>
    </div>
  );
};

export default Footer;
