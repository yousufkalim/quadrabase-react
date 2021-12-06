import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import SubListItem from "./subListItem";

import { faEllipsisV, faBookmark } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
import { LibrariesList } from "../../utils/libraryList";
function reducer(state, action) {
  let obj = action.obj;
  switch (action.type) {
    case "level1":
      return { ...state, level1: obj };
    case "level2":
      return { ...state, level2: obj };
    case "level3":
      return { ...state, level3: obj };

    default:
      throw new Error();
  }
}
const initialState = {
  level1: {},
  level2: {},
  level3: {},
};
function NestedList() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Text, setText] = React.useState(null);
  console.log(state, "state");
  const openanchorEl = Boolean(anchorEl);
  const handleanchorEl = (event, level) => {
    switch (level) {
      case "level1":
        setText("Add Category");
        break;
      case "level2":
        setText("Add Work");
        break;
      case "level3":
        setText("Add Work Detail");
        break;
      default:
        setText("");
        break;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (level, obj) => {
    dispatch({
      type: level,
      obj,
    });
  };
  return (
    <div className="shadow-xl">
      <List
        component="nav"
        subheader={
          <ListSubheader>
            <h1 className="font-semibold text-lg p-3">General Libraries</h1>
          </ListSubheader>
        }
      >
        {LibrariesList.map(({ key, label, items, level: level1 }) => {
          let openlevel1 = state[level1][key] || false;
          return (
            <div key={key}>
              <SubListItem
                nodeKey={key}
                level={level1}
                label={label}
                handleanchorEl={handleanchorEl}
                handleClose={handleClose}
                openanchorEl={openanchorEl}
                text={Text}
                anchorEl={anchorEl}
                state={state}
                handleClick={handleClick}
                open={openlevel1}
              />

              <Collapse in={openlevel1} timeout="auto" unmountOnExit>
                <List
                  sx={{ paddingLeft: "1rem" }}
                  component="div"
                  disablePadding
                >
                  {items.map(
                    ({
                      key: childKey,
                      label: childLabel,
                      items2,
                      level: level2,
                    }) => {
                      let openlevel2 = state[level2][childKey] || false;

                      return (
                        <>
                          <SubListItem
                            nodeKey={childKey}
                            level={level2}
                            label={childLabel}
                            handleanchorEl={handleanchorEl}
                            handleClose={handleClose}
                            openanchorEl={openanchorEl}
                            text={Text}
                            anchorEl={anchorEl}
                            state={state}
                            handleClick={handleClick}
                            open={openlevel2}
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
                              {items2.map(
                                ({
                                  key: key3,
                                  label: childLabel3,
                                  items: subchildItems,
                                  level: level3,
                                }) => {
                                  let openlevel3 = state[level3][key3] || false;

                                  return (
                                    <>
                                      <SubListItem
                                        nodeKey={key3}
                                        level={level3}
                                        label={childLabel3}
                                        handleanchorEl={handleanchorEl}
                                        handleClose={handleClose}
                                        openanchorEl={openanchorEl}
                                        text={Text}
                                        anchorEl={anchorEl}
                                        state={state}
                                        handleClick={handleClick}
                                        open={openlevel3}
                                      />
                                      <Collapse
                                        in={openlevel3}
                                        timeout="auto"
                                        unmountOnExit
                                      >
                                        <List
                                          component="div"
                                          disablePadding
                                          sx={{ paddingLeft: "2rem" }}
                                        >
                                          {subchildItems &&
                                            subchildItems.map(
                                              ({
                                                key: key4,
                                                label: childLabel,
                                              }) => {
                                                return (
                                                  <ListItem key={key4} button>
                                                    <FontAwesomeIcon
                                                      icon={faBookmark}
                                                      sx={{
                                                        fontSize: "1rem",
                                                      }}
                                                    />
                                                    <ListItemText
                                                      inset
                                                      primary={childLabel}
                                                    />
                                                    <FontAwesomeIcon
                                                      icon={faEllipsisV}
                                                      onClick={handleanchorEl}
                                                      id="demo-customized-button"
                                                    />
                                                  </ListItem>
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
