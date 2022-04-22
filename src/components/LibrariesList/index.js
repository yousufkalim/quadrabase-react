import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import SubListItem from "./subListItem";
import ListMenu from "./listMenu";
import { faEllipsisV, faCircle } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

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
    getLevel2,
    Level2,
    getLevel3,
    Level3,
    getLevel4,
    Level4,
    familiesData,
    getBookLibraries,
    setlibrariesData,
    setLevel2,
    setLevel3,
    setLevel4,
    setCurrentFamily,
    loadingData,
    setLoadingData,
    type,
    handleOpenLib,
    openLib,
    openCat,
    openWork,
  } = props;

  return (
    <div className="shadow-md">
      <List component="nav" style={{ paddingBottom: 0 }}>
        {familiesData &&
          familiesData.map((item, index) => {
            let openlevel0 = state["level0"][item.name] || false;
            return (
              <div key={item._id}>
                <SubListItem
                  _id={item._id}
                  nodeKey={item.name}
                  Index={index}
                  level={"level0"}
                  name={item.name}
                  nameBold={true}
                  handleanchorEl={handleanchorEl}
                  parentLevel={parentLevel}
                  state={state}
                  handleClick={handleClick}
                  open={openlevel0}
                  translate={translate}
                  getNextLevel={getBookLibraries}
                  setPrevLevel={setlibrariesData}
                  setCurrentFamily={setCurrentFamily}
                  setLoadingData={setLoadingData}
                  type={type}
                />
                <div style={{ minHeight: 3 }}>
                  {loadingData === item._id && (
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress />
                    </Box>
                  )}
                </div>
                <Collapse in={openlevel0} timeout="auto" unmountOnExit>
                  <List
                    sx={{ paddingLeft: "1rem" }}
                    component="div"
                    disablePadding
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
                            architect,
                          },
                          index
                        ) => {
                          let openlevel1;
                          if (type === "private") {
                            openlevel1 = openLib === parentId || false;
                          } else {
                            openlevel1 = state["level1"][name] || false;
                          }
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
                                getNextLevel={getLevel2}
                                setPrevLevel={setLevel2}
                                setLoadingData={setLoadingData}
                                type={type}
                                architect={
                                  type === "private" &&
                                  `${architect.first_name} ${architect.last_name}`
                                }
                                handleOpenLib={handleOpenLib}
                              />
                              {loadingData === parentId && (
                                <Box sx={{ width: "100%" }}>
                                  <LinearProgress />
                                </Box>
                              )}
                              <Collapse
                                in={openlevel1}
                                timeout="auto"
                                unmountOnExit
                              >
                                <List
                                  sx={{ paddingLeft: "1rem" }}
                                  component="div"
                                  disablePadding
                                >
                                  {Level2 &&
                                    Level2.map(
                                      (
                                        { _id: childId, name: childName },

                                        index
                                      ) => {
                                        let openlevel2;
                                        if (type === "private") {
                                          openlevel2 =
                                            openCat === childId || false;
                                        } else {
                                          openlevel2 =
                                            state["level2"][childName] || false;
                                        }
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
                                              getNextLevel={getLevel3}
                                              setPrevLevel={setLevel3}
                                              setLoadingData={setLoadingData}
                                              type={type}
                                              handleOpenLib={handleOpenLib}
                                            />
                                            {loadingData === childId && (
                                              <Box sx={{ width: "100%" }}>
                                                <LinearProgress />
                                              </Box>
                                            )}
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
                                                {Level3 &&
                                                  Level3.filter(
                                                    (dt) =>
                                                      dt.category === childId
                                                  ).map(
                                                    (
                                                      {
                                                        _id: childId3,
                                                        name: childName3,
                                                      },
                                                      index
                                                    ) => {
                                                      let openlevel3 =
                                                        state["level3"][
                                                          childName3
                                                        ] || false;

                                                      if (type === "private") {
                                                        openlevel3 =
                                                          openWork ===
                                                            childId3 || false;
                                                      } else {
                                                        openlevel3 =
                                                          state["level3"][
                                                            childName3
                                                          ] || false;
                                                      }
                                                      return (
                                                        <>
                                                          <SubListItem
                                                            nodeKey={childName3}
                                                            level={"level3"}
                                                            _id={childId3}
                                                            Index={index}
                                                            name={childName3}
                                                            handleanchorEl={
                                                              handleanchorEl
                                                            }
                                                            parentLevel={
                                                              parentLevel
                                                            }
                                                            state={state}
                                                            handleClick={
                                                              handleClick
                                                            }
                                                            open={openlevel3}
                                                            getNextLevel={
                                                              getLevel4
                                                            }
                                                            setPrevLevel={
                                                              setLevel4
                                                            }
                                                            setLoadingData={
                                                              setLoadingData
                                                            }
                                                            type={type}
                                                            handleOpenLib={
                                                              handleOpenLib
                                                            }
                                                          />
                                                          {loadingData ===
                                                            childId3 && (
                                                            <Box
                                                              sx={{
                                                                width: "100%",
                                                              }}
                                                            >
                                                              <LinearProgress />
                                                            </Box>
                                                          )}
                                                          <Collapse
                                                            in={openlevel3}
                                                            timeout="auto"
                                                            unmountOnExit
                                                          >
                                                            <List
                                                              component="div"
                                                              disablePadding
                                                              sx={{
                                                                paddingLeft:
                                                                  "2rem",
                                                              }}
                                                            >
                                                              {Level4 &&
                                                                Level4.filter(
                                                                  (dt) =>
                                                                    dt.work ===
                                                                    childId3
                                                                ).map(
                                                                  (
                                                                    {
                                                                      _id: key4,
                                                                      name: childname,
                                                                    },
                                                                    index
                                                                  ) => {
                                                                    return (
                                                                      <ListItem
                                                                        key={
                                                                          key4
                                                                        }
                                                                        button
                                                                        style={{
                                                                          height: 40,
                                                                        }}
                                                                      >
                                                                        <FontAwesomeIcon
                                                                          icon={
                                                                            faCircle
                                                                          }
                                                                          sx={{
                                                                            fontSize:
                                                                              "1rem",
                                                                          }}
                                                                        />
                                                                        <ListItemText
                                                                          inset
                                                                          primary={
                                                                            <i
                                                                              style={{
                                                                                fontSize:
                                                                                  "0.875rem",
                                                                              }}
                                                                            >
                                                                              {
                                                                                childname
                                                                              }
                                                                            </i>
                                                                          }
                                                                        />
                                                                        {type !==
                                                                          "private" &&
                                                                          type !=
                                                                            "static" && (
                                                                            <FontAwesomeIcon
                                                                              icon={
                                                                                faEllipsisV
                                                                              }
                                                                              onClick={(
                                                                                e
                                                                              ) =>
                                                                                handleanchorEl(
                                                                                  e,
                                                                                  key4,
                                                                                  "level4",
                                                                                  index
                                                                                )
                                                                              }
                                                                              id="demo-customized-button"
                                                                            />
                                                                          )}
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
                </Collapse>
              </div>
            );
          })}
      </List>
    </div>
  );
}

export default NestedList;
