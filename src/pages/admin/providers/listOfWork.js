import React, { useState } from "react";
import DocViewer from "../../../components/DocViewer";

import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import { red } from "@mui/material/colors";
import Button from "../../../components/Button";

export default function AddExpense(props) {
  const token = getToken();
  const { provider, translate } = props;
  const [documents, setdocuments] = useState([]);

  const displayWork = () => {
    return provider.works.map(({ name, providers }, index) => {
      return (
        <div className="flex py-2 flex-col">
          <div class="p-2 mx-1 text-2xl font-semibold capitalize">
            {index + 1}. {name}
          </div>
          <hr />
          <div>
            {/* <div className="h-96 overflow-y-auto border px-10 py-3"> */}
            {providers.map((provide, index) => (
              <div className="py-2">
                <DocViewer documents={provide.documents} />
              </div>
            ))}
            {/* </div> */}
          </div>
        </div>
      );
    });
  };

  return (
    <div className=" -mx-3 mb-2">
      <div className="w-full  px-3 mb-6 md:mb-0">
        <div className="h-146 overflow-y-auto border px-10 py-3">
          {displayWork()}
        </div>
      </div>
      <div className="flex pt-2 px-2 justify-end ">
        <div className="">
          <Button
            onClick={props.handleModal}
            label="Close"
            translate={translate}
            backgroundColor={red}
            default={false}
          />
        </div>
      </div>
    </div>
  );
}
