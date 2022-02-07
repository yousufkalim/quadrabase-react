import React, { useEffect } from "react";
import SelectField from "../../../components/SelectField";
import TextInput from "../../../components/TextInput";
import DatePicker from "react-flatpickr";

const SubscriptionModal = (props) => {
  const {
    translate,
    options,
    value,
    projects,
    onChange,
    architectData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;
  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 ">
        <div className="w-full px-3 mb-3">
          <SelectField
            name="subscription"
            label={translate("Subscription")}
            value={value}
            onChange={onChange}
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
            {translate("Sub Start Date")}
          </label>
          <DatePicker
            className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border rounded focus:shadow-gray-800 appearance-none focus:outline-none focus:shadow-outline"
            value={startDate}
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
            onChange={(date) => {
              setEndDate(date[0]);
            }}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-3">
        <div className="w-full  px-3 mb-6 md:mb-0 ">
          <TextInput
            type="number"
            min={0}
            placeholder="Projects"
            label={translate("Number of projects")}
            name="projects"
            onChange={onChange}
            value={projects}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-3">
        <div className="w-full  px-3 mb-6 md:mb-0 ">
          <TextInput
            type="number"
            min={0}
            placeholder="Projects"
            label={translate("Ongoing Projects")}
            name="projects"
            onChange={onChange}
            value={architectData?.projects?.length}
            disabled={true}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-3">
        <div className="w-full  px-3 mb-6 md:mb-0 ">
          <TextInput
            type="number"
            min={0}
            placeholder="Projects"
            label={translate("Remaining Projects")}
            name="projects"
            onChange={onChange}
            value={
              (architectData?.subscriptions?.projects ?? 0) -
              (architectData?.projects?.length ?? 0)
            }
            disabled={true}
          />
        </div>
      </div>
    </form>
  );
};

export default SubscriptionModal;
