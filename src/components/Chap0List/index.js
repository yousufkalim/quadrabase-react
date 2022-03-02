import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import SubListItem from "./sublistItem";
import ListMenu from "./listMenu";
import { faEllipsisV, faBookmark } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";

function NestedList(props) {
  const { translate } = props;
  const {
    handleClick,
    state,
    onAdd,
    Text,
    parentLevel,
    openanchorEl,
    handleanchorElClose,
    handleanchorEl,
    anchorEl,
    items,
    items2,
  } = props;

  return (
    <div className="shadow-md">
      <List
        component="nav"
        subheader={
          <ListSubheader>
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg p-3">
                {translate("General Libraries")}
              </h1>
              <FontAwesomeIcon
                icon={faEllipsisV}
                onClick={(e) => handleanchorEl(e, "", "Chap0Level1")}
                id="parentLevelMenu"
              />
            </div>
          </ListSubheader>
        }
      >
        {props.data &&
          props.data.map(({ _id: parentId, title: name, text }, index) => {
            let openlevel1 = state["Chap0Level2"][name] || false;
            return (
              <div key={parentId}>
                <SubListItem
                  _id={parentId}
                  nodeKey={name}
                  Index={index}
                  level={"Chap0Level2"}
                  name={name}
                  nameBold={true}
                  handleanchorEl={handleanchorEl}
                  parentLevel={parentLevel}
                  state={state}
                  handleClick={handleClick}
                  open={openlevel1}
                  getNextLevel={props.getChap0Level2}
                />

                <Collapse in={openlevel1} timeout="auto" unmountOnExit>
                  <List
                    sx={{ paddingLeft: "1rem" }}
                    component="div"
                    disablePadding
                  >
                    {items?.map(
                      ({ _id: childId, title: childName, text }, index) => {
                        let openlevel2 =
                          state["Chap0Level3"][childName] || false;
                        return (
                          <>
                            <SubListItem
                              nodeKey={childName}
                              _id={childId}
                              level={"Chap0Level3"}
                              Index={index}
                              name={childName}
                              handleanchorEl={handleanchorEl}
                              parentLevel={parentLevel}
                              state={state}
                              handleClick={handleClick}
                              open={openlevel2}
                              getNextLevel={props.getChap0Level3}
                            />
                            <Collapse
                              in={openlevel2}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List
                                component="div"
                                disablePadding
                                sx={{ paddingLeft: "2rem" }}
                              >
                                {items2?.map(
                                  (
                                    { _id: childId3, title: childName3, text },
                                    index
                                  ) => {
                                    return (
                                      <>
                                        <SubListItem
                                          nodeKey={childName3}
                                          _id={childId3}
                                          Index={index}
                                          name={childName3}
                                          handleanchorEl={handleanchorEl}
                                          parentLevel={parentLevel}
                                          state={state}
                                          handleClick={handleClick}
                                          level="lastLevel"
                                        />
                                      </>
                                    );
                                  }
                                )}
                              </List>
                            </Collapse>
                          </>
                        );
                      }
                    )}
                  </List>
                </Collapse>
              </div>
            );
          })}
      </List>
    </div>
  );
}

export default NestedList;
