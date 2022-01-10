import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import SubListItem from "./subListItem";
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
                onClick={(e) => handleanchorEl(e, "", "level0")}
                id="parentLevelMenu"
              />
            </div>
          </ListSubheader>
        }
      >
        {props.librariesData &&
          props.librariesData.map(
            (
              {
                _id: parentId,
                name,
                categories: items,
                works: items2,
                work_details: subchildItems,
              },
              index
            ) => {
              let openlevel1 = state["level1"][name] || false;
              return (
                <div key={parentId}>
                  <SubListItem
                    _id={parentId}
                    nodeKey={name}
                    Index={index}
                    level={"level1"}
                    name={name}
                    nameBold={true}
                    handleanchorEl={handleanchorEl}
                    parentLevel={parentLevel}
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
                        (
                          { _id: childId, name: childName },

                          index
                        ) => {
                          let openlevel2 = state["level2"][childName] || false;
                          return (
                            <>
                              <SubListItem
                                nodeKey={childName}
                                _id={childId}
                                level={"level2"}
                                Index={index}
                                name={childName}
                                handleanchorEl={handleanchorEl}
                                parentLevel={parentLevel}
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
                                  {items2
                                    .filter((dt) => dt.category === childId)
                                    .map(
                                      (
                                        { _id: childId3, name: childName3 },
                                        index
                                      ) => {
                                        let openlevel3 =
                                          state["level3"][childName3] || false;

                                        return (
                                          <>
                                            <SubListItem
                                              nodeKey={childName3}
                                              level={"level3"}
                                              _id={childId3}
                                              Index={index}
                                              name={childName3}
                                              handleanchorEl={handleanchorEl}
                                              parentLevel={parentLevel}
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
                                                  subchildItems
                                                    .filter(
                                                      (dt) =>
                                                        dt.work === childId3
                                                    )
                                                    .map(
                                                      (
                                                        {
                                                          _id: key4,
                                                          name: childname,
                                                        },
                                                        index
                                                      ) => {
                                                        return (
                                                          <ListItem
                                                            key={key4}
                                                            button
                                                          >
                                                            <FontAwesomeIcon
                                                              icon={faBookmark}
                                                              sx={{
                                                                fontSize:
                                                                  "1rem",
                                                              }}
                                                            />
                                                            <ListItemText
                                                              inset
                                                              primary={
                                                                childname
                                                              }
                                                            />
                                                            <FontAwesomeIcon
                                                              icon={faEllipsisV}
                                                              onClick={(e) =>
                                                                handleanchorEl(
                                                                  e,
                                                                  key4,
                                                                  "level4",
                                                                  index
                                                                )
                                                              }
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
            }
          )}
      </List>
    </div>
  );
}

export default NestedList;
