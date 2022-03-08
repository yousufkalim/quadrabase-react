import React from "react";
import FontAwesomeIcon from "../FontAwesomeIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import {
  faAngleRight,
  faAngleDown,
  faEllipsisV,
  faAngleUp,
  faCircle,
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
          height: 43,
        }}
      >
        {level !== "lastLevel" ? (
          open ? (
            <FontAwesomeIcon
              icon={faAngleDown}
              onClick={() => {
                handleClick(level, _id, obj);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faAngleRight}
              onClick={() => {
                setPrevLevel([]);
                getNextLevel(_id);
                handleClick(level, _id, obj);
              }}
            />
          )
        ) : (
          <FontAwesomeIcon
            icon={faCircle}
            sx={{
              fontSize: "1rem",
            }}
          />
        )}
        <ListItemText
          inset
          primary={
            level === "level0"
              ? `${translate("Libraries")} ${name}`
              : name.toUpperCase()
          }
          primaryTypographyProps={{
            style: { fontWeight: props.nameBold ? "bold" : "normal" },
          }}
          onClick={() => {
            if (level !== "lastLevel") {
              if (open) {
                handleClick(level, _id, obj);
              } else {
                setPrevLevel([]);
                // setLoadingData(_id);
                getNextLevel(_id);
                handleClick(level, _id, obj);
              }
            }
          }}
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
                getNextLevel(_id);
                handleClick(level, _id, obj);
              }}
            />
          ))}
        {level === "level0" && <>&nbsp;&nbsp;&nbsp;&nbsp;</>}
        <FontAwesomeIcon
          icon={faEllipsisV}
          onClick={(e) => handleanchorEl(e, _id, level)}
          id="demo-customized-button"
        />
      </ListItem>
    </>
  );
}
