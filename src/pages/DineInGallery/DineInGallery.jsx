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
import withRouter from "components/Common/withRouter"
;` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  getAllDineInCardAction,
  dineInCardDeleteAction,
  dineInCardDeleteFresh,
  dineInCardStatusEditAction,
  dineInCardStatusEditFresh,
  getDineInCardByIdActionFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link, useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"

function DineInGallery(props) {
  const navigate = useNavigate()
  const [statusItem, setStatusItem] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const handleStatusModal = cell => {
    //  console.log(row);
    setStatusItem(cell)
    toggleStatus()
  }

  const handleStatusUpdate = () => {
    props.dineInCardStatusEditAction({
      ...statusItem,
      is_active: !statusItem.is_active,
    })
  }

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)
  const handleDelete = () => {
    // toggleDel();
    props.dineInCardDeleteAction(deleteItem)
  }

  const handleEdit = cell => {
    // navigate("/category-addons-edit"){ state: cell })
    navigate("/edit-dine-in-gallery", { state: cell })
  }

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
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

  // const statusRef = (cell, row) => <Badge color="success" style={{ padding: "8px" }}>Activate</Badge>

  const statusRef = (cell, row) => (
    <Button
      color={row.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(row)}
    >
      {row.is_active ? "Active" : "Deactivate"}
    </Button>
  )

  const textRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.name}</span>
  )
  const activeData = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "",
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
    if (props.get_all_dine_in_card_loading == false) {
      props.getAllDineInCardAction()
      props.getDineInCardByIdActionFresh()
    }

    if (props.dine_in_card_delete_loading === "Success") {
      toast.success("Dine In Gallery Deleted Successfully")
      toggleDel()
      props.dineInCardDeleteFresh()
    }
    if (props.dine_in_card_status_edit_loading === "Success") {
      toast.success("Dine In Gallery Status Updated")
      toggleStatus()
      props.dineInCardStatusEditFresh()
    }

    if (props.dine_in_card_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      props.dineInCardStatusEditFresh()
    }
  }, [
    props.get_all_dine_in_card_loading,
    props.dine_in_card_delete_loading,
    props.dine_in_card_status_edit_loading,
  ])

  // console.log(props.get_all_addOns_category_data);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Dine In"
            breadcrumbItem="Dine In Gallery"
          />
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
                      Dine In Gallery{" "}
                    </CardTitle>
                    <Link to="/add-dine-in-gallery">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Dine In Gallery
                      </Button>
                    </Link>
                  </div>

                  {props.get_all_dine_in_card_data ? (
                    props.get_all_dine_in_card_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_dine_in_card_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                        key={props.get_all_dine_in_card_data?._id}
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
            Do you want to {statusItem.is_active ? "deactivate" : "activate"}{" "}
            this record?{" "}
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
    get_all_dine_in_card_data,
    get_all_dine_in_card_loading,
    dine_in_card_status_edit_data,
    dine_in_card_status_edit_loading,
    dine_in_card_delete_data,
    dine_in_card_delete_loading,
  } = state.dineInCard

  return {
    get_all_dine_in_card_data,
    get_all_dine_in_card_loading,
    dine_in_card_status_edit_data,
    dine_in_card_status_edit_loading,
    dine_in_card_delete_data,
    dine_in_card_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllDineInCardAction,
    dineInCardDeleteAction,
    dineInCardDeleteFresh,
    dineInCardStatusEditAction,
    dineInCardStatusEditFresh,
    getDineInCardByIdActionFresh,
  })(DineInGallery)
)
