import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CircleIcon from '@mui/icons-material/Circle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'tp',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 150,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    border: '1px solid lightgray',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    backgroundColor: '#fff8e3',
    color: 'gray',
  },
});

const screenSize = window.innerWidth;

const NestedList = (props) => {
  const { t } = useTranslation();
  // for level 1
  const [openLevel1, setOpenLevel1] = React.useState('');

  const handleClick = (id) => {
    if (id) {
      setOpenLevel1(id);
    } else {
      setOpenLevel1('');
    }
  };

  // for level 2
  const [openLevel2, setOpenLevel2] = React.useState('');

  const handleClicklevel2 = (id) => {
    if (id) {
      setOpenLevel2(id);
    } else {
      setOpenLevel2('');
    }
  };

  // for level 3
  const [openLevel3, setOpenLevel3] = React.useState('');

  const handleClicklevel3 = (id) => {
    if (id) {
      setOpenLevel3(id);
    } else {
      setOpenLevel3('');
    }
  };

  // dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuItem, setMenuItem] = React.useState([]);
  const openLevel = Boolean(anchorEl);
  const handleAnchorElClick = (event, item) => {
    console.log("item",item)
    setMenuItem(item);
    setAnchorEl(event.currentTarget);
  };
  const handleAnchorElClose = () => {
    setAnchorEl(null);
  };
  console.log("props",props)

  return (
    <List
      sx={{
        width: props.width,
        maxHeight: props.maxHeight,
        minHeight: '2vh',
        postion: 'relative',
        overflow: 'scroll',
        overflowX: 'hidden',
        backgroundColor: '#e3e2e5',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
        paddingTop: 0,
        paddingBottom: 0,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <StyledMenu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openLevel}
        onClose={handleAnchorElClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ mt: 1 }}
      >
        {menuItem?.bpu_text?.length >= 1 &&
          menuItem?.bpu_text?.map((bpu, index) => {
            if (bpu.length > 5)
              return (
                <MenuItem
                  onClick={() => {
                    props.openCctpModal(bpu, 'BPU');
                    handleAnchorElClose();
                  }}
                >
                  Texte BPU
                </MenuItem>
              );
          })}
         
         {menuItem?.cctp_text?.filter(a => a !== "").length >= 1 ?
          menuItem?.cctp_text?.map((cctp, index) => {
            if (cctp.length > 5){
              return (
                <MenuItem
                  onClick={() => {
                    props.openCctpModal(cctp, `CCTP ${index + 1}`);
                    handleAnchorElClose();
                  }}
                >
                  Texte CCTP {index + 1}
                </MenuItem>
              );
            }
          }):(<>
          {menuItem?.bpu_text ==undefined && <MenuItem>
          
          {"Pas de texte"}
        </MenuItem>}
          </>) }
        {menuItem?.providers?.length >= 1 && menuItem?.providers[0]?.documents?.length >= 1 && (
          <>
            <Divider />
            <MenuItem
              onClick={() => {
                window.open(menuItem?.providers[0].documents[0].uri, '_blank');
                handleAnchorElClose();
              }}
            >
              {t('Technical Doc')}
            </MenuItem>
          </>
        )}
        {menuItem?.providers?.length >= 1 && (
          <>
            <Divider />
            <MenuItem
              onClick={() => {
                props.handleOpenProvidersModal(menuItem.providersList);
                handleAnchorElClose();
              }}
            >
              {t('Providers')}
            </MenuItem>
          </>
        )}
        {menuItem?.cctp_text?.length === 0 &&
          (typeof menuItem?.bpu_text === 'undefined' || menuItem?.bpu_text?.length === 0) &&
          (typeof menuItem?.providers === 'undefined' || menuItem?.providers?.length === 0) && (
            <MenuItem disabled>{t('No text')}</MenuItem>
          )}
      </StyledMenu>
      {props.level1?.map((item) => {
        let open = openLevel1 === item._id;
        return (
          <>
            <ListItem
              sx={{
                height: 28,
              }}
            >
              <ListItemIcon sx={{ mr: -3 }}>
                {open ? (
                  <ExpandLess
                    sx={{
                      color: '#f2966c',
                      fontSize: 24,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleClick();
                      handleClicklevel2();
                      props.setLevel2([]);
                      props.setLevel3([]);
                    }}
                  />
                ) : (
                  <ExpandMore
                    sx={{
                      color: '#f2966c',
                      fontSize: 24,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleClick(item._id);
                      props.getLevel2(item._id);
                    }}
                  />
                )}
              </ListItemIcon>

              <ListItemText
                primary={
                  <div
                    style={{
                      fontSize: 13,
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 900,
                    }}
                  >
                    <NoMaxWidthTooltip
                      title={item?.name}
                      placement="top"
                      TransitionComponent={Zoom}
                    >
                      <div
                        onClick={() => {
                          if (!open) {
                            handleClick(item._id);
                            props.getLevel2(item._id);
                          } else {
                            handleClick();
                            handleClicklevel2();
                            props.setLevel2([]);
                            props.setLevel3([]);
                          }
                        }}
                        style={{
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item?.name}
                      </div>
                    </NoMaxWidthTooltip>
                    <ArrowDropDownIcon
                      id="demo-positioned-button"
                      aria-controls={openLevel ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openLevel ? 'true' : undefined}
                      onClick={(e) => handleAnchorElClick(e, item)}
                      sx={{
                        fontSize: 18,
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                }
              />
            </ListItem>
            {props.loading === item._id && <LinearProgress color="inherit" />}
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {props.level2?.map((item2) => {
                  let open2 = openLevel2 === item2._id;
                  return (
                    <>
                      <ListItem sx={{ pl: 4, height: 28 }}>
                        <ListItemIcon sx={{ mr: -3 }}>
                          {open2 ? (
                            <ExpandLess
                              sx={{
                                color: '#f2966c',
                                fontSize: 24,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                props.setLevel3([]);
                                handleClicklevel2();
                              }}
                            />
                          ) : (
                            <ExpandMore
                              sx={{
                                color: '#f2966c',
                                fontSize: 24,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                handleClicklevel2(item2._id);
                                props.getLevel3(item2._id);
                              }}
                            />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <div
                              style={{
                                fontSize: 13,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <NoMaxWidthTooltip
                                title={item2?.name}
                                placement="top"
                                TransitionComponent={Zoom}
                              >
                                <div
                                  onClick={() => {
                                    if (!open2) {
                                      handleClicklevel2(item2._id);
                                      props.getLevel3(item2._id);
                                    } else {
                                      props.setLevel3([]);
                                      handleClicklevel2();
                                    }
                                  }}
                                  style={{
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {item2?.name}
                                </div>
                              </NoMaxWidthTooltip>
                              <ArrowDropDownIcon
                                id="demo-positioned-button"
                                aria-controls={openLevel ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openLevel ? 'true' : undefined}
                                onClick={(e) => handleAnchorElClick(e, item2)}
                                sx={{
                                  fontSize: 18,
                                  cursor: 'pointer',
                                }}
                              />
                            </div>
                          }
                        />
                      </ListItem>
                      {props.loading === item2._id && <LinearProgress color="inherit" />}
                      <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {props.level3?.map((item3) => {
                            let open3 = openLevel3 === item3._id;
                            return (
                              <>
                                <ListItem sx={{ pl: 8, height: 28 }}>
                                  <ListItemIcon sx={{ mr: -3 }}>
                                  {open3 ? (
                            <ExpandLess
                              sx={{
                                color: '#f2966c',
                                fontSize: 24,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                props.setLevel4([]);
                                handleClicklevel3();
                              }}
                            />
                          ) : (
                            <ExpandMore
                              sx={{
                                color: '#f2966c',
                                fontSize: 24,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                handleClicklevel3(item3._id);
                                props.getLevel4(item3);
                              }}
                            />
                          )}

                                    {/* <CircleIcon
                                      sx={{
                                        color: '#f2966c',
                                        fontSize: 14,
                                      }}
                                    /> */}
                                    
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <NoMaxWidthTooltip
                                        title={item3?.name}
                                        placement="top"
                                        TransitionComponent={Zoom}
                                      >
                                        <div
                                          style={{
                                            fontSize: 13,
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'default',
                                          }}
                                        >
                                          <div
                                            style={{
                                              whiteSpace: 'nowrap',
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                            }}
                                          >
                                            {item3?.name}
                                          </div>
                                          <ArrowDropDownIcon
                                            id="demo-positioned-button"
                                            aria-controls={
                                              openLevel ? 'demo-positioned-menu' : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={openLevel ? 'true' : undefined}
                                            onClick={(e) => handleAnchorElClick(e, item3)}
                                            sx={{
                                              fontSize: 18,
                                              cursor: 'pointer',
                                            }}
                                          />
                                        </div>
                                      </NoMaxWidthTooltip>
                                    }
                                  />
                                  <AddCircleRoundedIcon
                                    sx={{
                                      color: '#f2966c',
                                      fontSize: 18,
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => props.openModal(item3)}
                                  />
                                </ListItem>

{/* add work detailZ */}

{props.loading === item3._id && <LinearProgress color="inherit" />}
                      <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {props.level4?.map((item4) => {
                            return (
                              <>
                              {/* {console.log("item4",item4)} */}
                                <ListItem sx={{ pl: 12, height: 28}}>
                                  <ListItemIcon sx={{ mr: -4 }}>
                                    <CircleIcon
                                      sx={{
                                        color: '#f2966c',
                                        fontSize: 11,
                                      }}
                                    />
                                    
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <NoMaxWidthTooltip
                                        title={item4?.name}
                                        placement="top"
                                        TransitionComponent={Zoom}
                                      >
                                        <div
                                          style={{
                                            fontSize: 11,
                                            display: 'flex',
                                            alignItems: 'center',
                                            cursor: 'default',
                                          }}
                                        >
                                          <div
                                            style={{
                                              whiteSpace: 'nowrap',
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                            }}
                                          >
                                            {item4?.name}aa
                                          </div>
                                          {/* <ArrowDropDownIcon
                                            id="demo-positioned-button"
                                            aria-controls={
                                              openLevel ? 'demo-positioned-menu' : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={openLevel ? 'true' : undefined}
                                            // onClick={(e) => handleAnchorElClick(e, item3)}
                                            sx={{
                                              fontSize: 18,
                                              cursor: 'pointer',
                                            }}
                                          /> */}
                                        </div>
                                      </NoMaxWidthTooltip>
                                    }
                                  />
                                  {/* <AddCircleRoundedIcon
                                    sx={{
                                      color: '#f2966c',
                                      fontSize: 18,
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => props.openModal(item3)}
                                  /> */}
                                </ListItem>

                </>
              );
            })}  
            </List>
            </Collapse>
{/* end */}

                              </>
                            );
                          })}
                        </List>
                      </Collapse>
                    </>
                  );
                })}
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
};

export default NestedList;
