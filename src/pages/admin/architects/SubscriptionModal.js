import React, { useEffect } from "react";
import Button from "../../../components/Button";
import SelectField from "../../../components/SelectField";
import { red } from "@mui/material/colors";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import Notifier from "../../../utils/Notifier";

const SubscriptionModal = (props) => {
  const {translate} = props;
  const token = getToken();
  const [value, setValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const getAllSubscriptions = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Subscriptions`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOptions(response.data.subscription);
    } catch (error) {
      console.log(error?.response?.data?.message, "error ");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await Axios({
      method: "put",
      url: `${baseUrl}/Architects/addsubscription/${props.architectId}`,
      data: { subscriptionId: value },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Notifier(response.data.message, "success");
    props.handleModal();
  };

  useEffect(() => {
    setValue(props.currentSubscription?.id?._id);
    getAllSubscriptions();
  }, []);

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full px-3 mb-3">
          <SelectField
            name="subscription"
            label="Select Subscription"
            value={value}
            onChange={handleChange}
            translate={translate}
            options={options}
          />
        </div>
      </div>
      <div className="flex pb-2 justify-end ">
        <div className="">
          <Button
            onClick={props.handleModal}
            label="Close"
            translate={translate}
            backgroundColor={red}
            default={false}
          />
        </div>
        <div className=" ml-3">
          <Button onClick={handleSubmit} label="Save" default={true}  translate={translate} />
        </div>
      </div>
    </form>
  );
};

export default SubscriptionModal;
