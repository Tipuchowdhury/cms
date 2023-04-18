
import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { getAllAddOnsCategoryAction, addOnCategoryDeleteAction, addOnCategoryDeleteFresh } from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link, useNavigate } from 'react-router-dom';

function AddOnsCategory(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [modal, setModal] = useState(false);
    const [restaurantId, setId] = useState();
    const [restaurantName, setRestaurantName] = useState();
    const [editModal, setEditModal] = useState(false);

    // delete modal
    const [deleteItem, setDeleteItem] = useState()
    const [modalDel, setModalDel] = useState(false);

    const toggleDel = () => setModalDel(!modalDel);
    const handleDelete = () => {
        // toggleDel();
        console.log(deleteItem)
        props.addOnCategoryDeleteAction(deleteItem);
    }

    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const handleSubmit = (e) => {
        e.preventDefault();
        toggle();
        const val = uuidv4();
        console.log(name)
        console.log(val);
        props.restaurantAddAction(name, val);
        setName("")
    }
    const handleEdit = (row) => {
        console.log(row);
        navigate("/category-addons", { state: row })
    }

    const handleNameChange = (e) => {
        setRestaurantName(e.target.value);
    }

    const handleEditModalSubmit = (e) => {
        e.preventDefault();
        toggleEditModal();
        console.log(restaurantName)
        console.log(restaurantId);
        props.restaurantNameUpdateAction(restaurantName, restaurantId)
    }
    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const actionRef = (cell, row) =>
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



    const statusRef = (cell, row) => <Badge color="success" style={{ padding: "8px" }}>Activate</Badge>


    const activeData = [

        {
            dataField: "name",
            text: "Name",
            sort: true,
        },
        {
            dataField: "",
            text: "Status",
            sort: true,
            formatter: statusRef
        },
        {
            dataField: "hello",
            text: "Action",
            sort: true,
            formatter: actionRef,
        },

    ];
    const defaultSorted = [
        {
            dataField: "name",
            order: "desc"
        }
    ];


    useEffect(() => {
        if (props.get_all_addOns_category_loading == false) {
            props.getAllAddOnsCategoryAction();
        }

        if (props.add_on_category_delete_loading === "Success") {
            toast.success("ADD on Category Deleted Successfully");
            toggleDel();
            props.addOnCategoryDeleteFresh();
        }

    }, [props.get_all_addOns_category_loading, props.add_on_category_delete_loading]);

    console.log(props.get_all_addOns_category_data);
    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Restaurant" breadcrumbItem="Add-ons Category" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Add-ons Category </CardTitle>
                                        <Link to="/category-addons">
                                            <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}>
                                                Add
                                            </Button>
                                        </Link>

                                    </div>

                                    {props.get_all_addOns_category_data ? props.get_all_addOns_category_data.length > 0 ? <DatatableTablesWorking products={props.get_all_addOns_category_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_addOns_category_data?._id} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>Add Restaurant</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="username">Restaurant Name</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter city name" required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>{' '}
                                <Button color="primary" type='submit'>
                                    Submit
                                </Button>

                            </div>

                        </form>
                    </ModalBody>
                </Modal>



                {/* ============ delete modal starts=============== */}
                <Modal isOpen={modalDel} toggle={toggleDel} centered>
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
                </Modal>
                {/* ============ delete modal ends=============== */}
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = state => {

    const {

        get_all_addOns_category_data,
        get_all_addOns_category_error,
        get_all_addOns_category_loading,
        add_on_category_delete_loading
    } = state.Restaurant;

    return {
        get_all_addOns_category_data,
        get_all_addOns_category_error,
        get_all_addOns_category_loading,
        add_on_category_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            getAllAddOnsCategoryAction,
            addOnCategoryDeleteAction,
            addOnCategoryDeleteFresh
        })(AddOnsCategory)
);