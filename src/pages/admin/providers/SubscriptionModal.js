import React, { useEffect, useState } from 'react';
import SelectField from '../../../components/SelectField';
import DatePicker from 'react-flatpickr';
import moment from 'moment';
import { French } from 'flatpickr/dist/l10n/fr.js';
import Axios from 'axios';
import { baseUrl } from '../../../utils/BaseUrl';
import { getToken } from '../../../utils/Auth';

const SubscriptionModal = ({
  translate,
  selectedSubscription,
  setSelectedSubscription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const token = getToken();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getAllSubscriptions();
  }, []);

  const getAllSubscriptions = async () => {
    try {
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/Subscriptions`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.subscription.filter(
        (item) => item.type.toLowerCase() === 'manufacturers'
      );
      setOptions(data);
      if (!selectedSubscription) setSelectedSubscription(data[0]._id);
    } catch (error) {
      console.log(error?.response?.data?.message, 'error ');
    }
  };
  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 ">
        <div className="w-full px-3 mb-3">
          <SelectField
            name="subscription"
            label={translate('Subscription')}
            value={selectedSubscription}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            translate={translate}
            options={options}
            type="provider"
          />
        </div>
      </div>
      <div className="flex no-wrap -mx-3 ">
        <div className="w-full px-3 mb-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            {translate('Start Date')}
          </label>
          <DatePicker
            className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline"
            options={{ locale: French, dateFormat: 'd-m-Y' }}
            value={startDate}
            placeholder="YYYY-MM-DD"
            onChange={(date) => {
              setStartDate(date[0]);
              let tempEndDate = moment(date[0]).add(1, 'years').subtract(1, 'days')._d;
              setEndDate(tempEndDate);
            }}
          />
        </div>
      </div>
      <div className="flex no-wrap -mx-3 ">
        <div className="w-full px-3 mb-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            {translate('End Date')}
          </label>
          <DatePicker
            className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline"
            options={{ minDate: startDate, locale: French, dateFormat: 'd-m-Y' }}
            value={endDate}
            placeholder="YYYY-MM-DD"
            disabled={true}
          />
        </div>
      </div>
    </form>
  );
};

export default SubscriptionModal;
