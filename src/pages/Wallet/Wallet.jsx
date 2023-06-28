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
  getServerSidePaginationWalletAction,
  getServerSidePaginationWalletFresh,
  addCashInAction,
  addCashInFresh,
  addCashOutAction,
  addCashOutFresh,
  addAdjustmentAction,
  addAdjustmentFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import DataTable from "react-data-table-component"
import { toast } from "react-toastify"
import CustomLoader from "components/CustomLoader/CustomLoader"
import moment from "moment/moment"

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
      value: "Cash",
    },
    {
      label: "Bkash",
      value: "Bkash",
    },
    {
      label: "Nagad",
      value: "Nagad",
    },
    {
      label: "SSL",
      value: "SSL",
    },
    {
      label: "Upay",
      value: "Upay",
    },
  ]

  const [editInfo, setEditInfo] = useState({
    rider_id: "",
    payment_method: "",
    transaction_id: "",
    amount: 0,
    reason: "",
  })

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState([])
  const handlePaymentMethod = e => {
    //console.log(e.value);
    setEditInfo({ ...editInfo, payment_method: e.value })
    setSelectedPaymentMethod(e)
  }

  const handleCashIn = row => {
    setEditInfo({
      ...editInfo,
      rider_id: row.rider_id,
      payment_method: "",
      order_status: "",
      transaction_id: "",
      amount: 0,
      reason: "",
    })
    setSelectedPaymentMethod([])
    toggleCashInModal()
  }
  const handleCashOut = row => {
    setEditInfo({
      ...editInfo,
      rider_id: row.rider_id,
      payment_method: "",
      transaction_id: "",
      amount: 0,
      reason: "",
    })
    setSelectedPaymentMethod([])
    toggleCashOutModal()
  }
  const handleAdjustment = row => {
    setEditInfo({
      ...editInfo,
      rider_id: row.rider_id,
      payment_method: "",
      transaction_id: "",
      amount: 0,
      reason: "",
    })
    setSelectedPaymentMethod([])
    toggleAdjustmentModal()
  }
  const handleRiderWalletDetail = row => {
    navigate("/rider-wallet-details")
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
    props.addCashInAction(editInfo)
    //toggleCashInModal()
  }

  const cashOutSubmit = e => {
    e.preventDefault()
    console.log(editInfo)
    props.addCashOutAction(editInfo)
    //toggleCashOutModal()
  }

  const adjustmentSubmit = e => {
    e.preventDefault()
    console.log(editInfo)
    props.addAdjustmentAction(editInfo)
    //toggleAdjustmentModal()
  }

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const [pageFilters, setPageFilters] = useState({})
  const handleFilter = e => {
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  useEffect(() => {
    props.getServerSidePaginationWalletAction(page, countPerPage, pageFilters)
    if (props.get_server_side_pagination_wallet_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getServerSidePaginationWalletAction(page, countPerPage, pageFilters)
    }
  }, [
    page,
    countPerPage,
    pageFilters,
    props.get_server_side_pagination_wallet_loading,
  ])

  useEffect(() => {
    if (props.wallet_status_edit_loading === "Success") {
      toast.success("Wallet Status Updated")
      toggleStatus()
      props.getServerSidePaginationWalletFresh()
      props.walletStatusUpdateAction()
    }

    if (props.wallet_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      props.getServerSidePaginationWalletFresh()
      props.walletStatusUpdateAction()
    }
  }, [props.wallet_status_edit_loading])

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  console.log(props.get_server_side_pagination_wallet_data)

  const riderName = (cell, row) => (
    <Link to="/rider-wallet-details">
      <span
        style={{
          color: "#3333cc",
          fontWeight: "bold",
          textDecoration: "underline",
          textDecorationStyle: "dotted",
        }}
      >
        {cell.rider_name.toUpperCase()}
      </span>
    </Link>
  )
  const actionRef = (cell, row) => (
    <div>
      <Button
        color="info"
        className="btn btn-sm mb-2"
        onClick={() => handleCashIn(cell)}
      >
        Cash In
      </Button>{" "}
      <br />
      <Button
        color="success"
        className="btn btn-sm mb-2"
        onClick={() => handleCashOut(cell)}
      >
        Cash Out
      </Button>{" "}
      <br />
      <Button
        color="primary"
        className="btn btn-sm "
        onClick={() => handleAdjustment(cell)}
      >
        Adjustment
      </Button>
    </div>
  )

  const collectedAmount = (cell, row) => (
    <p className="mt-3">{parseFloat(cell.collected_amount).toFixed(2)} TK</p>
  )
  const cashInAmount = (cell, row) => (
    <p className="mt-3">{parseFloat(cell.cash_in).toFixed(2)} TK</p>
  )
  const cashOutAmount = (cell, row) => (
    <p className="mt-3">{parseFloat(cell.cash_out).toFixed(2)} TK</p>
  )
  const adjustmentAmount = (cell, row) => (
    <p className="mt-3">{parseFloat(cell.adjustment).toFixed(2)} TK</p>
  )
  const currentWalletAmount = (cell, row) => (
    <p className="mt-3">
      BDT {parseFloat(cell.current_wallet_amount).toFixed(2)}
    </p>
  )

  // const activeData = [
  //   // {
  //   //   dataField: "rider_name",
  //   //   text: "Rider name",
  //   //   sort: true,
  //   // },
  //   {
  //     dataField: "rider_name",
  //     text: "Rider name",
  //     sort: true,
  //     formatter: riderName,
  //   },
  //   {
  //     dataField: "date",
  //     text: "Date",
  //     sort: true,
  //   },
  //   {
  //     dataField: "vehicle_type_name",
  //     text: "Rider Type",
  //     sort: true,
  //   },
  //   {
  //     dataField: "total_order",
  //     text: "Total Order",
  //     sort: true,
  //   },
  //   {
  //     dataField: "collected_amount",
  //     text: "Collected amount",
  //     sort: true,
  //     formatter: collectedAmount,
  //   },
  //   {
  //     dataField: "cash_in",
  //     text: "Cash In",
  //     sort: true,
  //     formatter: cashInAmount,
  //   },
  //   {
  //     dataField: "cash_out",
  //     text: "Cash Out",
  //     sort: true,
  //     formatter: cashOutAmount,
  //   },
  //   {
  //     dataField: "adjustment",
  //     text: "Adjustment",
  //     sort: true,
  //     formatter: adjustmentAmount,
  //   },
  //   {
  //     dataField: "current_wallet_amount",
  //     text: "Current Wallet amount",
  //     sort: true,
  //     formatter: currentWalletAmount,
  //   },
  //   // {
  //   //   dataField: "",
  //   //   text: "Wallet Status",
  //   //   sort: true,
  //   //   formatter: statusRef,
  //   // },
  //   {
  //     text: "Action",
  //     sort: true,
  //     formatter: actionRef,
  //   },
  // ]

  const activeData = [
    // {
    //   dataField: "rider_name",
    //   text: "Rider name",
    //   sort: true,
    // },
    {
      selector: row => row.rider_name,
      name: "Rider name",
      sortable: true,
      cell: riderName,
    },
    {
      selector: row => row.date,
      name: "Date",
      sortable: true,
      cell: (cell, row) => (
        <div>
          <span>{moment(cell.date).format("DD-MM-YYYY")}</span>
          <br />
          <span>{moment(cell.date).format("hh:MM:SS A")}</span>
        </div>
      ),
    },
    {
      selector: row => row.rider_type,

      name: "Rider Type",
      sortable: true,
    },
    {
      selector: row => row.order_count,

      name: "Total Order",
      sortable: true,
    },
    {
      selector: row => row.collected_amount,

      name: "Collected amount",
      sortable: true,
      cell: collectedAmount,
    },
    {
      selector: row => row.cash_in,

      name: "Cash In",
      sortable: true,
      cell: cashInAmount,
    },
    {
      selector: row => row.cash_out,

      name: "Cash Out",
      sortable: true,
      cell: cashOutAmount,
    },
    {
      selector: row => row.adjustment,

      name: "Adjustment",
      sortable: true,
      cell: adjustmentAmount,
    },
    {
      selector: row => row.current_wallet_amount,

      name: "Current Wallet amount",
      sortable: true,
      cell: currentWalletAmount,
    },

    {
      name: "Action",
      cell: actionRef,
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

    if (props.add_cash_in_loading === "Success") {
      toast.success("Cash in Updated")
      toggleCashInModal()
      props.addCashInFresh()
    }

    if (props.add_cash_in_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.addCashInFresh()
    }

    if (props.add_cash_out_loading === "Success") {
      toast.success("Cash out Updated")
      toggleCashOutModal()
      props.addCashOutFresh()
    }

    if (props.add_cash_out_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.addCashOutFresh()
    }

    if (props.add_adjustment_loading === "Success") {
      toast.success("Adjustment Updated")
      toggleAdjustmentModal()
      props.addAdjustmentFresh()
    }

    if (props.add_adjustment_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.addAdjustmentFresh()
    }
  }, [
    props.add_cash_in_loading,
    props.add_cash_out_loading,
    props.add_adjustment_loading,
  ])

  // console.log(props.get_server_side_pagination_wallet_data)

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

                  {/* <div className="text-end">
                    <input
                      type="text"
                      name="quest_name"
                      placeholder="Search Quest"
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid gray",
                      }}
                      onChange={e => handleFilter(e)}
                    />
                  </div> */}

                  <form className="mt-1">
                    <Row>
                      <div className="mb-3 col-12 col-sm-6 col-md-3">
                        <label className="form-label" htmlFor="rider_name">
                          Rider Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="rider_name"
                          placeholder="Serach by rider name"
                          name="rider_name"
                          onChange={e => handleFilter(e)}
                          value={pageFilters.rider_name}
                        />
                      </div>
                      <div className="mb-3 col-12 col-sm-6 col-md-3">
                        <label className="form-label" htmlFor="from">
                          From
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="from"
                          name="from"
                          onChange={e => handleFilter(e)}
                          value={pageFilters.rider_name}
                        />
                      </div>
                      <div className="mb-3 col-12 col-sm-6 col-md-3">
                        <label className="form-label" htmlFor="to">
                          To
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="to"
                          name="to"
                          onChange={e => handleFilter(e)}
                          value={pageFilters.to}
                        />
                      </div>
                      <div className="mb-3 col-12 col-sm-6 col-md-3">
                        <label className="form-label" htmlFor="zone_name">
                          Zone Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zone_name"
                          placeholder="Serach by zone name"
                          name="zone_name"
                          onChange={e => handleFilter(e)}
                          value={pageFilters.zone_name}
                        />
                      </div>
                    </Row>
                  </form>

                  {/* {props.get_all_wallet_data ? (
                    props.get_all_wallet_data?.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_wallet_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                      />
                    ) : null
                  ) : null} */}

                  <DataTable
                    columns={activeData}
                    data={props?.get_server_side_pagination_wallet_data?.data}
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props?.get_server_side_pagination_wallet_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                    progressPending={
                      !props?.get_server_side_pagination_wallet_data
                    }
                    progressComponent={<CustomLoader />}
                  />
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
                <label className="form-label" htmlFor="payment_method">
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

              {selectedPaymentMethod?.value == "Bkash" ||
              selectedPaymentMethod?.value == "Nagad" ? (
                <div className="mb-3">
                  <label className="form-label" htmlFor="transaction_id">
                    Transaction ID <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="transaction_id"
                    placeholder="Enter transaction id"
                    name="transaction_id"
                    onChange={handleEditInputs}
                    value={editInfo.transaction_id}
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
                <label className="form-label" htmlFor="payment_method">
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

              {selectedPaymentMethod?.value == "Bkash" ||
              selectedPaymentMethod?.value == "Nagad" ? (
                <div className="mb-3">
                  <label className="form-label" htmlFor="transaction_id">
                    Transaction ID <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="transaction_id"
                    placeholder="Enter transaction id"
                    name="transaction_id"
                    onChange={handleEditInputs}
                    value={editInfo.transaction_id}
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
                <label className="form-label" htmlFor="payment_method">
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

              {selectedPaymentMethod?.value == "Bkash" ||
              selectedPaymentMethod?.value == "Nagad" ? (
                <div className="mb-3">
                  <label className="form-label" htmlFor="transaction_id">
                    Transaction ID <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="transaction_id"
                    placeholder="Enter transaction id"
                    name="transaction_id"
                    onChange={handleEditInputs}
                    value={editInfo.transaction_id}
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

    add_cash_in_data,
    add_cash_in_error,
    add_cash_in_loading,

    add_cash_out_data,
    add_cash_out_error,
    add_cash_out_loading,

    add_adjustment_data,
    add_adjustment_error,
    add_adjustment_loading,

    get_all_wallet_data,
    get_all_wallet_error,
    get_all_wallet_loading,

    wallet_edit_data,
    wallet_edit_loading,

    wallet_status_edit_data,
    wallet_status_edit_loading,

    wallet_delete_loading,

    get_server_side_pagination_wallet_data,
    get_server_side_pagination_wallet_loading,
  } = state.Wallet

  return {
    add_wallet_data,
    add_wallet_error,
    add_wallet_loading,

    add_cash_in_data,
    add_cash_in_error,
    add_cash_in_loading,

    add_cash_out_data,
    add_cash_out_error,
    add_cash_out_loading,

    add_adjustment_data,
    add_adjustment_error,
    add_adjustment_loading,

    get_all_wallet_data,
    get_all_wallet_error,
    get_all_wallet_loading,

    wallet_edit_data,
    wallet_edit_loading,

    wallet_status_edit_data,
    wallet_status_edit_loading,

    wallet_delete_loading,

    get_server_side_pagination_wallet_data,
    get_server_side_pagination_wallet_loading,
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
    getServerSidePaginationWalletAction,
    getServerSidePaginationWalletFresh,
    addCashInAction,
    addCashInFresh,
    addCashOutAction,
    addCashOutFresh,
    addAdjustmentAction,
    addAdjustmentFresh,
  })(Wallet)
)
