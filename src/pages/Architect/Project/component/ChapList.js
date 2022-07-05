import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import api from '../../../../api';

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

export default function NestedList({
  editChap0Part2,
  handleOpenEditChapModal,
  handleOpenDeleteChapModal,
  currentProject,
  setEditChap0Part2,
  handleOpenAddChapModal,
  setParentChap,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState('');
  const [anchorElLevel0, setAnchorElLevel0] = React.useState(null);
  const [menuItem0, setMenuItem0] = React.useState({});

  const openLevel0 = Boolean(anchorElLevel0);
  const handleAnchorElLevel0Click = (event, item, type) => {
    setMenuItem0({ item, type });
    setAnchorElLevel0(event.currentTarget);
  };
  const handleAnchorElLevel0Close = () => {
    setAnchorElLevel0(null);
  };

  const handleClick = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
      setOpen2('');
    }
  };
  const handleClick2 = (id) => {
    if (id) {
      setOpen2(id);
    } else {
      setOpen2('');
    }
  };

  //Level Up
  const handleLevelUp = async () => {
    let chap = [];
    if (menuItem0.type === 'level1') {
      chap = editChap0Part2.id.level2;
    } else if (menuItem0.type === 'level2') {
      editChap0Part2.id.level2.map((item) => {
        item.level3.map((item2) => {
          if (item2._id.toString() === menuItem0.item._id.toString()) {
            chap = item.level3;
          }
        });
      });
    }

    let filteredIndex = chap.findIndex((dt) => dt._id == menuItem0.item._id);
    if (filteredIndex != 0) {
      let tempArr = [...chap];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];
      api('put', `/ArchitectsChap0/editChapLevel/${currentProject.chap0part2.id._id}`, {
        id: menuItem0.item._id,
        ranking: tempArr[prevIndex].ranking,
        type: menuItem0.type,
      }).then(() => {
        api('put', `/ArchitectsChap0/editChapLevel/${currentProject.chap0part2.id._id}`, {
          id: prev._id,
          ranking: tempArr[filteredIndex].ranking,
          type: menuItem0.type,
        }).then(() => {
          tempArr[filteredIndex] = chap[filteredIndex - 1];
          tempArr[filteredIndex - 1] = chap[filteredIndex];

          setEditChap0Part2((prev) => {
            if (menuItem0.type === 'level1') {
              prev.id.level2 = tempArr;
            } else if (menuItem0.type === 'level2') {
              prev.id.level2.map((item) => {
                item.level3.map((item2) => {
                  if (item2._id.toString() === menuItem0.item._id.toString()) {
                    item.level3 = tempArr;
                  }
                });
              });
            }
            return { ...prev };
          });
        });
      });
    }
  };

  //Level Down
  const handleLevelDown = async (id) => {
    let chap = [];
    if (menuItem0.type === 'level1') {
      chap = editChap0Part2.id.level2;
    } else if (menuItem0.type === 'level2') {
      editChap0Part2.id.level2.map((item) => {
        item.level3.map((item2) => {
          if (item2._id.toString() === menuItem0.item._id.toString()) {
            chap = item.level3;
          }
        });
      });
    }

    let filteredIndex = chap.findIndex((dt) => dt._id == menuItem0.item._id);

    if (filteredIndex !== chap.length - 1) {
      let tempArr = [...chap];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];
      api('put', `/ArchitectsChap0/editChapLevel/${currentProject.chap0part2.id._id}`, {
        id: menuItem0.item._id,
        ranking: tempArr[nextIndex].ranking,
        type: menuItem0.type,
      }).then(() => {
        api('put', `/ArchitectsChap0/editChapLevel/${currentProject.chap0part2.id._id}`, {
          id: prev._id,
          ranking: tempArr[filteredIndex].ranking,
          type: menuItem0.type,
        }).then(() => {
          tempArr[filteredIndex] = chap[nextIndex];
          tempArr[nextIndex] = chap[filteredIndex];
          setEditChap0Part2((prev) => {
            if (menuItem0.type === 'level1') {
              prev.id.level2 = tempArr;
            } else if (menuItem0.type === 'level2') {
              prev.id.level2.map((item) => {
                item.level3.map((item2) => {
                  if (item2._id.toString() === menuItem0.item._id.toString()) {
                    item.level3 = tempArr;
                  }
                });
              });
            }
            return { ...prev };
          });
        });
      });
    }
  };

  return (
    <>
      <StyledMenu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElLevel0}
        open={openLevel0}
        onClose={handleAnchorElLevel0Close}
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
        {(menuItem0.type === 'level0' || menuItem0.type === 'level1') && (
          <MenuItem
            onClick={() => {
              setParentChap(editChap0Part2);
              handleOpenAddChapModal(menuItem0);
              handleAnchorElLevel0Close();
            }}
          >
            {t('Add Level')}
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setParentChap(editChap0Part2);
            handleOpenEditChapModal(menuItem0);
            handleAnchorElLevel0Close();
          }}
        >
          {t('To Modify')}
        </MenuItem>
        {menuItem0.type !== 'level0' && (
          <>
            <MenuItem
              onClick={() => {
                setParentChap(editChap0Part2);
                handleOpenDeleteChapModal(menuItem0);
                handleAnchorElLevel0Close();
              }}
            >
              {t('To Delete')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLevelUp(menuItem0);
                handleAnchorElLevel0Close();
              }}
            >
              {t('Up')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLevelDown(menuItem0);
                handleAnchorElLevel0Close();
              }}
            >
              {t('Down')}
            </MenuItem>
          </>
        )}
      </StyledMenu>

      <ListItem>
        <ListItemIcon style={{ cursor: 'pointer' }} onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText
          primary={
            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
              {editChap0Part2.id.title}
            </div>
          }
        />
        <IconButton onClick={(e) => handleAnchorElLevel0Click(e, editChap0Part2.id, 'level0')}>
          <MoreVertIcon />
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {editChap0Part2.id.level2.map((item) => {
            return (
              <>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (item._id !== open2) {
                        handleClick2(item._id);
                      } else {
                        handleClick2();
                      }
                    }}
                  >
                    {open2 === item._id ? <ExpandLess /> : <ExpandMore />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (item._id !== open2) {
                            handleClick2(item._id);
                          } else {
                            handleClick2();
                          }
                        }}
                      >
                        {item.title}
                      </div>
                    }
                  />
                  <IconButton onClick={(e) => handleAnchorElLevel0Click(e, item, 'level1')}>
                    <MoreVertIcon />
                  </IconButton>
                </ListItem>
                <Collapse in={open2 === item._id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.level3.map((item2) => {
                      return (
                        <ListItem sx={{ pl: 8 }}>
                          <ListItemIcon>
                            <FiberManualRecordIcon />
                          </ListItemIcon>
                          <ListItemText primary={item2.title} />
                          <IconButton
                            onClick={(e) => handleAnchorElLevel0Click(e, item2, 'level2')}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </ListItem>
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
}
