import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import SubListItem from "./sublistItem";
import ListMenu from "./listMenu";
import { faAngleUp, faAngleRight, faAngleDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
import ListItemButton from "@mui/material/ListItemButton";

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
    familiesData,
  } = props;

  const [open, setOpen] = React.useState("");

  const handleClick2 = (family) => {
    if (family._id) {
      setOpen(family._id);
    } else {
      setOpen("");
    }
  };

  return (
    <div className="shadow-md">
      <List component="nav">
        {familiesData.length > 0 &&
          familiesData.map((family) => {
            return (
              <>
                <ListItemButton>
                  <ListItemText
                    inset
                    primary={<div style={{ fontWeight: 600, fontSize: 16 }}>{family.name}</div>}
                    primaryTypographyProps={{
                      style: { fontWeight: "normal" },
                    }}
                    onClick={() => (open === family._id ? handleClick2("") : handleClick2(family))}
                  />
                  {open === family._id ? (
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      onClick={() => {
                        handleClick2("");
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      onClick={() => {
                        handleClick2(family);
                      }}
                    />
                  )}
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    onClick={(e) => handleanchorEl(e, "", "Chap0Level1", family._id)}
                    id="parentLevelMenu"
                  />
                </ListItemButton>
                {props.data &&
                  props.data.map(({ _id: parentId, title: name, family: chapFamily }, index) => {
                    let openlevel1 = state["Chap0Level2"][name] || false;
                    if (chapFamily) {
                      return (
                        <>
                          <Collapse
                            in={open === family._id && open === chapFamily._id}
                            sx={{ paddingLeft: "1rem" }}
                            timeout="auto"
                            unmountOnExit
                          >
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
                              setPrevLevel={props.setItems}
                            />

                            <Collapse in={openlevel1} timeout="auto" unmountOnExit>
                              <List sx={{ paddingLeft: "1rem" }} component="div" disablePadding>
                                {items?.map(({ _id: childId, title: childName, text }, index) => {
                                  let openlevel2 = state["Chap0Level3"][childName] || false;
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
                                        setPrevLevel={props.setItems2}
                                      />
                                      <Collapse in={openlevel2} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding sx={{ paddingLeft: "2rem" }}>
                                          {items2?.map(({ _id: childId3, title: childName3, text }, index) => {
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
                                          })}
                                        </List>
                                      </Collapse>
                                    </>
                                  );
                                })}
                              </List>
                            </Collapse>
                          </Collapse>
                        </>
                      );
                    }
                  })}
              </>
            );
          })}
      </List>
    </div>
  );
}

export default NestedList;
