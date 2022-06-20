import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import moment from "moment";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useTranslation } from "react-i18next";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import WrapTextIcon from "@mui/icons-material/WrapText";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,

    onRequestSort,
  } = props;
  const { t } = useTranslation();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow
        sx={{
          whiteSpace: "nowrap",
          borderTop: "2px solid lightgray !important",
          borderBottom: "2px solid lightgray !important",
        }}
      >
        {props.headCells &&
          props?.headCells?.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                <strong>{t(headCell.label)}</strong>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        justifyContent: "space-between",
      }}
    >
      <strong>{props.headerText}</strong>
      {props.buttonText && (
        <Button
          variant="contained"
          onClick={() => {
            if (props.buttonText === "Buy a project pack" || props.buttonText === "Acheter un pack projet") {
              props.buttonAction("project");
            } else if (props.buttonText === "Buy Subscription" || props.buttonText === "Acheter un abonnement") {
              props.buttonAction("subscription");
            } else {
              props.buttonAction();
            }
          }}
          sx={{
            textTransform: "none",
            backgroundColor: "#8C1244",
            borderRadius: 2,
            whiteSpace: "nowrap",
            ":hover": {
              backgroundColor: "#8C1244",
            },
          }}
          startIcon={<AddCircleOutlineIcon />}
        >
          {props.buttonText}
        </Button>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const { t } = useTranslation();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props?.data?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected?.slice(0, selectedIndex), selected?.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty props.data.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props?.data?.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: 5 }}>
        {props.headerText && (
          <EnhancedTableToolbar headerText={props.headerText} buttonAction={props.buttonAction} buttonText={props.buttonText} />
        )}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected?.length}
              order={order}
              translate={props.translate}
              headCells={props.headCells}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props?.data?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 props.data.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(props.data, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  return (
                    <TableRow
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      sx={{
                        backgroundColor: index % 2 !== 0 && "#F5F5F5",
                      }}
                    >
                      {props?.rows?.map((record, index) =>
                        record == "subscriptionEndDate" ? (
                          <TableCell align="left" title={row?.subscription?.end_date}>
                            {row?.end_date ? moment(row?.end_date).format("DD/MM/YYYY") : "N/A"}
                          </TableCell>
                        ) : record == "subscriptionStartDate" ? (
                          <TableCell align="left" title={row?.subscription?.start_date}>
                            {row?.start_date ? moment(row?.start_date).format("DD/MM/YYYY") : "N/A"}
                          </TableCell>
                        ) : record === "subscriptionName" ? (
                          <TableCell key={index} align="left" title={row?.subscriptions?.name}>
                            {row?.subscription?.name
                              ? row?.subscription?.name?.length > 20
                                ? row?.subscription?.name.substring(0, 20) + "..."
                                : row?.subscription?.name
                              : "Abonnement initiale"}
                          </TableCell>
                        ) : record == "assignedToName" ? (
                          <TableCell align="left" title={row?.assigned_to?.first_name}>
                            {row?.assigned_to?.first_name
                              ? row?.assigned_to?.first_name?.length > 20
                                ? row?.assigned_to?.first_name.substring(0, 20) + "..."
                                : row?.assigned_to?.first_name
                              : "N/A"}
                          </TableCell>
                        ) : record === "createdAt" ? (
                          <TableCell align="left" title={row?.subscription?.createdAt}>
                            {row?.createdAt ? moment(row?.createdAt).format("DD/MM/YYYY") : "N/A"}
                          </TableCell>
                        ) : record === "updatedAt" ? (
                          <TableCell align="left" title={row?.subscription?.updatedAt}>
                            {row?.updatedAt ? moment(row?.updatedAt).format("DD/MM/YYYY") : "N/A"}
                          </TableCell>
                        ) : record === "vat" ? (
                          <TableCell key={index} align="left" title={row?.vat?.value}>
                            {row?.vat?.value
                              ? row?.vat?.value?.length > 20
                                ? row?.vat?.value.substring(0, 20) + "..."
                                : row?.vat?.value
                              : "N/A"}
                            %
                          </TableCell>
                        ) : record === "text" ? (
                          <TableCell key={index} align="left" title={row?.vat?.value}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: row?.text.length > 20 ? row?.text.substring(0, 20) + "..." : row?.text,
                              }}
                            ></div>
                          </TableCell>
                        ) : record === "prescriber" ? (
                          <TableCell key={index} align="left" title={row[record]}>
                            {row?.name}
                          </TableCell>
                        ) : record === "client" ? (
                          <TableCell key={index} align="left" title={row[record]}>
                            {row?.client?.establishment}
                          </TableCell>
                        ) : record === "type" ? (
                          <TableCell key={index} align="left" title={row[record]}>
                            {row?.type?.text}
                          </TableCell>
                        ) : record === "subStatus" ? (
                          <TableCell key={index} align="left" title={row[record]}>
                            {row?.assigned_to?._id ? (
                              <CheckBoxOutlinedIcon color="success" />
                            ) : (
                              <CancelOutlinedIcon color="error" />
                            )}
                          </TableCell>
                        ) : record === "code" ? (
                          <TableCell key={index} align="left" title={row[record]}>
                            {row?.subscription?.reference?.code ? row?.subscription?.reference?.code : <>N/A</>}
                          </TableCell>
                        ) : record === "market_type" ? (
                          <TableCell key={index} align="left" title={row[record]}>
                            {t(row?.market_type)}
                          </TableCell>
                        ) : (
                          <TableCell key={index} align="left" title={row[record]}>
                            {row[record]
                              ? row[record]?.length > 20
                                ? row[record].substring(0, 20) + "..."
                                : row[record]
                              : row[record] === 0
                              ? 0
                              : "N/A"}
                          </TableCell>
                        )
                      )}

                      {props.noActions !== true && (
                        <TableCell align="left">
                          {props.handleAssign ? (
                            <IconButton aria-label="edit" onClick={() => props.handleAssign(row?._id, row?.assigned_to?.email)}>
                              <DriveFileRenameOutlineRoundedIcon />
                            </IconButton>
                          ) : props.handleView ? (
                            <>
                              <IconButton aria-label="edit" onClick={() => props.handleView(row?._id)}>
                                <DriveFileRenameOutlineRoundedIcon />
                              </IconButton>
                              <IconButton aria-label="edit" onClick={() => props.handleOpenStatusModal(row)}>
                                <WrapTextIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton color="info" aria-label="edit" onClick={() => props.handleEdit(row)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton color="error" aria-label="delete" onClick={() => props.handleDelete(row._id)}>
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {props.noArrows !== true && (
          <div
            style={{
              height: 50,
              width: "100%",
              color: "#8C1244",
              display: "grid",
              placeItems: "center",
            }}
          >
            <strong>
              {" "}
              <ArrowBackIosIcon
                fontSize="md"
                onClick={() => {
                  if (page !== 0) {
                    handleChangePage("", page - 1);
                  }
                }}
                sx={{
                  cursor: "pointer",
                }}
              />
              {page + 1}/{Math.ceil(props?.data?.length / rowsPerPage) > 0 ? Math.ceil(props?.data?.length / rowsPerPage) : 1}{" "}
              <ArrowForwardIosIcon
                fontSize="md"
                onClick={() => {
                  if (page + 1 < Math.ceil(props?.data?.length / rowsPerPage)) {
                    handleChangePage("", page + 1);
                  }
                }}
                sx={{
                  cursor: "pointer",
                }}
              />
            </strong>
          </div>
        )}
      </Paper>
    </Box>
  );
}
