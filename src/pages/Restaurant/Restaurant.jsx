
import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { restaurantAddAction, getAllRestaurantAction, restaurantNameUpdateAction } from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';

function Restaurant(props) {

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
        toggleDel();
        console.log(deleteItem)
        props.cityDeleteAction(deleteItem);
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
    const handleEditName = (row) => {
        console.log(row);
        setId(row._id);
        setRestaurantName(row.name);
        toggleEditModal();
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
                onClick={() => handleEditName(row)}
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



    // const statusRef = (cell, row) => <Badge color="success" style={{ padding: "12px" }}>Activate</Badge>
    const statusRef = (cell, row) => <Badge color={row.is_active ? "success" : "secondary"} style={{ padding: "12px" }}>{row.is_active ? "Active" : "Deactivate"}</Badge>


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
        if (props.get_all_restaurant_loading == false) {
            props.getAllRestaurantAction();
        }

    }, [props.get_all_restaurant_loading]);

    console.log(props.get_all_restaurant_data);
    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Restaurant" breadcrumbItem="Manage Restaurant" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Restaurant </CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle}>
                                            Add Restaurant
                                        </Button>
                                    </div>

                                    {props.get_all_restaurant_data ? props.get_all_restaurant_data.length > 0 ? <DatatableTablesWorking products={props.get_all_restaurant_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_restaurant_data?._id} /> : null : null}

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

                {/* ============ edit modal start=============== */}
                <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
                    <ModalHeader toggle={toggleEditModal}>Edit city name</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEditModalSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="username1">City Name</label>
                                <input type="text" className="form-control" id="username1" placeholder="Enter city name" required value={restaurantName ? restaurantName : ''} onChange={handleNameChange} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
                                <Button color="primary" type="submit">
                                    Submit
                                </Button>{' '}
                                <Button color="secondary" onClick={toggleEditModal}>
                                    Cancel
                                </Button>
                            </div>

                        </form>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </Modal>
                {/* ============ edit modal ends=============== */}

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

        add_restaurant_data,
        add_restaurant_error,
        add_restaurant_loading,

        get_all_restaurant_data,
        get_all_restaurant_loading,
    } = state.Restaurant;

    return {
        add_restaurant_data,
        add_restaurant_error,
        add_restaurant_loading,

        get_all_restaurant_data,
        get_all_restaurant_loading,
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            restaurantAddAction,
            getAllRestaurantAction,
            restaurantNameUpdateAction
        })(Restaurant)
);