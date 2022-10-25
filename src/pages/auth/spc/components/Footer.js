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
            <a  href='/auth/terms'  style={{ cursor: 'pointer' }} target="_blank">
              CGU
            </a>
            &nbsp;&nbsp;&nbsp;
            <a href='/auth/cgv'   style={{ cursor: 'pointer' }}  target="_blank">
              CGV
            </a>
            &nbsp;&nbsp;&nbsp;
            <a  href='/auth/privacy'
            //  onClick={() => history.push('/auth/privacy')} 
             style={{ cursor: 'pointer' }}  target="_blank"> 
              Politique de confidentialité
            </a>
            &nbsp;&nbsp;&nbsp;
            <a  href='/auth/mentionlegal'
            //  onClick={() => history.push('/auth/privacy')} 
             style={{ cursor: 'pointer' }}  target="_blank"> 
              Mentions légales 
            </a>
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
