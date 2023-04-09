
import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addCityAction, addCityFresh, getAllCityAction, getAllCityFresh, cityNameEditAction, cityNameEditFresh, cityDeleteAction, cityDeleteFresh } from 'store/zoneCity/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';

function City(props) {

    const [name, setName] = useState("")
    const [modal, setModal] = useState(false);
    const [cityId, setCityId] = useState();
    const [cityname, setCityName] = useState();
    const [editModal, setEditModal] = useState(false);
    const [reload, setReload] = useState(false)

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
        props.addCityAction(name, val);
    }
    const handleEditCityName = (row) => {
        console.log(row);
        setCityId(row._id);
        setCityName(row.name);
        toggleEditModal();
    }
    const handleCityName = (e) => {
        setCityName(e.target.value);
    }

    const handleEditModalSubmit = (e) => {
        e.preventDefault();
        toggleEditModal();
        console.log(cityname)
        console.log(cityId);
        props.cityNameEditAction(cityname, cityId)
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
                onClick={() => handleEditCityName(row)}
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



    // const statusRef = (cell, row) => <Badge color="secondary" style={{ padding: "12px" }}>Deactivate</Badge>

    const statusRef = (cell, row) => <Badge color={row.is_active ? "success" : "secondary"} style={{ padding: "12px" }}>{row.is_active ? "Active" : "Deactivate"}</Badge>


    console.log(props.add_city_loading);
    console.log(props.get_all_city_data);
    console.log(props.city_name_edit_loading);
    console.log(props.get_all_city_loading);


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
            //dataField: "he",
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
        console.log("=======hello", props.city_name_edit_loading);
        if (props.get_all_city_loading == false) {
            console.log("I am in get all city loading ")
            props.getAllCityAction();
        }

        if (props.add_city_loading === "Success") {
            toast.success("City Addedd Successfully");
            props.addCityFresh();
        }


        if (props.add_city_loading === "Failed") {
            toast.error("Something went wrong");
            props.addCityFresh();

        }

        if (props.city_name_edit_loading === "Success") {
            toast.success("City Name Updated");
            props.cityNameEditFresh();

        }

        if (props.city_delete_loading === "Success") {
            console.log("I am in the delete")
            toast.success("City Deleted");
            props.cityDeleteFresh();

        }


    }, [props.add_city_loading, props.city_name_edit_loading, props.city_delete_loading]);


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Zone & City" breadcrumbItem="City" />
                    {/* <Row className="d-flex flex-row-reverse" style={{ marginBottom: "20px", alignItems: "end" }}>
                        <Col className="col-12">
                            <Button color="danger" onClick={toggle}>
                                Add City
                            </Button>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>City </CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle}>
                                            Add City
                                        </Button>
                                    </div>

                                    {props.get_all_city_data ? props.get_all_city_data.length > 0 ? <DatatableTablesWorking products={props.get_all_city_data}
                                        columnData={activeData} defaultSorted={defaultSorted} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="username">City Name</label>
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
                                <input type="text" className="form-control" id="username1" placeholder="Enter city name" required value={cityname ? cityname : ''} onChange={handleCityName} />
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

        add_city_data,
        add_city_error,
        add_city_loading,

        get_all_city_data,
        get_all_city_error,
        get_all_city_loading,

        city_name_edit_loading,
        city_delete_loading
    } = state.zoneCity;

    return {
        add_city_data,
        add_city_error,
        add_city_loading,

        get_all_city_data,
        get_all_city_error,
        get_all_city_loading,

        city_name_edit_loading,
        city_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addCityAction,
            addCityFresh,
            getAllCityAction,
            getAllCityFresh,
            cityNameEditAction,
            cityNameEditFresh,
            cityDeleteAction,
            cityDeleteFresh
        })(City)
);