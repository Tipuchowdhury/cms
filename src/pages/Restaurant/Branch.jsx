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
  ; ` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  getAllBranchAction,
  branchStatusEditAction,
  editBranchStatusFresh,
  branchPopularEditAction,
  editBranchPopularFresh,
  branchDeleteAction,
  branchDeleteFresh,
  getServerSidePaginationBranchAction,
  getServerSidePaginationBranchSearchAction,
  getServerSidePaginationSearchBranchFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"

function Branch(props) {
  const [statusInfo, setStatusInfo] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [isPopular, setIsPopular] = useState(false)
  const [isPopularModal, setIsPopularModal] = useState(false)
  const togglePopularModal = () => setIsPopularModal(!isPopularModal)

  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)

  const handleDeleteModal = cell => {
    setDeleteItem(cell._id)
    toggleDel()
  }

  const handleDelete = () => {
    // toggleDel();
    console.log(deleteItem)
    props.branchDeleteAction(deleteItem)
  }

  const handleStatusModal = cell => {
    setStatusInfo(cell)

    toggleStatus()
  }

  const handlePopularModal = row => {
    setIsPopular(row)

    togglePopularModal()
  }

  const handleStatusUpdate = () => {
    props.branchStatusEditAction({
      ...statusInfo,
      is_active: !statusInfo.is_active,
    })
  }

  const handlePopularUpdate = () => {
    props.branchPopularEditAction({
      ...isPopular,
      is_popular: !isPopular.is_popular,
    })
  }

  const navigate = useNavigate()
  const handleEditBranch = cell => {
    console.log(cell)
    navigate("/branch-edit/" + cell._id, { state: cell })
  }

  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEditBranch(cell)}
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

  // const statusRef = (cell, row) => <Badge color="success" style={{ padding: "12px" }}>Activate</Badge>
  // const statusRef = (cell, row) => <Badge color={row.is_active ? "success" : "secondary"} style={{ padding: "12px" }}>{row.is_active ? "Active" : "Deactivate"}</Badge>

  const statusRef = (cell) => (
    <Button
      color={cell.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(cell)}
    >
      {cell.is_active ? "Active" : "Deactivate"}
    </Button>
  )

  const popularRef = (cell, row) => (
    <Button
      color={row.is_popular ? "info" : "warning"}
      className="btn waves-effect waves-light"
      onClick={() => handlePopularModal(cell)}
    >
      {cell.is_popular ? "Popular" : "Regular"}
    </Button>
  )
  const textRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.name}</span>
  )

  const activeData = [
    {
      selector: row => row.name,
      name: "Branch Name",
      sortable: true,
      cell: textRef,
    },
    {
      selector: row => row.is_active,
      name: "Status",
      sortable: true,
      cell: statusRef,
    },
    {
      selector: row => row.is_popular,
      name: "Popular/Regular",
      sortable: true,
      cell: popularRef,
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
      props.getServerSidePaginationBranchSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchBranchFresh()
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
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    props.getServerSidePaginationBranchAction(page, countPerPage)

    if (props.edit_branch_status_loading === "Success") {
      toast.success("Branch Status Updated Successfully")
      toggleStatus()
      props.editBranchStatusFresh()
    }

    if (props.edit_branch_status_loading === "Failed") {
      toast.error("Something went wrong")
      props.editBranchStatusFresh()
    }

    if (props.edit_branch_popular_loading === "Success") {
      toast.success("Branch Type Updated Successfully")
      togglePopularModal()
      props.editBranchPopularFresh()
    }

    if (props.edit_branch_popular_loading === "Failed") {
      toast.error("Something went wrong")
      props.editBranchPopularFresh()
    }

    if (props.branch_delete_loading === "Success") {
      toast.success("Branch Deleted Successfully")
      toggleDel()
      props.branchDeleteFresh()
    }
  }, [
    props.get_all_branch_loading,
    props.edit_branch_status_loading,
    props.edit_branch_popular_loading,
    props.branch_delete_loading,
    page,
    countPerPage,
  ])

  console.log(props.edit_branch_loading);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Branch"
            breadcrumbItem="Manage Branch"
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
                      Branch{" "}
                    </CardTitle>
                    <Link to="/branch-add">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Branch
                      </Button>
                    </Link>
                  </div>
                  {/* {props.get_all_branch_data ? props.get_all_branch_data.length > 0 ? <DatatableTablesWorking products={props.get_all_branch_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_branch_data?._id} /> : null : null} */}

                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search Branch"
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
                      props.get_server_side_pagination_branch_search_data !=
                        null
                        ? props.get_server_side_pagination_branch_search_data
                          ?.data
                        : props?.get_server_side_pagination_branch_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_branch_search_data !=
                        null
                        ? props.get_server_side_pagination_branch_search_data
                          ?.count
                        : props.get_server_side_pagination_branch_data?.count
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
            Do you want to {statusInfo.is_active ? "deactivate" : "activate"}{" "}
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

        {/* ============ status update modal starts=============== */}
        <Modal isOpen={isPopularModal} toggle={togglePopularModal} centered>
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
            Do you want to {isPopular.is_popular ? "regular" : "popular"} this
            record?{" "}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={togglePopularModal}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={handlePopularUpdate}>
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
    get_all_branch_loading,
    get_all_branch_data,
    edit_branch_status_loading,
    edit_branch_popular_loading,
    branch_delete_loading,

    get_server_side_pagination_branch_data,
    get_server_side_pagination_branch_search_data,
    edit_branch_loading
  } = state.Restaurant

  return {
    get_all_branch_loading,
    get_all_branch_data,
    edit_branch_status_loading,
    edit_branch_popular_loading,
    branch_delete_loading,

    get_server_side_pagination_branch_data,
    get_server_side_pagination_branch_search_data,
    edit_branch_loading
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    branchStatusEditAction,
    editBranchStatusFresh,
    branchPopularEditAction,
    editBranchPopularFresh,
    branchDeleteAction,
    branchDeleteFresh,
    getServerSidePaginationBranchAction,
    getServerSidePaginationBranchSearchAction,
    getServerSidePaginationSearchBranchFresh,
  })(Branch)
)
