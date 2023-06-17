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
  addVehicleTypeAction,
  addVehicleTypeFresh,
  getAllVehicleTypeAction,
  getAllVehicleTypeFresh,
  vehicleTypeEditAction,
  vehicleTypeEditFresh,
  vehicleTypeStatusEditAction,
  vehicleTypeStatusEditActionFresh,
  vehicleTypeDeleteAction,
  vehicleTypeDeleteFresh,
  getServerSidePaginationVehicleTypeAction,
  getServerSidePaginationVehicleTypeSearchAction,
  getServerSidePaginationSearchVehicleTypeFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import DataTable from "react-data-table-component"

function VehicleTypes(props) {
  document.title = "Vehicle Types | Foodi"

  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  // const [addImages, setAddImages] = useState({
  //     image: "",
  // })
  // const [editImages, setEditImages] = useState({
  //     image: "",
  // })

  const [addInfo, setAddInfo] = useState({
    type: "",
    commission: "",
    maximum_no_of_received_order_at_a_time: "",
    is_active: true,
  })

  const [editInfo, setEditInfo] = useState({
    _id: "",
    type: "",
    commission: "",
    maximum_no_of_received_order_at_a_time: "",
    is_active: true,
  })

  const handleEdit = cell => {
    setEditInfo(prevState => ({
      _id: cell._id,
      type: cell.type,
      commission: cell.commission,
      maximum_no_of_received_order_at_a_time:
        cell.maximum_no_of_received_order_at_a_time,
      is_active: cell.is_active,
    }))
    // setEditImages({ ...editImages, image: row.image })

    toggleEditModal()
  }

  const [deleteItem, setDeleteItem] = useState()

  let name, value, checked
  const handleAddInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setAddInfo({ ...addInfo, [name]: value })
  }

  // const handleAddFile = (e) => {
  //     name = e.target.name
  //     value = e.target.files[0]
  //     setAddInfo({ ...addInfo, [name]: value })
  //     const reader = new FileReader()

  //     reader.onload = () => {
  //         setAddImages({ ...addImages, [name]: reader.result })
  //     }

  //     reader.readAsDataURL(value)
  // }

  // const handleAddCheckBox = (e) => {
  //     name = e.target.name;
  //     checked = e.target.checked;
  //     setAddInfo({ ...addInfo, [name]: checked });
  // }

  const handleSubmit = e => {
    e.preventDefault()
    const id = uuidv4()
    props.addVehicleTypeAction(id, addInfo)
  }

  const handleEditInputs = e => {
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
  }

  // const handleEditFile = (e) => {

  //     name = e.target.name
  //     value = e.target.files[0]
  //     setEditInfo({ ...editInfo, [name]: value })
  //     const reader2 = new FileReader()

  //     reader2.onload = () => {
  //         setEditImages({ ...editImages, [name]: reader2.result })
  //     }

  //     reader2.readAsDataURL(value)
  // }

  // const handleEditCheckBox = (e) => {
  //     name = e.target.name;
  //     checked = e.target.checked;
  //     setEditInfo({ ...editInfo, [name]: checked });
  // }

  const handleEditSubmit = e => {
    e.preventDefault()
    props.vehicleTypeEditAction(editInfo)
  }

  const handleStatusModal = row => {
    setEditInfo(row)
    toggleStatus()
  }

  const handleStatusUpdate = () => {
    props.vehicleTypeStatusEditAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }

  const handleDeleteModal = cell => {
    setDeleteItem(cell._id)
    toggleDel()
  }

  const handleDelete = () => {
    props.vehicleTypeDeleteAction(deleteItem)
  }

  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEdit(cell)}
      >
        Edit
      </Button>{" "}
      <Button
        color="danger"
        className="btn btn-danger waves-effect waves-light"
        onClick={() => handleDeleteModal(cell)}
      >
        Delete
      </Button>{" "}
    </div>
  )

  const statusRef = (cell, row) => (
    <Button
      color={cell.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(cell)}
    >
      {cell.is_active ? "Active" : "Deactivate"}
    </Button>
  )
  const textRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.type}</span>
  )

  const activeData = [
    {
      selector: row => row.type,
      name: "Vehicle Type",
      sortable: true,
      cell: textRef,
    },

    {
      selector: row => "",
      name: "Status",
      sortable: true,
      cell: statusRef,
    },

    {
      selector: row => "",
      name: "Action",
      sortable: true,
      cell: actionRef,
    },
  ]
  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const handleFilter = e => {
    if (e.target.value?.length > 0) {
      props.getServerSidePaginationVehicleTypeSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchVehicleTypeFresh()
    }
  }
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  useEffect(() => {
    if (props.get_all_vehicle_type_loading == false) {
      // console.log("I am in get all slider loading ")
      props.getAllVehicleTypeAction()
    }

    props.getServerSidePaginationVehicleTypeAction(page, countPerPage)

    if (props.add_vehicle_type_loading === "Success") {
      toast.success("Vehicle Type Added Successfully")
      toggle()
      setAddInfo({
        ...addInfo,
        type: "",
        commission: "",
        maximum_no_of_received_order_at_a_time: "",
        is_active: true,
      })

      // setAddImages("");
      props.addVehicleTypeFresh()
    }

    if (props.add_vehicle_type_loading === "Failed") {
      toast.error("Something went wrong")
      props.addVehicleTypeFresh()
    }

    if (props.vehicle_type_edit_loading === "Success") {
      toast.success("Vehicle Type Updated")
      toggleEditModal()
      props.vehicleTypeEditFresh()
    }

    if (props.vehicle_type_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.vehicleTypeEditFresh()
    }

    if (props.edit_vehicle_type_status_loading === "Success") {
      toast.success("Vehicle Type Status Updated")
      toggleStatus()
      props.vehicleTypeStatusEditActionFresh()
    }

    if (props.edit_vehicle_type_status_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.vehicleTypeStatusEditActionFresh()
    }

    if (props.vehicle_type_delete_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("Vehicle Type Deleted")
      toggleDel()
      props.vehicleTypeDeleteFresh()
    }
  }, [
    props.add_vehicle_type_loading,
    props.vehicle_type_edit_loading,
    props.vehicle_type_delete_loading,
    props.edit_vehicle_type_status_loading,
    page,
    countPerPage,
  ])

  console.log(props.get_server_side_pagination_vehicle_type_data)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Users"
            breadcrumbItem="Vehicle Types"
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
                      Vehicle Types
                    </CardTitle>
                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add Vehicle Type
                    </Button>
                  </div>

                  {/* {props.get_all_vehicle_type_data ? (
                    props.get_all_vehicle_type_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_vehicle_type_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                        key={props.get_all_vehicle_type_data?._id}
                      />
                    ) : null
                  ) : null} */}

                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search Cuisine"
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid gray",
                      }}
                      onChange={e => handleFilter(e)}
                    />
                  </div>
                  <DataTable
                    columns={activeData}
                    data={
                      props.get_server_side_pagination_vehicle_type_search_data !=
                      null
                        ? props
                            .get_server_side_pagination_vehicle_type_search_data
                            ?.data
                        : props?.get_server_side_pagination_vehicle_type_data
                            ?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_vehicle_type_search_data !=
                      null
                        ? props
                            .get_server_side_pagination_vehicle_type_search_data
                            ?.count
                        : props.get_server_side_pagination_vehicle_type_data
                            ?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ create modal start=============== */}
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>New Vehicle Type</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="type">
                  Vehicle Type <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  placeholder="Enter vehicle type"
                  required
                  name="type"
                  value={addInfo.type}
                  onChange={handleAddInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="commission">
                  Commission
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="commission"
                  placeholder="Enter Commission"
                  min="0"
                  name="commission"
                  value={addInfo.commission}
                  onChange={handleAddInputs}
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="maximum_no_of_received_order_at_a_time"
                >
                  Minium no of received order at a time
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maximum_no_of_received_order_at_a_time"
                  placeholder="Enter minium no of received order at a time"
                  min="0"
                  name="maximum_no_of_received_order_at_a_time"
                  value={addInfo.maximum_no_of_received_order_at_a_time}
                  onChange={handleAddInputs}
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
        {/* ============ create modal end=============== */}

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader>Edit Vehicle Type</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="type">
                  Vehicle Type <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  placeholder="Enter vehicle type"
                  required
                  name="type"
                  value={editInfo.type}
                  onChange={handleEditInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="commission">
                  Commission
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="commission"
                  placeholder="Enter Commission"
                  min="0"
                  name="commission"
                  value={editInfo.commission}
                  onChange={handleEditInputs}
                />
              </div>

              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="maximum_no_of_received_order_at_a_time"
                >
                  Minium no of received order at a time
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="maximum_no_of_received_order_at_a_time"
                  placeholder="Enter minium no of received order at a time"
                  min="0"
                  name="maximum_no_of_received_order_at_a_time"
                  value={editInfo.maximum_no_of_received_order_at_a_time}
                  onChange={handleEditInputs}
                />
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="primary" type="submit">
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={toggleEditModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ edit modal ends=============== */}

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
            Are you sure?
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
    add_vehicle_type_data,
    add_vehicle_type_error,
    add_vehicle_type_loading,

    get_all_vehicle_type_data,
    get_all_vehicle_type_error,
    get_all_vehicle_type_loading,

    vehicle_type_edit_data,
    vehicle_type_edit_loading,

    edit_vehicle_type_status_loading,

    vehicle_type_delete_loading,

    get_server_side_pagination_vehicle_type_data,
    get_server_side_pagination_vehicle_type_search_data,
  } = state.VehicleType

  return {
    add_vehicle_type_data,
    add_vehicle_type_error,
    add_vehicle_type_loading,

    get_all_vehicle_type_data,
    get_all_vehicle_type_error,
    get_all_vehicle_type_loading,

    vehicle_type_edit_data,
    vehicle_type_edit_loading,

    edit_vehicle_type_status_loading,

    vehicle_type_delete_loading,

    get_server_side_pagination_vehicle_type_data,
    get_server_side_pagination_vehicle_type_search_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addVehicleTypeAction,
    addVehicleTypeFresh,
    getAllVehicleTypeAction,
    getAllVehicleTypeFresh,
    vehicleTypeEditAction,
    vehicleTypeEditFresh,
    vehicleTypeStatusEditAction,
    vehicleTypeStatusEditActionFresh,
    vehicleTypeDeleteAction,
    vehicleTypeDeleteFresh,
    getServerSidePaginationVehicleTypeAction,
    getServerSidePaginationVehicleTypeSearchAction,
    getServerSidePaginationSearchVehicleTypeFresh,
  })(VehicleTypes)
)
