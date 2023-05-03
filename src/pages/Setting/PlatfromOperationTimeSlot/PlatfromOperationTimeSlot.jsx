import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    addOperationTimeSlotAction, addOperationTimeSlotFresh, getAllOperationTimeSlotAction, getAllOperationTimeSlotFresh, operationTimeSlotUpdateAction, operationTimeSlotUpdateFresh, operationTimeSlotStatusUpdateAction, operationTimeSlotStatusUpdateFresh, operationTimeSlotDeleteAction, operationTimeSlotDeleteFresh
} from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import moment from "moment";


function PlatfromOperationTimeSlot(props) {

    document.title = "System Operation Time Slot | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);



    const toggle = () => setModal(!modal);
    const toggleEditModal = () => {
        // setStartTime({
        //     ...startTime,
        //     open_hour: "",
        //     open_minute: "",
        // });
        setEditModal(!editModal);
    }
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);

    const [addInfo, setAddInfo] = useState({
        day: 0,
        start_time: "",
        end_time: "",
        is_active: true,
    });

    const [editInfo, setEditInfo] = useState({
        _id: "",
        day: 0,
        start_time: "",
        end_time: "",
        is_active: true,
    });

    const [deleteItem, setDeleteItem] = useState();


    let name, value, checked;
    const handleAddInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setAddInfo({ ...addInfo, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOperationTimeSlotAction(addInfo);
    }

    const handleEditInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setEditInfo({ ...editInfo, [name]: value });
    }


    const handleEditSlider = (row) => {
        setEditInfo(prevState => ({
            _id: row._id,
            day: row.day,
            is_active: row.is_active,
            start_time: moment({ hour: row.open_hour, minute: row.open_minute }).format('HH:mm'),
            end_time: moment({ hour: row.close_hour, minute: row.close_minute }).format('HH:mm'),
        }));
        toggleEditModal();
    }

    const handleEdit = (e) => {
        e.preventDefault();
        props.operationTimeSlotUpdateAction(editInfo);
    }

    const handleStatusModal = (row) => {
        setEditInfo(row);
        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(editInfo);
        props.operationTimeSlotStatusUpdateAction({
            ...editInfo,
            is_active: !editInfo.is_active,
        })

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        props.operationTimeSlotDeleteAction(deleteItem);
    }


    const actionRef = (cell, row) =>
        <div style={{ display: "flex", gap: 10 }}>
            <Button color="primary" className="btn btn-primary waves-effect waves-light" onClick={() => handleEditSlider(row)}
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

    // const day = (cell, row) => <Button color={row.is_active ? "success" : "secondary"}
    //     className="btn waves-effect waves-light" onClick={() => handleStatusModal(row)}>{row.is_active ? "Active" : "Deactivate"}</Button>

    const weekday = ['0', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday', 'Sunday'];
    const mainday = (cell, row) => <>{weekday[row.day]}</>

    const activeData = [

        {
            dataField: "day",
            text: "Day",
            sort: true,
            formatter: mainday
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
            dataField: "day",
            order: "desc"
        }
    ];


    useEffect(() => {


        if (props.get_all_operation_time_slot_loading == false) {
            props.getAllOperationTimeSlotAction();
        }

        if (props.add_operation_time_slot_loading === "Success") {
            toast.success("Operation Time Slot Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                day: 0,
                start_time: "",
                end_time: "",
                is_active: true,
            });
            props.addOperationTimeSlotFresh();
        }


        if (props.add_operation_time_slot_loading === "Failed") {
            toast.error("Something went wrong");
            props.addOperationTimeSlotFresh();

        }

        if (props.operation_time_slot_edit_loading === "Success") {
            toast.success("Operation Time Slot Updated");
            toggleEditModal();
            props.operationTimeSlotUpdateFresh();
        }

        if (props.operation_time_slot_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.operationTimeSlotUpdateFresh();

        }

        if (props.operation_time_slot_status_edit_loading === "Success") {
            toast.success("Operation Time Slot Status Updated");
            toggleStatus();
            props.operationTimeSlotStatusUpdateFresh();

        }

        if (props.operation_time_slot_status_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.operationTimeSlotStatusUpdateFresh();

        }

        if (props.operation_time_slot_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Operation Time Slot Deleted");
            toggleDel();
            props.operationTimeSlotDeleteFresh();
        }

    }, [props.add_operation_time_slot_loading, props.operation_time_slot_edit_loading,
    props.operation_time_slot_delete_loading, props.operation_time_slot_status_edit_loading]);


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Settings" breadcrumbItem="System Operation Time Slot" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>System Operation Time Slot</CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Operation Time Slot
                                        </Button>
                                    </div>

                                    {props.get_all_operation_time_slot_data ? props.get_all_operation_time_slot_data.length > 0 ? <DatatableTablesWorking products={props.get_all_operation_time_slot_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_operation_time_slot_data?._id} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* ============ create modal start=============== */}
                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>New OperationTimeSlot</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <Row className="mb-3 px-3">
                                <label className="form-label" htmlFor="day">Day</label>
                                <Input id="day" name="day" className="form-control" placeholder="select day" value={addInfo.day} onChange={handleAddInputs} type="select" >
                                    <option>Choose...</option>
                                    <option value="6">Saturday</option>
                                    <option value="7">Sunday</option>
                                    <option value="1">Monday</option>
                                    <option value="2">Tuesday</option>
                                    <option value="3">Wednesday</option>
                                    <option value="4">Thursday</option>
                                    <option value="5">Friday</option>
                                </Input>
                            </Row>
                            <Row className="mb-3 px-3">
                                <label className="form-label" htmlFor="start_time">Operation Start Time</label>
                                <input type="time" id="start_time" className="form-control" name="start_time" value={addInfo.start_time} onChange={handleAddInputs} />
                            </Row>
                            <Row className="mb-3 px-3">
                                <label className="form-label" htmlFor="end_time">Operation End Time</label>
                                <input type="time" id="end_time" className="form-control" name="end_time" value={addInfo.end_time} onChange={handleAddInputs} />
                            </Row>

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
                    <ModalHeader >Edit OperationTimeSlot</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEdit} >

                            <Row className="mb-3 px-3">
                                <label className="form-label" htmlFor="day">Day</label>
                                <Input id="day" name="day" className="form-control" placeholder="select day" value={editInfo.day} onChange={handleEditInputs} type="select" >
                                    <option>Choose...</option>
                                    <option value="6">Saturday</option>
                                    <option value="7">Sunday</option>
                                    <option value="1">Monday</option>
                                    <option value="2">Tuesday</option>
                                    <option value="3">Wednesday</option>
                                    <option value="4">Thursday</option>
                                    <option value="5">Friday</option>
                                </Input>
                            </Row>
                            <Row className="mb-3 px-3">
                                <label className="form-label" htmlFor="start_time">Operation Start Time</label>
                                <input type="time" id="start_time" className="form-control" name="start_time" value={editInfo.start_time} onChange={handleEditInputs} />
                            </Row>
                            <Row className="mb-3 px-3">
                                <label className="form-label" htmlFor="end_time">Operation End Time</label>
                                <input type="time" id="end_time" className="form-control" name="end_time" value={editInfo.end_time} onChange={handleEditInputs} />
                            </Row>

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
        add_operation_time_slot_data,
        add_operation_time_slot_error,
        add_operation_time_slot_loading,

        get_all_operation_time_slot_data,
        get_all_operation_time_slot_error,
        get_all_operation_time_slot_loading,

        operation_time_slot_edit_data,
        operation_time_slot_edit_loading,

        operation_time_slot_status_edit_data,
        operation_time_slot_status_edit_loading,

        operation_time_slot_delete_loading

    } = state.OperationTimeSlot;

    return {
        add_operation_time_slot_data,
        add_operation_time_slot_error,
        add_operation_time_slot_loading,

        get_all_operation_time_slot_data,
        get_all_operation_time_slot_error,
        get_all_operation_time_slot_loading,

        operation_time_slot_edit_data,
        operation_time_slot_edit_loading,

        operation_time_slot_status_edit_data,
        operation_time_slot_status_edit_loading,

        operation_time_slot_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addOperationTimeSlotAction,
            addOperationTimeSlotFresh,
            getAllOperationTimeSlotAction,
            getAllOperationTimeSlotFresh,
            operationTimeSlotUpdateAction,
            operationTimeSlotUpdateFresh,
            operationTimeSlotStatusUpdateAction,
            operationTimeSlotStatusUpdateFresh,
            operationTimeSlotDeleteAction,
            operationTimeSlotDeleteFresh,
        })(PlatfromOperationTimeSlot)
);