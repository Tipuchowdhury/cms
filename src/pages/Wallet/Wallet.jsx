import Breadcrumbs from "components/Common/Breadcrumb"
import withRouter from "components/Common/withRouter"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Select from "react-select"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
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
  addWalletAction,
  addWalletFresh,
  getAllWalletAction,
  getAllWalletFresh,
  walletUpdateAction,
  walletUpdateFresh,
  walletDeleteAction,
  walletDeleteFresh,
  walletStatusUpdateAction,
  walletStatusUpdateFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { toast } from "react-toastify"

function Wallet(props) {
  document.title = "Wallet | Foodi"

  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [cashInModal, setCashInModal] = useState(false)
  const [cashOutModal, setCashOutModal] = useState(false)
  const [adjustmentModal, setAdjustmentModal] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggle = () => setModal(!modal)
  const toggleCashInModal = () => setCashInModal(!cashInModal)
  const toggleCashOutModal = () => setCashOutModal(!cashOutModal)
  const toggleAdjustmentModal = () => setAdjustmentModal(!adjustmentModal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const paymentMethods = [
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "Bkash",
      value: "bkash",
    },
    {
      label: "Nagad",
      value: "nagad",
    },
    {
      label: "SSL",
      value: "ssl",
    },
    {
      label: "Upay",
      value: "upay",
    },
  ]

  const [editInfo, setEditInfo] = useState({
    payment_method_id: "",
    trans_id: "",
    amount: 0,
    reason: "",
  })

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState([])
  const handlePaymentMethod = e => {
    //console.log(e.value);
    setEditInfo({ ...editInfo, payment_method_id: e.value })
    setSelectedPaymentMethod(e)
  }

  const handleCashIn = row => {
    setEditInfo({
      ...editInfo,
      payment_method_id: "",
      trans_id: "",
      amount: 0,
      reason: "",
    })
    setSelectedPaymentMethod([])
    toggleCashInModal()
  }
  const handleCashOut = row => {
    setEditInfo({
      ...editInfo,
      payment_method_id: "",
      trans_id: "",
      amount: 0,
      reason: "",
    })
    setSelectedPaymentMethod([])
    toggleCashOutModal()
  }
  const handleAdjustment = row => {
    setEditInfo({
      ...editInfo,
      payment_method_id: "",
      trans_id: "",
      amount: 0,
      reason: "",
    })
    setSelectedPaymentMethod([])
    toggleAdjustmentModal()
  }

  let name, value, checked

  const handleEditInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
  }

  const cashInSubmit = e => {
    e.preventDefault()
    console.log(editInfo)
    //props.walletUpdateAction(editInfo, pathEdit)
    toggleCashInModal()
  }

  const cashOutSubmit = e => {
    e.preventDefault()
    console.log(editInfo)
    //props.walletUpdateAction(editInfo, pathEdit)
    toggleCashOutModal()
  }

  const adjustmentSubmit = e => {
    e.preventDefault()
    console.log(editInfo)
    //props.walletUpdateAction(editInfo, pathEdit)
    toggleAdjustmentModal()
  }

  // console.log(props.get_all_wallet_data)

  const actionRef = (cell, row) => (
    <div>
      <Button
        color="info"
        className="btn btn-sm mb-2"
        onClick={() => handleCashIn(row)}
      >
        Cash In
      </Button>{" "}
      <br />
      <Button
        color="success"
        className="btn btn-sm mb-2"
        onClick={() => handleCashOut(row)}
      >
        Cash Out
      </Button>{" "}
      <br />
      <Button
        color="primary"
        className="btn btn-sm "
        onClick={() => handleAdjustment(row)}
      >
        Adjustment
      </Button>
    </div>
  )

  const collectedAmount = (cell, row) => (
    <p>{parseFloat(row.collected_amount).toFixed(2)} TK</p>
  )
  const cashInAmount = (cell, row) => (
    <p>{parseFloat(row.cash_in).toFixed(2)} TK</p>
  )
  const cashOutAmount = (cell, row) => (
    <p>{parseFloat(row.cash_out).toFixed(2)} TK</p>
  )
  const adjustmentAmount = (cell, row) => (
    <p>{parseFloat(row.adjustment).toFixed(2)} TK</p>
  )
  const currentWalletAmount = (cell, row) => (
    <p>BDT {parseFloat(row.current_wallet_amount).toFixed(2)}</p>
  )

  const activeData = [
    {
      dataField: "rider_name",
      text: "Rider name",
      sort: true,
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
    },
    {
      dataField: "vehicle_type_name",
      text: "Rider Type",
      sort: true,
    },
    {
      dataField: "total_order",
      text: "Total Order",
      sort: true,
    },
    {
      dataField: "collected_amount",
      text: "Collected amount",
      sort: true,
      formatter: collectedAmount,
    },
    {
      dataField: "cash_in",
      text: "Cash In",
      sort: true,
      formatter: cashInAmount,
    },
    {
      dataField: "cash_out",
      text: "Cash Out",
      sort: true,
      formatter: cashOutAmount,
    },
    {
      dataField: "adjustment",
      text: "Adjustment",
      sort: true,
      formatter: adjustmentAmount,
    },
    {
      dataField: "current_wallet_amount",
      text: "Current Wallet amount",
      sort: true,
      formatter: currentWalletAmount,
    },
    // {
    //   dataField: "",
    //   text: "Wallet Status",
    //   sort: true,
    //   formatter: statusRef,
    // },
    {
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
    if (props.get_all_wallet_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getAllWalletAction()
    }

    if (props.wallet_edit_loading === "Success") {
      toast.success("Wallet Updated")
      toggleEditModal()
      props.walletUpdateFresh()
    }

    if (props.wallet_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.walletUpdateFresh()
    }
  }, [props.wallet_edit_loading])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Wallet"
            breadcrumbItem="Wallet"
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
                      Wallet{" "}
                    </CardTitle>
                    {/* <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add Wallet
                    </Button> */}
                  </div>

                  {props.get_all_wallet_data ? (
                    props.get_all_wallet_data?.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_wallet_data}
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

        {/* ============ Cash In modal start=============== */}
        <Modal isOpen={cashInModal} toggle={toggleCashInModal} centered={true}>
          <ModalHeader>Cash In</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={cashInSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="payment_method_id">
                  Payment Method <span className="text-danger">*</span>
                </label>
                <Select
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethod}
                  options={paymentMethods}
                  isMulti={false}
                  required
                />
              </div>

              {selectedPaymentMethod?.val}

              {selectedPaymentMethod?.value == "bkash" ||
              selectedPaymentMethod?.value == "nagad" ? (
                <div className="mb-3">
                  <label className="form-label" htmlFor="trans_id">
                    Transaction ID <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="trans_id"
                    placeholder="Enter transaction id"
                    name="trans_id"
                    onChange={handleEditInputs}
                    value={editInfo.trans_id}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="mb-3">
                <label className="form-label" htmlFor="amount">
                  Amount <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="Enter Amount"
                  required
                  name="amount"
                  onChange={handleEditInputs}
                  value={editInfo.amount}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="reason">
                  Reason
                </label>
                <textarea
                  className="form-control"
                  name="reason"
                  id="reason"
                  cols="5"
                  rows="3"
                  onChange={handleEditInputs}
                  value={editInfo.reason}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="secondary" onClick={toggleCashInModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ Cash In modal ends=============== */}

        {/* ============ Cash Out modal start=============== */}
        <Modal
          isOpen={cashOutModal}
          toggle={toggleCashOutModal}
          centered={true}
        >
          <ModalHeader>Cash Out</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={cashOutSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="payment_method_id">
                  Payment Method <span className="text-danger">*</span>
                </label>
                <Select
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethod}
                  options={paymentMethods}
                  isMulti={false}
                  required
                />
              </div>

              {selectedPaymentMethod?.val}

              {selectedPaymentMethod?.value == "bkash" ||
              selectedPaymentMethod?.value == "nagad" ? (
                <div className="mb-3">
                  <label className="form-label" htmlFor="trans_id">
                    Transaction ID <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="trans_id"
                    placeholder="Enter transaction id"
                    name="trans_id"
                    onChange={handleEditInputs}
                    value={editInfo.trans_id}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="mb-3">
                <label className="form-label" htmlFor="amount">
                  Amount <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="Enter Amount"
                  required
                  name="amount"
                  onChange={handleEditInputs}
                  value={editInfo.amount}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="reason">
                  Reason
                </label>
                <textarea
                  className="form-control"
                  name="reason"
                  id="reason"
                  cols="5"
                  rows="3"
                  onChange={handleEditInputs}
                  value={editInfo.reason}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="secondary" onClick={toggleCashOutModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ Cash Out modal ends=============== */}

        {/* ============ Adjustment modal start=============== */}
        <Modal
          isOpen={adjustmentModal}
          toggle={toggleAdjustmentModal}
          centered={true}
        >
          <ModalHeader>Adjustment</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={adjustmentSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="payment_method_id">
                  Payment Method <span className="text-danger">*</span>
                </label>
                <Select
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethod}
                  options={paymentMethods}
                  isMulti={false}
                  required
                />
              </div>

              {selectedPaymentMethod?.val}

              {selectedPaymentMethod?.value == "bkash" ||
              selectedPaymentMethod?.value == "nagad" ? (
                <div className="mb-3">
                  <label className="form-label" htmlFor="trans_id">
                    Transaction ID <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="trans_id"
                    placeholder="Enter transaction id"
                    name="trans_id"
                    onChange={handleEditInputs}
                    value={editInfo.trans_id}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="mb-3">
                <label className="form-label" htmlFor="amount">
                  Amount <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  placeholder="Enter Amount"
                  required
                  name="amount"
                  onChange={handleEditInputs}
                  value={editInfo.amount}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="reason">
                  Reason
                </label>
                <textarea
                  className="form-control"
                  name="reason"
                  id="reason"
                  cols="5"
                  rows="3"
                  onChange={handleEditInputs}
                  value={editInfo.reason}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="secondary" onClick={toggleAdjustmentModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ Adjustment modal ends=============== */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    add_wallet_data,
    add_wallet_error,
    add_wallet_loading,

    get_all_wallet_data,
    get_all_wallet_error,
    get_all_wallet_loading,

    wallet_edit_data,
    wallet_edit_loading,

    wallet_status_edit_data,
    wallet_status_edit_loading,

    wallet_delete_loading,
  } = state.Wallet

  return {
    add_wallet_data,
    add_wallet_error,
    add_wallet_loading,

    get_all_wallet_data,
    get_all_wallet_error,
    get_all_wallet_loading,

    wallet_edit_data,
    wallet_edit_loading,

    wallet_status_edit_data,
    wallet_status_edit_loading,

    wallet_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addWalletAction,
    addWalletFresh,
    getAllWalletAction,
    getAllWalletFresh,
    walletUpdateAction,
    walletUpdateFresh,
    walletDeleteAction,
    walletDeleteFresh,
    walletStatusUpdateAction,
    walletStatusUpdateFresh,
  })(Wallet)
)
