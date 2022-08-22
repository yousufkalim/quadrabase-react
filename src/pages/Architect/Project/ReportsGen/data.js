import { Paragraph, TextRun, UnderlineType, ImageRun } from 'docx';
import reactImageSize from 'react-image-size';
import axios from 'axios';
import { Buffer } from 'buffer';
import { htmlTagRegex, cctpArr } from '../../../../utils/Constants';
import { formatNumber } from '../../../../utils/markThousand';
import {
  l4Font,
  l3Font,
  l2Font,
  l1Font,
  ln1Font,
  fontType,
  docText,
  singleParagraphText,
  l4Text,
  l3Text,
  l2Text,
  l1Text,
} from './docxFormatting';

function dateNowFormatted() {
  return `${new Date(Date.now()).toLocaleDateString('en-gb')}`;
}

function headGen(headingName, projectName) {
  const headArr = [];

  headArr.push(headingName);
  headArr.push(projectName);
  headArr.push(`${dateNowFormatted()}`);

  return headArr;
}

function rowsGenSimpleEstimation(data, noPrice) {
  const rows = rowsGenEstimationHandleWorksAndWorkDetails({
    data: data,
    noPrice,
  });
  return rows;
}

function rowsGenTradesEstimation(data, noPrice) {
  const rows = [];

  for (let i = 0; i < data.length; i++) {
    // Trade for loop
    const tradeTitle = data[i]._id;
    const tradeData = data[i].data;
    const tradeObj = {};
    const workAndDetailsRows = rowsGenEstimationHandleWorksAndWorkDetails({
      data: tradeData,
      prefix: `${i + 1}.`,
      noPrice: noPrice,
    });
    tradeObj.trade = tradeTitle;
    tradeObj.rows = workAndDetailsRows;
    rows.push(tradeObj);
  }

  return rows;
}

function rowsGenTradesAndTranchesEstimation(data, noPrice) {
  const rows = [];

  for (let i = 0; i < data.length; i++) {
    // Trade for loop
    const tradeTitle = data[i]._id;
    const tradeData = data[i].data;
    const tranchesRows = [];
    const tradeObj = {};
    for (let j = 0; j < tradeData.length; j++) {
      // Tranch for loop
      const tranchTitle = tradeData[j].tranch;
      const tranchDataArr = tradeData[j].tranchData;
      const tranchObj = {};
      const workAndDetailsRows = rowsGenEstimationHandleWorksAndWorkDetails({
        data: tranchDataArr,
        prefix: `${i + 1}.${j + 1}.`,
        noPrice: noPrice,
      });
      tranchObj.tranch = tranchTitle;
      tranchObj.rows = workAndDetailsRows;
      tranchesRows.push(tranchObj);
    }
    tradeObj.trade = tradeTitle;
    tradeObj.rows = tranchesRows;
    rows.push(tradeObj);
  }

  return rows;
}

function rowsGenSimpleDPGF(data) {
  const rows = [];

  rowsGenDPGFHandleWorksAndWorkDetailsForSimple(rows, data, `${1}`);

  return rows;
}

function rowsGenTradesDPGF(data) {
  const rows = [];

  for (let i = 0; i < data.length; i++) {
    // Trade for loop
    const tradeTitle = data[i]._id;
    const tradeData = data[i].data;
    let workAndDetailsRows = [];
    const tradeObj = {};
    rowsGenDPGFHandleWorksAndWorkDetails(workAndDetailsRows, tradeData, `${i + 1}`);
    let number = 1;
    let prevWork;
    workAndDetailsRows = workAndDetailsRows.map((item, index) => {
      if (typeof item[1] === 'string') {
        item[0] = `${prevWork}.${number}`;
        number += 1;
      } else {
        number = 1;
        prevWork = item[0];
      }
      return item;
    });
    tradeObj.trade = tradeTitle;
    tradeObj.rows = workAndDetailsRows;
    rows.push(tradeObj);
  }

  return rows;
}

function rowsGenTradesAndTranchesDPGF(data) {
  const rows = [];

  for (let i = 0; i < data.length; i++) {
    // Trade for loop
    const tradeTitle = data[i]._id;
    const tradeData = data[i].data;
    const tranchesRows = [];
    const tradeObj = {};
    for (let j = 0; j < tradeData.length; j++) {
      // Tranch for loop
      const tranchTitle = tradeData[j].tranch;
      const tranchDataArr = tradeData[j].tranchData;
      let workAndDetailsRows = [];
      const tranchObj = {};
      rowsGenDPGFHandleWorksAndWorkDetails(workAndDetailsRows, tranchDataArr, `${i + 1}.${j + 1}`);
      let number = 1;
      let prevWork;
      workAndDetailsRows = workAndDetailsRows.map((item, index) => {
        if (typeof item[1] === 'string') {
          item[0] = `${prevWork}.${number}`;
          number += 1;
        } else {
          number = 1;
          prevWork = item[0];
        }
        return item;
      });
      tranchObj.tranch = tranchTitle;
      tranchObj.rows = workAndDetailsRows;
      tranchesRows.push(tranchObj);
    }
    tradeObj.trade = tradeTitle;
    tradeObj.rows = tranchesRows;
    rows.push(tradeObj);
  }

  return rows;
}

function rowsGenEstimationHandleWorksAndWorkDetails({ data, prefix = '', noPrice = false }) {
  const resArr = [];
  let _id;
  let workIndex = 0;
  let workDetailsIndex = 0;
  for (let i = 0; i < data.length; i++) {
    // Work
    if (_id != data[i].work._id) {
      const arr = [];

      arr.push(`${prefix}${workIndex + 1}`);
      arr.push(data[i].work.name);
      arr.push(data[i].workUnit?.symbol ?? '');
      arr.push(formatNumber(data[i].work?.quantity?.toFixed(2), '.') ?? '');

      if (noPrice) {
        arr.push('');
        arr.push('');
      } else {
        arr.push(formatNumber(data[i].work?.unit_price?.toFixed(2), '.') ?? '0.00');
        arr.push(formatNumber(((data[i].work?.unit_price ?? 0) * (data[i].work.quantity ?? 0))?.toFixed(2), '.'));
      }

      resArr.push(arr);

      // If there is workdetail then parse it.
      if (data[i].workDetails) {
        const arrD = [];

        arrD.push(`${prefix}${workIndex + 1}.1`);
        arrD.push(data[i].workDetails.name);
        arrD.push(data[i].workDetailsUnit?.symbol ?? '');
        arrD.push(formatNumber(data[i].workDetails.quantity.toFixed(2), '.'));

        if (noPrice) {
          arrD.push('');
          arrD.push('');
        } else {
          arrD.push(formatNumber(data[i].workDetails.unit_price.toFixed(2), '.'));
          arrD.push(formatNumber((data[i].workDetails.unit_price * data[i].workDetails.quantity).toFixed(2), '.'));
        }

        resArr.push(arrD);
        workDetailsIndex++;
      }
    } else {
      // WorkDetail
      const arrD = [];

      arrD.push(`${prefix}${workIndex + 1}.${workDetailsIndex + 1}`);
      arrD.push(data[i].workDetails.name);
      arrD.push(data[i].workDetailsUnit?.symbol ?? '');
      arrD.push(formatNumber(data[i].workDetails.quantity.toFixed(2), '.'));

      if (noPrice) {
        arrD.push('');
        arrD.push('');
      } else {
        arrD.push(formatNumber(data[i].workDetails.unit_price.toFixed(2), '.'));
        arrD.push(formatNumber((data[i].workDetails.unit_price * data[i].workDetails.quantity).toFixed(2), '.'));
      }

      resArr.push(arrD);
      if (_id && _id != data[i + 1]?.work?._id) workIndex++;
      workDetailsIndex++;
    }

    _id = data[i].work._id;

    // Next is work
    if (_id != data[i + 1]?.work?._id) {
      workDetailsIndex = 0;
      workIndex++;
    }
  }

  return resArr;
}

function rowsGenDPGFHandleWorksAndWorkDetails(toBeModifiedArr, data, prefix) {
  let _id;

  for (let i = 0; i < data.length; i++) {
    if (_id != data[i].work._id) {
      const arr = [];

      arr.push(`${prefix}.${i + 1}`);
      const obj = {
        title: data[i].work.name,
        bpu: data[i].work.bpu_text[0],
      };
      arr.push(obj);
      arr.push(data[i].workUnit?.symbol ?? '');
      arr.push(formatNumber(data[i].work?.quantity?.toFixed(2)) ?? '');
      arr.push('');
      arr.push('');

      toBeModifiedArr.push(arr);

      if (data[i].workDetails) {
        const arrD = [];

        arrD.push(`${prefix}.${i + 1}`);
        arrD.push(data[i].workDetails.name);
        arrD.push(data[i].workDetailsUnit.symbol);
        arrD.push(formatNumber(data[i].workDetails.quantity.toFixed(2)));
        arrD.push('');
        arrD.push('');

        toBeModifiedArr.push(arrD);
      }
    } else {
      const arrD = [];

      arrD.push(`${prefix}.${i + 1}`);
      arrD.push(data[i].workDetails.name);
      arrD.push(data[i].workDetailsUnit.symbol);
      arrD.push(formatNumber(data[i].workDetails.quantity.toFixed(2)));
      arrD.push('');
      arrD.push('');

      toBeModifiedArr.push(arrD);
    }

    _id = data[i].work._id;
  }
}

function rowsGenDPGFHandleWorksAndWorkDetailsForSimple(toBeModifiedArr, data) {
  let _id;

  let currentWork = 1;
  for (let i = 0; i < data.length; i++) {
    if (_id != data[i].work._id) {
      currentWork = i + 1;
      const arr = [];

      arr.push(`${i + 1}`);
      const obj = {
        title: data[i].work.name,
        bpu: data[i].work.bpu_text[0],
      };
      arr.push(obj);
      arr.push(data[i].workUnit?.symbol ?? '');
      arr.push(formatNumber(data[i].work?.quantity?.toFixed(2)) ?? '');
      arr.push('');
      arr.push('');

      toBeModifiedArr.push(arr);

      if (data[i].workDetails) {
        const arrD = [];

        arrD.push(`${currentWork}.${i + 1}`);
        arrD.push(data[i].workDetails.name);
        arrD.push(data[i].workDetailsUnit.symbol);
        arrD.push(formatNumber(data[i].workDetails.quantity.toFixed(2)));
        arrD.push('');
        arrD.push('');

        toBeModifiedArr.push(arrD);
      }
    } else {
      const arrD = [];

      arrD.push(`${currentWork}.${i + 1}`);
      arrD.push(data[i].workDetails.name);
      arrD.push(data[i].workDetailsUnit.symbol);
      arrD.push(formatNumber(data[i].workDetails.quantity.toFixed(2)));
      arrD.push('');
      arrD.push('');

      toBeModifiedArr.push(arrD);
    }

    _id = data[i].work._id;
  }
}

function xlsxParsedDataGenSimpleEstimation(rows) {
  const xlsxParsedData = [];

  // Populate body data in xlsxParsedData
  for (let i = 0; i < rows.length; i++) {
    let obj = {};
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      obj[dataColumnsEstimation[j]] = rows[i][j];
    }
    xlsxParsedData.push(obj);
  }

  return xlsxParsedData;
}

function xlsxParsedDataGenTradesEstimation(trade, index, noPrice) {
  const xlsxParsedData = [];

  // Populate trade title in xlsxParsedData
  const tradeObj = {};
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    if (i == 0) {
      tradeObj[dataColumnsEstimation[i]] = `${index}`;
    } else if (i == 1) {
      tradeObj[dataColumnsEstimation[i]] = trade.trade;
    } else {
      tradeObj[dataColumnsEstimation[i]] = '';
    }
  }
  xlsxParsedData.push(tradeObj);

  const workAndWorkDetailsRows = trade.rows;

  // Populate body data in xlsxParsedData
  for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
    let obj = {};
    for (let k = 0; k < dataColumnsEstimation.length; k++) {
      obj[dataColumnsEstimation[k]] = workAndWorkDetailsRows[j][k];
    }
    xlsxParsedData.push(obj);
  }

  const tradeTotal = calculateTotalHT(workAndWorkDetailsRows);

  // Populate trade total in xlsxParsedData
  const tradeTotalHTObj = {};
  for (let j = 0; j < dataColumnsEstimation.length; j++) {
    if (j == 1) {
      tradeTotalHTObj[dataColumnsEstimation[j]] = `Total ${trade.trade} : `;
    } else if (j == 5) {
      tradeTotalHTObj[dataColumnsEstimation[j]] = !noPrice ? tradeTotal : '';
    } else {
      tradeTotalHTObj[dataColumnsEstimation[j]] = '';
    }
  }
  xlsxParsedData.push(tradeTotalHTObj);

  return xlsxParsedData;
}

function xlsxParsedDataGenTradesAndTranchesEstimation(trade, index, noPrice) {
  const xlsxParsedData = [];

  // Populate trade title in xlsxParsedData
  const tradeObj = {};
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    if (i == 0) {
      tradeObj[dataColumnsEstimation[i]] = `${index}`;
    } else if (i == 1) {
      tradeObj[dataColumnsEstimation[i]] = trade.trade;
    } else {
      tradeObj[dataColumnsEstimation[i]] = '';
    }
  }
  xlsxParsedData.push(tradeObj);

  const trachesRows = trade.rows;
  let tradeTotal = null; // null is okay, undefined is not.
  for (let i = 0; i < trachesRows.length; i++) {
    const currentObj = trachesRows[i];

    // Populate tranch title in xlsxParsedData
    const tranchObj = {};
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      if (j == 0) {
        tranchObj[dataColumnsEstimation[j]] = `${index}.${i + 1}`;
      } else if (j == 1) {
        tranchObj[dataColumnsEstimation[j]] = currentObj.tranch;
      } else {
        tranchObj[dataColumnsEstimation[j]] = '';
      }
    }
    xlsxParsedData.push(tranchObj);

    const workAndWorkDetailsRows = currentObj.rows;

    // Populate body data in xlsxParsedData
    for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
      let obj = {};
      for (let k = 0; k < dataColumnsEstimation.length; k++) {
        obj[dataColumnsEstimation[k]] = workAndWorkDetailsRows[j][k];
      }
      xlsxParsedData.push(obj);
    }

    const trancheTotalHT = calculateTotalHT(workAndWorkDetailsRows);

    // Populate tranch total in xlsxParsedData
    const trancheTotalHTObj = {};
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      if (j == 1) {
        trancheTotalHTObj[dataColumnsEstimation[j]] = `Total ${currentObj.tranch} :`;
      } else if (j == 5) {
        trancheTotalHTObj[dataColumnsEstimation[j]] = !noPrice ? trancheTotalHT ?? '' : '';
      } else {
        trancheTotalHTObj[dataColumnsEstimation[j]] = '';
      }
    }
    xlsxParsedData.push(trancheTotalHTObj);

    if (trancheTotalHT) {
      let _ = trancheTotalHT;
      _.slice(0, -3);
      _ = _.replace(' ', '');
      _ = parseInt(_);
      tradeTotal = tradeTotal + _;
    }
  }

  // Populate trade total in xlsxParsedData
  const tradeTotalHTObj = {};
  for (let j = 0; j < dataColumnsEstimation.length; j++) {
    if (j == 1) {
      tradeTotalHTObj[dataColumnsEstimation[j]] = `Total ${trade.trade} :`;
    } else if (j == 5) {
      tradeTotalHTObj[dataColumnsEstimation[j]] = !noPrice ? formatNumber(parseInt(tradeTotal).toFixed(2), '.') : '';
    } else {
      tradeTotalHTObj[dataColumnsEstimation[j]] = '';
    }
  }
  xlsxParsedData.push(tradeTotalHTObj);

  return xlsxParsedData;
}

function pdfParsedDataGenTradesEstimation(trade, index, noPrice) {
  const pdfParsedData = [];

  // Populate trade title in xlsxParsedData
  const tradeArr = [];
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    if (i == 0) {
      tradeArr[i] = `${index}`;
    } else if (i == 1) {
      tradeArr[i] = trade.trade;
    } else {
      tradeArr[i] = '';
    }
  }
  pdfParsedData.push(tradeArr);

  const workAndWorkDetailsRows = trade.rows;

  // Populate body data in xlsxParsedData
  for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
    let arr = [];
    for (let k = 0; k < dataColumnsEstimation.length; k++) {
      arr[k] = workAndWorkDetailsRows[j][k];
    }
    pdfParsedData.push(arr);
  }

  const tradeTotal = calculateTotalHT(workAndWorkDetailsRows);

  // Populate trade total in xlsxParsedData
  const tradeTotalHTArr = [];
  for (let j = 0; j < dataColumnsEstimation.length; j++) {
    if (j == 1) {
      tradeTotalHTArr[j] = `Total ${trade.trade}:`;
    } else if (j == 5) {
      tradeTotalHTArr[j] = !noPrice ? tradeTotal ?? '' : '';
    } else {
      tradeTotalHTArr[j] = '';
    }
  }
  pdfParsedData.push(tradeTotalHTArr);

  return pdfParsedData;
}

function pdfParsedDataGenTradesAndTranchesEstimation(trade, index, noPrice) {
  const pdfParsedData = [];

  // Populate trade title in pdfParsedData
  const tradeArr = [];
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    if (i == 0) {
      tradeArr[i] = `${index}`;
    } else if (i == 1) {
      tradeArr[i] = trade.trade;
    } else {
      tradeArr[i] = '';
    }
  }
  pdfParsedData.push(tradeArr);

  const trachesRows = trade.rows;
  let tradeTotal = null; // null is okay, undefined is not.
  for (let i = 0; i < trachesRows.length; i++) {
    const currentObj = trachesRows[i];

    // Populate tranch title in pdfParsedData
    const tranchArr = [];
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      if (j == 0) {
        tranchArr[j] = `${index}.${i + 1}`;
      } else if (j == 1) {
        tranchArr[j] = currentObj.tranch;
      } else {
        tranchArr[j] = '';
      }
    }
    pdfParsedData.push(tranchArr);

    const workAndWorkDetailsRows = currentObj.rows;

    // Populate body data in pdfParsedData
    for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
      let arr = [];
      for (let k = 0; k < dataColumnsEstimation.length; k++) {
        arr[k] = workAndWorkDetailsRows[j][k];
      }
      pdfParsedData.push(arr);
    }

    const trancheTotalHT = calculateTotalHT(workAndWorkDetailsRows);

    // Populate tranch total in pdfParsedData
    const trancheTotalHTObj = [];
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      if (j == 1) {
        trancheTotalHTObj[j] = `Total ${trade.rows[i].tranch}:`;
      } else if (j == 5) {
        trancheTotalHTObj[j] = !noPrice ? trancheTotalHT ?? '' : '';
      } else {
        trancheTotalHTObj[j] = '';
      }
    }
    pdfParsedData.push(trancheTotalHTObj);

    if (trancheTotalHT) {
      let _ = trancheTotalHT;
      _.slice(0, -3);
      _ = _.replace(' ', '');
      _ = parseInt(_);
      tradeTotal = tradeTotal + _;
    }
  }

  // Populate trade total in pdfParsedData
  const tradeTotalHTObj = [];
  for (let j = 0; j < dataColumnsEstimation.length; j++) {
    if (j == 1) {
      tradeTotalHTObj[j] = `Total ${trade.trade}:`;
    } else if (j == 5) {
      tradeTotalHTObj[j] = !noPrice ? formatNumber(tradeTotal?.toFixed(2)) ?? '' : '';
    } else {
      tradeTotalHTObj[j] = '';
    }
  }
  pdfParsedData.push(tradeTotalHTObj);

  return pdfParsedData;
}

function docxParsedDataGenTradesEstimation(trade, index, noPrice) {
  const docxParsedData = [];

  // Populate trade title in xlsxParsedData
  const tradeArr = [];
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    if (i == 0) {
      tradeArr[i] = `${index}`;
    } else if (i == 1) {
      tradeArr[i] = trade.trade;
    } else {
      tradeArr[i] = '';
    }
  }
  docxParsedData.push(tradeArr);

  const workAndWorkDetailsRows = trade.rows;

  // Populate body data in xlsxParsedData
  for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
    let arr = [];
    for (let k = 0; k < dataColumnsEstimation.length; k++) {
      arr[k] = workAndWorkDetailsRows[j][k];
    }
    docxParsedData.push(arr);
  }

  const tradeTotal = calculateTotalHT(workAndWorkDetailsRows);

  // Populate trade total in xlsxParsedData
  const tradeTotalHTArr = [];
  for (let j = 0; j < dataColumnsEstimation.length; j++) {
    if (j == 1) {
      tradeTotalHTArr[j] = `Total ${trade.trade}:`;
    } else if (j == 5) {
      tradeTotalHTArr[j] = !noPrice ? tradeTotal : '';
    } else {
      tradeTotalHTArr[j] = '';
    }
  }
  docxParsedData.push(tradeTotalHTArr);

  return docxParsedData;
}

function docxParsedDataGenTradesAndTranchesEstimation(trade, index, noPrice) {
  const docxParsedData = [];

  // Populate trade title in docxParsedData
  const tradeArr = [];
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    if (i == 0) {
      tradeArr[i] = `${index}`;
    } else if (i == 1) {
      tradeArr[i] = trade.trade;
    } else {
      tradeArr[i] = '';
    }
  }
  docxParsedData.push(tradeArr);

  const trachesRows = trade.rows;
  let tradeTotal = null; // null is okay, undefined is not.
  for (let i = 0; i < trachesRows.length; i++) {
    const currentObj = trachesRows[i];

    // Populate tranch title in docxParsedData
    const tranchArr = [];
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      if (j == 0) {
        tranchArr[j] = `${index}.${i + 1}`;
      } else if (j == 1) {
        tranchArr[j] = currentObj.tranch;
      } else {
        tranchArr[j] = '';
      }
    }
    docxParsedData.push(tranchArr);

    const workAndWorkDetailsRows = currentObj.rows;

    // Populate body data in docxParsedData
    for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
      let arr = [];
      for (let k = 0; k < dataColumnsEstimation.length; k++) {
        arr[k] = workAndWorkDetailsRows[j][k];
      }
      docxParsedData.push(arr);
    }

    const trancheTotalHT = calculateTotalHT(workAndWorkDetailsRows);

    // Populate tranch total in docxParsedData
    const trancheTotalHTObj = [];
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      if (j == 1) {
        trancheTotalHTObj[j] = `Total ${trade.rows[i].tranch}:`;
      } else if (j == 5) {
        trancheTotalHTObj[j] = !noPrice ? trancheTotalHT ?? '' : '';
      } else {
        trancheTotalHTObj[j] = '';
      }
    }
    docxParsedData.push(trancheTotalHTObj);

    if (trancheTotalHT) {
      let _ = trancheTotalHT;
      _.slice(0, -3);
      _ = _.replace(' ', '');
      _ = parseInt(_);
      tradeTotal = tradeTotal + _;
    }
  }

  // Populate trade total in docxParsedData
  const tradeTotalHTObj = [];
  for (let j = 0; j < dataColumnsEstimation.length; j++) {
    if (j == 1) {
      tradeTotalHTObj[j] = `Total ${trade.trade}:`;
    } else if (j == 5) {
      tradeTotalHTObj[j] = !noPrice ? formatNumber(tradeTotal.toFixed(2)) : '';
    } else {
      tradeTotalHTObj[j] = '';
    }
  }
  docxParsedData.push(tradeTotalHTObj);

  return docxParsedData;
}

function calculateTotalHT(data, noPrice) {
  if (noPrice) {
    return;
  }

  let totalHT = 0;

  for (let i = 0; i < data.length; i++) {
    const currentArr = data[i];

    let _ = currentArr[5];
    if (!_) {
      continue;
    }

    _.slice(0, -3);
    _ = _.replace(' ', '');
    _ = parseInt(_);
    totalHT = totalHT + _;
  }

  const formattedTotalHT = formatNumber(totalHT.toFixed(2), '.');

  return formattedTotalHT;
}

function docxParsedDataGenTradesDPGF(trade, index) {
  const docxParsedData = [];

  // Populate trade title in docxParsedData
  const tradeArr = [];
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    if (i == 0) {
      tradeArr[i] = `${index}`;
    } else if (i == 1) {
      tradeArr[i] = trade.trade;
    } else {
      tradeArr[i] = '';
    }
  }
  docxParsedData.push(tradeArr);

  const workAndWorkDetailsRows = trade.rows;

  // Populate body data in docxParsedData
  for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
    let arr = [];
    for (let k = 0; k < dataColumnsEstimation.length; k++) {
      arr[k] = workAndWorkDetailsRows[j][k];
    }
    docxParsedData.push(arr);
  }

  return docxParsedData;
}

function docxParsedDataGenTradesAndTranchesDPGF(trade, index) {
  const docxParsedData = [];

  // Populate trade title in docxParsedData
  const tradeArr = [];
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    if (i == 0) {
      tradeArr[i] = `${index}`;
    } else if (i == 1) {
      tradeArr[i] = trade.trade;
    } else {
      tradeArr[i] = '';
    }
  }
  docxParsedData.push(tradeArr);

  const trachesRows = trade.rows;
  for (let i = 0; i < trachesRows.length; i++) {
    const currentObj = trachesRows[i];

    // Populate tranch title in docxParsedData
    const tranchArr = [];
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      if (j == 0) {
        tranchArr[j] = `${index}.${i + 1}`;
      } else if (j == 1) {
        tranchArr[j] = currentObj.tranch;
      } else {
        tranchArr[j] = '';
      }
    }
    docxParsedData.push(tranchArr);

    const workAndWorkDetailsRows = currentObj.rows;

    // Populate body data in docxParsedData
    for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
      let arr = [];
      for (let k = 0; k < dataColumnsEstimation.length; k++) {
        arr[k] = workAndWorkDetailsRows[j][k];
      }
      docxParsedData.push(arr);
    }
  }

  return docxParsedData;
}

function footerDataGenSimpleEstimation(_data, currentProject, noPrice, addSpace) {
  const data = [..._data];
  let footerData = [];
  let totalHT = 0;

  data.map((item, index) => {
    if (!item.workDetails) {
      totalHT += item.work.unit_price * item.work.quantity;
    } else {
      if (item.work._id !== data[index - 1]?.work._id) {
        totalHT += item.workDetails.quantity * item.workDetails.unit_price;
      } else {
        totalHT += item.workDetails.quantity * item.workDetails.unit_price;
      }
    }
  });

  if (!noPrice) {
    footerData = [
      formatNumber(totalHT.toFixed(2)),
      formatNumber(((totalHT / 100) * currentProject?.vat?.value).toFixed(2), '.'),
      formatNumber(Math.floor(totalHT * (1 + currentProject?.vat?.value / 100)).toFixed(2)),
    ];
  } else {
    footerData = ['', '', ''];
  }

  if (addSpace) {
    footerData.splice(1, 0, '');
  }

  return footerData;
}

function footerDataGenTradesEstimation(_data, currentProject, noPrice, addSpace) {
  const data = [..._data];
  let footerData = [];
  let totalHT = 0;

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
      totalHT += temp;
    });
    tempArray[index1] = tempSum;
  });

  if (!noPrice) {
    footerData = [
      formatNumber(totalHT.toFixed(2)),
      formatNumber(((totalHT / 100) * currentProject?.vat?.value).toFixed(2), '.'),
      formatNumber(Math.floor(totalHT * (1 + currentProject?.vat?.value / 100)).toFixed(2)),
    ];
  } else {
    footerData = ['', '', ''];
  }

  if (addSpace) {
    footerData.splice(1, 0, '');
  }

  return footerData;
}

function footerDataGenTradesAndTranchesEstimation(data, currentProject, noPrice, addSpace) {
  let footerData = [];
  let totalHT = 0;

  data.map(({ ...item }) => {
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
          amountTranch += item3.tranchAmount;
        });
        tempObject.tranchAmount = amountTranch;
        totalHT = totalHT + amountTranch;
        tempArray2.push(tempObject);
      }
    });
    item.data = tempArray2.sort((a, b) => a.ranking - b.ranking);
  });

  if (!noPrice) {
    footerData = [
      formatNumber(totalHT.toFixed(2), '.'),
      formatNumber(((totalHT / 100) * currentProject?.vat?.value).toFixed(2), '.'),
      formatNumber(Math.floor(totalHT * (1 + currentProject?.vat?.value / 100)).toFixed(2), '.'),
    ];
  } else {
    footerData = ['', '', ''];
  }

  if (addSpace) {
    footerData.splice(1, 0, '');
  }

  return footerData;
}

function footerDataGenSimpleDPGF(addSpace) {
  let footerData = [];

  footerData = ['', '', '', ''];

  if (addSpace) {
    footerData.splice(1, 0, '');
  }

  return footerData;
}

function xlsxParsedFooterDataGenEstimation(floatsRow, footerColumns, currentProject) {
  const xlsxParsedData = [];

  for (let i = 0; i < footerColumns.length; i++) {
    const obj = {};
    for (let j = 0; j < dataColumnsEstimation.length; j++) {
      if (j == 1) {
        obj[dataColumnsEstimation[j]] = `${footerColumns[i]}`;
      } else if (j == 5) {
        obj[dataColumnsEstimation[j]] = floatsRow[i];
      } else {
        obj[dataColumnsEstimation[j]] = '';
      }
    }
    xlsxParsedData.push(obj);
  }

  // `${footerColumns[i]} (${currentProject?.vat?.value}%) :`

  return xlsxParsedData;
}

const calculateWSCols = (arr) => {
  let nameL = null;
  let unitL = null;
  for (let i = 0; i < arr.length; i++) {
    const currentObj = arr[i];
    const values = Object.values(currentObj);
    if (values[1].length > nameL) {
      nameL = values[1].length;
    }
    if (values[2].length > unitL) {
      unitL = values[2].length;
    }
  }

  if (unitL < 10) {
    unitL = 10;
  }

  const wscols = [{ wch: 10 }, { wch: nameL }, { wch: unitL }, { wch: 10 }, { wch: 10 }, { wch: 10 }];

  return wscols;
};

function rowsGenSimpleBPU(data, type) {
  const rows = rowsGenBPUHandleWorksAndWorkdetails(data, type);
  return rows;
}

function rowsGenTradesBPU(data, type) {
  const rows = [];

  for (let i = 0; i < data.length; i++) {
    const currentObjTrade = data[i];
    const tradeObj = {
      rows: [`${i + 1}`, currentObjTrade._id, ''],
      arr: [],
    };
    const worksAndWorkDetailsArr = currentObjTrade.data;
    const worksAndWorkDetailsArrParsed = rowsGenBPUHandleWorksAndWorkdetails(worksAndWorkDetailsArr, type, `${i + 1}.`);
    tradeObj.arr.push(...worksAndWorkDetailsArrParsed);
    rows.push(tradeObj);
  }

  return rows;
}

function rowsGenTradesAndTranchesBPU(data, type) {
  const rows = [];

  for (let i = 0; i < data.length; i++) {
    const currentObjTrade = data[i];
    const tradeObj = {
      rows: [`${i + 1}`, currentObjTrade._id, ''],
      arr: [],
    };
    const tranchesArr = currentObjTrade.data;
    for (let j = 0; j < tranchesArr.length; j++) {
      const currentObjTranch = tranchesArr[j];
      const tranchObj = {
        rows: [`${i + 1}.${j + 1}`, currentObjTranch.tranch, ''],
        arr: [],
      };
      const worksAndWorkDetailsArr = currentObjTranch.tranchData;
      const worksAndWorkDetailsArrParsed = rowsGenBPUHandleWorksAndWorkdetails(
        worksAndWorkDetailsArr,
        type,
        `${i + 1}.${j + 1}.`
      );
      tranchObj.arr.push(...worksAndWorkDetailsArrParsed);
      tradeObj.arr.push(tranchObj);
    }
    rows.push(tradeObj);
  }

  return rows;
}

function rowsGenBPUHandleWorksAndWorkdetails(data, type, prefix = '') {
  const resArr = [];
  let _id;
  let workIndex = 0;
  let workDetailsIndex = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].work.bpu_text.length == 0) {
      continue;
    }

    // Work
    if (_id != data[i].work._id) {
      const arr1 = [];
      arr1.push(`${prefix}${workIndex + 1}`);
      const obj = {
        title: data[i].work.name,
        text: data[i].work.bpu_text[0],
        unit: data[i].work?.unit?.name,
      };
      arr1.push(obj);
      arr1.push('');
      resArr.push(arr1);

      // If there is workdetail then parse it.
      if (data[i].workDetails) {
        const arr2 = [];
        arr2.push(`${prefix}${workIndex + 1}.1`);
        const obj = {
          title: data[i].workDetails.name,
          text: data[i].workDetails.unit.name,
        };
        arr2.push(obj);
        arr2.push(type === 'pdf' ? 'PU HT<br>(en chiffres)' : '<p>PU HT<br>(en chiffres)</p>');
        resArr.push(arr2);

        workDetailsIndex++;
      }
    } else {
      // WorkDetail
      const arr1 = [];
      arr1.push(`${prefix}${workIndex + 1}.${workDetailsIndex + 1}`);
      const obj = {
        title: data[i].workDetails.name,
        text: data[i].workDetails.unit.name,
      };
      arr1.push(obj);
      arr1.push(type === 'pdf' ? 'PU HT<br>(en chiffres)' : '<p>PU HT<br>(en chiffres)</p>');
      resArr.push(arr1);
      workDetailsIndex++;
    }

    _id = data[i].work._id;

    // Next is work
    if (_id != data[i + 1]?.work?._id) {
      workDetailsIndex = 0;
      workIndex++;
    }
  }

  return resArr;
}

function rowsGenSimpleCCTP(data, currentProject, selectedCCTPIndexes) {
  const _selectedCCTPIndexes = [...selectedCCTPIndexes];

  let chap0;
  if (_selectedCCTPIndexes.includes(0)) {
    const index = _selectedCCTPIndexes.indexOf(0);
    if (index > -1) {
      _selectedCCTPIndexes.splice(index, 1);
    }
    chap0 = parseChap0(currentProject);
  }

  const cctps = [];

  for (let i = 0; i < cctpArr.length; i++) {
    if (selectedCCTPIndexes.includes(i + 1)) {
      const obj = {
        title: `${cctpArr[i + 1]}`,
        arr: findCCTPsSimple(data, i),
      };
      cctps.push(obj);
    }
  }

  const obj = {
    chap0,
    cctps,
  };

  return obj;
}

function rowsGenTradesCCTP(data, currentProject, selectedCCTPIndexes) {
  const _selectedCCTPIndexes = [...selectedCCTPIndexes];

  let chap0;
  if (_selectedCCTPIndexes.includes(0)) {
    const index = _selectedCCTPIndexes.indexOf(0);
    if (index > -1) {
      _selectedCCTPIndexes.splice(index, 1);
    }
    chap0 = parseChap0(currentProject);
  }

  const cctps = [];

  for (let i = 0; i < cctpArr.length; i++) {
    if (selectedCCTPIndexes.includes(i + 1)) {
      const obj = {
        title: `${cctpArr[i + 1]}`,
        arr: findCCTPsTrades(data, i),
      };
      cctps.push(obj);
    }
  }

  const obj = {
    chap0,
    cctps,
  };

  return obj;
}

function rowsGenTradesAndTranchesCCTP(data, currentProject, selectedCCTPIndexes) {
  const _selectedCCTPIndexes = [...selectedCCTPIndexes];

  let chap0;
  if (_selectedCCTPIndexes.includes(0)) {
    const index = _selectedCCTPIndexes.indexOf(0);
    if (index > -1) {
      _selectedCCTPIndexes.splice(index, 1);
    }
    chap0 = parseChap0(currentProject);
  }

  const cctps = [];

  for (let i = 0; i < cctpArr.length; i++) {
    if (selectedCCTPIndexes.includes(i + 1)) {
      const obj = {
        title: `${cctpArr[i + 1]}`,
        arr: findCCTPsTradesAndTranches(data, i),
      };
      cctps.push(obj);
    }
  }

  const obj = {
    chap0,
    cctps,
  };

  return obj;
}

function parseChap0(currentProject) {
  if (!currentProject.chap0part2) {
    return null;
  }

  const stakeholders = currentProject?.stakeholders ?? [];
  const _stakeholders = [];
  for (let i = 0; i < stakeholders.length; i++) {
    const _ = stakeholders[i];
    if (_.name || _.establishment) {
      _stakeholders.push(_.name ?? _.establishment);
    }
  }

  const client = {
    name: currentProject?.client?.establishment?.length > 0 ? currentProject?.client?.establishment : 'N/A',
    address: currentProject?.client?.address1?.length > 0 ? currentProject?.client?.address1 : 'N/A',
    email: currentProject?.client?.email?.length > 0 ? currentProject?.client?.email : 'N/A',
    phone: `Tel. : ${currentProject?.client?.zipcode?.length > 0 ? currentProject?.client?.zipcode : 'N/A'}`,
  };

  const prescriber = {
    name: currentProject?.prescriber?.establishment?.length > 0 ? currentProject?.prescriber?.establishment : 'N/A',
    address: currentProject?.prescriber?.address1?.length > 0 ? currentProject?.prescriber?.address1 : 'N/A',
    email: currentProject?.prescriber?.email?.length > 0 ? currentProject?.prescriber?.email : 'N/A',
    phone: `Tel. : ${currentProject?.prescriber?.zipcode?.length > 0 ? currentProject?.prescriber?.zipcode : 'N/A'}`,
  };

  // Parse chap0part1
  const part1 = {
    name: currentProject?.name ?? '',
    client: client,
    prescriber: prescriber,
    vat: `${currentProject?.vat?.value}${currentProject?.vat?.symbol}`,
    reference: currentProject?.reference ?? '',
    description: currentProject?.description ?? '',
    market_type: _translatedMarketType(currentProject?.market_type),
    structure: currentProject?.structure ?? '',
    stakeholders: _stakeholders,
  };

  // Parse chap0part2
  const part2 = [];
  for (let i = 0; i < currentProject.chap0part2.length; i++) {
    const lvl1 = currentProject.chap0part2[i].id;
    const _ = {
      title: `0.${i + 2} ${lvl1.title}`,
      text: lvl1.text,
      lvl2: [],
    };
    for (let j = 0; j < lvl1.level2.length; j++) {
      const lvl2 = lvl1.level2[j];
      const __ = {
        title: `0.${i + 2}.${j + 1} ${lvl2.title}`,
        text: lvl2.text,
        lvl3: [],
      };
      for (let k = 0; k < lvl2.level3.length; k++) {
        const lvl3 = lvl2.level3[k];
        const ___ = {
          title: `0.${i + 2}.${j + 1}.${k + 1} ${lvl3.title}`,
          text: lvl3.text,
        };
        __.lvl3.push(___);
      }
      _.lvl2.push(__);
    }
    part2.push(_);
  }

  const obj = {
    part1: part1,
    part2: part2,
  };

  return obj;
}

function findCCTPsSimple(_data, index) {
  const data = parseSorterWorks(_data);
  const cp = parseCCTPData(data, index);
  return cp;
}

function findCCTPsTrades(_data, index) {
  const data = sorterCCTPsTrades(_data);
  const cp = parseCCTPData(data, index);
  return cp;
}

function findCCTPsTradesAndTranches(_data, index) {
  const data = sorterCCTPsTradesAndTranches(_data);
  const cp = parseCCTPData(data, index);
  return cp;
}

function sorterCCTPsTradesAndTranches(data) {
  let works = [];

  for (let i = 0; i < data.length; i++) {
    const currentObjTrade = data[i];
    const tranchesArr = currentObjTrade.data;
    for (let j = 0; j < tranchesArr.length; j++) {
      const currentObjTranch = tranchesArr[j];
      const workAndWorkDetailsArr = currentObjTranch.tranchData;
      for (let k = 0; k < workAndWorkDetailsArr.length; k++) {
        const currentObjWork = workAndWorkDetailsArr[k];
        works.push(currentObjWork);
      }
    }
  }

  const parsedLibs = parseSorterWorks(works);

  return parsedLibs;
}

function sorterCCTPsTrades(data) {
  let works = [];

  for (let i = 0; i < data.length; i++) {
    const currentObjTrade = data[i];
    const workAndWorkDetailsArr = currentObjTrade.data;
    for (let j = 0; j < workAndWorkDetailsArr.length; j++) {
      const currentObjWork = workAndWorkDetailsArr[j];
      works.push(currentObjWork);
    }
  }

  const parsedLibs = parseSorterWorks(works);

  return parsedLibs;
}

function parseSorterWorks(works) {
  // Delete repeated works
  const workIDs = works.map((o) => o.work._id);
  works = works.filter((_, index) => !workIDs.includes(_.work._id, index + 1));

  let libraries = works.map((_) => _.work_library);
  let categories = works.map((_) => _.work_category);

  // Delete repeated libraries
  const libraryIDs = libraries.map((o) => o._id);
  libraries = libraries.filter((_, index) => !libraryIDs.includes(_._id, index + 1));

  // Delete repeated categories
  const categoryIDs = categories.map((o) => o._id);
  categories = categories.filter((_, index) => !categoryIDs.includes(_._id, index + 1));

  libraries = libraries.map((_) => {
    return { _id: _._id, title: _.name, categories: _.categories, pcategories: [] };
  });

  categories = categories.map((_) => {
    return { _id: _._id, title: _.name, pworks: [] };
  });

  const parsedCats = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    for (let j = 0; j < works.length; j++) {
      const work = works[j];
      if (work.work_category._id == category._id) {
        category.pworks.push(work);
      }
    }
    parsedCats.push(category);
  }

  const parsedLibs = [];

  for (let i = 0; i < libraries.length; i++) {
    const library = libraries[i];
    for (let j = 0; j < parsedCats.length; j++) {
      const category = parsedCats[j];
      if (library.categories.includes(category._id)) {
        library.pcategories.push(category);
      }
    }
    delete library.categories;
    parsedLibs.push(library);
  }

  return parsedLibs;
}

function parseCCTPData(data, index) {
  const cp = [];
  for (let i = 0; i < data.length; i++) {
    const currentObjLib = data[i];
    const libObj = {
      title: `${index + 1}.${i + 1} ${currentObjLib.title}`,
      arr: [],
    };
    const catsArr = currentObjLib.pcategories;
    for (let j = 0; j < catsArr.length; j++) {
      const currentObjCat = catsArr[j];
      const catObj = {
        title: `${index + 1}.${i + 1}.${j + 1} ${currentObjCat.title}`,
        arr: [],
      };
      const workAndWorkDetailsArr = currentObjCat.pworks;
      for (let k = 0; k < workAndWorkDetailsArr.length; k++) {
        const currentObjWork = workAndWorkDetailsArr[k];
        const _cctpArr = currentObjWork.work.cctp_text;
        if (_cctpArr.length == 0) {
          continue;
        }
        if (_cctpArr[index]) {
          const workObj = {
            title: `${index + 1}.${i + 1}.${j + 1}.${k + 1} ${currentObjWork.work.name}`,
            text: _cctpArr[index],
          };
          catObj.arr.push(workObj);
        }
      }
      if (catObj.arr.length > 0) {
        libObj.arr.push(catObj);
      }
    }
    if (libObj.arr.length > 0) {
      cp.push(libObj);
    }
  }
  return cp;
}

async function textRunsSplitGen(str, size) {
  let strSingle = String(str);

  let textRunArr = [];
  if (htmlTagRegex.test(strSingle)) {
    // replace "&nbsp;"
    strSingle = strSingle.replace(/\&nbsp;/g, ' ');
    textRunArr = await handleBuiltInCCTPs(strSingle, size);
  } else {
    textRunArr = handleImportedCCTPs(strSingle);
  }

  return textRunArr;
}

function handleImportedCCTPs(str) {
  let strSingle = String(str);
  let strArr = strSingle.split('\n');

  const textRunArr = [];
  for (let i = 0; i < strArr.length; i++) {
    textRunArr.push(
      new TextRun({
        text: strArr[i],
        size: 20,
        break: i == 0 ? 0 : 1, // If first string then no line breaks
      })
    );
  }

  const objsArr = [
    new Paragraph({
      children: [...textRunArr],
    }),
  ];

  return objsArr;
}

async function handleBuiltInCCTPs(str, size) {
  let strSingle = String(str);
  const parsedObjsArr = parseHTMLTag(strSingle);

  const docxObjsArr = [];
  for (let i = 0; i < parsedObjsArr.length; i++) {
    let currentObj = parsedObjsArr[i];
    let docxObj = tagsToDocxMap[currentObj.tagName] && (await tagsToDocxMap[currentObj.tagName](currentObj, size));
    if (docxObj) {
      if (Array.isArray(docxObj)) {
        docxObjsArr.push(...docxObj);
      } else {
        docxObjsArr.push(docxObj);
      }
    }
  }

  return docxObjsArr;
}

function parseHTMLTag(str) {
  const elMain = document.createElement('div');
  elMain.innerHTML = str;
  let htmlCollectionMain = elMain.children;

  const parsedObjsArr = [];
  for (let i = 0; i < htmlCollectionMain.length; i++) {
    const _ = htmlCollectionMain[i];
    const obj = {
      tagName: _.tagName,
      innerHTML: _.innerHTML,
      classList: _.classList,
      src: _.src,
    };
    parsedObjsArr.push(obj);
  }

  return parsedObjsArr;
}

const tagsToDocxMap = {
  P: async function (_, size) {
    const text = _.innerHTML;

    const textArr = text.split('<br>');

    const objsArr = [];

    for (let i = 0; i < textArr.length; i++) {
      const currentText = textArr[i];
      if (htmlTagRegex.test(currentText)) {
        const parsedObjsArr = parseHTMLTag(currentText);
        for (let j = 0; j < parsedObjsArr.length; j++) {
          const obj = parsedObjsArr[j];
          const objElm = tagsToDocxMap[obj.tagName] && (await tagsToDocxMap[obj.tagName](obj, size));
          if (objElm) {
            objsArr.push(objElm);
          }
        }
      } else {
        objsArr.push(docText({ text: currentText, size: size ?? l1Font, bold: false }));
      }
    }

    return objsArr;
  },
  BR: async function (_) {
    return new Paragraph({
      children: [
        new TextRun({
          text: '', // We know this for sure
        }),
      ],
    });
  },
  STRONG: async function (_, size) {
    const text = _.innerHTML;

    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          font: fontType,
          size: size ?? l2Font,
          bold: true,
        }),
      ],
    });
  },
  EM: async function (_, size) {
    const text = _.innerHTML;

    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          font: fontType,
          size: size ?? l2Font,
          italics: true,
        }),
      ],
    });
  },
  U: async function (_, size) {
    const text = _.innerHTML;

    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          font: fontType,
          size: size ?? l2Font,
          underline: {
            color: '#f2f2f2',
            type: UnderlineType.DASH,
          },
        }),
      ],
    });
  },
  S: async function (_, size) {
    const text = _.innerHTML;

    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          font: fontType,
          size: size ?? l2Font,
          strike: true,
        }),
      ],
    });
  },
  OL: async function (_) {
    const listItemsArr = [];
    return listItemsArr;
  },
  UL: async function (_) {
    const listItemsArr = [];
    return listItemsArr;
  },
  LI: async function (_) {
    const text = _.innerHTML;

    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    });
  },
  SPAN: async function (_) {
    const text = _.innerHTML;
    const classList = _.classList;

    let size;
    if (classList == 'ql-size-small') {
      size = l1Font;
    } else if (classList == 'ql-size-large') {
      size = l2Font;
    } else if (classList == 'ql-size-huge') {
      size = l3Font;
    }

    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          font: fontType,
          size: size,
        }),
      ],
    });
  },
  IMG: async function (_) {
    const response = await axios.get(_.src, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data);

    const originalSize = await reactImageSize(_.src);
    const originalAspectRatio = originalSize.width / originalSize.height;

    let height;
    const width = 400;

    height = width / originalAspectRatio;

    const image = new ImageRun({
      data: buffer,
      transformation: {
        height: height,
        width: width,
      },
    });

    const paragraph = new Paragraph({
      children: [image],
    });

    return paragraph;
  },
};

const dataColumnsEstimation = [
  localStorage.getItem('i18nextLng') == 'en' ? 'Number' : 'N°',
  localStorage.getItem('i18nextLng') == 'en' ? 'Designation' : 'Désignation',
  localStorage.getItem('i18nextLng') == 'en' ? 'Unit' : 'Unité',
  localStorage.getItem('i18nextLng') == 'en' ? 'Qty' : 'Qté',
  'PU HT',
  'Total HT',
];

const footerColumnsSimpleEstimation = [
  localStorage.getItem('i18nextLng') == 'en' ? 'Total Lot n°1 :' : 'Total HT :',
  '',
  localStorage.getItem('i18nextLng') == 'en' ? 'Total VAT' : 'T.V.A',
  localStorage.getItem('i18nextLng') == 'en' ? 'Total Amount including VAT :' : 'Montant total TTC :',
];

const dataColumnsBPU = ["'1", 'Lot n°1', ''];

function downloadBlob(blob, filename) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
  document.body.removeChild(link);
}

async function blobFromURL(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return blob;
}

function _translatedMarketType(str) {
  let _;
  let lang = localStorage.getItem('i18nextLng');
  if (str == 'Simple') {
    _ = lang == 'en' ? 'Simple' : 'Simple';
  } else if (str == 'Trades') {
    _ = lang == 'en' ? 'Trades' : 'Lots';
  } else if (str == 'TradesAndTranches') {
    _ = lang == 'en' ? 'Trades And Tranches' : 'Lots et tranches';
  } else if (str == 'PurchaseOrder') {
    _ = lang == 'en' ? 'Purchase Order' : 'Bon de commande';
  } else {
    _ = '';
  }
  return _;
}

export {
  headGen,
  rowsGenSimpleEstimation,
  rowsGenTradesEstimation,
  rowsGenTradesAndTranchesEstimation,
  rowsGenSimpleDPGF,
  rowsGenTradesDPGF,
  rowsGenTradesAndTranchesDPGF,
  xlsxParsedDataGenSimpleEstimation,
  xlsxParsedDataGenTradesEstimation,
  xlsxParsedDataGenTradesAndTranchesEstimation,
  xlsxParsedFooterDataGenEstimation,
  pdfParsedDataGenTradesEstimation,
  pdfParsedDataGenTradesAndTranchesEstimation,
  docxParsedDataGenTradesEstimation,
  docxParsedDataGenTradesAndTranchesEstimation,
  docxParsedDataGenTradesDPGF,
  docxParsedDataGenTradesAndTranchesDPGF,
  calculateWSCols,
  rowsGenSimpleBPU,
  rowsGenTradesBPU,
  rowsGenTradesAndTranchesBPU,
  rowsGenSimpleCCTP,
  rowsGenTradesCCTP,
  rowsGenTradesAndTranchesCCTP,
  footerDataGenSimpleEstimation,
  footerDataGenTradesEstimation,
  footerDataGenTradesAndTranchesEstimation,
  footerDataGenSimpleDPGF,
  textRunsSplitGen,
  dataColumnsEstimation,
  footerColumnsSimpleEstimation,
  dataColumnsBPU,
  downloadBlob,
  blobFromURL,
};
