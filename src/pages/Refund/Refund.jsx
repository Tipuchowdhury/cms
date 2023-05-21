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
  addRefundAction,
  addRefundFresh,
  getAllRefundAction,
  getAllRefundFresh,
  refundUpdateAction,
  refundUpdateFresh,
  refundDeleteAction,
  refundDeleteFresh,
  refundStatusUpdateAction,
  refundStatusUpdateFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { toast } from "react-toastify"

function Refund(props) {
  document.title = "Refunds | Foodi"

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
    refund_amount: 0.0,
    refund_reason: "",
    refund_status: false,
  })

  const handleEditRefund = row => {
    //console.log(row);

    setEditInfo(prevState => ({
      _id: row._id,
      refund_amount: row.order_total,
      refund_reason: row.refund_reason,
      refund_status: row.refund_status,
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
    props.refundUpdateAction(editInfo, pathEdit)

    //toggleEditModal();
  }

  console.log(props.get_all_refund_data)

  const actionRef = (cell, row) => (
    <Button
      color="primary"
      className="btn btn-sm btn-primary waves-effect waves-light"
      onClick={() => handleEditRefund(row)}
    >
      Refund
    </Button>
  )

  const statusRef = (cell, row) => (
    <Badge color={row.refund_status == true ? "success" : "secondary"}>
      {row.refund_status == true ? "Refunded" : "Not Refunded"}
    </Badge>
  )

  const activeData = [
    {
      dataField: "order_id",
      text: "Order ID",
      sort: true,
    },
    {
      dataField: "customer_name",
      text: "Customer Name",
      sort: true,
    },
    {
      dataField: "customer_mobile",
      text: "Customer Mobile",
      sort: true,
    },
    {
      dataField: "order_total",
      text: "Order Total",
      sort: true,
    },
    {
      dataField: "payment_method",
      text: "Payment Method",
      sort: true,
    },
    {
      dataField: "transaction_id",
      text: "Transaction ID",
      sort: true,
    },
    {
      dataField: "payment_id",
      text: "Payment ID",
      sort: true,
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
    },
    {
      dataField: "refund_amount",
      text: "Refund Amount",
      sort: true,
    },
    {
      dataField: "",
      text: "Refund Status",
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
    if (props.get_all_refund_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getAllRefundAction()
    }

    if (props.refund_edit_loading === "Success") {
      toast.success("Refund Updated")
      toggleEditModal()
      props.refundUpdateFresh()
    }

    if (props.refund_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.refundUpdateFresh()
    }
  }, [props.refund_edit_loading])

  // console.log(props.get_all_refund_data);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Refunds"
            breadcrumbItem="Refunds"
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
                      Refunds{" "}
                    </CardTitle>
                    {/* <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add Refund
                    </Button> */}
                  </div>

                  {props.get_all_refund_data ? (
                    props.get_all_refund_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_refund_data}
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
          <ModalHeader>Edit Refund</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEdit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="refund_amount">
                  Refund Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="refund_amount"
                  placeholder="Enter refund amount"
                  required
                  name="refund_amount"
                  onChange={handleEditInputs}
                  value={editInfo.refund_amount}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="refund_reason">
                  Refund Reason
                </label>
                <textarea
                  className="form-control"
                  name="refund_reason"
                  id="refund_reason"
                  cols="5"
                  rows="3"
                  onChange={handleEditInputs}
                  value={editInfo.refund_reason}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                {editInfo.refund_status == false ? (
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
    add_refund_data,
    add_refund_error,
    add_refund_loading,

    get_all_refund_data,
    get_all_refund_error,
    get_all_refund_loading,

    refund_edit_data,
    refund_edit_loading,

    refund_status_edit_data,
    refund_status_edit_loading,

    refund_delete_loading,
  } = state.Refunds

  return {
    add_refund_data,
    add_refund_error,
    add_refund_loading,

    get_all_refund_data,
    get_all_refund_error,
    get_all_refund_loading,

    refund_edit_data,
    refund_edit_loading,

    refund_status_edit_data,
    refund_status_edit_loading,

    refund_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addRefundAction,
    addRefundFresh,
    getAllRefundAction,
    getAllRefundFresh,
    refundUpdateAction,
    refundUpdateFresh,
    refundDeleteAction,
    refundDeleteFresh,
    refundStatusUpdateAction,
    refundStatusUpdateFresh,
  })(Refund)
)
