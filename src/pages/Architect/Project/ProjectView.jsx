// init
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../../../api';
import { useStyles } from '../../../css/projectView';
import BuildIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout';
import { Store } from '../../../StoreContext';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import LayersIcon from '@mui/icons-material/Layers';
import { useTranslation } from 'react-i18next';
import ListIcon from '@mui/icons-material/List';
import { formatNumber } from '../../../utils/markThousand';

// components
import Header from '../../../components/Architect/Header';
import { Button, Box, Divider } from '@mui/material';
import InputDropdown from '../../../components/Architect/InputDropdown';
import NestedList from './component/NestedList';
import TradeTable from './component/TradeTable';
import Modal from '../../../components/Architect/Modal';
import AddWorkDetailsModal from './Modals/AddWorkDetailsModal';
import AddWorkModal from './Modals/AddWorkModal';
import ReportEstimationModal from './Modals/ReportEstimationModal';
import ReportDQEModal from './Modals/ReportDQEModal';
import ReportBPUModal from './Modals/ReportBPUModal';
import ReportSelectCCTPModal from './Modals/ReportSelectCCTPModal';
import ReportCCTPModal from './Modals/ReportCCTPModal';
import ReportDPGFModal from './Modals/ReportDPGFModal';
import TracnhesModal from './Modals/TranchesModal';
import TradesModal from './Modals/TradesModal';
import UpdateTradesModal from './Modals/UpdateTradesModal';
import UpdateTranchesModal from './Modals/UpdateTranchesModal';
import ProviderModal from './Modals/ProvidersModal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PropertiesModal from './Modals/PropertiesModal';
import CctpModal from './Modals/CctpModal';
import DeleteModal from '../../../components/Architect/DeleteModal';
import EditWorkModal from './Modals/EditWorkModal';
import EditWWDModal from './Modals/EditWWDModal';
import EditWorkDetailModal from './Modals/EditWorkDetailModal';
import EditChap0Part2 from './Modals/EditChap0Part2';
import EditChapModal from './Modals/EditChapModal';
import AddChapLevel from './Modals/AddChapLevel';
import Loader from './component/Loader';
import { styled, alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TechnicalDocModal from './Modals/TechnicalDoc';

// Reports
import {
  exportPDFSimpleEstimation,
  exportPDFTradesEstimation,
  exportPDFTradesAndTranchesEstimation,
  exportPDFSimpleBPU,
  exportPDFTradesBPU,
  exportPDFTradesAndTranchesBPU,
  exportPDFSimpleDPGF,
  exportPDFTradesDPGF,
  exportPDFTradesAndTrancesDPGF,
  exportPDFSimpleCCTP,
  exportPDFTradesCCTP,
  exportPDFTradesAndTranchesCCTP,
} from './ReportsGen/genPDF';

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

const ProjectView = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const history = useHistory();
  const { id } = params;
  const classes = useStyles();
  const store = Store();

  //   states
  const [currentProject, setCurrentProject] = useState({});
  const [generalLibrariesData, setGeneralLibrariesData] = useState();
  const [openWorkModal, setOpenWorkModal] = useState(false);
  const [openWorkDetailModal, setOpenWorkDetailModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState();
  const [workDetails, setWorkDetails] = useState();
  const [selectedWorkDetail, setSelectedWorkDetail] = useState([]);
  const [projectWorkData, setProjectWorkData] = useState([]);
  const [cctpProjectWorkData, setcctpProjectWorkData] = useState([]);
  const [totalHT, setTotalHT] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [openPropertiesModal, setOpenPropertiesModal] = useState(false);
  const [openCctpModal, setOpenCctpModal] = useState(false);
  const [cctpModalTitle, setCctpModalTitle] = useState('');
  const [cctp_text, setCctp_text] = useState();
  const [openDeleteWorkModal, setOpenDeleteWorkModal] = useState(false);
  const [deleteWorkId, setDeleteWorkId] = useState();
  const [openDeleteWorkDetailModal, setOpenDeleteWorkDetailModal] = useState(false);
  const [deleteWorkDetailId, setDeleteWorkDetailId] = useState();
  const [openEditWorkModal, setOpenEditWorkModal] = useState(false);
  const [openEditWWDModal, setOpenEditWWDModal] = useState(false);
  const [editWork, setEditWork] = useState();
  const [openEditWorkDetailModal, setOpenEditWorkDetailModal] = useState(false);
  const [editWorkDetail, seteditWorkDetail] = useState();
  const [openEditChap0Part2Modal, setOpenEditChap0Part2Modal] = useState(false);
  const [openEditChapModal, setOpenEditChapModal] = useState(false);
  const [openAddChapModal, setOpenAddChapModal] = useState(false);
  const [editChap0Part2, setEditChap0Part2] = useState();
  const [editChapItem, setEditChapItem] = useState();
  const [openDeleteChap, setOpenDeleteChap] = useState(false);
  const [deleteChap, setDeleteChap] = useState({});
  const [parentChap, setParentChap] = useState({});

  // Estim, DQE, BPU Reports
  const [openEstimationReportModal, setOpenEstimationReportModal] = useState(false);
  const [openDQEReportModal, setOpenDQEReportModal] = useState(false);
  const [openBPUReportModal, setOpenBPUReportModal] = useState(false);

  // CCTP Report
  const [openSelectCCTPReportModal, setOpenSelectCCTPReportModal] = useState(false);
  const [openCCTPReportModal, setOpenCCTPReportModal] = useState(false);
  const [selectedCCTPIndexes, setSelectedCCTPIndexes] = useState([]);

  // DPGF Report
  const [openDPGFReportModal, setOpenDPGFReportModal] = useState(false);

  const [works, setworks] = useState([]);
  const [tradeTotal, setTradeTotal] = useState([]);
  const [openTranchesModal, setOpenTranchesModal] = useState(false);
  const [openTradesModal, setOpenTradesModal] = useState(false);
  const [openUpdateTradesModal, setOpenUpdateTradesModal] = useState(false);
  const [openUpdateTranchesModal, setOpenUpdateTranchesModal] = useState(false);
  const [openProvidersModal, setOpenProvidersModal] = useState(false);
  const [providerList, setProviderList] = useState([]);
  const [options, setOptions] = useState();
  const [selectedFamily, setSelectedFamily] = useState();
  const [categories, setCategories] = useState();
  const [tradesData, setTradesData] = useState([]);
  const [openDeleteTradeModal, setOpenDeleteTradeModal] = useState(false);
  const [openDeleteTranchModal, setOpenDeleteTranchModal] = useState(false);
  const [selectedData, setSelectedData] = useState({
    type: '',
    data: {},
  });
  const [tranchesData, setTranchesData] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState('');
  const [selectedTranche, setSelectedTranche] = useState('');
  const [technicalDoc, setTechnicalDoc] = useState([]);
  const [openDocModal, setOpenDocModal] = useState(false);

  // loader states
  const [loading, setLoading] = useState(true); // main loader
  const [loadingLevel, setLoadingLevel] = useState(''); // work level loading

  // doc state
  const [blob, setBlob] = useState(null);
  const [filename, setFilename] = useState(null);

  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    currentProject.name && getworks();
    currentProject._id && getTrades();
  }, [currentProject]);
  useEffect(() => {
    if (selectedTrade) {
      getTranches();
    }
  }, [selectedTrade]);

  useEffect(() => {
    getProjectLibraries();
  }, [store.user]);

  useEffect(() => {
    if (selectedFamily && store.user && options) {
      let tempFam = options.find((item) => item._id === selectedFamily);
      let famName = tempFam.name.toUpperCase();
      if (famName === 'PRESCRIPTEUR') {
        getProjectLibraries();
      } else {
        getGeneralLib();
      }
    }
  }, [selectedFamily, store.user, options]);

  // useEffect to get all families
  useEffect(() => {
    getFamilies();
  }, []);

  const getFamilies = async () => {
    const result = await api('get', `/Families/architect/getAll`);
    let temp = result.data.families.find((item) => {
      let name = item.name.toUpperCase();
      return name === 'TRAVAUX PUBLICS';
    });
    setSelectedFamily(temp._id);
    setOptions(result.data.families.sort((a, b) => a.ranking - b.ranking));
  };

  // func to get current project
  const getProject = async () => {
    const result = await api('get', `/project/${id}`);
    setCurrentProject(result?.data?.project);
    let chap = result?.data?.project?.chap0part2;
    chap.map((parentItem) => {
      parentItem?.id?.level2?.map((item) => {
        item.level3 = item?.level3?.sort((a, b) => a.ranking - b.ranking);
      });
      parentItem.id.level2 = parentItem?.id?.level2?.sort((a, b) => a.ranking - b.ranking);
    });
    setEditChap0Part2(chap);
  };

  // func to get current project
  const getworks = async () => {
    if (currentProject.market_type === 'TradesAndTranches') {
      const result = await api('get', `/project/worksByTranches/${id}`);
      let data = result?.data?.works.sort((a, b) => a.ranking - b.ranking);
      let tempAmount = 0;
      let tempArray = [];
      data.map((dat, index1) => {
        let tempSum = 0;
        dat.data.map((item, index) => {
          let temp = 0;
          if (!item.workDetails) {
            temp += item.work.unit_price * item.work.quantity;
          } else {
            if (item?.work?._id !== data[index - 1]?.work?._id) {
              temp += item.workDetails.quantity * item.workDetails.unit_price;
            } else {
              temp += item.workDetails.quantity * item.workDetails.unit_price;
            }
          }
          tempSum += temp;
          tempAmount += temp;
        });
        tempArray[index1] = tempSum;
      });
      setTradeTotal(tempArray);
      setTotalHT(tempAmount?.toFixed(2));

      if (currentProject.market_type === 'TradesAndTranches') {
        data.map((item) => {
          let tempArray2 = [];
          item.data.map((item2) => {
            let tempObject = {};
            tempObject.tranch = item2.tranch.name;
            tempObject.ranking = item2.tranch.ranking;
            tempObject.tranchData = [];
            let existingTranch = '';
            if (tempArray2.length > 0) {
              existingTranch = tempArray2.find(({ tranch }) => tranch === tempObject.tranch);
            }
            if (!existingTranch) {
              let amountTranch = 0;
              item.data.map((item3, index) => {
                if (item3.tranch.name === tempObject.tranch) {
                  let temp = 0;
                  if (!item3.workDetails) {
                    temp += item3.work.unit_price * item3.work.quantity;
                  } else {
                    if (item3?.work?._id !== data[index - 1]?.work?._id) {
                      temp += item3.workDetails.quantity * item3.workDetails.unit_price;
                    } else {
                      temp += item3.workDetails.quantity * item3.workDetails.unit_price;
                    }
                  }
                  amountTranch += temp;
                  tempObject.tranchData.push(item3);
                }
              });
              tempObject.tranchAmount = amountTranch;
              tempArray2.push(tempObject);
            }
          });
          item.data = tempArray2.sort((a, b) => a.ranking - b.ranking);
        });
      }

      setProjectWorkData(data);
    } else if (currentProject.market_type === 'Trades') {
      const result = await api('get', `/project/worksByTrades/${id}`);
      let data = result?.data?.works.sort((a, b) => a.ranking - b.ranking);
      let tempAmount = 0;
      let tempArray = [];
      data.map((dat, index1) => {
        let tempSum = 0;
        dat.data.map((item, index) => {
          let temp = 0;
          if (!item.workDetails) {
            temp += item.work.unit_price * item.work.quantity;
          } else {
            if (item?.work?._id !== data[index - 1]?.work?._id) {
              temp += item.workDetails.quantity * item.workDetails.unit_price;
            } else {
              temp += item.workDetails.quantity * item.workDetails.unit_price;
            }
          }
          tempSum += temp;
          tempAmount += temp;
        });
        tempArray[index1] = tempSum;
      });
      setTradeTotal(tempArray);
      setTotalHT(tempAmount?.toFixed(2));
      setProjectWorkData(data);
    } else {
      const result = await api('get', `/project/works/${id}`);
      let data = result?.data?.works;
      let temp = 0;
      data.map((item, index) => {
        if (!item.workDetails) {
          temp += item.work.unit_price * item.work.quantity;
        } else {
          if (item.work._id !== data[index - 1]?.work._id) {
            temp += item.workDetails.quantity * item.workDetails.unit_price;
          } else {
            temp += item.workDetails.quantity * item.workDetails.unit_price;
          }
        }
      });
      setTotalHT(temp);
      setProjectWorkData(data);
    }
  };

  // func to get all general libraries
  const getProjectLibraries = async () => {
    try {
      const response = store?.user?._id && (await api('get', `/BookLibraries/getByArchitect/${store.user._id}`));
      let temp = response?.data?.bookLibrary.sort((a, b) => a.ranking - b.ranking);

      setGeneralLibrariesData(temp);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  // func to get all general libraries
  const getGeneralLib = async () => {
    try {
      setGeneralLibrariesData([]);
      setCategories([]);
      setworks([]);
      const result = await api('get', `/BookLibraries/getByFamily/${selectedFamily}`);

      let data = result?.data?.bookLibraries.sort((a, b) => a.ranking - b.ranking);
      setGeneralLibrariesData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  // func to get all general libraries
  const getLevel2 = async (id) => {
    try {
      setLoadingLevel(id);
      setCategories([]);
      setworks([]);
      const result = await api('get', `/BookLibraries/getLevel2/${id}`);
      let data = result.data.categories.sort((a, b) => a.ranking - b.ranking);
      setCategories(data);
      setLoadingLevel('');
    } catch (err) {
      setLoadingLevel('');
    }
  };

  // delete work func
  const handleDeleteWork = async () => {
    const response = await api(
      'delete',
      `/project/deleteWork/${currentProject._id}`,
      {
        data: { workId: deleteWorkId },
      },
      t
    );
    handleOpenDeleteWorkModal();
    toast.success(t(response.data.message));
    getworks();
  };

  // delete work Detail func
  const handleDeleteWorkDetail = async () => {
    const response = await api(
      'delete',
      `/project/deleteWorkDetail/${currentProject._id}`,
      {
        data: { workDetailId: deleteWorkDetailId },
      },
      t
    );
    handleOpenDeleteWorkDetailModal();
    toast.success(t(response.data.message));
    getworks();
  };

  // open modal func
  const openModal = async (work) => {
    if (work.numberOfWorkDetails === 0) {
      setSelectedWork(work);
      setOpenWorkModal(true);
    } else {
      const result = await api('get', `/BookLibraries/getLevel4/${work._id}`);
      setSelectedWork(work);
      setWorkDetails(result.data.workDetails);
      setOpenWorkDetailModal(true);
    }
  };

  const handleOpenPropertiesModal = () => setOpenPropertiesModal(!openPropertiesModal);

  const handleOpenCctpModal = (text, title) => {
    if (title === 'CCTP 1') {
      setCctpModalTitle('Chapitre 1 – DOCUMENTS DE REFERENCE CONTRACTUELS');
    } else if (title === 'CCTP 2') {
      setCctpModalTitle('Chapitre 2 – PROVENANCES ET SPECIFICATIONS DES MATERIAUX ET PRODUITS');
    } else if (title === 'CCTP 3') {
      setCctpModalTitle('Chapitre 3 – MODE D’EXECUTION DES TRAVAUX ET PRESTATIONS');
    } else if (title === 'CCTP 4') {
      setCctpModalTitle('Chapitre 4 – ESSAIS – CONTRÔLES – RECEPTION');
    } else {
      setCctpModalTitle('Bordereau des Prix Unitaires');
    }
    if (text) {
      setCctp_text(text);
    }
    setOpenCctpModal(!openCctpModal);
  };

  const handleOpenProvidersModal = (providers) => {
    if (providers) {
      setProviderList(providers);
    }
    setOpenProvidersModal(!openProvidersModal);
  };

  const handleOpenDeleteWorkModal = (id) => {
    if (id) {
      setDeleteWorkId(id);
    }
    setOpenDeleteWorkModal(!openDeleteWorkModal);
  };

  const handleOpenDeleteTradeModal = () => {
    setOpenDeleteTradeModal(!openDeleteTradeModal);
  };

  const handleOpenDeleteChapModal = (item) => {
    if (item?.item?._id) {
      setDeleteChap(item);
    }
    setOpenDeleteChap(!openDeleteChap);
  };

  const handleOpenDeleteTranchModal = () => {
    setOpenDeleteTranchModal(!openDeleteTranchModal);
  };

  const handleOpenDeleteWorkDetailModal = (id) => {
    if (id) {
      setDeleteWorkDetailId(id);
    }
    setOpenDeleteWorkDetailModal(!openDeleteWorkDetailModal);
  };

  const handleOpenEditWorkModal = (work) => {
    if (work) {
      setEditWork(work);
    }
    setOpenEditWorkModal(!openEditWorkModal);
  };

  const handleOpenEditWWDModal = (work) => {
    if (work) {
      setEditWork(work);
    }
    setOpenEditWWDModal(!openEditWWDModal);
  };

  const handleOpenEditWorkDetailModal = (workDetail) => {
    if (workDetail) {
      seteditWorkDetail(workDetail);
    }
    setOpenEditWorkDetailModal(!openEditWorkDetailModal);
  };

  const handleOpenEditChap0Part2Modal = () => {
    if (currentProject.chap0part2.length > 0) {
      let chap = currentProject.chap0part2;

      chap.map((parentItem) => {
        parentItem?.id?.level2?.map((item) => {
          item.level3 = item?.level3?.sort((a, b) => a.ranking - b.ranking);
        });
        parentItem.id.level2 = parentItem?.id?.level2?.sort((a, b) => a.ranking - b.ranking);
      });

      setEditChap0Part2(chap);
      setOpenEditChap0Part2Modal(!openEditChap0Part2Modal);
    } else {
      alert(t('Please select a chap. 0 part 2 from properties'));
    }
  };

  const handleOpenEditChapModal = (item) => {
    if (item?.item?._id) {
      setEditChapItem(item);
      setOpenEditChapModal(true);
    } else {
      setOpenEditChapModal(false);
    }
  };

  const handleOpenAddChapModal = (item) => {
    if (item?.item?._id) {
      setEditChapItem(item);
      setOpenAddChapModal(true);
    } else {
      setOpenAddChapModal(false);
    }
  };

  const handleTranchesModal = () => setOpenTranchesModal(!openTranchesModal);
  const handleTradesModal = () => setOpenTradesModal(!openTradesModal);
  const handleOpenUpdateTradesModal = () => setOpenUpdateTradesModal(!openUpdateTradesModal);
  const handleOpenUpdateTranchesModal = () => setOpenUpdateTranchesModal(!openUpdateTranchesModal);

  // for dropdown menu

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // for trades dropdown menu
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const openEstimationModal = () => {
    handleClose();
    generateEstimate();
  };
  const openDQEModal = () => {
    handleClose();
    generateDQE();
  };
  const openBPUModal = () => {
    handleClose();
    generateBPU();
  };
  const openSelectCCTPModal = () => {
    handleClose();
    setOpenSelectCCTPReportModal(true);
  };
  const openCCTPModal = () => {
    handleClose();
    generateCCTP();
  };
  const openDPGFModal = () => {
    handleClose();
    generateDPGF();
  };

  const getLevel3 = async (id) => {
    try {
      setLoadingLevel(id);
      const result = await api('get', `/BookLibraries/getLevel3/${id}`);
      const data = result.data.works.sort((a, b) => a.ranking - b.ranking);
      setworks(data);
      setLoadingLevel('');
    } catch (err) {
      setLoadingLevel('');
    }
  };

  const getTranches = async () => {
    const result = await api('get', `/Tranches/${currentProject._id}`);
    const data = result.data.tranches.sort((a, b) => a.ranking - b.ranking);
    let temp = [];
    data.map((item) => {
      if (item.trade === selectedTrade) {
        temp.push(item);
      }
    });
    setSelectedTranche(temp[0]?._id);
    setTranchesData(data);
  };

  const getTrades = async () => {
    const result = await api('get', `/Trades/${currentProject._id}`);
    const data = result.data.trades.sort((a, b) => a.ranking - b.ranking);
    setSelectedTrade(data[0]._id);
    setTradesData(data);
  };

  // handle delete
  const handleTradeDelete = async () => {
    const inUse = tranchesData.find((item) => item.trade === selectedData.data._id);
    if (!inUse) {
      if (tradesData.length > 1) {
        const result = await api('delete', `/Trades/${selectedData.data._id}/${currentProject._id}`, {}, t);
        toast.success(t(result.data.message));
        handleOpenDeleteTradeModal();
        getTrades();
        getworks();
      } else {
        toast.error(t('The last remaining Batch cannot be deleted.'));
      }
    } else {
      toast.error(t('Delete tranches first'));
    }
  };

  // handle delete
  const handleTranchDelete = async () => {
    if (tranchesData.length > 1) {
      const result = await api('delete', `/Tranches/${selectedData.data._id}/${currentProject._id}`, {}, t);
      toast.success(t(result.data.message));
      handleOpenDeleteTranchModal();
      getTranches();
      getworks();
    } else {
      toast.error(t('The last remaining Slice cannot be deleted.'));
    }
  };

  // handle delete
  const handleChapDelete = async () => {
    let result = '';
    if (deleteChap.type === 'level0') {
      result = await api(
        'delete',
        `/ArchitectsChap0/deleteParentChap/${parentChap.id._id}/${currentProject._id}`,
        {
          data: {
            type: deleteChap.type,
            id: deleteChap.item._id,
          },
        },
        t
      );
    } else {
      result = await api(
        'delete',
        `/ArchitectsChap0/deleteChapLevel/${parentChap.id._id}`,
        {
          data: {
            type: deleteChap.type,
            id: deleteChap.item._id,
          },
        },
        t
      );
    }
    toast.success(t(result.data.message));
    handleOpenDeleteChapModal();
    getProject();
  };

  //trade Up
  const handleTradeUp = async (id) => {
    let filteredIndex = tradesData.findIndex((dt) => dt._id == id);
    if (filteredIndex != 0) {
      let tempArr = [...tradesData];
      let prevIndex = filteredIndex - 1;

      api('put', `/Trades/${id}`, {
        ranking: prevIndex,
      }).then(() => {
        api('put', `/Trades/${tradesData[prevIndex]._id}`, {
          ranking: filteredIndex,
        }).then(() => {
          tempArr[filteredIndex] = tradesData[filteredIndex - 1];
          tempArr[filteredIndex - 1] = tradesData[filteredIndex];
          setTradesData(tempArr);
        });
      });
    }
  };

  //trade Down
  const handleTradeDown = async (id) => {
    let filteredIndex = tradesData.findIndex((dt) => dt._id == id);

    if (filteredIndex !== tradesData.length - 1) {
      let tempArr = [...tradesData];
      let nextIndex = filteredIndex + 1;
      api('put', `/Trades/${id}`, {
        ranking: nextIndex,
      }).then(() => {
        api('put', `/Trades/${tradesData[nextIndex]._id}`, {
          ranking: filteredIndex,
        }).then(() => {
          tempArr[filteredIndex] = tradesData[nextIndex];
          tempArr[nextIndex] = tradesData[filteredIndex];
          setTradesData(tempArr);
        });
      });
    }
  };

  //tranch Up
  const handleTranchUp = async (id) => {
    let filteredIndex = tranchesData.findIndex((dt) => dt._id == id);
    if (filteredIndex != 0) {
      let tempArr = [...tranchesData];
      let prevIndex = filteredIndex - 1;

      api('put', `/Tranches/${id}`, {
        ranking: prevIndex,
      }).then(() => {
        api('put', `/Tranches/${tranchesData[prevIndex]._id}`, {
          ranking: filteredIndex,
        }).then(() => {
          tempArr[filteredIndex] = tranchesData[filteredIndex - 1];
          tempArr[filteredIndex - 1] = tranchesData[filteredIndex];
          setTranchesData(tempArr);
        });
      });
    }
  };

  //tranch Down
  const handleTranchDown = async (id) => {
    let filteredIndex = tranchesData.findIndex((dt) => dt._id == id);

    if (filteredIndex !== tranchesData.length - 1) {
      let tempArr = [...tranchesData];
      let nextIndex = filteredIndex + 1;
      api('put', `/Tranches/${id}`, {
        ranking: nextIndex,
      }).then(() => {
        api('put', `/Tranches/${tranchesData[nextIndex]._id}`, {
          ranking: filteredIndex,
        }).then(() => {
          tempArr[filteredIndex] = tranchesData[nextIndex];
          tempArr[nextIndex] = tranchesData[filteredIndex];
          setTranchesData(tempArr);
        });
      });
    }
  };

  const handleTradeSelect = (id) => setSelectedTrade(id);
  const handleTrancheSelect = (id) => setSelectedTranche(id);

  const handleTechnicalDoc = () => {
    let doc = [];
    currentProject.works.map((item, index) => {
      if (item.providers.length > 0) {
        if (item.providers[0].documents.length > 0) {
          doc.push(item.providers[0].documents[0].uri);
        }
      }
    });
    handleClose();
    if (doc.length > 0) {
      setTechnicalDoc(doc);
      handleDocModal();
    } else {
      toast.error(t('No technical document in this project'));
    }
  };

  const handleDocModal = () => setOpenDocModal(!openDocModal);

  async function generateEstimate() {
    try {
      let res;
      if (currentProject.market_type == 'Simple' || currentProject.market_type == 'PurchaseOrder') {
        res = await exportPDFSimpleEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportPDFTradesEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportPDFTradesAndTranchesEstimation(projectWorkData, currentProject);
      } else {
        console.trace('Show me');
        return;
      }
      setBlob(res.blob);
      setFilename(res.filename);
      setOpenEstimationReportModal(true);
    } catch (e) {
      toast.error('Could not generate report successfully.');
      console.trace(e);
    }
  }

  async function generateDQE() {
    try {
      let res;
      if (currentProject.market_type == 'Simple' || currentProject.market_type == 'PurchaseOrder') {
        res = await exportPDFSimpleEstimation(projectWorkData, currentProject, true);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportPDFTradesEstimation(projectWorkData, currentProject, true);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportPDFTradesAndTranchesEstimation(projectWorkData, currentProject, true);
      } else {
        console.trace('Show me');
      }
      setBlob(res.blob);
      setFilename(res.filename);
      setOpenDQEReportModal(true);
    } catch (e) {
      toast.error('Could not generate report successfully.');
      console.trace(e);
    }
  }

  async function generateBPU() {
    try {
      let res;
      if (currentProject.market_type == 'Simple' || currentProject.market_type == 'PurchaseOrder') {
        res = await exportPDFSimpleBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportPDFTradesBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportPDFTradesAndTranchesBPU(projectWorkData, currentProject);
      } else {
        console.trace('Show me');
      }
      setBlob(res.blob);
      setFilename(res.filename);
      setOpenBPUReportModal(true);
    } catch (e) {
      toast.error('Could not generate report successfully.');
      console.trace(e);
    }
  }

  async function generateCCTP() {
    try {
      let res;
      if (currentProject.market_type == 'Simple' || currentProject.market_type == 'PurchaseOrder') {
        res = await exportPDFSimpleCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportPDFTradesCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportPDFTradesAndTranchesCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else {
        console.trace('Show me');
      }
      setBlob(res.blob);
      setFilename(res.filename);
      setOpenCCTPReportModal(true);
    } catch (e) {
      toast.error('Could not generate report successfully.');
      console.trace(e);
    }
  }

  async function generateDPGF() {
    try {
      let res;
      if (currentProject.market_type == 'Simple' || currentProject.market_type == 'PurchaseOrder') {
        res = await exportPDFSimpleDPGF(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportPDFTradesDPGF(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportPDFTradesAndTrancesDPGF(projectWorkData, currentProject);
      } else {
        console.trace('Show me');
      }
      setBlob(res.blob);
      setFilename(res.filename);
      setOpenDPGFReportModal(true);
    } catch (e) {
      toast.error('Could not generate report successfully.');
      console.trace(e);
    }
  }

  function handleSubmitSelectCCTP() {
    setOpenSelectCCTPReportModal(false);
    openCCTPModal();
  }

  return (
    <>
      <div className={classes.main_container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header />
            <Modal
              title={t('Add a Work')}
              open={openWorkModal}
              onClose={() => setOpenWorkModal(false)}
              component={
                <AddWorkModal
                  selectedWork={selectedWork}
                  setSelectedWork={setSelectedWork}
                  selectedWorkDetail={selectedWorkDetail}
                  setSelectedWorkDetail={setSelectedWorkDetail}
                  setOpenWorkModal={setOpenWorkModal}
                  projectWorkData={projectWorkData}
                  currentProject={currentProject}
                  getworks={getworks}
                  selectedTrade={selectedTrade}
                  selectedTranche={selectedTranche}
                />
              }
            />
            <Modal
              title={t('Select Work Details')}
              open={openWorkDetailModal}
              onClose={() => setOpenWorkDetailModal(false)}
              component={
                <AddWorkDetailsModal
                  selectedWork={selectedWork}
                  setSelectedWork={setSelectedWork}
                  workDetails={workDetails}
                  selectedWorkDetail={selectedWorkDetail}
                  setSelectedWorkDetail={setSelectedWorkDetail}
                  setOpenWorkDetailModal={setOpenWorkDetailModal}
                  projectWorkData={projectWorkData}
                  currentProject={currentProject}
                  getworks={getworks}
                  selectedTrade={selectedTrade}
                  selectedTranche={selectedTranche}
                />
              }
            />
            <Modal
              title={t('Project Properties')}
              open={openPropertiesModal}
              onClose={handleOpenPropertiesModal}
              component={
                <PropertiesModal
                  handleOpenPropertiesModal={handleOpenPropertiesModal}
                  currentProject={currentProject}
                  getProject={getProject}
                  familyOptions={options}
                />
              }
            />
            <Modal
              title={cctpModalTitle}
              open={openCctpModal}
              onClose={handleOpenCctpModal}
              component={<CctpModal handleOpenCctpModal={handleOpenCctpModal} cctp_text={cctp_text} />}
            />
            <Modal
              open={openDeleteWorkModal}
              onClose={handleOpenDeleteWorkModal}
              component={<DeleteModal handleCancel={handleOpenDeleteWorkModal} handleDelete={handleDeleteWork} />}
            />

            <Modal
              open={openDeleteWorkDetailModal}
              onClose={handleOpenDeleteWorkDetailModal}
              component={<DeleteModal handleCancel={handleOpenDeleteWorkDetailModal} handleDelete={handleDeleteWorkDetail} />}
            />
            <Modal
              title={t('Edit a Work')}
              open={openEditWorkModal}
              onClose={handleOpenEditWorkModal}
              component={
                <EditWorkModal
                  handleOpenEditWorkModal={handleOpenEditWorkModal}
                  selectedWork={editWork}
                  currentProject={currentProject}
                  getworks={getworks}
                />
              }
            />
            <Modal
              title={t('Edit a Work')}
              open={openEditWWDModal}
              onClose={handleOpenEditWWDModal}
              component={
                <EditWWDModal
                  handleOpenEditWorkModal={handleOpenEditWWDModal}
                  selectedWork={editWork}
                  currentProject={currentProject}
                  getworks={getworks}
                />
              }
            />
            <Modal
              title={t('Edit a Work Detail')}
              open={openEditWorkDetailModal}
              onClose={handleOpenEditWorkDetailModal}
              component={
                <EditWorkDetailModal
                  handleOpenEditWorkDetailModal={handleOpenEditWorkDetailModal}
                  selectedWorkDetail={editWorkDetail}
                  currentProject={currentProject}
                  getworks={getworks}
                />
              }
            />
            <Modal
              title="Estimation"
              open={openEstimationReportModal}
              onClose={() => setOpenEstimationReportModal(false)}
              component={
                <ReportEstimationModal
                  viewBlob={blob}
                  viewFileName={filename}
                  currentProject={currentProject}
                  projectWorkData={projectWorkData}
                />
              }
            />
            <Modal
              title="DQE"
              open={openDQEReportModal}
              onClose={() => setOpenDQEReportModal(false)}
              component={
                <ReportDQEModal
                  viewBlob={blob}
                  viewFileName={filename}
                  currentProject={currentProject}
                  projectWorkData={projectWorkData}
                />
              }
            />
            <Modal
              title="BPU"
              open={openBPUReportModal}
              onClose={() => setOpenBPUReportModal(false)}
              component={
                <ReportBPUModal
                  viewBlob={blob}
                  viewFileName={filename}
                  currentProject={currentProject}
                  projectWorkData={projectWorkData}
                />
              }
            />
            <Modal
              title="Select CCTP"
              open={openSelectCCTPReportModal}
              onClose={() => setOpenSelectCCTPReportModal(false)}
              component={
                <ReportSelectCCTPModal
                  selectedCCTPIndexes={selectedCCTPIndexes}
                  setSelectedCCTPIndexes={setSelectedCCTPIndexes}
                  handleClose={() => {
                    setOpenSelectCCTPReportModal(false);
                  }}
                  handleSubmit={handleSubmitSelectCCTP}
                />
              }
            />
            <Modal
              title="CCTP"
              open={openCCTPReportModal}
              onClose={() => setOpenCCTPReportModal(false)}
              component={
                <ReportCCTPModal
                  viewBlob={blob}
                  viewFileName={filename}
                  currentProject={currentProject}
                  projectWorkData={projectWorkData}
                  selectedCCTPIndexes={selectedCCTPIndexes}
                />
              }
            />
            <Modal
              title="DPGF"
              open={openDPGFReportModal}
              onClose={() => setOpenDPGFReportModal(false)}
              component={
                <ReportDPGFModal
                  viewBlob={blob}
                  viewFileName={filename}
                  currentProject={currentProject}
                  projectWorkData={projectWorkData}
                />
              }
            />
            <Modal
              title={t('Edit Chap. 0 part 2 - CLAUSES MUNICIPALITIES')}
              open={openEditChap0Part2Modal}
              onClose={handleOpenEditChap0Part2Modal}
              component={
                <EditChap0Part2
                  handleOpenEditChap0Part2Modal={handleOpenEditChap0Part2Modal}
                  editChap0Part2={editChap0Part2}
                  handleOpenEditChapModal={handleOpenEditChapModal}
                  handleOpenDeleteChapModal={handleOpenDeleteChapModal}
                  currentProject={currentProject}
                  setEditChap0Part2={setEditChap0Part2}
                  handleOpenAddChapModal={handleOpenAddChapModal}
                  setParentChap={setParentChap}
                />
              }
            />

            <Modal
              title={
                editChapItem?.type === 'level0'
                  ? t('Edit Chap0')
                  : editChapItem?.type === 'level1'
                  ? t('Edit Chap0 Level2')
                  : t('Edit Chap0 Level3')
              }
              open={openEditChapModal}
              onClose={handleOpenEditChapModal}
              component={
                <EditChapModal
                  handleOpenEditChapModal={handleOpenEditChapModal}
                  editChapItem={editChapItem}
                  parentChap={parentChap}
                  getProject={getProject}
                />
              }
            />

            <Modal
              title={editChapItem?.type === 'level0' ? t('Add Chap0 Level2') : t('Add Chap0 Level3')}
              open={openAddChapModal}
              onClose={handleOpenAddChapModal}
              component={
                <AddChapLevel
                  handleOpenAddChapModal={handleOpenAddChapModal}
                  editChapItem={editChapItem}
                  getProject={getProject}
                  parentChap={parentChap}
                />
              }
            />

            <Modal
              open={openDeleteChap}
              onClose={handleOpenDeleteChapModal}
              component={<DeleteModal handleCancel={handleOpenDeleteChapModal} handleDelete={handleChapDelete} />}
            />

            <Modal
              title={t('Add Tranch')}
              open={openTranchesModal}
              onClose={handleTranchesModal}
              component={
                <TracnhesModal
                  handleTranchesModal={handleTranchesModal}
                  currentProject={currentProject._id}
                  tranchesData={tranchesData}
                  getTranches={getTranches}
                  tradeOption={tradesData}
                  selectedTrade={selectedTrade}
                />
              }
            />
            <Modal
              title={t('Update Tranch')}
              open={openUpdateTranchesModal}
              onClose={handleOpenUpdateTranchesModal}
              component={
                <UpdateTranchesModal
                  handleOpenUpdateTranchesModal={handleOpenUpdateTranchesModal}
                  updateTranch={selectedData.data}
                  getTranches={getTranches}
                  tradeOption={tradesData}
                />
              }
            />
            <Modal
              open={openDeleteTranchModal}
              onClose={handleOpenDeleteTranchModal}
              component={<DeleteModal handleCancel={handleOpenDeleteTranchModal} handleDelete={handleTranchDelete} />}
            />
            <Modal
              title={t('Add Trade')}
              open={openTradesModal}
              onClose={handleTradesModal}
              component={
                <TradesModal
                  handleTradesModal={handleTradesModal}
                  currentProject={currentProject._id}
                  tradesData={tradesData}
                  getTrades={getTrades}
                />
              }
            />
            <Modal
              title={t('Update Trade')}
              open={openUpdateTradesModal}
              onClose={handleOpenUpdateTradesModal}
              component={
                <UpdateTradesModal
                  handleTradesModal={handleOpenUpdateTradesModal}
                  updateTrade={selectedData.data}
                  getTrades={getTrades}
                />
              }
            />
            <Modal
              title={t('Providers')}
              open={openProvidersModal}
              onClose={handleOpenProvidersModal}
              component={<ProviderModal handleOpenProviderModal={handleOpenProvidersModal} providers={providerList} />}
            />
            <Modal
              open={openDeleteTradeModal}
              onClose={handleOpenDeleteTradeModal}
              component={<DeleteModal handleCancel={handleOpenDeleteTradeModal} handleDelete={handleTradeDelete} />}
            />
            <Modal
              title={t('Technical Doc')}
              open={openDocModal}
              onClose={handleDocModal}
              component={<TechnicalDocModal handleDocModal={handleDocModal} technicalDoc={technicalDoc} />}
            />
            <div className={classes.container}>
              <div className={classes.flex_container}>
                <div>
                  <span style={{ fontSize: 24 }}>
                    <i>{currentProject?.name}</i>
                  </span>
                </div>
                <div>
                  <Button
                    variant="contained"
                    className={classes.btn}
                    startIcon={<BuildIcon style={{ color: '#f1966c', fontSize: 18 }} />}
                    onClick={handleOpenPropertiesModal}
                  >
                    {t('Properties')}
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.btn}
                    startIcon={<LogoutIcon style={{ color: '#f1966c', fontSize: 18 }} />}
                    onClick={() => history.push('/architect/index')}
                  >
                    {t('To Leave')}
                  </Button>
                </div>
              </div>
              <div
                style={{
                  width: '100vw',
                  display: 'flex',
                }}
              >
                <div className={classes.left_container}>
                  <div>
                    <div
                      style={{
                        fontSize: 20,
                        marginBottom: 15,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <i>{t('General Libraries')}</i>
                      </div>
                    </div>
                    <InputDropdown
                      options={options}
                      value={selectedFamily}
                      onChange={(e) => setSelectedFamily(e.target.value)}
                      height={40}
                      backgroundColor="white"
                    />
                    <br />
                    <NestedList
                      width="100%"
                      maxHeight="74vh"
                      level1={generalLibrariesData}
                      getLevel2={getLevel2}
                      setLevel2={setCategories}
                      level2={categories}
                      getLevel3={getLevel3}
                      setLevel3={setworks}
                      level3={works}
                      loading={loadingLevel}
                      openModal={openModal}
                      openCctpModal={handleOpenCctpModal}
                      handleOpenProvidersModal={handleOpenProvidersModal}
                    />
                  </div>
                </div>
                <div className={classes.right_container}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 10,
                      marginLeft: -20,
                    }}
                  >
                    {(currentProject.market_type === 'TradesAndTranches' || currentProject.market_type === 'Trades') && (
                      <>
                        <Tooltip title="Ajouter un Lot" placement="top">
                          <ListIcon
                            sx={{
                              fontSize: 18,
                              cursor: 'pointer',
                              '&:hover': {
                                color: '#f1966c',
                              },
                            }}
                            onClick={handleTradesModal}
                          />
                        </Tooltip>
                        <div
                          style={{
                            marginRight: 10,
                            marginLeft: 10,
                            fontSize: 20,
                            color: 'lightgray',
                          }}
                        >
                          |
                        </div>
                      </>
                    )}
                    {currentProject.market_type === 'TradesAndTranches' && (
                      <>
                        <Tooltip title="Ajouter une Tranche" placement="top">
                          <LayersIcon
                            sx={{
                              fontSize: 18,
                              cursor: 'pointer',
                              '&:hover': {
                                color: '#f1966c',
                              },
                            }}
                            onClick={handleTranchesModal}
                          />
                        </Tooltip>

                        <div
                          style={{
                            marginRight: 10,
                            marginLeft: 10,
                            fontSize: 20,
                            color: 'lightgray',
                          }}
                        >
                          |
                        </div>
                      </>
                    )}

                    <Tooltip title="Modifier Chap0Part2" placement="top">
                      <BorderColorIcon
                        sx={{
                          fontSize: 18,
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#f1966c',
                          },
                        }}
                        onClick={handleOpenEditChap0Part2Modal}
                      />
                    </Tooltip>
                    <div
                      style={{
                        marginRight: 10,
                        marginLeft: 10,
                        fontSize: 20,
                        color: 'lightgray',
                      }}
                    >
                      |
                    </div>
                    <Box
                      id="demo-positioned-button"
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      sx={{
                        '&:hover': {
                          color: '#f1966c',
                        },
                      }}
                    >
                      <Tooltip title="Générer les documents" placement="top">
                        <div>
                          <InsertDriveFileIcon
                            sx={{
                              fontSize: 18,
                              cursor: 'pointer',
                              '&:hover': {
                                color: '#f1966c',
                              },
                            }}
                          />

                          <ArrowDropDownIcon
                            sx={{
                              fontSize: 18,
                              cursor: 'pointer',
                              '&:hover': {
                                color: '#f1966c',
                              },
                            }}
                          />
                        </div>
                      </Tooltip>
                    </Box>
                    <StyledMenu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      sx={{ mt: 2.5 }}
                    >
                      <MenuItem onClick={openEstimationModal} style={{ width: 180, height: 28, fontSize: 15 }}>
                        {t('Generate Estimate')}
                      </MenuItem>
                      <MenuItem
                        onClick={openDQEModal}
                        style={{ height: 28, fontSize: 15 }}
                        disabled={currentProject.structure == 'DPGF'}
                      >
                        {t('Generate The DQE')}
                      </MenuItem>
                      <MenuItem
                        onClick={openBPUModal}
                        style={{ height: 28, fontSize: 15 }}
                        disabled={currentProject.structure == 'DPGF'}
                      >
                        {t('Generate BPU')}
                      </MenuItem>
                      <MenuItem
                        onClick={openDPGFModal}
                        style={{ height: 28, fontSize: 15 }}
                        disabled={currentProject.structure != 'DPGF'}
                      >
                        {t('Generate DPGF')}
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={openSelectCCTPModal} style={{ height: 25, fontSize: 15 }}>
                        {t('Generate The CCTP')}
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleTechnicalDoc} style={{ height: 25, fontSize: 15 }}>
                        {t('Technical Doc')}
                      </MenuItem>
                    </StyledMenu>
                  </div>
                  <div
                    id="div-to-print"
                    style={{
                      backgroundColor: 'white',
                      height: '80vh',
                      overflow: 'hidden',
                    }}
                  >
                    <StyledMenu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      sx={{ mt: 2.5 }}
                    >
                      <MenuItem
                        onClick={() => {
                          if (selectedData.type === 'trade') {
                            handleOpenUpdateTradesModal();
                          } else {
                            handleOpenUpdateTranchesModal();
                          }
                          handleClose2();
                        }}
                      >
                        {t('To Modify')}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          if (selectedData.type === 'trade') {
                            if (tradesData.length > 1) {
                              handleOpenDeleteTradeModal();
                            } else {
                              toast.error(t('The last remaining Batch cannot be deleted.'));
                            }
                          } else {
                            if (tranchesData.length > 1) {
                              handleOpenDeleteTranchModal();
                            } else {
                              toast.error(t('The last remaining Slice cannot be deleted.'));
                            }
                          }
                          handleClose2();
                        }}
                      >
                        {t('To Delete')}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          if (selectedData.type === 'trade') {
                            handleTradeUp(selectedData.data._id);
                          } else {
                            handleTranchUp(selectedData.data._id);
                          }
                          handleClose2();
                        }}
                      >
                        {t('Up')}
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          if (selectedData.type === 'trade') {
                            handleTradeDown(selectedData.data._id);
                          } else {
                            handleTranchDown(selectedData.data._id);
                          }
                          handleClose2();
                        }}
                      >
                        {t('Down')}
                      </MenuItem>
                    </StyledMenu>
                    <TableContainer component={Paper} sx={{ height: '80%' }}>
                      <Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow style={{ whiteSpace: 'nowrap' }}>
                            <TableCell
                              style={{
                                fontWeight: 900,
                                fontSize: 16,
                                padding: '2px 16px',
                              }}
                            >
                              {t('Designation')}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: 900,
                                fontSize: 16,
                                padding: '2px 16px',
                              }}
                            >
                              {t('Unit')}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: 900,
                                fontSize: 16,
                                padding: '2px 16px',
                              }}
                            >
                              {t('Qty')}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: 900,
                                fontSize: 16,
                                padding: '2px 16px',
                              }}
                            >
                              PU HT
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontWeight: 900,
                                fontSize: 16,
                                padding: '2px 16px',
                              }}
                            >
                              {t('Total HT')}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {currentProject.market_type === 'Trades' ? (
                            tradesData?.map((item2, index2) => {
                              let tradeTotalIndex = -1;
                              return (
                                <>
                                  <TableRow
                                    sx={{
                                      backgroundColor:
                                        selectedTrade === item2._id ? 'rgb(241, 150, 108)' : 'rgba(241, 150, 108,0.7)',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      colSpan={5}
                                      onClick={() => handleTradeSelect(item2._id)}
                                      style={{
                                        padding: '2px 16px',
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: '100%',
                                          fontSize: 16,
                                          fontWeight: 600,
                                          display: 'flex',
                                        }}
                                      >
                                        {item2.name}{' '}
                                        {selectedTrade === item2._id && (
                                          <ArrowDropDownIcon
                                            id="demo-positioned-button"
                                            aria-controls={open2 ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open2 ? 'true' : undefined}
                                            onClick={(e) => {
                                              setSelectedData({
                                                type: 'trade',
                                                data: item2,
                                              });
                                              handleClick2(e);
                                            }}
                                            sx={{
                                              fontSize: 18,
                                              cursor: 'pointer',
                                            }}
                                          />
                                        )}
                                      </div>
                                    </TableCell>
                                  </TableRow>

                                  {projectWorkData.map((item, index) => {
                                    if (item2?._id === item?.data[0]?.trade?._id) {
                                      tradeTotalIndex = index;
                                      return (
                                        <TradeTable
                                          projectWorkData={item.data}
                                          handleOpenDeleteWorkModal={handleOpenDeleteWorkModal}
                                          handleOpenDeleteWorkDetailModal={handleOpenDeleteWorkDetailModal}
                                          handleOpenEditWorkModal={handleOpenEditWorkModal}
                                          handleOpenEditWorkDetailModal={handleOpenEditWorkDetailModal}
                                          handleOpenEditWWDModal={handleOpenEditWWDModal}
                                          currentProject={currentProject}
                                          getworks={getworks}
                                        />
                                      );
                                    }
                                  })}
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    colSpan={4}
                                    style={{
                                      padding: '2px 16px',
                                      fontWeight: 600,
                                    }}
                                    align="right"
                                  >
                                    Total HT {item2.name} :
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    colSpan={1}
                                    style={{
                                      padding: '2px 16px',
                                      fontWeight: 600,
                                    }}
                                    align="right"
                                  >
                                    {tradeTotalIndex !== -1 ? formatNumber(tradeTotal[tradeTotalIndex]?.toFixed(2)) : '0,00'}
                                  </TableCell>
                                  <br />
                                </>
                              );
                            })
                          ) : currentProject.market_type === 'TradesAndTranches' ? (
                            tradesData?.map((item3, index3) => {
                              let tradeTotalIndex = -1;
                              return (
                                <>
                                  <TableRow
                                    sx={{
                                      backgroundColor:
                                        selectedTrade === item3._id ? 'rgb(241, 150, 108)' : 'rgba(241, 150, 108,0.7)',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      colSpan={5}
                                      onClick={() => {
                                        handleTradeSelect(item3._id);
                                        let temp = [];
                                        tranchesData?.map((item4, index4) => {
                                          if (item4?.trade === item3?._id) {
                                            temp.push(item4._id);
                                          }
                                        });
                                        handleTrancheSelect(temp[0]);
                                      }}
                                      style={{ padding: '2px 16px' }}
                                    >
                                      <div
                                        style={{
                                          width: '100%',
                                          fontSize: 16,
                                          fontWeight: 600,
                                          display: 'flex',
                                        }}
                                      >
                                        {item3.name}{' '}
                                        {selectedTrade === item3._id && (
                                          <ArrowDropDownIcon
                                            id="demo-positioned-button"
                                            aria-controls={open2 ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open2 ? 'true' : undefined}
                                            onClick={(e) => {
                                              setSelectedData({
                                                type: 'trade',
                                                data: item3,
                                              });
                                              handleClick2(e);
                                            }}
                                            sx={{
                                              fontSize: 18,
                                              cursor: 'pointer',
                                            }}
                                          />
                                        )}
                                      </div>
                                    </TableCell>
                                  </TableRow>

                                  {tranchesData?.map((item4, index4) => {
                                    if (item4?.trade === item3?._id) {
                                      let tranchTotalAmount = 0;
                                      return (
                                        <>
                                          <TableRow
                                            sx={{
                                              backgroundColor: selectedTranche === item4._id ? 'rgb(227, 226, 229)' : '#fff',
                                              cursor: 'pointer',
                                            }}
                                          >
                                            <TableCell
                                              colSpan={5}
                                              onClick={() => {
                                                handleTrancheSelect(item4._id);
                                                handleTradeSelect(item4.trade);
                                              }}
                                              style={{ padding: '2px 16px' }}
                                            >
                                              <div
                                                style={{
                                                  width: '100%',
                                                  fontSize: 16,
                                                  fontWeight: 600,
                                                  display: 'flex',
                                                }}
                                              >
                                                {item4.name}
                                                {selectedTranche === item4._id && (
                                                  <ArrowDropDownIcon
                                                    id="demo-positioned-button"
                                                    aria-controls={open2 ? 'demo-positioned-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open2 ? 'true' : undefined}
                                                    onClick={(e) => {
                                                      setSelectedData({
                                                        type: 'tranch',
                                                        data: item4,
                                                      });
                                                      handleClick2(e);
                                                    }}
                                                    sx={{
                                                      fontSize: 18,
                                                      cursor: 'pointer',
                                                    }}
                                                  />
                                                )}
                                              </div>
                                            </TableCell>
                                          </TableRow>

                                          {projectWorkData?.map((item, index) => {
                                            if (item3?._id === item?.data[0]?.tranchData[0]?.trade?._id) {
                                              tradeTotalIndex = index;
                                              return (
                                                <>
                                                  {item.data.map((item2, index2) => {
                                                    if (item2?.tranchData[0]?.tranch?._id === item4?._id) {
                                                      tranchTotalAmount = item2.tranchAmount;
                                                      return (
                                                        <>
                                                          <TradeTable
                                                            projectWorkData={item2.tranchData}
                                                            handleOpenDeleteWorkModal={handleOpenDeleteWorkModal}
                                                            handleOpenDeleteWorkDetailModal={handleOpenDeleteWorkDetailModal}
                                                            handleOpenEditWorkModal={handleOpenEditWorkModal}
                                                            handleOpenEditWorkDetailModal={handleOpenEditWorkDetailModal}
                                                            currentProject={currentProject}
                                                            getworks={getworks}
                                                            handleOpenEditWWDModal={handleOpenEditWWDModal}
                                                          />
                                                        </>
                                                      );
                                                    }
                                                  })}
                                                </>
                                              );
                                            }
                                          })}

                                          <TableRow>
                                            <TableCell colSpan={4} style={{ padding: '2px 16px' }}>
                                              <div
                                                style={{
                                                  width: '100%',
                                                  fontWeight: 600,
                                                  textAlign: 'right',
                                                }}
                                              >
                                                Total HT {item4.name} :
                                              </div>
                                            </TableCell>
                                            <TableCell colSpan={1} style={{ padding: '2px 16px' }}>
                                              <div
                                                style={{
                                                  width: '100%',
                                                  fontWeight: 600,
                                                  textAlign: 'right',
                                                }}
                                              >
                                                {formatNumber(tranchTotalAmount.toFixed(2))}
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        </>
                                      );
                                    }
                                  })}

                                  <TableRow>
                                    <TableCell colSpan={4} style={{ padding: '2px 16px' }}>
                                      <div
                                        style={{
                                          width: '100%',
                                          fontWeight: 600,
                                          textAlign: 'right',
                                        }}
                                      >
                                        Total HT {item3.name} :
                                      </div>
                                    </TableCell>
                                    <TableCell colSpan={1} style={{ padding: '2px 16px' }}>
                                      <div
                                        style={{
                                          width: '100%',
                                          fontWeight: 600,
                                          textAlign: 'right',
                                        }}
                                      >
                                        {tradeTotalIndex !== -1 ? formatNumber(tradeTotal[tradeTotalIndex]?.toFixed(2)) : '0,00'}
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  <br />
                                </>
                              );
                            })
                          ) : (
                            <TradeTable
                              projectWorkData={projectWorkData}
                              handleOpenDeleteWorkModal={handleOpenDeleteWorkModal}
                              handleOpenDeleteWorkDetailModal={handleOpenDeleteWorkDetailModal}
                              handleOpenEditWorkModal={handleOpenEditWorkModal}
                              handleOpenEditWorkDetailModal={handleOpenEditWorkDetailModal}
                              currentProject={currentProject}
                              getworks={getworks}
                              handleOpenEditWWDModal={handleOpenEditWWDModal}
                            />
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div
                      style={{
                        height: '20%',
                      }}
                    >
                      <Divider style={{ backgroundColor: 'lightgray' }} />
                      <div
                        style={{
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <div
                          style={{
                            width: '50%',
                            padding: 20,
                            fontWeight: 900,
                          }}
                        >
                          <div className={classes.flex_container}>
                            <div className={classes.fotter_text}>{t('Total HT')} :</div>
                            <div className={classes.fotter_amount}>{formatNumber(parseFloat(totalHT)?.toFixed(2))} €</div>
                          </div>
                          <div className={classes.flex_container}>
                            <div className={classes.fotter_text}>
                              {t('VAT')} ({currentProject?.vat?.value?.toFixed(2)}%) :
                            </div>
                            <div className={classes.fotter_amount}>
                              {formatNumber(((totalHT / 100) * currentProject?.vat?.value).toFixed(2))} €
                            </div>
                          </div>
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'flex-end',
                            }}
                          >
                            <div
                              style={{
                                width: '28%',
                                height: 1,
                                backgroundColor: 'black',
                              }}
                            ></div>
                          </div>
                          <div className={classes.flex_container}>
                            <div className={classes.fotter_text}>{t('Total  Amount  including  VAT')} :</div>

                            <div className={classes.fotter_amount}>
                              {formatNumber((totalHT * (1 + currentProject?.vat?.value / 100))?.toFixed(2))} €
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProjectView;
