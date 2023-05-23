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
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link, useNavigate } from "react-router-dom"
import {
  getAllRestaurantMenuItemAction,
  getServerSidePaginationMenuAction,
  getServerSidePaginationMenuSearchAction,
  getServerSidePaginationSearchMenuFresh,
} from "store/actions"
import DataTable from "react-data-table-component"

function Menu(props) {
  const navigate = useNavigate()

  const [modalDel, setModalDel] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)

  const handleEdit = row => {
    navigate("/add-menu", { state: row })
  }

  const handleDelete = () => {
    toggleDel()
    console.log(deleteItem)
    props.cityDeleteAction(deleteItem)
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
        onClick={() => handleDelete(row)}
      >
        Delete
      </Button>{" "}
    </div>
  )

  const statusRef = (cell, row) => (
    <Badge color="success" style={{ padding: "8px" }}>
      Activate
    </Badge>
  )
  const textRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.name}</span>
  )
  const priceRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.price}</span>
  )

  const activeData = [
    {
      selector: row => row.name,
      name: "Title",
      sortable: true,
      cell: textRef,
    },
    {
      selector: row => row.price,
      name: "Price",
      sortable: true,
      cell: priceRef,
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
      props.getServerSidePaginationMenuSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchMenuFresh()
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
    if (props.get_all_menu_loading == false) {
      props.getAllRestaurantMenuItemAction()
    }
    props.getServerSidePaginationMenuAction(page, countPerPage)
  }, [props.get_all_menu_loading, page, countPerPage])

  console.log(props.get_all_menu_data)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Restaurant"
            breadcrumbItem="Manage Restaurant Menu"
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
                      Menu{" "}
                    </CardTitle>
                    <Link to="/add-menu">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Menu
                      </Button>
                    </Link>
                  </div>

                  {/* {props.get_all_menu_data ? (
                    props.get_all_menu_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_menu_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                        key={props.get_all_menu_data?._id}
                      />
                    ) : null
                  ) : null} */}
                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search Menu"
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
                      props.get_server_side_pagination_menu_search_data != null
                        ? props.get_server_side_pagination_menu_search_data
                            ?.data
                        : props?.get_server_side_pagination_menu_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_menu_search_data != null
                        ? props.get_server_side_pagination_menu_search_data
                            ?.count
                        : props.get_server_side_pagination_menu_data?.count
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
        {/* <Modal isOpen={modalDel} toggle={toggleDel} centered>
                    <ModalHeader className="text-center" style={{ textAlign: "center", margin: "0 auto" }}>
                        <div className="icon-box">
                            <i className="fa red-circle fa-trash" style={{ color: "red", fontSize: "40px" }}></i>
                        </div>
                        <h2>Are you sure?</h2>
                    </ModalHeader>
                    <ModalBody>Do you really want to delete these records? This process cannot be undone.</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleDel}>Cancel</Button>{' '}
                        <Button color="danger" onClick={handleDelete}>Delete</Button>
                    </ModalFooter>
                </Modal> */}
        {/* ============ delete modal ends=============== */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    get_all_menu_data,
    get_all_menu_error,
    get_all_menu_loading,
    get_server_side_pagination_menu_data,
    get_server_side_pagination_menu_search_data,
  } = state.Restaurant

  return {
    get_all_menu_data,
    get_all_menu_error,
    get_all_menu_loading,
    get_server_side_pagination_menu_data,
    get_server_side_pagination_menu_search_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllRestaurantMenuItemAction,
    getServerSidePaginationMenuAction,
    getServerSidePaginationMenuSearchAction,
    getServerSidePaginationSearchMenuFresh,
  })(Menu)
)
