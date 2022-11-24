import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import api from '../../../../api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../../../../utils/markThousand';

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
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
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

export default function DenseTable({
  projectWorkData,
  handleOpenDeleteWorkModal,
  handleOpenDeleteWorkDetailModal,
  handleOpenEditWorkModal,
  handleOpenEditWorkDetailModal,
  handleOpenEditWWDModal,
  currentProject,
  getworks,
}) {
  const { t } = useTranslation();
  const [work, setWork] = useState([]);
  const [workDetails, setWorkDetails] = useState([]);

  // for sorting work and workDetails
  useEffect(() => {
    let tempWork = [];
    let tempWorkDetails = [];
    projectWorkData?.map((item) => {
      let tempWorkObject = item.work;
      tempWorkObject.unit = item.workUnit;
      tempWork.parentId = item._id;
      tempWork.push(tempWorkObject);
      if (item.workDetails) {
        let tempObject = item.workDetails;
        tempObject.parentId = item.work._id;
        tempObject.unit = item.workDetailsUnit;
        tempWorkDetails.push(tempObject);
      }
    });
    tempWork = tempWork.sort((a, b) => a.ranking - b.ranking);
    tempWorkDetails = tempWorkDetails.sort((a, b) => a.ranking - b.ranking);
    setWork(tempWork);
    setWorkDetails(tempWorkDetails);
  }, [projectWorkData]);

  // for level 0 dropdown menu
  const [anchorElLevel0, setAnchorElLevel0] = useState(null);
  const [menuItem0, setMenuItem0] = useState([]);
  const openLevel0 = Boolean(anchorElLevel0);
  const handleAnchorElLevel0Click = (event, item) => {
    setMenuItem0(item);
    setAnchorElLevel0(event.currentTarget);
  };
  const handleAnchorElLevel0Close = () => {
    setAnchorElLevel0(null);
  };

  // for level 1 dropdown menu
  const [anchorElLevel1, setAnchorElLevel1] = useState(null);
  const [menuItem1, setMenuItem1] = useState([]);
  const openLevel1 = Boolean(anchorElLevel1);
  const handleAnchorElLevel1Click = (event, item) => {
    setMenuItem1(item);
    setAnchorElLevel1(event.currentTarget);
  };
  const handleAnchorElLevel1Close = () => {
    setAnchorElLevel1(null);
  };

  // for level 2 dropdown menu
  const [anchorElLevel2, setAnchorElLevel2] = useState(null);
  const [menuItem2, setMenuItem2] = useState([]);
  const [parentItem, setParentItem] = useState([]);
  const openLevel2 = Boolean(anchorElLevel2);
  const handleAnchorElLevel2Click = (event, item, item2) => {
    setParentItem(item2);
    setMenuItem2(item);
    setAnchorElLevel2(event.currentTarget);
  };
  const handleAnchorElLevel2Close = () => {
    setAnchorElLevel2(null);
  };

  // const calculateForwardIndexes = (index) => {
  //   const indexesArr = [];
  //   for (let i = index; i < work.length; i++) {
  //     const _work = work[i];
  //     if (_work._id == work[index]._id) {
  //       indexesArr.push(i);
  //     } else {
  //       break;
  //     }
  //   }
  //   return indexesArr;
  // };

  // const calculateBackwardIndexes = (index) => {
  //   const indexesArr = [index];
  //   for (let i = index - 1; i > 0; i--) {
  //     const _work = work[i];
  //     if (_work._id == work[index]._id) {
  //       indexesArr.push(i);
  //     } else {
  //       break;
  //     }
  //   }
  //   indexesArr.reverse();
  //   return indexesArr;
  // };

  // Work Up
  const handleWorkUp = async (id) => {
    let workCP = structuredClone(work);
    let filteredIndex = workCP.findIndex((_) => _._id == id);
    if (filteredIndex != 0) {
      let prevIndex = filteredIndex - 1;
      let prevWork = workCP[prevIndex];

      const body = {
        work1Id: id,
        work2Id: prevWork._id,
      };

      api('put', `/project/swapWorkRanking/${currentProject._id}`, body).then(() => {
        getworks();
      });
    }
  };

  const handleWorkDown = async (id) => {
    let workCP = structuredClone(work);
    let filteredIndex = workCP.findIndex((_) => _._id == id);
    if (filteredIndex !== work.length - 1) {
      let forwardIndexes = calculateForwardIndexes(filteredIndex);
      let nextIndex = forwardIndexes[forwardIndexes.length - 1] + 1;
      let nextWork = workCP[nextIndex];

      const body = {
        work1Id: id,
        work2Id: nextWork._id,
      };

      api('put', `/project/swapWorkRanking/${currentProject._id}`, body).then(() => {
        getworks();
      });
    }
  };

  const calculateForwardIndexes = (index) => {
    const indexesArr = [];
    for (let i = index; i < work.length; i++) {
      const _work = work[i];
      if (_work._id == work[index]._id) {
        indexesArr.push(i);
      } else {
        break;
      }
    }
    return indexesArr;
  };

  // WorkDetail Up
  const handleWorkDetailUp = async (id) => {
    let filteredIndex = workDetails.findIndex((dt) => dt._id == id);
    if (filteredIndex != 0) {
      let tempArr = [...workDetails];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];
      api('put', `/project/updateWorkDetailRanking/${currentProject._id}`, {
        workDetailId: id,
        ranking: tempArr[prevIndex].ranking,
      }).then(() => {
        api('put', `/project/updateWorkDetailRanking/${currentProject._id}`, {
          workDetailId: prev._id,
          ranking: tempArr[filteredIndex].ranking,
        }).then(() => {
          tempArr[filteredIndex] = workDetails[filteredIndex - 1];
          tempArr[filteredIndex - 1] = workDetails[filteredIndex];
          setWorkDetails(tempArr);
        });
      });
    }
  };

  // const handleWorkDetailUp = async (workId, workDetailId) => {
  //   let workDetailsCP = structuredClone(workDetails);
  //   let filteredIndex = workDetailsCP.findIndex((_) => _._id == workDetailId);
  //   if (filteredIndex != 0) {
  //     let prevIndex = filteredIndex - 1;
  //     let prevWorkDetail = workDetailsCP[prevIndex];

  //     api('put', `/project/swapWorkDetailRanking`, {
  //       projectId: currentProject._id,
  //       workId: workId,
  //       workDetail1Id: workDetailId,
  //       workDetail2Id: prevWorkDetail._id,
  //     }).then(() => {
  //       getworks();
  //     });
  //   }
  // };

  //workDetails Down
  const handleWorkDetailsDown = async (id) => {
    let filteredIndex = workDetails.findIndex((dt) => dt._id == id);

    if (filteredIndex !== workDetails.length - 1) {
      let tempArr = [...workDetails];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];
      api('put', `/project/updateWorkDetailRanking/${currentProject._id}`, {
        workDetailId: id,
        ranking: tempArr[nextIndex].ranking,
      }).then(() => {
        api('put', `/project/updateWorkDetailRanking/${currentProject._id}`, {
          workDetailId: prev._id,
          ranking: tempArr[filteredIndex].ranking,
        }).then(() => {
          tempArr[filteredIndex] = workDetails[nextIndex];
          tempArr[nextIndex] = workDetails[filteredIndex];
          setWorkDetails(tempArr);
        });
      });
    }
  };

  // Duplicate Work
  const handleDuplicateWork = async (id) => {
    const res = await api(
      'post',
      `/project/duplicateWork/${currentProject._id}`,
      {
        workId: id,
      },
      t
    );
    getworks();
    toast.success(t(res.data.message));
  };

  // Duplicate Work Detail
  const handleDuplicateWorkDetail = async (workId, workDetailId) => {
    const res = await api(
      'post',
      `/project/duplicateWorkDetail/${currentProject._id}`,
      {
        workId,
        workDetailId,
      },
      t
    );
    getworks();
    toast.success(t(res.data.message));
  };

  return (
    <>
      {work.map((row, index) => {
        if (workDetails.length === 0) {
          return (
            <TableRow style={{ whiteSpace: 'nowrap' }}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  borderRight: '1px solid lightgray',
                  width: '55vw',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px 16px',
                  fontSize: 15,
                  ['@media (max-width:1665px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '53vw',
                  },
                  ['@media (max-width:1500px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '46vw',
                  },
                  ['@media (max-width:1420px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '44vw',
                  },
                  ['@media (max-width:1355px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '41vw',
                  },
                  ['@media (max-width:1300px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '39vw',
                  },
                  ['@media (max-width:1245px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '36.5vw',
                  },
                  ['@media (max-width:1200px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '38vw',
                  },
                  ['@media (max-width:1150px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '31.5vw',
                  },
                  ['@media (max-width:1100px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '30vw',
                  },
                  ['@media (max-width:1075px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '28vw',
                  },
                  ['@media (max-width:1050px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '26vw',
                  },
                  ['@media (max-width:1020px)']: {
                    // eslint-disable-line no-useless-computed-key
                    width: '24vw',
                  },
                }}
              >
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                 {row.name}
                </div>
                <ArrowDropDownIcon
                  id="demo-positioned-button"
                  aria-controls={openLevel0 ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openLevel0 ? 'true' : undefined}
                  onClick={(e) => handleAnchorElLevel0Click(e, row)}
                  sx={{
                    fontSize: 18,
                    cursor: 'pointer',
                  }}
                />
                {row._id === menuItem0._id && (
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
                    <MenuItem
                      onClick={() => {
                        handleOpenEditWorkModal(menuItem0);
                        handleAnchorElLevel0Close();
                      }}
                    >
                      {t('To Modify')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleOpenDeleteWorkModal(menuItem0._id);
                        handleAnchorElLevel0Close();
                      }}
                    >
                      {t('To Delete')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleDuplicateWork(menuItem0._id);
                        handleAnchorElLevel0Close();
                      }}
                    >
                      {t('Duplicate')}
                    </MenuItem>
                    {/* <MenuItem
                          onClick={() => {
                            handleWorkTop(menuItem0._id);
                            handleAnchorElLevel0Close();
                          }}
                        >
                          {t("Top")}
                        </MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        handleWorkUp(menuItem0._id);
                        handleAnchorElLevel0Close();
                      }}
                    >
                      {t('Up')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleWorkDown(menuItem0._id);
                        handleAnchorElLevel0Close();
                      }}
                    >
                      {t('Down')}
                    </MenuItem>
                    {/* <MenuItem
                          onClick={() => {
                            handleWorkBottom(menuItem0._id);
                            handleAnchorElLevel0Close();
                          }}
                        >
                          {t("Bottom")}
                        </MenuItem> */}
                  </StyledMenu>
                )}
              </TableCell>
              <TableCell
                align="center"
                style={{
                  borderRight: '1px solid lightgray',
                  width: '9vw',
                  padding: '2px 16px',
                  fontSize: 15,
                }}
              >
                {row?.unit?.symbol}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  borderRight: '1px solid lightgray',
                  width: '6vw',
                  padding: '2px 16px',
                  fontSize: 15,
                }}
              >
                 {formatNumber(parseFloat(row.quantity).toFixed(2), '.')}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  borderRight: '1px solid lightgray',
                  width: '6vw',
                  padding: '2px 16px',
                  fontSize: 15,
                }}
              >
             {formatNumber(parseFloat(row.unit_price).toFixed(2))}
              </TableCell>
              <TableCell
                align="right"
                style={{
                  borderRight: '1px solid lightgray',
                  width: '12vw',
                  padding: '2px 16px',
                  fontSize: 15,
                }}
              >
                {formatNumber(parseFloat(row.unit_price * row.quantity).toFixed(2))}
              </TableCell>
            </TableRow>
          );
        } else if (workDetails.length > 0 && row._id !== work[index - 1]?._id) {
          return (
            <>
              <TableRow style={{ whiteSpace: 'nowrap' }}>
                <TableCell
                  sx={{
                    borderRight: '1px solid lightgray',
                    width: '53vw',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 16px',
                    fontSize: 15,
                    ['@media (max-width:1665px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '48vw',
                    },
                    ['@media (max-width:1500px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '41vw',
                    },
                    ['@media (max-width:1420px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '38vw',
                    },
                    ['@media (max-width:1300px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '38vw',
                    },
                    
                    ['@media (max-width:1245px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '28vw',
                    },
                    ['@media (max-width:1200px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '26vw',
                    },
                    ['@media (max-width:1150px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '24vw',
                    },
                    ['@media (max-width:1100px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '22vw',
                    },
                    ['@media (max-width:1075px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '20vw',
                    },
                    ['@media (max-width:1050px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '18vw',
                    },
                    ['@media (max-width:1020px)']: {
                      // eslint-disable-line no-useless-computed-key
                      width: '16vw',
                    },
                  }}
                >
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                   {row?.name}
                  </div>

                  <ArrowDropDownIcon
                    id="demo-positioned-button"
                    aria-controls={openLevel1 ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openLevel1 ? 'true' : undefined}
                    onClick={(e) => handleAnchorElLevel1Click(e, row)}
                    sx={{
                      fontSize: 18,
                      cursor: 'pointer',
                    }}
                  />
                  {row._id === menuItem1._id && (
                    <StyledMenu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorElLevel1}
                      open={openLevel1}
                      onClose={handleAnchorElLevel1Close}
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
                      {row._id === menuItem1._id && (
                        <MenuItem
                          onClick={() => {
                            if (row.unit_price) {
                              handleOpenEditWorkModal(menuItem1);
                            } else {
                              handleOpenEditWWDModal(menuItem1);
                            }
                            handleAnchorElLevel1Close();
                          }}
                        >
                          {t('To Modify')}
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={() => {
                          handleOpenDeleteWorkModal(menuItem1._id);
                          handleAnchorElLevel1Close();
                        }}
                      >
                        {t('To Delete')}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDuplicateWork(menuItem1._id);
                          handleAnchorElLevel1Close();
                        }}
                      >
                        {t('Duplicate')}
                      </MenuItem>
                      {/* <MenuItem
                            onClick={() => {
                              handleWorkTop(menuItem1._id);
                              handleAnchorElLevel1Close();
                            }}
                          >
                            Top
                          </MenuItem> */}
                      <MenuItem
                        onClick={() => {
                          handleWorkUp(menuItem1._id);
                          handleAnchorElLevel1Close();
                        }}
                      >
                        {t('Up')}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleWorkDown(menuItem1._id);
                          handleAnchorElLevel1Close();
                        }}
                      >
                        {t('Down')}
                      </MenuItem>
                      {/* <MenuItem
                            onClick={() => {
                              handleWorkBottom(menuItem1._id);
                              handleAnchorElLevel1Close();
                            }}
                          >
                            Bottom
                          </MenuItem> */}
                    </StyledMenu>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    borderRight: '1px solid lightgray',
                    width: '9vw',
                    padding: '2px 16px',
                    fontSize: 15,
                  }}
                >
                 {row?.unit?.symbol}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    borderRight: '1px solid lightgray',
                    width: '6vw',
                    padding: '2px 16px',
                    fontSize: 15,
                  }}
                >
                  {row.quantity && formatNumber(parseFloat(row.quantity).toFixed(2), '.')}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    borderRight: '1px solid lightgray',
                    width: '6vw',
                    padding: '2px 16px',
                    fontSize: 15,
                  }}
                >
                  {row.unit_price && formatNumber(parseFloat(row.unit_price).toFixed(2))}
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    borderRight: '1px solid lightgray',
                    width: '6vw',
                    padding: '2px 16px',
                    fontSize: 15,
                    textAlign:"left"
                  }}
                >
                  {row.unit_price && row.quantity && formatNumber(parseFloat(row.unit_price * row.quantity).toFixed(2))}
                </TableCell>
              </TableRow>
              {workDetails.map((row2, index) => {
                return (
                  row2.parentId === row._id && (
                    <TableRow style={{ whiteSpace: 'nowrap' }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          borderRight: '1px solid lightgray',
                          width: '53vw',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '2px 16px',
                          fontSize: 15,
                          ['@media (max-width:1665px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '48vw',
                          },
                          ['@media (max-width:1500px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '41vw',
                          },
                          ['@media (max-width:1420px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '38vw',
                          },
                          ['@media (max-width:1300px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '38vw',
                          },
                          
                          ['@media (max-width:1245px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '28vw',
                          },
                          ['@media (max-width:1200px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '26vw',
                          },
                          ['@media (max-width:1150px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '24vw',
                          },
                          ['@media (max-width:1100px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '22vw',
                          },
                          ['@media (max-width:1075px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '20vw',
                          },
                          ['@media (max-width:1050px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '18vw',
                          },
                          ['@media (max-width:1020px)']: {
                            // eslint-disable-line no-useless-computed-key
                            width: '16vw',
                          },
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;
                        <i
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {row2.name}
                        </i>
                        <ArrowDropDownIcon
                          id="demo-positioned-button"
                          aria-controls={openLevel2 ? 'demo-positioned-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={openLevel2 ? 'true' : undefined}
                          onClick={(e) => handleAnchorElLevel2Click(e, row2, row)}
                          sx={{
                            fontSize: 18,
                            cursor: 'pointer',
                          }}
                        />
                        <StyledMenu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorElLevel2}
                          open={openLevel2}
                          onClose={handleAnchorElLevel2Close}
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
                          <MenuItem
                            onClick={() => {
                              handleOpenEditWorkDetailModal(menuItem2);
                              handleAnchorElLevel2Close();
                            }}
                          >
                            {t('To Modify')}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleOpenDeleteWorkDetailModal(menuItem2._id);
                              handleAnchorElLevel2Close();
                            }}
                          >
                            {t('To Delete')}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleDuplicateWorkDetail(parentItem._id, menuItem2._id);
                              handleAnchorElLevel2Close();
                            }}
                          >
                            {t('Duplicate')}
                          </MenuItem>
                          {/* <MenuItem
                                onClick={() => {
                                  handleWorkDetailTop(menuItem2._id);
                                  handleAnchorElLevel2Close();
                                }}
                              >
                                Top
                              </MenuItem> */}
                          <MenuItem
                            onClick={() => {
                              handleWorkDetailUp(parentItem._id, menuItem2._id);
                              handleAnchorElLevel2Close();
                            }}
                          >
                            {t('Up')}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleWorkDetailsDown(menuItem2._id);
                              handleAnchorElLevel2Close();
                            }}
                          >
                            {t('Down')}
                          </MenuItem>
                          {/* <MenuItem
                                onClick={() => {
                                  handleWorkDetailBottom(menuItem2._id);
                                  handleAnchorElLevel2Close();
                                }}
                              >
                                Bottom
                              </MenuItem> */}
                        </StyledMenu>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          borderRight: '1px solid lightgray',
                          width: '9vw',
                          padding: '2px 16px',
                          fontSize: 15,
                        }}
                      >
                        {row2?.unit?.symbol}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          borderRight: '1px solid lightgray',
                          width: '6vw',
                          padding: '2px 16px',
                          fontSize: 15,
                        }}
                      >
                        {formatNumber(parseFloat(row2.quantity).toFixed(2), '.')}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          borderRight: '1px solid lightgray',
                          width: '6vw',
                          padding: '2px 16px',
                          whiteSpace: 'nowrap',
                          fontSize: 15,
                          
                        }}
                      >
                        {formatNumber(parseFloat(row2.unit_price).toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          borderRight: '1px solid lightgray',
                          width: '12vw',
                          padding: '2px 16px',
                          fontSize: 15,
                          textAlign:"left"
                        }}
                      >
                        {formatNumber(parseFloat(row2.quantity * row2.unit_price).toFixed(2))}
                      </TableCell>
                    </TableRow>
                  )
                );
              })}
            </>
          );
        }
      })}
    </>
  );
}
