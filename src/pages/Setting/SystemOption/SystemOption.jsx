import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    getAllSystemOptionAction, getAllSystemOptionFresh, systemOptionUpdateAction,
    systemOptionUpdateFresh
} from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import moment from "moment";


function SystemOption(props) {

    document.title = "System Option | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);



    const toggle = () => setModal(!modal);
    const toggleEditModal = () => {

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

    // const [editInfo, setEditInfo] = useState([{ id: 0, name: "abir", type: "string" }, { id: 1, name: "nibir", type: "enum" }]);

    const [editInfo, setEditInfo] = useState([]);



    const [deleteItem, setDeleteItem] = useState();


    let name, value, checked;
    const handleAddInputs = (e) => {
        //console.log(e);
        name = e.target.name;
        value = e.target.value;
        // console.log(name2, value2);

        let updatedList = options.map(option => {
            if (option.name == name) {
                return { ...option, value: value };
            }
            return option;
        });

        setOptions(updatedList);
    }

    const handleAddCheckBox = (e) => {
        // console.log(e);
        name = e.target.name;
        checked = e.target.checked;
        let updatedList = options.map(option => {
            if (option.name == name) {
                return { ...option, value: checked };
            }
            return option;
        });

        setOptions(updatedList);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //props.addSystemOptionAction(addInfo);
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

    const handleEdit = (data) => {
        console.log(data);
        // e.preventDefault();
        props.systemOptionUpdateAction(data);
    }

    const handleStatusModal = (row) => {
        setEditInfo(row);
        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(editInfo);
        // props.systemOptionStatusUpdateAction({
        //     ...editInfo,
        //     is_active: !editInfo.is_active,
        // })

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        //props.systemOptionDeleteAction(deleteItem);
    }




    //const [abirInfo, setAbirInfo] = useState([]);
    const receiveOptions = (idx, data) => {
        //setEditInfo(data)
        console.log(idx, data);
        //setAbirInfo({ ...abirInfo, data });
    }
    //console.log(abirInfo);



    // const actionRef = (cell, row) =>
    //     <div style={{ display: "flex", gap: 10 }}>
    //         <Button color="primary" className="btn btn-primary waves-effect waves-light" onClick={() => handleEditSlider(row)}
    //         >
    //             Edit
    //         </Button>{" "}
    //         <Button color="danger" className="btn btn-danger waves-effect waves-light"
    //             onClick={() => handleDeleteModal(row)}
    //         >
    //             Delete
    //         </Button>{" "}
    //     </div>



    // const statusRef = (cell, row) => <Button color={row.is_active ? "success" : "secondary"}
    //     className="btn waves-effect waves-light" onClick={() => handleStatusModal(row)}>{row.is_active ? "Active" : "Deactivate"}</Button>

    // const weekday = ['0', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday', 'Sunday'];
    // const mainday = (cell, row) => <>{weekday[row.day]}</>

    // const activeData = [

    //     {
    //         dataField: "day",
    //         text: "Day",
    //         sort: true,
    //         formatter: mainday
    //     },
    //     {
    //         dataField: "",
    //         text: "Status",
    //         sort: true,
    //         formatter: statusRef
    //     },

    //     {
    //         //dataField: "hello",
    //         text: "Action",
    //         sort: true,
    //         formatter: actionRef,
    //     },

    // ];
    // const defaultSorted = [
    //     {
    //         dataField: "day",
    //         order: "desc"
    //     }
    // ];

    useEffect(() => {


        if (props.get_all_system_option_loading == false) {
            props.getAllSystemOptionAction();
        }



    }, []);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(props.get_all_system_option_data)

    }, [])

    console.log(options);

    let id = 0;

    // {
    //     options ? <>{
    //         options.map(option => receiveOptions(id++, option))
    //     }</> : ''
    // }





    useEffect(() => {


        // if (props.get_all_system_option_loading == false) {
        //     props.getAllSystemOptionAction();
        // }

        if (props.add_system_option_loading === "Success") {
            toast.success("Option Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                day: 0,
                start_time: "",
                end_time: "",
                is_active: true,
            });
            // props.addSystemOptionFresh();
        }


        if (props.add_system_option_loading === "Failed") {
            toast.error("Something went wrong");
            // props.addSystemOptionFresh();

        }

        if (props.system_option_edit_loading === "Success") {
            toast.success("Option Updated");
            //toggleEditModal();
            props.systemOptionUpdateFresh();
        }

        if (props.system_option_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.systemOptionUpdateFresh();
        }

        if (props.system_option_status_edit_loading === "Success") {
            toast.success("Option Status Updated");
            toggleStatus();
            // props.systemOptionStatusUpdateFresh();

        }

        if (props.system_option_status_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            // props.systemOptionStatusUpdateFresh();

        }



        if (props.system_option_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Option Deleted");
            toggleDel();
            //  props.systemOptionDeleteFresh();
        }

    }, [props.add_system_option_loading, props.system_option_edit_loading,
    props.system_option_delete_loading, props.system_option_status_edit_loading]);





    // console.log(props.get_all_system_option_data);
    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Settings" breadcrumbItem="System Option" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>System Option</CardTitle>
                                        {/* <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Option
                                        </Button> */}
                                    </div>


                                    {props.get_all_system_option_data ? props.get_all_system_option_data.length > 0 ? <>
                                        {
                                            options.map(option =>
                                                <form key={option._id} className="mt-1"  >
                                                    <Row className="mb-3">
                                                        <div className="col-sm-2">
                                                            <label className="form-label" htmlFor={option.name}>{option.display_name}:</label>
                                                        </div>

                                                        <div className="col-sm-8">
                                                            {option.type === "single_value" ?
                                                                <input type="text" className="form-control" value={option.value} name={option.name} id={option.name} onChange={handleAddInputs} />
                                                                : ''}

                                                            {/* {option.type === "enum" ? <
                                                            <input type="text" className="form-control" value={option.value} name={option.name} id={option.name} onChange={handleAddInputs} />
                                                         : ''} */}



                                                            {option.type === "on_off" ?
                                                                <input type="checkbox" className="form-check-input" id={option.name} checked={option.value} name={option.name} onChange={handleAddCheckBox} />
                                                                : ''}

                                                        </div>

                                                        <div className="col-sm-2">
                                                            {/* <Button color="primary" className='btn btn-sm'>
                                                                Upate
                                                            </Button> */}

                                                            <Button color="primary" className="btn btn-primary btn-sm waves-effect waves-light" onClick={() => handleEdit(option)}>Edit</Button>
                                                        </div>


                                                        {/* <div className="col-sm-10">
                                                            <input type="text" className="form-control" value={option.value} name={option.name} id={option.name} onChange={handleAddInputs} />
                                                        </div> */}
                                                    </Row>

                                                </form>
                                            )
                                        }
                                    </> : null : null}

                                    {/* {
                                        options.map(option => <p key={option._id} >{option.display_name}</p>)
                                    } */}

                                    {/* <form className="mt-1" onSubmit={handleEdit} >
                                        <Row className="mb-3">
                                            <div className="col-sm-4">
                                                <label className="form-label" htmlFor="fg">Color Foreground:</label>
                                            </div>


                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" value="" name="fg" id="fg" onChange={handleAddInputs} />
                                            </div>
                                        </Row>

                                    </form> */}


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* ============ create modal start=============== */}
                {/* <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>New SystemOption</ModalHeader>
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
                </Modal> */}
                {/* ============ create modal end=============== */}

                {/* ============ edit modal start=============== */}
                {/* <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
                    <ModalHeader >Edit SystemOption</ModalHeader>
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

                </Modal> */}
                {/* ============ edit modal ends=============== */}


                {/* ============ delete modal starts=============== */}
                {/* <Modal isOpen={modalDel} toggle={toggleDel} centered>
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
                </Modal> */}
                {/* ============ delete modal ends=============== */}


                {/* ============ status update modal starts=============== */}
                {/* <Modal isOpen={modalStatusUpdate} toggle={toggleStatus} centered>
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
                </Modal> */}
                {/* ============ status update modal ends=============== */}
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = state => {


    const {
        add_system_option_data,
        add_system_option_error,
        add_system_option_loading,

        get_all_system_option_data,
        get_all_system_option_error,
        get_all_system_option_loading,

        system_option_edit_data,
        system_option_edit_loading,

        system_option_status_edit_data,
        system_option_status_edit_loading,

        system_option_delete_loading

    } = state.SystemOption;

    return {
        add_system_option_data,
        add_system_option_error,
        add_system_option_loading,

        get_all_system_option_data,
        get_all_system_option_error,
        get_all_system_option_loading,

        system_option_edit_data,
        system_option_edit_loading,

        system_option_status_edit_data,
        system_option_status_edit_loading,

        system_option_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {

            getAllSystemOptionAction,
            getAllSystemOptionFresh,
            systemOptionUpdateAction,
            systemOptionUpdateFresh
        })(SystemOption)
);