import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    addReasonAction, addReasonFresh, getAllReasonAction, getAllReasonFresh, reasonUpdateAction, reasonUpdateFresh, reasonStatusUpdateAction, reasonStatusUpdateFresh, reasonDeleteAction, reasonDeleteFresh
} from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";


function SystemOnOffReason(props) {

    document.title = "System On Off Reason | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);
    const [addImages, setAddImages] = useState({
        image: "",
    })
    const [editImages, setEditImages] = useState({
        image: "",
    })

    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);

    const [addInfo, setAddInfo] = useState({
        name: "",
        description: "",
        image: "",
        is_active: true,
    });


    const [editInfo, setEditInfo] = useState({
        _id: "",
        name: "",
        description: "",
        image: "",
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
        props.addReasonAction(addInfo);
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


    const handleEditSlider = (row) => {

        setEditInfo(prevState => ({
            _id: row._id,
            name: row.name,
            description: row.description,
            image: row.image,
            is_active: row.is_active,
        }));

        setEditImages({ ...editImages, image: row.image })
        toggleEditModal();
    }

    const handleEdit = (e) => {
        e.preventDefault();
        props.reasonUpdateAction(editInfo);
    }

    const handleStatusModal = (row) => {
        setEditInfo(row);
        toggleStatus();
    }

    const handleStatusUpdate = () => {
        props.reasonStatusUpdateAction({
            ...editInfo,
            is_active: !editInfo.is_active,
        })
    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        props.reasonDeleteAction(deleteItem);
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
            //dataField: "hello",
            text: "Action",
            sort: true,
            formatter: actionRef,
        },

    ];
    const defaultSorted = [
        {
            dataField: "title",
            order: "desc"
        }
    ];


    useEffect(() => {


        if (props.get_all_reason_loading == false) {
            props.getAllReasonAction();
        }

        if (props.add_reason_loading === "Success") {
            toast.success("Reason Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                name: "",
                description: "",
                image: "",
                is_active: true,
            });
            setAddImages("");
            props.addReasonFresh();
        }


        if (props.add_reason_loading === "Failed") {
            toast.error("Something went wrong");
            props.addReasonFresh();

        }

        if (props.reason_edit_loading === "Success") {
            toast.success("Reason Updated");
            toggleEditModal();
            props.reasonUpdateFresh();
        }

        if (props.reason_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.reasonUpdateFresh();

        }

        if (props.reason_status_edit_loading === "Success") {
            toast.success("Reason Status Updated");
            toggleStatus();
            props.reasonStatusUpdateFresh();

        }

        if (props.reason_status_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.reasonStatusUpdateFresh();

        }

        if (props.reason_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Reason Deleted");
            toggleDel();
            props.reasonDeleteFresh();
        }

    }, [props.add_reason_loading, props.reason_edit_loading,
    props.reason_delete_loading, props.reason_status_edit_loading]);


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Settings" breadcrumbItem="System On Off Reason" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>System On Off Reason</CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Reason
                                        </Button>
                                    </div>

                                    {props.get_all_reason_data ? props.get_all_reason_data.length > 0 ? <DatatableTablesWorking products={props.get_all_reason_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_reason_data?._id} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* ============ create modal start=============== */}
                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>New Reason</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="title">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" required name="name" value={addInfo.name} onChange={handleAddInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea className="form-control" id="description"
                                    placeholder="Enter description" name="description" onChange={handleAddInputs} value={addInfo.description} required></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="image">Image</label>
                                <input type="file" className="form-control" id="image" required name="image" onChange={handleAddFile} />

                            </div>

                            {addImages?.image && (
                                <Row className="mb-3">
                                    <label className="col-md-2">
                                        <span></span>
                                    </label>
                                    <div className="col-md-10">
                                        <img
                                            src={addImages.image}
                                            alt="preview"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                </Row>
                            )}

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
                    <ModalHeader >Edit Reason</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEdit} >

                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter name" required name="name" value={editInfo.name} onChange={handleEditInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea className="form-control" id="description"
                                    placeholder="Enter description" name="description" onChange={handleEditInputs} value={editInfo.description} required></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="image">Image</label>
                                <input type="file" className="form-control" id="image" required name="image" onChange={handleEditFile} />
                            </div>
                            {editImages?.image && (
                                <Row className="mb-3">
                                    <label className="col-md-2">
                                        <span></span>
                                    </label>
                                    <div className="col-md-10">
                                        <img
                                            src={editImages.image}
                                            alt="preview"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                </Row>
                            )}

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
        add_reason_data,
        add_reason_error,
        add_reason_loading,

        get_all_reason_data,
        get_all_reason_error,
        get_all_reason_loading,

        reason_edit_data,
        reason_edit_loading,

        reason_status_edit_data,
        reason_status_edit_loading,

        reason_delete_loading

    } = state.Reason;

    return {
        add_reason_data,
        add_reason_error,
        add_reason_loading,

        get_all_reason_data,
        get_all_reason_error,
        get_all_reason_loading,

        reason_edit_data,
        reason_edit_loading,

        reason_status_edit_data,
        reason_status_edit_loading,

        reason_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addReasonAction,
            addReasonFresh,
            getAllReasonAction,
            getAllReasonFresh,
            reasonUpdateAction,
            reasonUpdateFresh,
            reasonStatusUpdateAction,
            reasonStatusUpdateFresh,
            reasonDeleteAction,
            reasonDeleteFresh,
        })(SystemOnOffReason)
);