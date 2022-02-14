import React from "react";
import SelectField from "../../../components/SelectField";
import DatePicker from "react-flatpickr";

const options = [
  {
    _id: "Advertising",
    name: "Advertising",
  },
  { _id: "Alerts", name: "Alerts" },
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
            label={translate("Subscription")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            translate={translate}
            options={options}
          />
        </div>
      </div>
      <div className="flex no-wrap -mx-3 ">
        <div className="w-full px-3 mb-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            {translate("Start Date")}
          </label>
          <DatePicker
            className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline"
            value={startDate}
            placeholder="YYYY-MM-DD"
            onChange={(date) => {
              setStartDate(date[0]);
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
            {translate("End Date")}
          </label>
          <DatePicker
            className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline"
            options={{ minDate: startDate }}
            value={endDate}
            placeholder="YYYY-MM-DD"
            onChange={(date) => {
              setEndDate(date[0]);
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default SubscriptionModal;
