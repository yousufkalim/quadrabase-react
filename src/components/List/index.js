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
import { LibrariesList } from "../../utils/libraryList";

function NestedList(props) {
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
      {props.librariesData && props.librariesData.length <= 0 && (
        <ListMenu
          onClick={handleanchorEl}
          onClose={handleanchorElClose}
          onAdd={onAdd}
          open={openanchorEl}
          anchorEl={anchorEl}
          text={"Add_Library"}
          level={"level0"}
          id={"parentLevelMenu"}
          parentLevel={parentLevel}
        />
      )}
      <List
        component="nav"
        subheader={
          <ListSubheader>
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg p-3">General Libraries</h1>
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
            ({
              _id: parentId,
              name,
              categories: items,
              works: items2,
              work_details: subchildItems,
            }) => {
              let openlevel1 = state["level1"][name] || false;
              return (
                <div key={parentId}>
                  <SubListItem
                    _id={parentId}
                    nodeKey={name}
                    level={"level1"}
                    onAdd={onAdd}
                    name={name}
                    handleanchorEl={handleanchorEl}
                    handleClose={handleanchorElClose}
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
                      {items.map(({ _id: childId, name: childName }) => {
                        let openlevel2 = state["level2"][childName] || false;
                        return (
                          <>
                            <SubListItem
                              nodeKey={childName}
                              _id={childId}
                              level={"level2"}
                              name={childName}
                              handleanchorEl={handleanchorEl}
                              handleClose={handleanchorElClose}
                              openanchorEl={openanchorEl}
                              text={Text}
                              onAdd={onAdd}
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
                                  ({ _id: childId3, name: childName3 }) => {
                                    let openlevel3 =
                                      state["level3"][childName3] || false;

                                    return (
                                      <>
                                        <SubListItem
                                          nodeKey={childName3}
                                          level={"level3"}
                                          _id={childId3}
                                          name={childName3}
                                          handleanchorEl={handleanchorEl}
                                          handleClose={handleanchorElClose}
                                          openanchorEl={openanchorEl}
                                          text={Text}
                                          onAdd={onAdd}
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
                                                  _id: key4,
                                                  name: childname,
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
                                                        primary={childname}
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
                      })}
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
