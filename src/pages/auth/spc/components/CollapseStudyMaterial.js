import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import api from '../../../../api';

const CollapseStudyMaterial = () => {
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    getSupports();
  }, []);

  const getSupports = async () => {
    const result = await api('get', `/StaticPages/`);
    setMainData(result.data.data.supports);
  };
  return (
    <>
      <Grid container spacing={1}>
        {mainData.map((v, i) => (
          <Single {...v} avatar={i + 1} />
        ))}
      </Grid>
    </>
  );
};

function Single(props) {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(270deg)' : 'rotate(360deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid
      xs={12}
      sm={12}
      md={12}
      sx={{ marginTop: '2%', display: 'flex', justifyContent: 'center' }}
    >
      <Card
        sx={{
          width: '80%',
          background: ' #FFFFFF',
          boxShadow: ' 0px 5px 19px rgba(0, 0, 0, 0.05)',
          borderRadius: '10px',
        }}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={` ${expanded ? 'spc_active' : 'spc_nonactive'}`}>
              {props.avatar}
            </Avatar>
          }
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          }
          title={<Typography className="spc_title">{props.title}</Typography>}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ background: '#F5F6F8', paddingLeft: '2%' }}>
            <div className="support-text" dangerouslySetInnerHTML={{ __html: props.text }}></div>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}

export default CollapseStudyMaterial;
