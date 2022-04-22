import React from "react";
import FontAwesomeIcon from "../FontAwesomeIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import {
  faAngleRight,
  faAngleDown,
  faEllipsisV,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
export default function subList(props) {
  let {
    level,
    handleanchorEl,
    name,
    open,
    nodeKey,
    handleClick,
    Index,
    _id,
    getNextLevel,
    translate,
    setPrevLevel,
    setCurrentFamily,
    setLoadingData,
    type,
    architect,
    handleOpenLib,
  } = props;
  let obj = {};
  obj[`${nodeKey}`] = nodeKey;
  obj[nodeKey] = !open;
  obj["id"] = _id;

  return (
    <>
      <ListItem
        key={_id}
        button
        dense={true}
        style={{
          backgroundColor: level === "level0" && "white",
          height: 40,
        }}
      >
        {level !== "level0" &&
          (open ? (
            <FontAwesomeIcon
              icon={faAngleDown}
              onClick={() => {
                setLoadingData("");

                if (type === "private") {
                  handleOpenLib("", level);
                } else {
                  handleClick(level, _id, obj);
                }
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleRight}
              onClick={() => {
                setPrevLevel([]);
                setLoadingData(_id);
                getNextLevel(_id);
                if (type === "private") {
                  handleOpenLib(_id, level);
                } else {
                  handleClick(level, _id, obj);
                }
              }}
            />
          ))}
        <ListItemText
          inset
          primary={
            level === "level0"
              ? `${translate("Libraries")} ${name}`
              : level === "level3"
              ? name
              : level === "level1" && type === "private"
              ? `${name.toUpperCase()} - ${architect}`
              : name.toUpperCase()
          }
          primaryTypographyProps={{
            style: { fontWeight: props.nameBold ? "bold" : "normal" },
          }}
          // onClick={() => handleClick(level, _id, obj)}
          onClick={() => {
            if (level !== "level0") {
              if (open) {
                setLoadingData("");
                handleClick(level, _id, obj);
              } else {
                setPrevLevel([]);
                setLoadingData(_id);
                getNextLevel(_id);
                handleClick(level, _id, obj);
              }
            } else {
              if (open) {
                setLoadingData("");
                handleClick(level, _id, obj);
              } else {
                setCurrentFamily(_id);
                setPrevLevel([]);
                setLoadingData(_id);
                getNextLevel(_id);
                handleClick(level, _id, obj);
              }
            }
          }}
          // This will lead to disaster otherwise.
          // Best Wishes,
          // Umar
          // March 02, 2021.
        />
        {level === "level0" &&
          (open ? (
            <FontAwesomeIcon
              icon={faAngleDown}
              onClick={() => {
                setLoadingData("");
                handleClick(level, _id, obj);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleUp}
              onClick={() => {
                setCurrentFamily(_id);
                setPrevLevel([]);
                setLoadingData(_id);
                getNextLevel(_id);
                handleClick(level, _id, obj);
              }}
            />
          ))}
        {level === "level0" && <>&nbsp;&nbsp;&nbsp;&nbsp;</>}
        {type !== "private" && type != "static" && (
          <FontAwesomeIcon
            icon={faEllipsisV}
            onClick={(e) => handleanchorEl(e, _id, level)}
            id="demo-customized-button"
          />
        )}
      </ListItem>
    </>
  );
}
