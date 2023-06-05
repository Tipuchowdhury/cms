import React, { useEffect, useState } from "react"
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
import { ToastContainer, toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
// import AddQuest from "./AddQuest/AddQuest"
import {
  getAllQuestAction,
  questStatusEditAction,
  questStatusEditActionFresh,
  questDeleteAction,
  questDeleteFresh,
  getServerSidePaginationQuestAction,
  getServerSidePaginationQuestSearchAction,
  getServerSidePaginationQuestFresh,
  getQuestByIdFresh,
} from "store/actions"
import withRouter from "components/Common/withRouter"
import { connect } from "react-redux"
import DataTable from "react-data-table-component"
import moment from "moment"
import CustomLoader from "components/CustomLoader/CustomLoader"

function Quest(props) {
  const [modalDel, setModalDel] = useState(false)
  const [editInfo, setEditInfo] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const [deleteItem, setDeleteItem] = useState()

  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)
  const toggleDel = () => setModalDel(!modalDel)

  const handleStatusModal = row => {
    setEditInfo(row)

    toggleStatus()
  }

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }

  const handleStatusUpdate = () => {
    props.questStatusEditAction({
      _id: editInfo._id,
      is_active: !editInfo.is_active,
    })
  }
  const navigate = useNavigate()
  const handleEdit = (row, cell) => {
    props.getQuestByIdFresh()

    navigate("/edit-quest", { state: cell })
  }

  const handleDelete = () => {
    // console.log(deleteItem)
    props.questDeleteAction(deleteItem)
    // toggleDel();
  }
  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEdit(row, cell)}
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
    <span style={{ fontSize: "16px" }}>{cell.name}</span>
  )
  const activeData = [
    {
      selector: row => row.name,
      name: "Name",
      sortable: true,
      cell: textRef,
    },
    {
      // selector: row => row.name,
      name: "Start Date",
      sortable: true,
      cell: (cell, row) => (
        <div>
          <span>{moment(cell.start_date).format("DD-MM-YYYY")}</span>
          <br />
          <span>{moment(cell.start_date).format("hh:MM:SS A")}</span>
        </div>
      ),
    },
    {
      // selector: row => row.name,
      name: "End Date",
      sortable: true,
      cell: (cell, row) => (
        <div>
          <span>{moment(cell.end_date).format("DD-MM-YYYY")}</span>
          <br />
          <span>{moment(cell.end_date).format("hh:MM:SS A")}</span>
        </div>
      ),
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
  const [pageFilters, setPageFilters] = useState({})
  const handleFilter = e => {
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  useEffect(() => {
    props.getServerSidePaginationQuestAction(page, countPerPage, pageFilters)
  }, [
    page,
    countPerPage,
    pageFilters,
    props.get_server_side_pagination_quest_loading,
  ])

  useEffect(() => {
    if (props.quest_status_edit_loading === "Success") {
      toast.success("Quest Status Updated")
      toggleStatus()
      props.getServerSidePaginationQuestFresh()
      props.questStatusEditActionFresh()
    }

    if (props.quest_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      props.getServerSidePaginationQuestFresh()
      props.questStatusEditActionFresh()
    }
  }, [props.quest_status_edit_loading])

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  useEffect(() => {
    // props.getServerSidePaginationQuestAction(page, countPerPage)

    if (props.quest_delete_loading == "Success") {
      toast.success("Quest Deleted Successfully")
      toggleDel()
      props.questDeleteFresh()
    }
    if (props.quest_delete_loading == "Failed") {
      toast.error("Something went wrong")
      // toggleStatus();
      props.questDeleteFresh()
    }
  }, [
    props.quest_delete_loading,
    // props.get_server_side_pagination_quest_loading,
    // page,
    // countPerPage,
  ])

  // console.log(props.get_all_quest_data)
  // console.log(page)
  // console.log(props.get_server_side_pagination_quest_data)
  // console.log(props.get_server_side_pagination_quest_search_data)
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs maintitle="Foodi" title="Quest" breadcrumbItem="Quest" />

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
                      Quest{" "}
                    </CardTitle>
                    <Link to="/add-quest">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                        onClick={() => {
                          props.getQuestByIdFresh()
                        }}
                      >
                        Add Quest
                      </Button>
                    </Link>
                  </div>
                  <div className="text-end">
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
                  </div>
                  <DataTable
                    columns={activeData}
                    data={props?.get_server_side_pagination_quest_data?.data}
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_quest_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                    progressPending={
                      !props?.get_server_side_pagination_quest_data
                    }
                    progressComponent={<CustomLoader />}
                  />
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

//export default Quest

const mapStateToProps = state => {
  const {
    quest_delete_loading,
    get_server_side_pagination_quest_data,
    get_server_side_pagination_quest_loading,
    quest_status_edit_loading,
  } = state.Quest
  return {
    quest_delete_loading,
    get_server_side_pagination_quest_data,
    get_server_side_pagination_quest_loading,
    quest_status_edit_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllQuestAction,
    questStatusEditAction,
    questStatusEditActionFresh,
    questDeleteAction,
    questDeleteFresh,
    getServerSidePaginationQuestAction,
    getServerSidePaginationQuestSearchAction,
    getServerSidePaginationQuestFresh,
    getQuestByIdFresh,
  })(Quest)
)
