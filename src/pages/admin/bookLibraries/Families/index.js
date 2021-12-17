import React, { useState, useEffect } from "react";
import MemoizedFamily from "./memoizedFamily";
import MemoizedFamilies from "./memoizedFamilies";

import { red } from "@mui/material/colors";
import Button from "../../../../components/Button";
import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";
import { getToken } from "../../../../utils/Auth";
import Notifier from "../../../../utils/Notifier";
export default function Index(props) {
  const token = getToken();
  const { translate } = props;
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [show, sethide] = useState(false);
  const handleAdd = (obj) => {
    onAdd(obj);
    // setData([...data, obj]);
  };
  const handleUpdate = async (name, id) => {
    try {
      let response = await Axios({
        method: "put",
        url: `${baseUrl}/Families/${id}`,
        data: { name: name },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.families;
      setisLoading(false);

      setData(data);
      Notifier(response.data.message, "success", translate);
    } catch (err) {
      setisLoading(false);
      Notifier(err.response.data.message, "error", translate);

      console.log("Errror->>>", err);
    }
  };
  const handleDelete = async (id) => {
    // onAdd(obj);

    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/Families/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.families;
      setisLoading(false);

      setData(data);
      Notifier(response.data.message, "success", translate);
    } catch (err) {
      setisLoading(false);
      Notifier(err.response.data.message, "error", translate);

      console.log("Errror->>>", err);
    }
  };
  const onAdd = async (obj) => {
    setisLoading(true);

    try {
      let response = await Axios({
        method: "post",
        url: `${baseUrl}/Families/create`,
        data: obj,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.families;
      setisLoading(false);

      setData(data);
      Notifier(response.data.message, "success", translate);
    } catch (err) {
      setisLoading(false);
      Notifier(err.response.data.message, "error", translate);

      console.log("Errror->>>", err);
    }
  };
  const getAllFamilies = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Families/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.families;
      setData(data);
    } catch (err) {
      console.log("Errror->>>", err);
    }
  };
  useEffect(() => {
    getAllFamilies();
  }, []);
  return (
    <div>
      {data && data.length > 0 ? (
        data &&
        data.map(({ _id, name }) => (
          <div key={_id} className="mt-2">
            <MemoizedFamilies
              _id={_id}
              name={name}
              onDelete={() => handleDelete(_id)}
              handleUpdate={handleUpdate}
            />
          </div>
        ))
      ) : (
        <h1 className="text-center"></h1>
      )}
      <MemoizedFamily isLoading={isLoading} onAdd={handleAdd} />
      <div className="flex pt-5 justify-end ">
        <div className="">
          <Button
            onClick={props.handleClose}
            label="Close"
            backgroundColor={red}
            default={false}
          />
        </div>
      </div>
    </div>
  );
}
