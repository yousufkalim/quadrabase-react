import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItem from "@mui/material/ListItem";
import ListMenu from "./listMenu";

import StarBorder from "@mui/icons-material/StarBorder";

import {
  faCaretDown,
  faCaretUp,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
const lists = [
  {
    key: "testLibrary",
    label: "Test Library",
    icon: InboxIcon,
    // color: "#afafaf",
    items: [
      {
        key: "equipmentRemoval",
        label: "Equipment Removal(lev2)",
        icon: StarBorder,
        color: "a4aab2",
        items: [
          { key: "item2", label: "Item2", icon: StarBorder },
          { key: "item2", label: "Item2", icon: StarBorder },
          { key: "item2", label: "Item2", icon: StarBorder },
          { key: "item2", label: "Item2", icon: StarBorder },
          { key: "item2", label: "Item2", icon: StarBorder },
        ],
      },
      {
        key: "various",
        label: "Various Works(lev2)",
        icon: StarBorder,
        color: "a4aab2",
        items: [
          { key: "item2", label: "Item2", icon: StarBorder },
          { key: "item2", label: "Item2", icon: StarBorder },
          { key: "item2", label: "Item2", icon: StarBorder },
          { key: "item2", label: "Item2", icon: StarBorder },
          { key: "item2", label: "Item2", icon: StarBorder },
        ],
      },
    ],
  },
  {
    key: "pavement",
    label: "Pavement",
    icon: InboxIcon,
    // color: "#afafaf",

    items: [
      {
        key: "unratedMaterial",
        label: "UnRated Materials",
        icon: StarBorder,
        items: [{ key: "storage", label: "Storage2", icon: StarBorder }],
      },
    ],
  },
];

function NestedList() {
  const [open, setOpen] = React.useState({});
  const [open2, setOpen2] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (key) => () => {
    setOpen({ [key]: !open[key] });
  };
  const handleClick2 = (key) => () => {
    setOpen2({ [key]: !open2[key] });
  };
  const handleanchorEl = () => {
    setAnchorEl(!anchorEl);
  };
  return (
    <div className="shadow-xl">
      <ListMenu onClick={handleanchorEl} anchorEl={anchorEl} />
      <List
        component="nav"
        subheader={
          <ListSubheader>
            <h1 className="font-semibold text-lg p-3">General Libraries</h1>
          </ListSubheader>
        }
      >
        {lists.map(({ key, label, icon: Icon, items, color }) => {
          const opens = open[key] || false;

          return (
            <div key={key}>
              <ListItem
                // sx={{ backgroundColor: color }}
                onClick={handleClick(key)}
                button
              >
                {opens ? (
                  <FontAwesomeIcon icon={faAngleDown} />
                ) : (
                  <FontAwesomeIcon icon={faAngleRight} />
                )}
                <ListItemText inset primary={label} />
                {/* <h2 className="font-semibold text-lg pl-4">{label}</h2> */}

                {opens ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    onClick={handleanchorEl}
                    id="demo-customized-button"
                  />
                )}
              </ListItem>
              <Collapse in={opens} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {items.map(
                    ({
                      key: childKey,
                      label: childLabel,
                      icon: ChildIcon,
                      items: childItems,
                      color,
                    }) => {
                      const opens2 = open2[childKey] || false;

                      return (
                        <>
                          <ListItem
                            key={key}
                            button
                            //   sx={{ backgroundColor: "#c1c2c3" }}
                            onClick={handleClick2(childKey)}
                          >
                            {opens2 ? (
                              <FontAwesomeIcon icon={faAngleDown} />
                            ) : (
                              <FontAwesomeIcon icon={faAngleRight} />
                            )}
                            <ListItemText inset primary={childLabel} />
                            {opens2 ? (
                              <FontAwesomeIcon icon={faCaretUp} />
                            ) : (
                              <FontAwesomeIcon icon={faCaretDown} />
                            )}
                          </ListItem>
                          <Collapse in={opens2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {childItems.map(
                                ({
                                  key: childKey,
                                  label: childLabel,
                                  icon: ChildIcon,
                                }) => (
                                  <ListItem key={childKey} button>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <ListItemText inset primary={childLabel} />
                                  </ListItem>
                                )
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
