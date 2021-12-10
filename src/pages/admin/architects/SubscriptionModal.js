import React, { useEffect } from "react";
import Button from "../../../components/Button";
import DropDown from "../../../components/DropDown";
import { red } from "@mui/material/colors";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import Notifier from "../../../utils/Notifier";

const SubscriptionModal = (props) => {
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
      let tempOptions = [];
      response.data.subscription.map((item) => {
        tempOptions.push({ value: item._id, name: item.name });
      });
      setOptions(tempOptions);
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
    getAllSubscriptions();
  }, []);

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full px-3 mb-3">
          <DropDown
            name="subscription"
            label="Select Subscription"
            value={value}
            onChange={handleChange}
            options={options}
          />
        </div>
      </div>
      <div className="flex pb-2 justify-end ">
        <div className="">
          <Button
            onClick={props.handleModal}
            label="Close"
            backgroundColor={red}
            default={false}
          />
        </div>
        <div className=" ml-3">
          <Button onClick={handleSubmit} label="Save" default={true} />
        </div>
      </div>
    </form>
  );
};

export default SubscriptionModal;
