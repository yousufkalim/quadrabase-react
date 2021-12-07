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

function NestedList(props) {
  const { handleClick, state, onAdd } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [parentLevel, setparentLevel] = React.useState(false);

  const [Text, setText] = React.useState(null);
  const openanchorEl = Boolean(anchorEl);
  const handleanchorEl = (event, level) => {
    switch (level) {
      case "level0":
        setText("Add_Library");
        setparentLevel(true);
        break;
      case "level1":
        setText("Add_Category");
        break;
      case "level2":
        setText("Add_Work");
        break;
      case "level3":
        setText("Add_Work_Detail");
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

  return (
    <div className="shadow-xl">
      <List
        component="nav"
        subheader={
          <ListSubheader>
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg p-3">General Libraries</h1>
              <FontAwesomeIcon
                icon={faEllipsisV}
                onClick={(e) => handleanchorEl(e, "level0")}
                id="demo-customized-button"
              />
            </div>
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
                onAdd={onAdd}
                label={label}
                handleanchorEl={handleanchorEl}
                handleClose={handleClose}
                openanchorEl={openanchorEl}
                text={Text}
                parentLevel={parentLevel}
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
                            parentLevel={parentLevel}
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
                                        parentLevel={parentLevel}
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
