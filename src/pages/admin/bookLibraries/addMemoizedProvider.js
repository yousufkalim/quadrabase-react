import React, { useState } from "react";
import Notifier from "../../../utils/Notifier";

import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import SelectField from "../../../components/SelectField";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
function Index(props) {
  const { isLoading, ProviderOptions } = props;
  const [Name, setName] = useState("");
  const [documents, setDocuments] = useState("");

  const [testErrorMessage, settestErrorMessage] = useState("");
  const [docErrorMessage, setdocErrorMessage] = useState("");

  const handleAdd = () => {
    if (!Name) {
      settestErrorMessage("Required");
    } else if (!documents) {
      setdocErrorMessage("Required");
    } else {
      setdocErrorMessage("");
      settestErrorMessage("");

      let obj = { provider: Name, documents: documents };
      props.onAdd(obj);
      setName(" ");
      setDocuments("");
    }
  };
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
      let documents = response.data.files;
      setDocuments(documents);
    } catch (error) {
      if (error.response) {
        Notifier(error.response.data.message, "error");
      }
      console.log(error?.response?.data?.message, "error ");
    }
  };
  return (
    <div>
      <form className="w-full   pt-3">
        <div className="flex no-wrap  -mx-3 ">
          <div className="w-full md:w-5/12  pt-0.5 px-1 ">
            <SelectField
              name="Name"
              label="Select Provider"
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
          <div className="w-full md:w-5/12   px-1 ">
            <TextInput
              type="file"
              placeholder="Document"
              label="Document"
              name="document"
              onChange={handleFileChange}
              multiple={true}
            />
            <div className="text-red-600 ">
              <small>{docErrorMessage}</small>
            </div>
          </div>
          <div className="w-full md:w-1/4  content-center  px-3 pt-7">
            <Button
              onClick={handleAdd}
              disabled={isLoading}
              label={isLoading ? "Adding..." : "Add Provider"}
              default={true}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export const MemoizedIndex = React.memo(Index);
export default MemoizedIndex;
