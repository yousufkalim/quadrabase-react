import React from 'react';
import SelectField from '../../../components/SelectField';
import DatePicker from 'react-flatpickr';
import moment from 'moment';
import { French } from 'flatpickr/dist/l10n/fr.js';

const options = [
  {
    _id: 'Référencement',
    name: 'Référencement',
  },
  { _id: 'Alertes', name: 'Alertes' },
];

const SubscriptionModal = ({
  translate,
  name,
  setName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 ">
        <div className="w-full px-3 mb-3">
          <SelectField
            name="subscription"
            label={translate('Subscription')}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            options={{ locale: French }}
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
            options={{ minDate: startDate, locale: French }}
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
