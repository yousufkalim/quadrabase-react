import React from 'react';
import q4 from '../assets/images/q4.png';
import Quadralogo from '../assets/images/Quadralogo.svg';
import { useHistory } from 'react-router-dom';

const Footer = () => {
  const history = useHistory();
  return (
    <div className="footer-container">
      <img src={q4} className="q4-logo" />
      <div className="footer-flex-container">
        <div className="footer-left-conatiener">
          <img
            src={Quadralogo}
            className="quadrabase-logo"
            onClick={() => history.push('/auth/home')}
          />
          <div className="link-container">
            <span onClick={() => history.push('/auth/terms')} style={{ cursor: 'pointer' }}>
              CGU
            </span>
            &nbsp;&nbsp;&nbsp;
            <span onClick={() => history.push('/auth/cgv')} style={{ cursor: 'pointer' }}>
              CGV
            </span>
            &nbsp;&nbsp;&nbsp;
            <span onClick={() => history.push('/auth/privacy')} style={{ cursor: 'pointer' }}>
              Politique de confidentialité
            </span>
          </div>
        </div>
        <div className="footer-right-conatiener">
          <div onClick={() => history.push('/auth/support')} style={{ cursor: 'pointer' }}>
            Supports pédagogiques
          </div>
          <div onClick={() => history.push('/auth/documentation')} style={{ cursor: 'pointer' }}>
            Documentation
          </div>
          <div onClick={() => history.push('/auth/fabricant')} style={{ cursor: 'pointer' }}>
            Fabricants
          </div>
          <div onClick={() => history.push('/auth/libraries')} style={{ cursor: 'pointer' }}>
            Bibliothèques
          </div>
          <div onClick={() => history.push('/auth/services')} style={{ cursor: 'pointer' }}>
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
