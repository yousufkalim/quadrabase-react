import React, { useEffect } from "react";
import ProductsTable from "../../../components/Table";
import Button from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import Notifier from "../../../utils/Notifier";
import { useFormik } from "formik";
import { PRODUCT_STATE } from "../../../components/formik/initialValues";
import { PRODUCT_YUP, EDIT_ADMIN_YUP } from "../../../components/formik/validations";
import AddSubscription from "./AddSubscription";
import EditSubscription from "./EditSubscription";

import { ProductheadCells } from "../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken, getUser } from "../../../utils/Auth";
import { useTranslation } from "react-i18next";

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const USER = getUser();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState("");

  const [productId, setProductId] = React.useState("");
  const [productDeleteId, setProductDeleteId] = React.useState("");

  const [productData, setProductData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);
  const { t } = useTranslation();
  const handleModal = () => {
    setModal(!modal);
    formik.resetForm();
  };
  //   delete architect modal
  const handleDeleteModal = (id) => {
    if (id) {
      setProductDeleteId(id);
    }
    setdeleteModal(!deletemodal);
  };
  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/Subscriptions/${productDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notifier(response.data.message, "success", translate);
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ", translate);
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = async (id) => {
    if (id) {
      setProductId(id);
      try {
        let filteredData = productData.find((data) => data._id == id);
        seteditData(filteredData);
      } catch (error) {
        if (error.response) Notifier(error.response.data.message, "error ", translate);
      }
    }
    seteditModal(!editmodal);
  };

  const getProducts = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Subscriptions/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.subscription;
      setProductData(data);
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ", translate);
    }
    //}
  };

  useEffect(() => {
    getProducts();
  }, [modal, editmodal, deletemodal]);
  useEffect(() => {
    let array = [];
    ProductheadCells.slice(0, ProductheadCells.length - 1).map((cell) => array.push(cell.id));
    setheadCells(array);
  }, []);

  const formik = useFormik({
    initialValues: PRODUCT_STATE,
    validationSchema: PRODUCT_YUP,
    onSubmit: async (values) => {
      try {
        const data = {
          name: values.name,
          type: values.type,
          duration: {
            months: values.durationMonths, ////Number of months
            price: values.durationprice,
          },
          credit: values.credit,
          projectsPack: {
            projects: values.projectsPack, ////Number of projects with this subscription
            price: values.projectPrice,
          },
        };
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Subscriptions/create`,
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Notifier(response.data.message, "success", translate);
        handleModal();
        formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });
  const edit_formik = useFormik({
    initialValues: PRODUCT_STATE,
    validationSchema: PRODUCT_YUP,
    onSubmit: async (values) => {
      try {
        const data = {
          name: values.name,
          type: values.type,
          duration: {
            months: values.durationMonths, ////Number of months
            price: values.durationprice,
          },
          credit: values.credit,
          projectsPack: {
            projects: values.projectsPack, ////Number of projects with this subscription
            price: values.projectPrice,
          },
        };
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Subscriptions/${productId}`,
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        handleEditModal();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });
  return (
    <>
      <Modal
        title="Add Product"
        open={modal}
        translate={translate}
        onClose={handleModal}
        buttonLabel="Create"
        onSubmit={formik.handleSubmit}
        component={<AddSubscription translate={translate} formik={formik} />}
      />
      <Modal
        title="Edit Product"
        open={editmodal}
        translate={translate}
        onClose={handleEditModal}
        buttonLabel={t("Update")}
        onSubmit={edit_formik.handleSubmit}
        component={<EditSubscription editData={editData} editmodal={editmodal} formik={edit_formik} translate={translate} />}
      />
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        width="35%"
        delete={true}
        component={<DeleteModal handleClose={handleDeleteModal} handleDelete={handleDelete} translate={translate} />}
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3">
            <h1 className="text-2xl font-bold">{translate("Subscriptions")}</h1>
            <Button
              variant="outlined"
              label="Add Subscriptions"
              onClick={handleModal}
              translate={translate}
              startIcon={<AddIcon />}
            />
          </div>
          <ProductsTable
            headCells={ProductheadCells}
            translate={translate}
            data={productData}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
          />
        </div>
      </div>
    </>
  );
}
