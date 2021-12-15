import React, { useState, useEffect } from "react";

import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import { red } from "@mui/material/colors";

function Index(props) {
  const { isLoading } = props;
  const [Name, setName] = useState("");
  const [Edit, setEdit] = useState(false);
  const [testErrorMessage, settestErrorMessage] = useState("");

  const handleUpdate = () => {
    if (!Name) {
      settestErrorMessage("Required");
      return;
    } else {
      settestErrorMessage("");
    }

    let obj = { name: Name };
    props.onAdd(obj);
  };
  useEffect(() => {
    setName(props.name);
  }, [props]);
  return (
    <div>
      <form className="w-full px-3  ">
        <div className="flex no-wrap  -mx-3 ">
          <div className="w-full  px-1 ">
            <TextInput
              type="text"
              placeholder="Name"
              label="Name"
              name="Name"
              disabled={Edit ? false : true}
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
            <div className="text-red-600 ">
              <small>{testErrorMessage}</small>
            </div>
          </div>
          <div className="w-full flex items-end justify-between md:w-1/3 mb-1  ">
            <div className="px-4">
              <Button
                onClick={() => setEdit(!Edit)}
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
