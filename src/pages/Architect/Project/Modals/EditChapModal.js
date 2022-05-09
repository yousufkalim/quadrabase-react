// init
import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// component
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import RichTextEditor from "../../../../components/Architect/RichTextEditor";
import { Button } from "@mui/material";

const EditChapModal = ({
  handleOpenEditChapModal,
  editChapItem,
  currentProject,
  getProject,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    editChapItem && setTitle(editChapItem.item.title);
    editChapItem && setText(editChapItem.item.text);
  }, [editChapItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      id: editChapItem.item._id,
      title,
      text,
      type: editChapItem.type,
    };
    const result = await api(
      "put",
      `/ArchitectsChap0/editChapLevel/${currentProject.chap0part2.id._id}`,
      data,
      t
    );
    toast.success(t(result.data.message));
    handleOpenEditChapModal();
    getProject();
  };

  return (
    <div style={{ width: "45vw", maxHeight: 600, overflow: "auto" }}>
      <form onSubmit={handleSubmit}>
        {/* All fields */}
        <br />
        <InputWithLabel
          label={t("Title")}
          required={true}
          name="title"
          type="text"
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="grid-first-name">{t("Text")}</label>
        <br />
        <br />
        <RichTextEditor value={editChapItem.item.text} setValue={setText} />
        <br />

        {/* create button */}
        <div style={{ width: "100%", textAlign: "right" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#3b373c",
              height: "35px",
            }}
            onClick={handleOpenEditChapModal}
          >
            {t("Close")}
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            style={{
              backgroundColor: "#3b373c",
              height: "35px",
            }}
            type="submit"
          >
            {t("Update")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditChapModal;
