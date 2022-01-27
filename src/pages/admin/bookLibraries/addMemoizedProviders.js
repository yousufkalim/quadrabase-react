import React, { useState, useEffect } from "react";

import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import SelectField from "../../../components/SelectField";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { red } from "@mui/material/colors";

function Index(props) {
  const { isLoading, ProviderOptions, label1 } = props;

  const [Name, setName] = useState("");
  const [Edit, setEdit] = useState(false);
  const [testErrorMessage, settestErrorMessage] = useState("");
  const [docErrorMessage, setdocErrorMessage] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleUpdate = () => {
    setEdit(!Edit);
    if (Edit == false) {
      return;
    }
    if (!Name) {
      settestErrorMessage("Required");
    } else {
      setdocErrorMessage("");
      settestErrorMessage("");
      let obj = { provider: Name, documents: documents };
      props.handleUpdate(obj, props._id);
    }
  };

  useEffect(() => {
    setName(props.name);
    setDocuments(props.documents);
  }, [props]);
  const handleFileChange = async (e) => {
    const files = e.target.files;
    let form_data = new FormData();

    for (let i = 0; i < files.length; i++) {
      form_data.append(`file`, files[i]);
    }
    try {
      let response = await Axios({
        method: "post",
        url: `${baseUrl}/fileUploader`,
        data: form_data,
      });
      let document = response.data.files;
      if (documents && documents.length > 0) {
        let newArray = documents.concat(document);
        setDocuments(newArray);
      } else {
        setDocuments(document);
      }
    } catch (error) {
      console.log(error?.response?.data?.message, "error ");
    }
  };
  return (
    <div>
      <form className="w-full  py-1 ">
        <div className="flex no-wrap  -mx-3 ">
          <div className="w-full  pt-0.5 px-1 ">
            <SelectField
              name="Name"
              label={label1}
              disabled={Edit ? false : true}
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
                settestErrorMessage("");
              }}
              options={ProviderOptions}
            />
            <div className="text-red-600 ">
              <small>{testErrorMessage}</small>
            </div>
          </div>
          <div className="w-full   px-1 ">
            <TextInput
              type="file"
              placeholder="Document"
              label="Document"
              name="documents"
              disabled={Edit ? false : true}
              onChange={handleFileChange}
              value={documents}
              multiple={true}
            />
            <div className="text-red-600 ">
              <small>{docErrorMessage}</small>
            </div>
          </div>
          <div className="w-full flex items-end justify-between md:w-1/3 mb-1  ">
            <div className="px-4">
              <Button
                onClick={handleUpdate}
                disabled={isLoading}
                label={Edit ? "Update" : "Edit"}
                default={true}
              />
            </div>
            <Button
              onClick={props.onDelete}
              disabled={isLoading}
              label={"Delete"}
              backgroundColor={red}
              default={false}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default Index;
