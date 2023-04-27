import React, { useState, useEffect } from "react"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
  ; ` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  addVoucherSettingAction,
  addVoucherSettingFresh,
  getAllVoucherSettingAction,
  getAllVoucherSettingFresh,
  voucherSettingDeleteAction,
  voucherSettingDeleteFresh,
  voucherSettingEditAction,
  voucherSettingEditFresh,
  voucherSettingStatusEditAction,
  voucherSettingStatusEditFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"

function VoucherSetting(props) {
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [voucherSettingId, setVoucherSettingId] = useState()
  const [voucherSettingName, setVoucherSettingName] = useState()
  const [editInfo, setEditInfo] = useState(false)
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)
  const handleDelete = () => {
    toggleDel()
    // console.log(deleteItem)
    props.voucherSettingDeleteAction(deleteItem)
  }
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const toggle = () => setModal(!modal)
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    const val = uuidv4()
    // console.log(name)
    // console.log(val)
    props.addVoucherSettingAction(name, val)
  }

  const handleEdit = row => {
    navigate("/add-voucher-settings", { state: row })
  }
  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }
  const handleStatusModal = row => {
    // console.log(row);
    setEditInfo(row)

    toggleStatus()
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo)
    props.voucherSettingStatusEditAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }
  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEdit(row)}
      >
        Edit
      </Button>{" "}
      <Button
        color="danger"
        className="btn btn-danger waves-effect waves-light"
        onClick={() => handleDeleteModal(row)}
      >
        Delete
      </Button>{" "}
    </div>
  )

  const statusRef = (cell, row) => (
    <Button
      color={row.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(row)}
    >
      {row.is_active ? "Active" : "Deactivate"}
    </Button>
  )

  // console.log(props.add_voucher_setting_loading)
  // console.log(props.get_all_voucher_setting_data)
  // console.log(props.voucher_setting_name_edit_loading)
  // console.log(props.get_all_voucher_setting_loading)

  const activeData = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "is_active",
      text: "Status",
      sort: true,
      formatter: statusRef,
    },
    {
      //dataField: "he",
      text: "Action",
      sort: true,
      formatter: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  useEffect(() => {
    // console.log("=======hello", props.voucher_setting_name_edit_loading)
    if (props.get_all_voucher_setting_loading == false) {
      //  console.log("I am in get all voucher_setting loading ")
      props.getAllVoucherSettingAction()
    }

    if (props.add_voucher_setting_loading === "Success") {
      toast.success("VoucherSetting Added Successfully")
      props.addVoucherSettingFresh()
    }

    if (props.add_voucher_setting_loading === "Failed") {
      toast.error("Something went wrong")
      props.addVoucherSettingFresh()
    }

    if (props.voucher_setting_status_edit_loading === "Success") {
      toast.success("Status Updated")
      toggleStatus()
      props.voucherSettingStatusEditFresh()
    }

    if (props.voucher_setting_delete_loading === "Success") {
      //  console.log("I am in the delete")
      toast.success("Voucher Setting Deleted")
      props.voucherSettingDeleteFresh()
    }
  }, [
    props.add_voucher_setting_loading,
    props.voucher_setting_name_edit_loading,
    props.voucher_setting_delete_loading,
    props.voucher_setting_status_edit_loading,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="CRM"
            breadcrumbItem="Voucher Setting"
          />
          {/* <Row className="d-flex flex-row-reverse" style={{ marginBottom: "20px", alignItems: "end" }}>
                        <Col className="col-12">
                            <Button color="danger" onClick={toggle}>
                                Add VoucherSetting
                            </Button>
                        </Col>
                    </Row> */}
          <Row>
            <Col className="col-12">
              <Card style={{ border: "none" }}>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "40px",
                      marginTop: "20px",
                      backgroundColor: "#1E417D",
                      padding: "15px",
                    }}
                  >
                    <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                      Voucher Setting{" "}
                    </CardTitle>
                    <Link to="/add-voucher-settings">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Voucher Setting
                      </Button>
                    </Link>
                  </div>

                  {props.get_all_voucher_setting_data ? (
                    props.get_all_voucher_setting_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_voucher_setting_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                      />
                    ) : null
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ delete modal starts=============== */}
        <Modal isOpen={modalDel} toggle={toggleDel} centered>
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <div className="icon-box">
              <i
                className="fa red-circle fa-trash"
                style={{ color: "red", fontSize: "40px" }}
              ></i>
            </div>
            <h2>Are you sure?</h2>
          </ModalHeader>
          <ModalBody>
            Do you really want to delete these records? This process cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleDel}>
              Cancel
            </Button>{" "}
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        {/* ============ delete modal ends=============== */}

        {/* ============ status update modal starts=============== */}
        <Modal isOpen={modalStatusUpdate} toggle={toggleStatus} centered>
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <div className="icon-box">
              <i
                className="fa fa-exclamation-circle"
                style={{ color: "#DCA218", fontSize: "40px" }}
              ></i>
            </div>
            Are you sure?
          </ModalHeader>
          <ModalBody>
            Do you want to {editInfo.is_active ? "deactivate" : "activate"} this
            record?{" "}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleStatus}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={handleStatusUpdate}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
        {/* ============ status update modal ends=============== */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    add_voucher_setting_data,
    add_voucher_setting_error,
    add_voucher_setting_loading,

    get_all_voucher_setting_data,
    get_all_voucher_setting_error,
    get_all_voucher_setting_loading,
    voucher_setting_delete_loading,
    voucher_setting_edit_loading,
    voucher_setting_status_edit_data,
    voucher_setting_status_edit_loading,
  } = state.VoucherSetting

  return {
    add_voucher_setting_data,
    add_voucher_setting_error,
    add_voucher_setting_loading,

    get_all_voucher_setting_data,
    get_all_voucher_setting_error,
    get_all_voucher_setting_loading,
    voucher_setting_edit_loading,
    voucher_setting_delete_loading,
    voucher_setting_status_edit_data,
    voucher_setting_status_edit_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addVoucherSettingAction,
    addVoucherSettingFresh,
    getAllVoucherSettingAction,
    getAllVoucherSettingFresh,
    voucherSettingDeleteAction,
    voucherSettingDeleteFresh,
    voucherSettingStatusEditAction,
    voucherSettingEditFresh,
    voucherSettingStatusEditFresh,
  })(VoucherSetting)
)
