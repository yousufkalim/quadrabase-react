import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import SubListItem from "./subListItem";
import { faEllipsisV, faBookmark } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";

function NestedList(props) {
  const { translate } = props;
  const { handleanchorEl } = props;

  return (
    <div className="shadow-md">
      <List
        component="nav"
        subheader={
          <ListSubheader>
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg p-3">
                {translate(props.title)}
              </h1>
              <FontAwesomeIcon
                icon={faEllipsisV}
                onClick={(e) => handleanchorEl(e, 0)}
                id="parentLevelMenu"
              />
            </div>
          </ListSubheader>
        }
      >
        {props.data &&
          props.data.map((dat, index) => {
            return (
              <div key={dat._id}>
                <SubListItem
                  _id={dat._id}
                  Index={index}
                  primaryText={props.primaryKey ? dat[props.primaryKey] : dat.name}
                  secondaryText={props.secondaryKey ? dat[props.secondaryKey] : null}
                  handleanchorEl={handleanchorEl}
                />
              </div>
            );
          })}
      </List>
    </div>
  );
}

export default NestedList;
