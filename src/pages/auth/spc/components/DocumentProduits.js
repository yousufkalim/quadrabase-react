import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Icon7 from '../../spc/assets/images/icon7.svg';
import Icon8 from '../../spc/assets/images/icon8.svg';
import Icon9 from '../../spc/assets/images/icon9.svg';
import Icon10 from '../../spc/assets/images/icon10.svg';
import Arrow from '../../spc/assets/images/arrow.svg';

const DocumentProduits = () => {
  let cardData = [
    {
      icon: Icon7,
      heading: 'ESTIMATION',
      text: "Ce document n'est pas diffusé.Le montant total de l'estimation financière résulte de la somme des produits des quantités estimées par les prix unitaires."
    },
    {
      icon: Icon8,
      heading: 'DQE',
      text: 'Le Détail Quantitatif et Estimatif (DQE) est le document, en principe non contractuel, qui liste les ouvrages et prestations à réaliser dans le cadre du projet. Il est destiné à permettre la comparaison des prix entre les offres des candidats.'
    },
    {
      icon: Icon9,
      heading: 'BPU',
      text: "Le Bordereau des Prix Unitaire (BPU) est le document contractuel destiné à décrire plus en détail le contenu des ouvrages et prestations à réaliser. Il représente l'offre financière du candidat pour chacun des ouvrages ou prestations à réaliser dans le cadre du projet."
    },
    {
      icon: Icon10,
      heading: 'CCTP',
      text: 'Le Cahier des Clauses Techniques Particulières (CCTP) est le document contractuel qui rassemble les prescriptions techniques et réglementaires qui devront être prises en compte pour la réalisation des ouvrages ou prestations. Il complète le BPU.'
    }
  ];

  return (
    <>
      <div className="spc_home_heading">
        <Typography className="spc_home_heading_typo">
          Les documents produits
        </Typography>
      </div>
      <Grid container spacing={1} className="spc_grid_btm">
        {cardData.map((_) => (
          <Single {..._} />
        ))}
      </Grid>
    </>
  );
};

function Single(props) {
  return (
    <Grid xs={12} sm={12} md={2.5} className="spc_home_bottom_gird">
      <img src={props.icon} style={{ marginBottom: '10%' }}></img>

      <Typography className="spc_grid_heading" sx={{ paddingBottom: '5%' }}>
        {props.heading}
      </Typography>
      <Divider
        variant="middle"
        sx={{
          background: '#F76820',
          borderWidth: '3px',
          width: '35%',
          borderRadius: '20px',
          marginBottom: '10%'
        }}
      />

      <div>
        <Typography
          className="spc_grid_para"
          sx={{ paddingBottom: '5%', height: '140px', overFlow: 'hidden' }}
        >
          {props.text}
        </Typography>
      </div>
    </Grid>
  );
}

export default DocumentProduits;
