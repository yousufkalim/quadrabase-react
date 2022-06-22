import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken, getUser } from "../../../utils/Auth";

import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Notifier from "../../../utils/Notifier";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import Modal from "../../../components/Modal";
import { useFormik } from "formik";
import { FOLDER_STATE } from "../../../components/formik/initialValues";
import { FOLDER_YUP } from "../../../components/formik/validations";
import AddFolders from "./Modals/AddFolders";
import EditFolders from "./Modals/EditFolders";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextInput from "../../../components/TextInput";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteModal from "../../../components/DeleteModal";

const Index = () => {
  const { t } = useTranslation();
  const token = getToken();
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState();
  const [openAddFolders, setOpenAddFolders] = useState(false);
  const [openEditFolders, setOpenEditFolders] = useState(false);
  const [openDeleteFolder, setOpenDeleteFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getFolders();
  }, []);

  const getFolders = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Folders/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.folder;
      setCurrentFolder();
      setFolders(data);
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ", t);
    }
  };

  const getSubFolders = async (id) => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Folders/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data;
      setCurrentFolder(data.parentFolder);
      setFolders(data.folder);
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ", t);
    }
  };

  const handleUpload = async (e) => {
    try {
      const files = e.target.files;
      let form_data = new FormData();
      form_data.append(`file`, files[0]);
      form_data.append(`name`, files[0].name);
      let response = await Axios({
        method: "put",
        url: `${baseUrl}/Folders/upload/${currentFolder._id}`,
        data: form_data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentFolder(response.data.folder);
      Notifier(response.data.message, "success", t);
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ", t);
    }
  };

  //delete Folder
  const handleDeleteFolder = async () => {
    try {
      let response = {};

      if (selectedFolder.type === "docx" || selectedFolder.type === "images" || selectedFolder.type === "videos") {
        response = await Axios({
          method: "put",
          url: `${baseUrl}/Folders/deleteFile/${currentFolder._id}`,
          data: { type: selectedFolder.type, _id: selectedFolder._id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await Axios({
          method: "delete",
          url: `${baseUrl}/Folders/${selectedFolder._id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (selectedFolder.type === "docx" || selectedFolder.type === "images" || selectedFolder.type === "videos") {
        getSubFolders(currentFolder._id);
      } else if (selectedFolder.parentFolder) {
        getSubFolders(selectedFolder.parentFolder);
      } else {
        getFolders();
      }

      Notifier(response.data.message, "success", t);
      handleOpenDeleteFolder();
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ", t);
    }
  };

  // download file
  const downloadBlob = (blob, filename) => {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    document.body.removeChild(link);
  };

  // convert url into blob
  const blobFromURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return blob;
  };

  const handleBack = () => {
    if (currentFolder.parentFolder) {
      getSubFolders(currentFolder.parentFolder);
    } else {
      getFolders();
    }
  };

  const handleClick = (event, item) => {
    if (item?._id) {
      setSelectedFolder(item);
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenAddFolder = () => setOpenAddFolders(!openAddFolders);
  const handleOpenEditFolder = () => setOpenEditFolders(!openEditFolders);
  const handleOpenDeleteFolder = () => setOpenDeleteFolder(!openDeleteFolder);

  const formik = useFormik({
    initialValues: FOLDER_STATE,
    validationSchema: FOLDER_YUP,
    onSubmit: async (values) => {
      try {
        let response = {};
        if (!currentFolder) {
          response = await Axios({
            method: "post",
            url: `${baseUrl}/Folders/create`,
            data: values,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          getFolders();
        } else {
          response = await Axios({
            method: "post",
            url: `${baseUrl}/Folders/createSubFolder/${currentFolder._id}`,
            data: values,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          getSubFolders(currentFolder._id);
        }

        Notifier(response.data.message, "success", t);
        handleOpenAddFolder();
        formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", t);

        console.log("Errror->>>", err);
      }
    },
  });

  const Editformik = useFormik({
    initialValues: FOLDER_STATE,
    validationSchema: FOLDER_YUP,
    onSubmit: async (values) => {
      try {
        let response = {};
        if (selectedFolder.type === "docx" || selectedFolder.type === "images" || selectedFolder.type === "videos") {
          response = await Axios({
            method: "put",
            url: `${baseUrl}/Folders/updateFile/${currentFolder._id}`,
            data: { type: selectedFolder.type, _id: selectedFolder._id, name: values.name },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          response = await Axios({
            method: "put",
            url: `${baseUrl}/Folders/${selectedFolder._id}`,
            data: values,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        if (selectedFolder.type === "docx" || selectedFolder.type === "images" || selectedFolder.type === "videos") {
          getSubFolders(currentFolder._id);
        } else if (selectedFolder.parentFolder) {
          getSubFolders(selectedFolder.parentFolder);
        } else {
          getFolders();
        }

        Notifier(response.data.message, "success", t);
        handleOpenEditFolder();
        formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", t);

        console.log("Errror->>>", err);
      }
    },
  });

  return (
    <div className="w-full  md:mx-auto py-9 ">
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mt: 2.5 }}
      >
        <MenuItem
          style={{
            width: 200,
            height: 30,
          }}
          onClick={() => {
            handleOpenEditFolder();
            handleClose();
          }}
        >
          {t("Rename")}
        </MenuItem>
        <MenuItem
          style={{
            width: 200,
            height: 30,
          }}
          onClick={() => {
            handleOpenDeleteFolder();
            handleClose();
          }}
        >
          {t("Delete")}
        </MenuItem>
      </Menu>
      <Modal
        title="Add a folder"
        open={openAddFolders}
        translate={t}
        onClose={handleOpenAddFolder}
        width="40%"
        buttonLabel="Create"
        onSubmit={formik.handleSubmit}
        component={<AddFolders translate={t} formik={formik} />}
      />
      <Modal
        title="Rename folder"
        open={openEditFolders}
        translate={t}
        onClose={handleOpenEditFolder}
        width="40%"
        buttonLabel="Update"
        onSubmit={Editformik.handleSubmit}
        component={<EditFolders translate={t} formik={Editformik} editData={selectedFolder} />}
      />
      <Modal
        open={openDeleteFolder}
        delete={true}
        width="40%"
        component={<DeleteModal translate={t} handleClose={handleOpenDeleteFolder} handleDelete={handleDeleteFolder} />}
      />
      <div className="container mx-auto px-6">
        <div className="flex justify-between pb-3">
          <h1 className="text-2xl font-bold">
            {currentFolder && (
              <IconButton onClick={handleBack}>
                {" "}
                <ArrowBackIcon style={{ cursor: "pointer" }} />
              </IconButton>
            )}{" "}
            &nbsp;&nbsp;
            {t("File Manager")}
          </h1>

          <div style={{ display: "flex" }}>
            <Button variant="outlined" label="Add a folder" translate={t} onClick={handleOpenAddFolder} startIcon={<AddIcon />} />{" "}
            &nbsp;&nbsp;
            {currentFolder && (
              <label
                className="file-button"
                style={{
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <AddIcon fontSize="md" /> &nbsp;{t("Add a file")}
                <TextInput
                  type="file"
                  placeholder="Document"
                  name="document"
                  onChange={handleUpload}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
        </div>
        <Grid container spacing={4}>
          {folders.map((item) => {
            return (
              <Grid item xs={12} sm={12} md={3}>
                <Card sx={{ display: "flex", cursor: "pointer", position: "relative" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent
                      sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
                      onClick={() => {
                        getSubFolders(item._id);
                      }}
                    >
                      <Typography component="div" variant="h6">
                        <FolderIcon fontSize="large" color="primary" /> &nbsp;&nbsp;{" "}
                        {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                      </Typography>
                    </CardContent>
                    <IconButton
                      style={{ position: "absolute", right: 5, top: 10 }}
                      id="demo-positioned-button"
                      aria-controls={open ? "demo-positioned-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, item)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            );
          })}
          {currentFolder?.files.docx.length > 0 &&
            currentFolder?.files.docx.map((item) => {
              return (
                <Grid item xs={12} sm={12} md={3}>
                  <Card
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent
                        sx={{
                          flex: "1 0 auto",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                        onClick={async () => {
                          let blob = await blobFromURL(`${process.env.REACT_APP_URI}/${item.uri}`);
                          downloadBlob(blob, item.name);
                        }}
                      >
                        <Typography component="div" variant="h6">
                          <InsertDriveFileIcon fontSize="large" color="primary" /> &nbsp;&nbsp;{" "}
                          {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                        </Typography>
                      </CardContent>
                      <IconButton
                        id="demo-positioned-button"
                        aria-controls={open ? "demo-positioned-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, { type: "docx", _id: item._id, name: item.name })}
                        style={{ position: "absolute", right: 5, top: 10 }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          {currentFolder?.files.videos.length > 0 &&
            currentFolder?.files.videos.map((item) => {
              return (
                <Grid item xs={12} sm={12} md={3}>
                  <Card
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent
                        sx={{
                          flex: "1 0 auto",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                        onClick={async () => {
                          let blob = await blobFromURL(`${process.env.REACT_APP_URI}/${item.uri}`);
                          downloadBlob(blob, item.name);
                        }}
                      >
                        <Typography component="div" variant="h6">
                          <VideocamIcon fontSize="large" color="primary" /> &nbsp;&nbsp;{" "}
                          {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                        </Typography>
                      </CardContent>
                      <IconButton
                        id="demo-positioned-button"
                        aria-controls={open ? "demo-positioned-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, { type: "videos", _id: item._id, name: item.name })}
                        style={{ position: "absolute", right: 5, top: 10 }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          {currentFolder?.files.images.length > 0 &&
            currentFolder?.files.images.map((item) => {
              return (
                <Grid item xs={12} sm={12} md={3}>
                  <Card
                    sx={{
                      display: "flex",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent
                        sx={{
                          flex: "1 0 auto",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                        onClick={async () => {
                          let blob = await blobFromURL(`${process.env.REACT_APP_URI}/${item.uri}`);
                          downloadBlob(blob, item.name);
                        }}
                      >
                        <Typography component="div" variant="h6">
                          <ImageIcon fontSize="large" color="primary" /> &nbsp;&nbsp;{" "}
                          {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                        </Typography>
                      </CardContent>
                      <IconButton
                        id="demo-positioned-button"
                        aria-controls={open ? "demo-positioned-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, { type: "images", _id: item._id, name: item.name })}
                        style={{ position: "absolute", right: 5, top: 10 }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default Index;
