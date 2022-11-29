// init
import React, { useState, useEffect } from 'react';
import api from '../../../../api';
import { useTranslation } from 'react-i18next';

// component
import { Button } from '@mui/material';
import InputWithLabel from '../../../../components/Architect/InputWithLabel';
import InputDropdown from '../../../../components/Architect/InputDropdown';
import { toast } from 'react-toastify';
import { formatNumber } from '../../../../utils/markThousand';

const AddWorkModal = ({
  selectedWork,
  selectedWorkDetail,
  setOpenWorkModal,
  projectWorkData,
  currentProject,
  setSelectedWorkDetail,
  setSelectedWork,
  getworks,
  selectedTrade,
  selectedTranche
}) => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    name: '',
    unit: '',
    unit_price: '',
    quantity: '1.00',
    ranking: 0,
    work_details: [],
    category: ''
  });
  const [options, setOptions] = useState([]);
  const [tranch, setTranch] = useState('');
  const [trade, setTrade] = useState('');

  useEffect(() => {
    selectedWork &&
      setValues(prev => {
        prev.name = selectedWork.name;
        prev.unit = selectedWork.unit;
        prev.category = selectedWork.category;
        prev.unit_price = selectedWork.unit_price.toFixed(2);
        return { ...prev };
      });
  }, [selectedWork]);
  useEffect(() => {
    setTrade(selectedTrade);
    setTranch(selectedTranche);
  }, [selectedTrade, selectedTranche]);
  // useEffect to get all units
  useEffect(() => {
    getUnits();
  }, []);

  // func to getAll Units
  const getUnits = async () => {
    const result = await api('get', `/Units/get`);
    setOptions(result.data.units.sort((a, b) => a.ranking - b.ranking));
  };

  // handle change function
  const handleChange = (name, value) => {
    setValues(prev => {
      prev[name] = value;
      return { ...prev };
    });
  };

  // handle submit
  const handleSubmit = async e => {
    e.preventDefault();
    let data = values;
    console.log('data is d', data);
    data.unit_price = values.unit_price.replace(/\s/g, '').split(',').join('.');
    data.quantity = values.quantity.replace(/\s/g, '').split(',').join('.');
    data.cctp_text = selectedWork.cctp_text;
    data.bpu_text = selectedWork.bpu_text;
    data.work_details = selectedWorkDetail;
    data.providers = selectedWork.providers;
    console.log('2data is d2', data);
    if (currentProject.market_type === 'Trades') {
      if (trade) {
        let tempRankings = [];
        projectWorkData.map(item1 => {
          item1.data.map(item2 => {
            tempRankings.push(item2.work.ranking);
          });
        });
        if (tempRankings.length > 0) {
          let maxRanking = Math.max(...tempRankings);
          data.ranking = maxRanking >= 0 ? maxRanking + 1 : 0;
        } else {
          data.ranking = 0;
        }
        data.trade = trade;
        const result = await api('post', `/project/addWork/${currentProject._id}`, data, t);
        toast.success(t(result.data.message));
        setSelectedWorkDetail([]);
        setSelectedWork();
        setOpenWorkModal(false);
        getworks();
      } else {
        toast.error(t('Trade is required'));
      }
    } else if (currentProject.market_type === 'TradesAndTranches') {
      if (trade) {
        data.trade = trade;
        if (tranch) {
          let tempRankings = [];
          projectWorkData.map(item1 => {
            item1.data.map(item2 => {
              item2.tranchData.map(item3 => {
                tempRankings.push(item3.work.ranking);
              });
            });
          });
          if (tempRankings.length > 0) {
            let maxRanking = Math.max(...tempRankings);
            data.ranking = maxRanking >= 0 ? maxRanking + 1 : 0;
          } else {
            data.ranking = 0;
          }

          data.tranch = tranch;
          console.log(data, 'data');
          const result = await api('post', `/project/addWork/${currentProject._id}`, data, t);
          toast.success(t(result.data.message));
          setSelectedWorkDetail([]);
          setSelectedWork();
          setOpenWorkModal(false);
          getworks();
        } else {
          toast.error(t('Tranch is required'));
        }
      } else {
        toast.error(t('Trade is required'));
      }
    } else {
      let maxRanking = Math.max.apply(
        Math,
        projectWorkData.map(item => {
          return item.work.ranking;
        })
      );
      data.ranking = maxRanking >= 0 ? maxRanking + 1 : 0;
      const result = await api('post', `/project/addWork/${currentProject._id}`, data, t);
      toast.success(t(result.data.message));
      setSelectedWorkDetail([]);
      setSelectedWork();
      setOpenWorkModal(false);
      getworks();
    }
  };

  return (
    <div style={{ width: '45vw', maxHeight: '80vh', overflow: 'auto' }}>
      <form style={{ marginTop: 'auto', marginBottom: 'auto' }} onSubmit={handleSubmit}>
        {/* All fields */}
        <br />
        <InputWithLabel
          label={t('Name')}
          required={true}
          name="name"
          type="text"
          value={values.name}
          handleChange={e => handleChange(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <InputDropdown
          name="unit"
          label={t('Unit')}
          value={values.unit}
          onChange={e => handleChange(e.target.name, e.target.value)}
          options={options}
        />
        <br />
        <InputWithLabel
          label={t('Qty')}
          required={true}
          name="quantity"
          type="text"
          value={values.quantity}
          handleChange={e => handleChange(e.target.name, e.target.value)}
          onBlur={() => {
            let temp = values.quantity.replace(/\s/g, '').split(',').join('.');
            setValues(prev => {
              prev['quantity'] = formatNumber(parseFloat(temp).toFixed(2).toString(), '.');
              return { ...prev };
            });
          }}
          onFocus={() => {
            let temp = values.quantity.replace(/\s/g, '').split(',').join('.');
            setValues(prev => {
              prev['quantity'] = formatNumber(parseFloat(temp).toFixed(2).toString(), '.');
              return { ...prev };
            });
          }}
        />
        <br />
        <br />
        <InputWithLabel
          label="PU HT"
          required={true}
          name="unit_price"
          type="text"
          value={values.unit_price}
          handleChange={e => handleChange(e.target.name, e.target.value)}
          onBlur={() => {
            let temp = values.unit_price.replace(/\s/g, '').split(',').join('.');
            setValues(prev => {
              prev['unit_price'] = formatNumber(parseFloat(temp).toFixed(2).toString());
              return { ...prev };
            });
          }}
          onFocus={() => {
            let temp = values.unit_price.replace(/\s/g, '').split(',').join('.');
            setValues(prev => {
              prev['unit_price'] = formatNumber(parseFloat(temp).toFixed(2).toString());
              return { ...prev };
            });
          }}
        />
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#3b373c',
              height: '35px'
            }}
            onClick={() => {
              setSelectedWorkDetail([]);
              setSelectedWork();
              setOpenWorkModal(false);
            }}>
            {t('Close')}
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            style={{
              backgroundColor: '#3b373c',
              height: '35px'
            }}
            type="submit">
            {t('Submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddWorkModal;
