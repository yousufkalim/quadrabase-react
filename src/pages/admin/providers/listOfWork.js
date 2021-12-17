import React from "react";
import DocViewer from "react-doc-viewer";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import { red } from "@mui/material/colors";
import Button from "../../../components/Button";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";

export default function AddExpense(props) {
  const token = getToken();
  const { provider, translate } = props;

  return (
    <div className=" -mx-3 mb-2">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <div class="w-1/3 bg-white rounded-lg shadow">
          <ul class="divide-y-2 divide-gray-100">
            <div className="flex  no-wrap ">
              {provider.works.map(({ name }, index) => (
                <li class="p-2 mx-1">
                  {index + 1}. {name}
                </li>
              ))}
            </div>
          </ul>
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
