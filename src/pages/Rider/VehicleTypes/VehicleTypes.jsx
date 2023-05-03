import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    addVehicleTypeAction, addVehicleTypeFresh, getAllVehicleTypeAction, getAllVehicleTypeFresh, vehicleTypeEditAction, vehicleTypeEditFresh, vehicleTypeStatusEditAction, vehicleTypeStatusEditActionFresh, vehicleTypeDeleteAction, vehicleTypeDeleteFresh
} from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";


function VehicleTypes(props) {

    document.title = "Vehicle Types | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);

    const [addImages, setAddImages] = useState({
        image: "",
    })
    const [editImages, setEditImages] = useState({
        image: "",
    })

    const [addInfo, setAddInfo] = useState({
        type: "",
        commission: "",
        maximum_no_of_received_order_at_a_time: "",
        is_active: true,
    });


    const [editInfo, setEditInfo] = useState({
        _id: "",
        type: "",
        commission: "",
        maximum_no_of_received_order_at_a_time: "",
        is_active: true,
    });

    const handleEdit = (row) => {

        setEditInfo(prevState => ({
            _id: row._id,
            type: row.type,
            commission: row.commission,
            maximum_no_of_received_order_at_a_time: row.maximum_no_of_received_order_at_a_time,
            is_active: row.is_active,
        }));
        setEditImages({ ...editImages, image: row.image })

        toggleEditModal();
    }



    const [deleteItem, setDeleteItem] = useState();


    let name, value, checked;
    const handleAddInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setAddInfo({ ...addInfo, [name]: value });
    }

    const handleAddFile = (e) => {
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

    const handleAddCheckBox = (e) => {
        // console.log(e);
        name = e.target.name;
        checked = e.target.checked;
        setAddInfo({ ...addInfo, [name]: checked });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuidv4()
        props.addVehicleTypeAction(id, addInfo);
    }


    const handleEditInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setEditInfo({ ...editInfo, [name]: value });
    }

    const handleEditFile = (e) => {
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

    const handleEditCheckBox = (e) => {
        // console.log(e);
        name = e.target.name;
        checked = e.target.checked;
        setEditInfo({ ...editInfo, [name]: checked });
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        props.vehicleTypeEditAction(editInfo);
    }

    const handleStatusModal = (row) => {
        setEditInfo(row);
        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(editInfo);
        props.vehicleTypeStatusEditAction({
            ...editInfo,
            is_active: !editInfo.is_active,
        })

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        props.vehicleTypeDeleteAction(deleteItem);
    }


    const actionRef = (cell, row) =>
        <div style={{ display: "flex", gap: 10 }}>
            <Button color="primary" className="btn btn-primary waves-effect waves-light" onClick={() => handleEdit(row)}
            >
                Edit
            </Button>{" "}
            <Button color="danger" className="btn btn-danger waves-effect waves-light"
                onClick={() => handleDeleteModal(row)}
            >
                Delete
            </Button>{" "}
        </div>



    const statusRef = (cell, row) => <Button color={row.is_active ? "success" : "secondary"}
        className="btn waves-effect waves-light" onClick={() => handleStatusModal(row)}>{row.is_active ? "Active" : "Deactivate"}</Button>


    const activeData = [

        {
            dataField: "type",
            text: "Vehicle Type",
            sort: true,
        },

        {
            dataField: "",
            text: "Status",
            sort: true,
            formatter: statusRef
        },

        {
            //dataField: "hello",
            text: "Action",
            sort: true,
            formatter: actionRef,
        },

    ];
    const defaultSorted = [
        {
            dataField: "type",
            order: "desc"
        }
    ];


    useEffect(() => {


        if (props.add_vehicle_type_loading === "Success") {
            toast.success("Vehicle Type Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                type: "",
                commission: "",
                maximum_no_of_received_order_at_a_time: "",
                is_active: true,
            });

            setAddImages("");
            props.addVehicleTypeFresh();
        }


        if (props.add_vehicle_type_loading === "Failed") {
            toast.error("Something went wrong");
            props.addVehicleTypeFresh();

        }

        if (props.vehicle_type_edit_loading === "Success") {
            toast.success("Vehicle Type Updated");
            toggleEditModal();
            props.vehicleTypeEditFresh();
        }

        if (props.vehicle_type_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.vehicleTypeEditFresh();
        }

        if (props.edit_vehicle_type_status_loading === "Success") {
            toast.success("Vehicle Type Status Updated");
            toggleStatus();
            props.vehicleTypeStatusEditActionFresh();

        }

        if (props.edit_vehicle_type_status_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.vehicleTypeStatusEditActionFresh();

        }

        if (props.vehicle_type_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Vehicle Type Deleted");
            toggleDel();
            props.vehicleTypeDeleteFresh();
        }

    }, [props.add_vehicle_type_loading, props.vehicle_type_edit_loading,
    props.vehicle_type_delete_loading, props.edit_vehicle_type_status_loading]);


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Users" breadcrumbItem="Vehicle Types" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Vehicle Types</CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Vehicle Type
                                        </Button>
                                    </div>

                                    {props.get_all_vehicle_type_data ? props.get_all_vehicle_type_data.length > 0 ? <DatatableTablesWorking products={props.get_all_vehicle_type_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_vehicle_type_data?._id} /> : null : null}

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
                                <label className="form-label" htmlFor="type">Vehicle Type</label>
                                <input type="text" className="form-control" id="type" placeholder="Enter vehicle type" required name="type" value={addInfo.type} onChange={handleAddInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="commission">Commission</label>
                                <input type="text" className="form-control" id="commission" placeholder="Enter Commission" required name="commission" value={addInfo.commission} onChange={handleAddInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="maximum_no_of_received_order_at_a_time">Minium no of received order at a time</label>
                                <input type="text" className="form-control" id="maximum_no_of_received_order_at_a_time" placeholder="Enter minium no of received order at a time" required name="maximum_no_of_received_order_at_a_time" value={addInfo.maximum_no_of_received_order_at_a_time} onChange={handleAddInputs} />
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
                {/* ============ create modal end=============== */}

                {/* ============ edit modal start=============== */}
                <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
                    <ModalHeader >Edit PopUp Banner</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEditSubmit} >

                            <div className="mb-3">
                                <label className="form-label" htmlFor="type">Vehicle Type</label>
                                <input type="text" className="form-control" id="type" placeholder="Enter vehicle type" required name="type" value={editInfo.type} onChange={handleEditInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="commission">Commission</label>
                                <input type="text" className="form-control" id="commission" placeholder="Enter Commission" required name="commission" value={editInfo.commission} onChange={handleEditInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="maximum_no_of_received_order_at_a_time">Minium no of received order at a time</label>
                                <input type="text" className="form-control" id="maximum_no_of_received_order_at_a_time" placeholder="Enter minium no of received order at a time" required name="maximum_no_of_received_order_at_a_time" value={editInfo.maximum_no_of_received_order_at_a_time} onChange={handleEditInputs} />
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

                </Modal>
                {/* ============ edit modal ends=============== */}


                {/* ============ delete modal starts=============== */}
                <Modal isOpen={modalDel} toggle={toggleDel} centered>
                    <ModalHeader className="text-center" style={{ textAlign: "center", margin: "0 auto" }}>
                        <div className="icon-box">
                            <i className="fa red-circle fa-trash" style={{ color: "red", fontSize: "40px" }}></i>
                        </div>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>Do you really want to delete these records? This process cannot be undone.</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleDel}>Cancel</Button>{' '}
                        <Button color="danger" onClick={handleDelete}>Delete</Button>
                    </ModalFooter>
                </Modal>
                {/* ============ delete modal ends=============== */}


                {/* ============ status update modal starts=============== */}
                <Modal isOpen={modalStatusUpdate} toggle={toggleStatus} centered>
                    <ModalHeader className="text-center" style={{ textAlign: "center", margin: "0 auto" }}>
                        <div className="icon-box">
                            <i className="fa fa-exclamation-circle" style={{ color: "#DCA218", fontSize: "40px" }}></i>
                        </div>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>Do you really want to update status these records? </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleStatus}>Cancel</Button>{' '}
                        <Button color="primary" onClick={handleStatusUpdate}>Update</Button>
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

        vehicle_type_delete_loading

    } = state.VehicleType;

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

        vehicle_type_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
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
        })(VehicleTypes)
);