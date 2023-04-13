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
  addRewardPointAction,
  addRewardPointFresh,
  getAllRewardPointAction,
  getAllRewardPointFresh,
  rewardPointNameEditAction,
  rewardPointNameEditFresh,
  rewardPointDeleteAction,
  rewardPointDeleteFresh,
} from "store/CRM/RewardPoints/actions"

import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { getAllSubscriptionTypeAction } from "store/actions"
import Select from "react-select"

function RewardPoint(props) {
  const [value, setValue] = useState("")
  const [modal, setModal] = useState(false)
  const [rewardPointId, setRewardPointId] = useState()
  const [rewardPointname, setRewardPointName] = useState()
  const [editModal, setEditModal] = useState(false)
  const [reload, setReload] = useState(false)

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)
  const handleDelete = () => {
    toggleDel()
    console.log(deleteItem)
    props.rewardPointDeleteAction(deleteItem)
  }

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    const val = uuidv4()
    console.log(val)
    props.addRewardPointAction(val, value, selectedSubType.value)
  }
  const handleEditRewardPointName = row => {
    console.log(row)
    setRewardPointId(row._id)
    setRewardPointName(row.name)
    toggleEditModal()
  }
  const handleRewardPointName = e => {
    setRewardPointName(e.target.value)
  }

  const handleEditModalSubmit = e => {
    e.preventDefault()
    toggleEditModal()
    console.log(rewardPointname)
    console.log(rewardPointId)
    props.rewardPointNameEditAction(rewardPointname, rewardPointId)
  }
  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }

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
    console.log(e)
    setSelectedSubType(e)
  }

  let branchDate = undefined
  if (props.get_all_subscription_type_data?.length > 0) {
    branchDate = props.get_all_subscription_type_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEditRewardPointName(row)}
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

  // const statusRef = (cell, row) => <Badge color="secondary" style={{ padding: "12px" }}>Deactivate</Badge>

  const statusRef = (cell, row) => (
    <Badge
      color={row.is_active ? "success" : "secondary"}
      style={{ padding: "12px" }}
    >
      {row.is_active ? "Active" : "Deactivate"}
    </Badge>
  )

  console.log(props.add_rewardPoint_loading)
  console.log(props.get_all_rewardPoint_data)
  console.log(props.rewardPoint_name_edit_loading)
  console.log(props.get_all_rewardPoint_loading)

  const activeData = [
    {
      dataField: "subscription_type.name",
      text: "Subscription Type",
      sort: true,
    },
    {
      dataField: "per_point_value",
      text: "Point Per Taka",
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
    console.log("=======hello", props.rewardPoint_name_edit_loading)
    if (props.get_all_rewardPoint_loading == false) {
      console.log("I am in get all reward point loading ")
      props.getAllRewardPointAction()
    }

    if (props.get_all_subscription_type_loading == false) {
      props.getAllSubscriptionTypeAction()
    }

    if (props.add_rewardPoint_loading === "Success") {
      toast.success("Reward Point Added Successfully")
      props.addRewardPointFresh()
    }

    if (props.add_rewardPoint_loading === "Failed") {
      toast.error("Something went wrong")
      props.addRewardPointFresh()
    }

    if (props.rewardPoint_name_edit_loading === "Success") {
      toast.success("Reward point Updated")
      props.rewardPointNameEditFresh()
    }

    if (props.rewardPoint_delete_loading === "Success") {
      console.log("I am in the delete")
      toast.success("Reward point Deleted")
      props.rewardPointDeleteFresh()
    }
  }, [
    props.add_rewardPoint_loading,
    props.rewardPoint_name_edit_loading,
    props.rewardPoint_delete_loading,
    props.get_all_subscription_type_loading,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="CRM"
            breadcrumbItem="Reward Point Settings"
          />
          {/* <Row className="d-flex flex-row-reverse" style={{ marginBottom: "20px", alignItems: "end" }}>
                        <Col className="col-12">
                            <Button color="danger" onClick={toggle}>
                                Add RewardPoint
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
                      Reward Point Settings{" "}
                    </CardTitle>
                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add
                    </Button>
                  </div>

                  {props.get_all_rewardPoint_data ? (
                    props.get_all_rewardPoint_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_rewardPoint_data}
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
          <ModalHeader toggle={toggle}>Add Reward Point</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Subscription Types
                </label>
                <Select
                  value={selectedSubType}
                  onChange={handleSelectSubType}
                  options={branchDate}
                  isMulti={false}
                />
              </Row>
              <div className="mb-3">
                <label className="col-md-2 col-form-label" htmlFor="username">
                  Value
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="username"
                  placeholder="Enter value"
                  required
                  value={value}
                  onChange={e => setValue(e.target.value)}
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

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader toggle={toggleEditModal}>
            Edit rewardPoint name
          </ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEditModalSubmit}>
              <Row className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Subscription Types
                </label>
                <Select
                  value={selectedSubType}
                  onChange={handleSelectSubType}
                  options={branchDate}
                  isMulti={false}
                />
              </Row>
              <div className="mb-3">
                <label className="col-md-2 col-form-label" htmlFor="username">
                  Value
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="username"
                  placeholder="Enter value"
                  required
                  value={value}
                  onChange={e => setValue(e.target.value)}
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
          <ModalFooter></ModalFooter>
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
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    add_rewardPoint_data,
    add_rewardPoint_error,
    add_rewardPoint_loading,

    get_all_rewardPoint_data,
    get_all_rewardPoint_error,
    get_all_rewardPoint_loading,

    rewardPoint_name_edit_loading,
    rewardPoint_delete_loading,
  } = state.RewardPoints

  const { get_all_subscription_type_loading, get_all_subscription_type_data } =
    state.SubscriptionTypes

  return {
    add_rewardPoint_data,
    add_rewardPoint_error,
    add_rewardPoint_loading,

    get_all_rewardPoint_data,
    get_all_rewardPoint_error,
    get_all_rewardPoint_loading,

    rewardPoint_name_edit_loading,
    rewardPoint_delete_loading,
    get_all_subscription_type_loading,
    get_all_subscription_type_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addRewardPointAction,
    addRewardPointFresh,
    getAllRewardPointAction,
    getAllRewardPointFresh,
    rewardPointNameEditAction,
    rewardPointNameEditFresh,
    rewardPointDeleteAction,
    rewardPointDeleteFresh,
    getAllSubscriptionTypeAction,
  })(RewardPoint)
)