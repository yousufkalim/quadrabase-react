import React, { useEffect } from "react";
import ArchitectsTable from "../../../components/Table";
import Button from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import Notifier from "../../../utils/Notifier";
import { ARCHITECT_STATE } from "../../../components/formik/initialValues";
import {
  ARCHITECT_YUP,
  EDIT_ARCHITECT_YUP,
} from "../../../components/formik/validations";
import AddArchitect from "./addArchitect";
import EditArchitect from "./editArchitect";
import { useFormik } from "formik";
import { ArchitectheadCells } from "../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import SubscriptionModal from "./SubscriptionModal";
import moment from "moment";

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState("");

  const [architectId, setarchitectId] = React.useState("");
  const [architectDeleteId, setarchitectDeleteId] = React.useState("");

  const [architectsData, setarchitectsData] = React.useState([]);
  const [architectData, setarchitectData] = React.useState("");

  const [editData, seteditData] = React.useState([]);

  const [subscriptionModal, setSubscriptionModal] = React.useState(false);
  const [subscriptionArchitextId, setSubscriptionArchitextId] =
    React.useState();

  const [currentSubscription, setCurrentSubscription] = React.useState();

  const [options, setOptions] = React.useState([]);

  // States for subscription popup
  const [value, setValue] = React.useState("");
  const [projects, setProjects] = React.useState(5);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(
    moment(new Date()).add(1, "years")._d
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "subscription") {
      setValue(value);
    } else if (name == "projects") {
      setProjects(value);
    }
  };

  const getAllSubscriptions = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Subscriptions`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOptions(response.data.subscription);
    } catch (error) {
      console.log(error?.response?.data?.message, "error ");
    }
  };

  const handleModal = () => setModal(!modal);
  //   delete architect modal
  const handleDeleteModal = (id) => {
    if (id) {
      setarchitectDeleteId(id);
    }
    setdeleteModal(!deletemodal);
  };
  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/Architects/${architectDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notifier(response.data.message, "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }

    setdeleteModal(!deletemodal);
  };

  const handleEditModal = async (id) => {
    if (id) {
      setarchitectId(id);
      let filteredData = architectsData.find((data) => data._id == id);
      seteditData(filteredData);
    }
    seteditModal(!editmodal);
  };

  // Subscription Modal
  const handleSubscriptionModal = (id) => {
    if (id) {
      setSubscriptionArchitextId(id);
      let filteredData = architectsData.find((data) => data._id == id);
      setarchitectData(filteredData);
      setCurrentSubscription(filteredData?.subscriptions);
    }
    setSubscriptionModal(!subscriptionModal);
  };

  const getArchitects = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Architects`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.architects;
      setarchitectsData(data);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };

  useEffect(() => {
    getArchitects();
  }, [modal, editmodal, deletemodal, subscriptionModal]);
  useEffect(() => {
    setValue(currentSubscription?.subscription?._id);
    currentSubscription?.start_date &&
      setStartDate(moment(currentSubscription?.start_date)._i);
    currentSubscription?.end_date &&
      setEndDate(moment(currentSubscription?.end_date)._i);
    architectData &&
      Object.keys(architectData).length > 0 &&
      setProjects(architectData?.subscriptions?.projects ?? 5);
    getAllSubscriptions();
  }, [subscriptionModal]);

  useEffect(() => {
    let array = [];
    ArchitectheadCells.slice(0, ArchitectheadCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);

  //create Architect
  const formik = useFormik({
    initialValues: ARCHITECT_STATE,
    validationSchema: ARCHITECT_YUP,

    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Architects/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Notifier(response.data.message, "success", translate);
        handleModal();
      } catch (err) {
        if (err.response) {
          Notifier(err.response.data.message, "error", translate);
        }
        console.log("Errror->>>", err);
      }
      formik.resetForm();
    },
  });

  //edit Architect
  const edit_formik = useFormik({
    initialValues: ARCHITECT_STATE,
    validationSchema: EDIT_ARCHITECT_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Architects/${architectId}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        handleEditModal();
      } catch (err) {
        if (err.response) {
          Notifier(err.response.data.message, "error", translate);
        }
        console.log("Errror->>>", err);
      }
    },
  });

  // add subscription
  const handleSubmit = async () => {
    try {
      let response = await Axios({
        method: "put",
        url: `${baseUrl}/Architects/addsubscription/${subscriptionArchitextId}`,
        data: {
          subscriptionId: value,
          start_date: startDate,
          end_date: endDate,
          projects: projects,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notifier(response.data.message, "success", translate);
      handleSubscriptionModal();
    } catch (error) {
      Notifier(error.response.data.message, "error", translate);
    }
  };
  return (
    <>
      <Modal
        title={translate("Add Architect")}
        open={modal}
        onClose={handleModal}
        translate={translate}
        buttonLabel="Create"
        onSubmit={formik.handleSubmit}
        component={<AddArchitect translate={translate} formik={formik} />}
      />
      <Modal
        title="Edit Architect"
        open={editmodal}
        onClose={handleEditModal}
        buttonLabel="Update"
        onSubmit={edit_formik.handleSubmit}
        translate={translate}
        component={
          <EditArchitect
            editData={editData}
            editmodal={editmodal}
            translate={translate}
            formik={edit_formik}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        width="35%"
        delete={true}
        component={
          <DeleteModal
            handleClose={handleDeleteModal}
            handleDelete={handleDelete}
            translate={translate}
          />
        }
      />
      <Modal
        title={translate("Set Subscription")}
        open={subscriptionModal}
        onClose={handleSubscriptionModal}
        width="35%"
        translate={translate}
        onSubmit={handleSubmit}
        buttonLabel="Save"
        component={
          <SubscriptionModal
            translate={translate}
            onChange={handleChange}
            options={options}
            value={value}
            projects={projects}
            architectData={architectData}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        }
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3" t>
            <h1 className="text-2xl font-bold">{translate("Architects")}</h1>
            <Button
              translate={translate}
              variant="outlined"
              label="Add Architect"
              onClick={handleModal}
              startIcon={<AddIcon />}
            />
          </div>
          <ArchitectsTable
            headCells={ArchitectheadCells}
            data={architectsData}
            translate={translate}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
            subscription={true}
            handleSubscription={handleSubscriptionModal}
          />
        </div>
      </div>
    </>
  );
}
