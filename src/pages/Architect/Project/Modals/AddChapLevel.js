// init
import React, { useState } from "react";
import api from "../../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// component
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import RichTextEditor from "../../../../components/Architect/RichTextEditor";
import { Button } from "@mui/material";

const AddChapLevel = ({
  handleOpenAddChapModal,
  editChapItem,
  currentProject,
  getProject,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      id: editChapItem.item._id,
      title,
      text,
      type: editChapItem.type,
    };
    if (editChapItem.type === "level0") {
      let maxRanking = Math.max.apply(
        Math,
        editChapItem.item.level2.map((item) => {
          return item.ranking;
        })
      );
      data.ranking = maxRanking > -1 ? maxRanking + 1 : 0;
    } else if (editChapItem.type === "level1") {
      let maxRanking = Math.max.apply(
        Math,
        editChapItem.item.level3.map((item) => {
          return item.ranking;
        })
      );
      data.ranking = maxRanking > -1 ? maxRanking + 1 : 0;
    }

    const result = await api(
      "post",
      `/ArchitectsChap0/createChapLevel/${currentProject.chap0part2.id._id}`,
      data,
      t
    );
    toast.success(t(result.data.message));
    handleOpenAddChapModal();
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
        <RichTextEditor value={text} setValue={setText} />
        <br />

        {/* create button */}
        <div style={{ width: "100%", textAlign: "right" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#3b373c",
              height: "35px",
            }}
            onClick={handleOpenAddChapModal}
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
            {t("Create")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddChapLevel;
