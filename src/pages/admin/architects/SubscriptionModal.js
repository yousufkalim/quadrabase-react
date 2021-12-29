import React, { useEffect } from "react";
import SelectField from "../../../components/SelectField";
import TextInput from "../../../components/TextInput";
const SubscriptionModal = (props) => {
  const { translate, options, value, credit, projects, onChange } = props;
  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 ">
        <div className="w-full px-3 mb-3">
          <SelectField
            name="subscription"
            label="Select Subscription"
            value={value}
            onChange={onChange}
            translate={translate}
            options={options}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-3">
        <div className="w-full  px-3 mb-6 md:mb-0 ">
          <TextInput
            type="number"
            min={0}
            placeholder="Credit"
            label="Total Credits"
            name="credit"
            onChange={onChange}
            value={credit}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-3">
        <div className="w-full  px-3 mb-6 md:mb-0 ">
          <TextInput
            type="number"
            min={0}
            placeholder="Projects"
            label="Total Projects"
            name="projects"
            onChange={onChange}
            value={projects}
          />
        </div>
      </div>
    </form>
  );
};

export default SubscriptionModal;
