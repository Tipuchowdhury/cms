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
;` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  addCouponAction,
  addCouponFresh,
  getAllCouponAction,
  getAllCouponFresh,
  couponDeleteAction,
  couponDeleteFresh,
  couponEditAction,
  couponEditFresh,
  couponStatusEditAction,
  couponStatusEditFresh,
} from "store/Coupon/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"

function Coupon(props) {
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [couponId, setCouponId] = useState()
  const [couponname, setCouponName] = useState()
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
    props.couponDeleteAction(deleteItem)
  }
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const toggle = () => setModal(!modal)
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    const val = uuidv4()
    // console.log(name)
    // console.log(val)
    props.addCouponAction(name, val)
  }

  const handleEdit = row => {
    navigate("/add-coupon", { state: row })
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
    props.couponStatusEditAction({
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

  // console.log(props.add_coupon_loading)
  // console.log(props.get_all_coupon_data)
  // console.log(props.coupon_name_edit_loading)
  // console.log(props.get_all_coupon_loading)

  const activeData = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "discount_in_amount",
      text: "Amount",
      sort: true,
    },
    {
      dataField: "discount_in_percent",
      text: "Amount (%)",
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
    // console.log("=======hello", props.coupon_name_edit_loading)
    if (props.get_all_coupon_loading == false) {
      //  console.log("I am in get all coupon loading ")
      props.getAllCouponAction()
    }

    if (props.add_coupon_loading === "Success") {
      toast.success("Coupon Added Successfully")
      props.addCouponFresh()
    }

    if (props.add_coupon_loading === "Failed") {
      toast.error("Something went wrong")
      props.addCouponFresh()
    }

    if (props.coupon_status_edit_loading === "Success") {
      toast.success("Status Updated")
      toggleStatus()
      props.couponStatusEditFresh()
    }

    if (props.coupon_delete_loading === "Success") {
      //  console.log("I am in the delete")
      toast.success("Coupon Deleted")
      props.couponDeleteFresh()
    }
  }, [
    props.add_coupon_loading,
    props.coupon_name_edit_loading,
    props.coupon_delete_loading,
    props.coupon_status_edit_loading,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Coupon"
            breadcrumbItem="Coupon"
          />
          {/* <Row className="d-flex flex-row-reverse" style={{ marginBottom: "20px", alignItems: "end" }}>
                        <Col className="col-12">
                            <Button color="danger" onClick={toggle}>
                                Add Coupon
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
                      Coupon{" "}
                    </CardTitle>
                    <Link to="/add-coupon">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Coupon
                      </Button>
                    </Link>
                  </div>

                  {props.get_all_coupon_data ? (
                    props.get_all_coupon_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_coupon_data}
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
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Coupon Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter coupon name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>{" "}
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

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
    add_coupon_data,
    add_coupon_error,
    add_coupon_loading,

    get_all_coupon_data,
    get_all_coupon_error,
    get_all_coupon_loading,
    coupon_delete_loading,
    coupon_edit_loading,
    coupon_status_edit_data,
    coupon_status_edit_loading,
  } = state.Coupon

  return {
    add_coupon_data,
    add_coupon_error,
    add_coupon_loading,

    get_all_coupon_data,
    get_all_coupon_error,
    get_all_coupon_loading,
    coupon_edit_loading,
    coupon_delete_loading,
    coupon_status_edit_data,
    coupon_status_edit_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addCouponAction,
    addCouponFresh,
    getAllCouponAction,
    getAllCouponFresh,
    couponDeleteAction,
    couponDeleteFresh,
    couponStatusEditAction,
    couponEditFresh,
    couponStatusEditFresh,
  })(Coupon)
)
