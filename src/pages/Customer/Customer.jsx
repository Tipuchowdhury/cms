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
  getAllSubscriptionTypeAction,
  addCustomerAction,
  addCustomerFresh,
  getAllCustomerAction,
  getAllCustomerFresh,
  customerEditAction,
  customerEditFresh,
  customerStatusEditAction,
  customerStatusEditActionFresh,
  customerDeleteAction,
  customerDeleteFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Select from "react-select"

function Customer(props) {
  document.title = "Customer | Foodi"

  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [addImages, setAddImages] = useState({
    image: "",
  })
  const [editImages, setEditImages] = useState({
    image: "",
  })

  const [addInfo, setAddInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    image: "",
    is_active: true,
  })

  const [selectedSubscription, setSelectedSubscription] = useState([])
  const handleSelectSubscription = e => {
    var new_data = [e]
    //console.log(new_data)
    setSelectedSubscription(new_data)
  }

  const [editInfo, setEditInfo] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    image: "",
    is_active: true,
  })

  const handleEdit = row => {
    setEditInfo(prevState => ({
      _id: row._id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      mobile: row.mobile,
      image: row.image,
      is_active: row.is_active,
    }))
    setEditImages({ ...editImages, image: row.image })

    const new_array = [
      {
        sub_id: row.subscription_type_id,
      },
    ]
    editSubscriptionType(new_array)

    toggleEditModal()
  }

  const editSubscriptionType = subscription_type => {
    const common_subs = props?.get_all_subscription_type_data?.filter(elem =>
      subscription_type?.find(({ sub_id }) => elem._id === sub_id)
    )

    const subs_data_edit = common_subs
      ? common_subs.map((item, key) => {
          return { label: item.name, value: item._id }
        })
      : ""
    setSelectedSubscription(subs_data_edit)
  }

  // console.log(selectedSubscription);

  const [deleteItem, setDeleteItem] = useState()

  const common_sub_type = props?.get_all_subscription_type_data?.filter(elem =>
    location?.state?.sub_type?.find(({ branch_id }) => elem._id === branch_id)
  )

  const sub_type_data_edit = common_sub_type
    ? common_sub_type?.map((item, key) => {
        return { label: item.name, value: item._id }
      })
    : ""
  //select multiple branch
  const [selectedSubType, setSelectedSubType] = useState(
    sub_type_data_edit ? sub_type_data_edit : ""
  )
  const handleSelectSubType = e => {
    setSelectedSubType(e)
  }

  let branchDate = undefined
  if (props.get_all_subscription_type_data?.length > 0) {
    branchDate = props.get_all_subscription_type_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  let name, value, checked
  const handleAddInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setAddInfo({ ...addInfo, [name]: value })
  }

  const handleAddFile = e => {
    // setAddInfo({
    //     ...addInfo,
    //     image: e.target.value,
    // });
    name = e.target.name
    value = e.target.files[0]
    setAddInfo({ ...addInfo, [name]: value })
    const reader = new FileReader()

    reader.onload = () => {
      setAddImages({ ...addImages, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  const handleAddCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setAddInfo({ ...addInfo, [name]: checked })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const id = uuidv4()
    props.addCustomerAction(id, addInfo, selectedSubType.value)
  }

  const handleEditInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
  }

  const handleEditFile = e => {
    // setEditInfo({
    //     ...editInfo,
    //     image: e.target.value,
    // });

    name = e.target.name
    value = e.target.files[0]
    setEditInfo({ ...editInfo, [name]: value })
    const reader2 = new FileReader()

    reader2.onload = () => {
      setEditImages({ ...editImages, [name]: reader2.result })
    }

    reader2.readAsDataURL(value)
  }

  const handleEditCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setEditInfo({ ...editInfo, [name]: checked })
  }

  const handleEditSubmit = e => {
    e.preventDefault()
    // console.log(selectedSubscription);
    props.customerEditAction(editInfo, selectedSubscription[0].value)
  }

  const handleStatusModal = row => {
    setEditInfo(row)
    toggleStatus()
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo);
    props.customerStatusEditAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }
  const handleDelete = () => {
    props.customerDeleteAction(deleteItem)
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

  const activeData = [
    {
      dataField: "firstName",
      text: "First Name",
      sort: true,
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "mobile",
      text: "Mobile",
      sort: true,
    },
    {
      dataField: "",
      text: "Status",
      sort: true,
      formatter: statusRef,
    },

    {
      //dataField: "hello",
      text: "Action",
      sort: true,
      formatter: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "firstName",
      order: "desc",
    },
  ]

  useEffect(() => {
    if (props.get_all_subscription_type_loading == false) {
      props.getAllSubscriptionTypeAction()
    }

    if (props.get_all_customer_loading == false) {
      props.getAllCustomerAction()
    }

    if (props.add_customer_loading === "Success") {
      toast.success("Customer Added Successfully")
      toggle()
      setAddInfo({
        ...addInfo,
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        image: "",
        subscription_type_id: "",
        is_active: true,
      })

      setAddImages("")
      setSelectedSubType([])
      props.addCustomerFresh()
    }

    if (props.add_customer_loading === "Failed") {
      toast.error("Something went wrong")
      props.addCustomerFresh()
    }

    if (props.customer_edit_loading === "Success") {
      toast.success("Customer Updated")
      toggleEditModal()
      props.customerEditFresh()
    }

    if (props.customer_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.customerEditFresh()
    }

    if (props.edit_cutomer_status_loading === "Success") {
      toast.success("Customer Status Updated")
      toggleStatus()
      props.customerStatusEditActionFresh()
    }

    if (props.edit_cutomer_status_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.customerStatusEditActionFresh()
    }

    if (props.customer_delete_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("Customer Deleted")
      toggleDel()
      props.customerDeleteFresh()
    }
  }, [
    props.get_all_subscription_type_loading,
    props.add_customer_loading,
    props.customer_edit_loading,
    props.customer_delete_loading,
    props.edit_cutomer_status_loading,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Users"
            breadcrumbItem="Customers"
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
                      Customers
                    </CardTitle>
                    {/* <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Customer
                                        </Button> */}
                  </div>

                  {props.get_all_customer_data ? (
                    props.get_all_customer_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_customer_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                        key={props.get_all_customer_data?._id}
                      />
                    ) : null
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ create modal start=============== */}
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>New PopUp Banner</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  required
                  name="firstName"
                  value={addInfo.firstName}
                  onChange={handleAddInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter last name"
                  required
                  name="lastName"
                  value={addInfo.lastName}
                  onChange={handleAddInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  required
                  name="email"
                  value={addInfo.email}
                  onChange={handleAddInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="mobile">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter mobile"
                  required
                  name="mobile"
                  value={addInfo.mobile}
                  onChange={handleAddInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleAddFile}
                />
              </div>

              {addImages?.image && (
                <Row className="mb-3">
                  <label className="col-md-2">
                    <span></span>
                  </label>
                  <div className="col-md-10">
                    <img
                      src={addImages.image}
                      alt="preview"
                      style={{ width: "50%" }}
                    />
                  </div>
                </Row>
              )}

              <div className="mb-3">
                <label className="form-label" htmlFor="subscription_type_id">
                  Subscription Types
                </label>
                <Select
                  value={selectedSubType}
                  onChange={handleSelectSubType}
                  options={branchDate}
                  isMulti={false}
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
          <ModalHeader>Edit PopUp Banner</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  required
                  name="firstName"
                  value={editInfo.firstName}
                  onChange={handleEditInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter last name"
                  required
                  name="lastName"
                  value={editInfo.lastName}
                  onChange={handleEditInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  required
                  name="email"
                  value={editInfo.email}
                  onChange={handleEditInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="mobile">
                  Mobile
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter mobile"
                  required
                  name="mobile"
                  value={editInfo.mobile}
                  onChange={handleEditInputs}
                />
              </div>

              {/* <div className="mb-3">
                                <label className="form-label" htmlFor="image">Image</label>
                                <input type="file" className="form-control" id="image" name="image" onChange={handleEditFile} />
                            </div>

                            {editImages?.image && (
                                <Row className="mb-3">
                                    <label className="col-md-2">
                                        <span></span>
                                    </label>
                                    <div className="col-md-10">
                                        <img
                                            src={editImages.image}
                                            alt="preview"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                </Row>
                            )} */}

              <div className="mb-3">
                <label className="form-label" htmlFor="subscription_type_id">
                  Subscription Types
                </label>

                <Select
                  value={selectedSubscription}
                  onChange={handleSelectSubscription}
                  options={branchDate}
                  isMulti={false}
                />
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                {/* <Button color="primary" type="submit">
                                    Submit
                                </Button>{' '} */}
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
            Do you really want to update status these records?{" "}
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
  const { get_all_subscription_type_loading, get_all_subscription_type_data } =
    state.SubscriptionTypes

  const {
    add_customer_data,
    add_customer_error,
    add_customer_loading,

    get_all_customer_data,
    get_all_customer_error,
    get_all_customer_loading,

    customer_edit_data,
    customer_edit_loading,

    edit_cutomer_status_loading,

    customer_delete_loading,
  } = state.Customer

  return {
    get_all_subscription_type_loading,
    get_all_subscription_type_data,

    add_customer_data,
    add_customer_error,
    add_customer_loading,

    get_all_customer_data,
    get_all_customer_error,
    get_all_customer_loading,

    customer_edit_data,
    customer_edit_loading,

    edit_cutomer_status_loading,

    customer_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllSubscriptionTypeAction,
    addCustomerAction,
    addCustomerFresh,
    getAllCustomerAction,
    getAllCustomerFresh,
    customerEditAction,
    customerEditFresh,
    customerStatusEditAction,
    customerStatusEditActionFresh,
    customerDeleteAction,
    customerDeleteFresh,
  })(Customer)
)
