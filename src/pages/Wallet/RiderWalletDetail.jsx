import Breadcrumbs from "components/Common/Breadcrumb"
import withRouter from "components/Common/withRouter"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import { v4 as uuidv4 } from "uuid"
import {
  addRiderWalletDetailAction,
  addRiderWalletDetailFresh,
  getAllRiderWalletDetailAction,
  getAllRiderWalletDetailFresh,
  riderWalletDetailUpdateAction,
  riderWalletDetailUpdateFresh,
  riderWalletDetailDeleteAction,
  riderWalletDetailDeleteFresh,
  riderWalletDetailStatusUpdateAction,
  riderWalletDetailStatusUpdateFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { toast } from "react-toastify"

function RiderWalletDetail(props) {
  document.title = "Rider Wallet Details | Foodi"

  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [editInfo, setEditInfo] = useState({
    _id: "",
    rider_wallet_detail_amount: 0.0,
    rider_wallet_detail_reason: "",
    rider_wallet_detail_status: false,
  })

  const handleEditRiderWalletDetail = row => {
    //console.log(row);

    setEditInfo(prevState => ({
      _id: row._id,
      rider_wallet_detail_amount: row.order_total,
      rider_wallet_detail_reason: row.rider_wallet_detail_reason,
      rider_wallet_detail_status: row.rider_wallet_detail_status,
    }))

    toggleEditModal()
  }

  let name, value, checked

  const handleEditInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
  }

  const handleEdit = e => {
    e.preventDefault()
    props.riderWalletDetailUpdateAction(editInfo, pathEdit)

    //toggleEditModal();
  }

  console.log(props.get_all_rider_wallet_detail_data)

  //   const actionRef = (cell, row) => (
  //     <Button
  //       color="primary"
  //       className="btn btn-sm btn-primary waves-effect waves-light"
  //       onClick={() => handleEditRiderWalletDetail(row)}
  //     >
  //       RiderWalletDetail
  //     </Button>
  //   )

  //   const statusRef = (cell, row) => (
  //     <Badge color={row.rider_wallet_detail_status == true ? "success" : "secondary"}>
  //       {row.rider_wallet_detail_status == true ? "RiderWalletDetailed" : "Not RiderWalletDetailed"}
  //     </Badge>
  //   )

  const activeData = [
    {
      dataField: "rider_name",
      text: "Rider Name",
      sort: true,
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
    },
    {
      dataField: "zone",
      text: "Zone",
      sort: true,
    },
    {
      dataField: "order_number",
      text: "Order Number",
      sort: true,
    },
    {
      dataField: "total_restaurant_payable_amount",
      text: "Total Restaurant Payable Amount",
      sort: true,
    },
    {
      dataField: "total_customer_payable_amount",
      text: "Total Customer Payable Amount",
      sort: true,
    },
    {
      dataField: "rider_due_adjustment",
      text: "Total Delivered Orders",
      sort: true,
    },
    {
      dataField: "rider_current_wallet",
      text: "Rider Current Wallet",
      sort: true,
    },
    // {
    //   dataField: "",
    //   text: "RiderWalletDetail Status",
    //   sort: true,
    //   formatter: statusRef,
    // },
    // {
    //   //dataField: "he",
    //   text: "Action",
    //   sort: true,
    //   formatter: actionRef,
    // },
  ]
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  useEffect(() => {
    if (props.get_all_rider_wallet_detail_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getAllRiderWalletDetailAction()
    }

    if (props.rider_wallet_detail_edit_loading === "Success") {
      toast.success("RiderWalletDetail Updated")
      toggleEditModal()
      props.riderWalletDetailUpdateFresh()
    }

    if (props.rider_wallet_detail_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.riderWalletDetailUpdateFresh()
    }
  }, [props.rider_wallet_detail_edit_loading])

  // console.log(props.get_all_rider_wallet_detail_data);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Wallet"
            breadcrumbItem="Rider Wallet Details"
          />
          <Row>
            <Col className="col-12">
              <Card>
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
                      Rider Wallet Details{" "}
                    </CardTitle>
                    {/* <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add RiderWalletDetail
                    </Button> */}
                  </div>

                  {props.get_all_rider_wallet_detail_data ? (
                    props.get_all_rider_wallet_detail_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_rider_wallet_detail_data}
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

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader>Edit RiderWalletDetail</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEdit}>
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="rider_wallet_detail_amount"
                >
                  RiderWalletDetail Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="rider_wallet_detail_amount"
                  placeholder="Enter riderWalletDetail amount"
                  required
                  name="rider_wallet_detail_amount"
                  onChange={handleEditInputs}
                  value={editInfo.rider_wallet_detail_amount}
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="rider_wallet_detail_reason"
                >
                  RiderWalletDetail Reason
                </label>
                <textarea
                  className="form-control"
                  name="rider_wallet_detail_reason"
                  id="rider_wallet_detail_reason"
                  cols="5"
                  rows="3"
                  onChange={handleEditInputs}
                  value={editInfo.rider_wallet_detail_reason}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                {editInfo.rider_wallet_detail_status == false ? (
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  ""
                )}
                <Button color="secondary" onClick={toggleEditModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ edit modal ends=============== */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    add_rider_wallet_detail_data,
    add_rider_wallet_detail_error,
    add_rider_wallet_detail_loading,

    get_all_rider_wallet_detail_data,
    get_all_rider_wallet_detail_error,
    get_all_rider_wallet_detail_loading,

    rider_wallet_detail_edit_data,
    rider_wallet_detail_edit_loading,

    rider_wallet_detail_status_edit_data,
    rider_wallet_detail_status_edit_loading,

    rider_wallet_detail_delete_loading,
  } = state.RiderWalletDetail

  return {
    add_rider_wallet_detail_data,
    add_rider_wallet_detail_error,
    add_rider_wallet_detail_loading,

    get_all_rider_wallet_detail_data,
    get_all_rider_wallet_detail_error,
    get_all_rider_wallet_detail_loading,

    rider_wallet_detail_edit_data,
    rider_wallet_detail_edit_loading,

    rider_wallet_detail_status_edit_data,
    rider_wallet_detail_status_edit_loading,

    rider_wallet_detail_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addRiderWalletDetailAction,
    addRiderWalletDetailFresh,
    getAllRiderWalletDetailAction,
    getAllRiderWalletDetailFresh,
    riderWalletDetailUpdateAction,
    riderWalletDetailUpdateFresh,
    riderWalletDetailDeleteAction,
    riderWalletDetailDeleteFresh,
    riderWalletDetailStatusUpdateAction,
    riderWalletDetailStatusUpdateFresh,
  })(RiderWalletDetail)
)