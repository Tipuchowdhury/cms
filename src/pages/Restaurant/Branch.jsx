import React, { useState, useEffect } from "react"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import withRouter from "components/Common/withRouter"
import { connect } from "react-redux"
import {
  branchStatusEditAction,
  editBranchStatusFresh,
  branchPopularEditAction,
  editBranchPopularFresh,
  branchDeleteAction,
  branchDeleteFresh,
  getServerSidePaginationBranchAction,
  getServerSidePaginationBranchFresh,
  getBranchByIdFresh,
  getAllZoneAction,
  getSortablePopularBranchesByZoneIdAction,
  getSortablePopularBranchesByZoneIdActionFresh,
  updateSortablePopularBranchesAction,
  updateSortablePopularBranchesActionFresh,
} from "store/actions"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"
import CustomLoader from "components/CustomLoader/CustomLoader"
import Select from "react-select"
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc"
import PageLoader from "components/CustomLoader/PageLoader"

function Branch(props) {
  const [statusInfo, setStatusInfo] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [isPopular, setIsPopular] = useState(false)
  const [isPopularModal, setIsPopularModal] = useState(false)
  const togglePopularModal = () => setIsPopularModal(!isPopularModal)

  const [modalSort, setModalSort] = useState(false)

  const toggleSortModal = () => setModalSort(!modalSort)

  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }

  const handleDelete = () => {
    // toggleDel();
    console.log(deleteItem)
    props.branchDeleteAction(deleteItem)
  }

  const handleStatusModal = row => {
    setStatusInfo(row)

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

  const handleFilterKeyPress = event => {
    if (event.key === "Enter") {
      handleParamChange()
    }
  }

  const navigate = useNavigate()
  const handleEditBranch = row => {
    console.log(row)
    navigate("/branch-add", { state: row })
  }

  const actionRef = (cell, row) =>
    cell.isFilter ? (
      <Button
        color="primary"
        className="btn btn-sm btn-primary waves-effect waves-light"
        onClick={handleParamChange}
      >
        <span className="fa fa-search"></span> Filter
      </Button>
    ) : (
      <div style={{ display: "flex", gap: 10 }}>
        <Button
          color="primary"
          className="btn btn-sm btn-primary waves-effect waves-light"
          onClick={() => {
            props.getBranchByIdFresh()
            handleEditBranch(cell)
          }}
        >
          Edit
        </Button>{" "}
        <Button
          color="danger"
          className="btn btn-sm btn-danger waves-effect waves-light"
          onClick={() => handleDeleteModal(cell)}
        >
          Delete
        </Button>{" "}
      </div>
    )

  const statusRef = (cell, row) => {
    return cell.isFilter ? (
      <Input
        type="select"
        className="form-control input-sm w-50"
        name="is_active"
        value={pageFilters?.is_active}
        onChange={handleFilter}
      >
        <option value="">Choose...</option>
        <option value="true">Active</option>
        <option value="false">InActive</option>
      </Input>
    ) : (
      <Button
        color={cell.is_active ? "success" : "secondary"}
        className="btn  btn-sm waves-effect waves-light"
        onClick={() => handleStatusModal(cell)}
      >
        {cell.is_active ? "Active" : "Deactivate"}
      </Button>
    )
  }

  const popularRef = (cell, row) => {
    return cell.isFilter ? (
      <></>
    ) : (
      // <Input
      //   type="select"
      //   className="form-control input-sm"
      //   name="is_popular"
      //   value={pageFilters?.is_popular}
      //   onChange={handleFilter}
      // >
      //   <option value="">Choose...</option>
      //   <option value="true">Popular</option>
      //   <option value="false">Normal</option>
      // </Input>
      <Button
        color={cell.is_popular ? "info" : "warning"}
        className="btn btn-sm waves-effect waves-light"
        onClick={() => handlePopularModal(cell)}
      >
        {cell.is_popular ? "Popular" : "Regular"}
      </Button>
    )
  }

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(20)
  const [pageFilters, setPageFilters] = useState({
    name: "",
    restaurant_name: "",
    is_active: "",
    is_popular: "",
  })
  const [paramChange, setParamChange] = useState(false)

  const handleParamChange = () => {
    props.getServerSidePaginationBranchFresh()
    setParamChange(!paramChange)
  }

  const handleFilter = e => {
    console.log("e :", e)
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  useEffect(() => {
    props.getServerSidePaginationBranchAction(page, countPerPage, pageFilters)
  }, [
    page,
    countPerPage,
    paramChange,
    props.edit_branch_status_loading,
    props.edit_branch_popular_loading,
    // props.get_server_side_pagination_order_loading,
  ])
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  const columnFilerInputName = {
    name: {
      name: "name",
      placeholder: "Branch Name",
    },
    restaurant_name: {
      name: "restaurant_name",
      placeholder: "Restaurant Name",
    },
  }

  const columnFilterGeneral = (cell, row, field) => {
    return cell.isFilter ? (
      <input
        className="form-control"
        name={columnFilerInputName[field]?.name}
        placeholder={columnFilerInputName[field]?.placeholder}
        value={pageFilters[columnFilerInputName[field]?.name]}
        onChange={handleFilter}
        onKeyDown={handleFilterKeyPress}
      />
    ) : (
      <div>{cell[field]}</div>
    )
  }
  const activeData = [
    {
      name: "Branch Name",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "name"),
    },

    {
      name: "Restaurant",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "restaurant_name"),
    },
    {
      name: "Status",
      sortable: true,
      cell: statusRef,
    },
    {
      name: "Popular/Regular",
      sortable: true,
      cell: popularRef,
    },
    {
      //dataField: "hello",
      name: "Action",
      sortable: true,
      cell: actionRef,
    },
  ]

  const defaultSorted = [
    {
      dataField: "name",
      branch: "desc",
    },
  ]

  useEffect(() => {
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
    props.edit_branch_status_loading,
    props.edit_branch_popular_loading,
    props.branch_delete_loading,
  ])

  const customStyles = {
    // table: {
    //   style: {
    //     border: "1px solid gray",
    //     borderLeft: "0px",
    //   },
    // },
    // headCells: {
    //   style: {
    //     padding: "5px",
    //     borderLeft: "1px solid gray",
    //   },
    // },
    // cells: {
    //   style: {
    //     padding: "5px",
    //     borderLeft: "1px solid gray",
    //   },
    // },
  }

  const [zones, setZones] = useState(null)

  useEffect(() => {
    if (props.get_all_zone_loading === false) {
      props.getAllZoneAction()
    }
  }, [props.get_all_zone_loading])

  useEffect(() => {
    if (props.get_all_zone_data?.length > 0) {
      setZones(
        props.get_all_zone_data.map((item, key) => ({
          label: `${item.name}`,
          value: item._id,
        }))
      )
    }
  }, [props.get_all_zone_data])

  const [selectedZone, setSelectedZone] = useState(null)

  const handleSelectZone = e => {
    props.getSortablePopularBranchesByZoneIdActionFresh()
    setSelectedZone(e)
  }

  useEffect(() => {
    if (selectedZone) {
      props.getSortablePopularBranchesByZoneIdAction(selectedZone.value)
    }
  }, [selectedZone])

  const [zonePopularBranches, setZonePopularBranches] = useState(null)

  useEffect(() => {
    if (props.get_sortable_popular_branch_by_zone_id_data) {
      setZonePopularBranches(props.get_sortable_popular_branch_by_zone_id_data)
    }
  }, [props.get_sortable_popular_branch_by_zone_id_data])

  // Sortable Item Component
  const SortableItem = SortableElement(({ item, position }) => {
    const matchedData = props.get_sortable_popular_branch_by_zone_id_data.find(
      data => data._id === item._id
    )
    return (
      <ListGroupItem
        key={item._id}
        style={{
          cursor: "pointer",
          background: `${
            matchedData &&
            matchedData.popularity_sort_value !== item.popularity_sort_value
              ? "#DCA21888"
              : "none"
          }`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            {position}. {item.name}
          </span>
          <div>
            <span
              className={`${
                matchedData &&
                matchedData.popularity_sort_value !== item.popularity_sort_value
                  ? matchedData.popularity_sort_value -
                      item.popularity_sort_value >
                    0
                    ? "fa fa-arrow-up text-success"
                    : "fa fa-arrow-down text-danger"
                  : ""
              }`}
            ></span>
            {matchedData &&
            matchedData.popularity_sort_value !== item.popularity_sort_value
              ? Math.abs(
                  matchedData.popularity_sort_value - item.popularity_sort_value
                )
              : ""}
          </div>
        </div>
      </ListGroupItem>
    )
  })

  // Sortable List Component
  const SortableList = SortableContainer(({ items }) => (
    <ListGroup>
      {items.map((item, index) => {
        return (
          <SortableItem
            key={item._id}
            index={index}
            item={item}
            position={index + 1}
          />
        )
      })}
    </ListGroup>
  ))

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(zonePopularBranches, oldIndex, newIndex)

    // Update popularity_sort_value based on the new order
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      popularity_sort_value: index + 1,
    }))

    setZonePopularBranches(updatedItems)
  }

  const handleUpdatePopularSort = () => {
    if (zonePopularBranches) {
      props.updateSortablePopularBranchesAction(zonePopularBranches)
    }
  }

  useEffect(() => {
    if (props.update_sortable_popular_branch_loading === "Success") {
      props.updateSortablePopularBranchesActionFresh()
      toggleSortModal()
      toast.success("Updated Successfully")
      setSelectedZone(null)
      setZonePopularBranches(null)
    }

    if (props.update_sortable_popular_branch_loading === "Failed") {
      props.updateSortablePopularBranchesActionFresh()
      toast.error("Failed to update")
    }
  }, [props.update_sortable_popular_branch_loading])

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
              <Card style={{ bbranch: "none" }}>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      marginTop: "20px",
                      backgroundColor: "#1E417D",
                      padding: "10px",
                    }}
                  >
                    <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                      Branch{" "}
                    </CardTitle>

                    <div>
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                        className="btn btn-sm"
                        onClick={() => {
                          toggleSortModal()
                        }}
                      >
                        <span className="fa fa-sort"></span> Sort Popular
                        Branches
                      </Button>
                      <Link to="/branch-add">
                        <Button
                          style={{
                            backgroundColor: "#DCA218",
                            color: "#FFFFFF",
                          }}
                          className="btn btn-sm"
                          onClick={() => {
                            props.getBranchByIdFresh()
                          }}
                        >
                          Add Branch
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <DataTable
                    columns={activeData}
                    data={
                      props?.get_server_side_pagination_branch_data?.data
                        ? [
                            { isFilter: true },
                            ...props?.get_server_side_pagination_branch_data
                              ?.data,
                          ]
                        : ""
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_branch_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => {
                      props.getServerSidePaginationBranchFresh()
                      setPage(page)
                    }}
                    progressPending={
                      !props.get_server_side_pagination_branch_data
                    }
                    progressComponent={<CustomLoader />}
                    striped
                    stripedColor="#000"
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

        {/* ============ sort modal starts=============== */}
        <Modal isOpen={modalSort} toggle={toggleSortModal} centered>
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <h4>Sort Popular Branches</h4>
          </ModalHeader>
          <ModalBody>
            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Zone
              </label>
              <div className="col-md-10">
                <Select
                  //required
                  value={selectedZone}
                  onChange={handleSelectZone}
                  options={zones}
                  isMulti={false}
                />
              </div>
            </Row>
            {selectedZone && zonePopularBranches ? (
              !props.get_sortable_popular_branch_by_zone_id_loading ? (
                <PageLoader />
              ) : (
                <div>
                  <SortableList
                    items={zonePopularBranches}
                    onSortEnd={onSortEnd}
                    helperClass="moving-item"
                  />
                </div>
              )
            ) : (
              ""
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleSortModal}>
              Cancel
            </Button>{" "}
            <Button color="success" onClick={handleUpdatePopularSort}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
        {/* ============ sort modal ends=============== */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    edit_branch_status_loading,
    edit_branch_popular_loading,
    branch_delete_loading,

    get_all_zone_data,
    get_all_zone_error,
    get_all_zone_loading,
  } = state.Restaurant

  const {
    get_server_side_pagination_branch_data,
    get_server_side_pagination_branch_error,
    get_server_side_pagination_branch_loading,

    get_sortable_popular_branch_by_zone_id_data,
    get_sortable_popular_branch_by_zone_id_error,
    get_sortable_popular_branch_by_zone_id_loading,

    update_sortable_popular_branch_data,
    update_sortable_popular_branch_error,
    update_sortable_popular_branch_loading,
  } = state.Branch

  return {
    edit_branch_status_loading,
    edit_branch_popular_loading,
    branch_delete_loading,
    get_server_side_pagination_branch_data,
    get_server_side_pagination_branch_error,
    get_server_side_pagination_branch_loading,

    get_all_zone_data,
    get_all_zone_error,
    get_all_zone_loading,

    get_sortable_popular_branch_by_zone_id_data,
    get_sortable_popular_branch_by_zone_id_error,
    get_sortable_popular_branch_by_zone_id_loading,

    update_sortable_popular_branch_data,
    update_sortable_popular_branch_error,
    update_sortable_popular_branch_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    branchStatusEditAction,
    editBranchStatusFresh,
    branchPopularEditAction,
    editBranchPopularFresh,
    branchDeleteAction,
    branchDeleteFresh,
    getServerSidePaginationBranchAction,
    getServerSidePaginationBranchFresh,
    getBranchByIdFresh,
    getAllZoneAction,
    getSortablePopularBranchesByZoneIdAction,
    getSortablePopularBranchesByZoneIdActionFresh,
    updateSortablePopularBranchesAction,
    updateSortablePopularBranchesActionFresh,
  })(Branch)
)
