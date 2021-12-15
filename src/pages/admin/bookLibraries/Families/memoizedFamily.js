import React, { useState } from "react";

import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";

function Index(props) {
  const { isLoading } = props;
  const [Name, setName] = useState("");
  const [testErrorMessage, settestErrorMessage] = useState("");

  const handleAdd = () => {
    if (!Name) {
      settestErrorMessage("Required");
      return;
    } else {
      settestErrorMessage("");
    }

    let obj = { name: Name };
    props.onAdd(obj);
    setName(" ");
  };

  return (
    <div>
      <form className="w-full px-3  pt-3">
        <div className="flex no-wrap  -mx-3 ">
          <div className="w-full  px-1 ">
            <TextInput
              type="text"
              placeholder="Name"
              label="Name"
              name="Name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
            />
            <div className="text-red-600 ">
              <small>{testErrorMessage}</small>
            </div>
          </div>
          <div className="w-full flex items-end md:w-1/3  px-3 mb-1">
            <Button
              onClick={handleAdd}
              disabled={isLoading}
              label={isLoading ? "Adding..." : "Add Family"}
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
