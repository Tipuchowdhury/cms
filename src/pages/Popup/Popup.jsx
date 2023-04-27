import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    addPopUpAction, addPopUpFresh, getAllPopUpAction, getAllPopUpFresh, popUpUpdateAction, popUpUpdateFresh, popUpStatusUpdateAction, popUpStatusUpdateFresh, popUpDeleteAction, popUpDeleteFresh
} from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";


function Popup(props) {

    document.title = "PopUp Banner | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);

    const [addInfo, setAddInfo] = useState({
        title: "",
        description: "",
        cancellable: true,
        image: "",
        is_active: true,
    });

    const [editInfo, setEditInfo] = useState({
        _id: "",
        title: "",
        description: "",
        cancellable: true,
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
        setAddInfo({
            ...addInfo,
            image: e.target.value,
        });
    }


    const handleAddCheckBox = (e) => {
        // console.log(e);
        name = e.target.name;
        checked = e.target.checked;
        setAddInfo({ ...addInfo, [name]: checked });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addPopUpAction(addInfo);
    }

    const handleEditInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setEditInfo({ ...editInfo, [name]: value });
    }

    const handleEditFile = (e) => {
        setEditInfo({
            ...editInfo,
            image: e.target.value,
        });
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
            title: row.title,
            description: row.description,
            cancellable: row.cancellable,
            image: row.image,
            is_active: row.is_active,
        }));

        toggleEditModal();
    }

    const handleEdit = (e) => {
        e.preventDefault();
        props.popUpUpdateAction(editInfo);
    }

    const handleStatusModal = (row) => {
        setEditInfo(row);
        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(editInfo);
        // props.promotionStatusUpdateAction({
        //     ...editInfo,
        //     is_active: !editInfo.is_active,
        // })

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        props.popUpDeleteAction(deleteItem);
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
            dataField: "title",
            text: "Title",
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


        if (props.get_all_popup_loading == false) {
            props.getAllPopUpAction();
        }


        if (props.add_popup_loading === "Success") {
            toast.success("PopUp Banner Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                title: "",
                description: "",
                cancellable: true,
                image: "",
                is_active: true,
            });
            props.addPopUpFresh();
        }


        if (props.add_popup_loading === "Failed") {
            toast.error("Something went wrong");
            props.addPopUpFresh();

        }

        if (props.popup_edit_loading === "Success") {
            toast.success("PopUp Banner Updated");
            toggleEditModal();
            props.popUpUpdateFresh();
        }

        if (props.popup_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.popUpUpdateFresh();

        }

        // if (props.slider_status_edit_loading === "Success") {
        //     toast.success("Promotion Status Updated");
        //     toggleStatus();
        //     props.promotionStatusUpdateFresh();

        // }

        // if (props.slider_status_edit_loading === "Failed") {
        //     toast.error("Something went wrong");
        //     // toggleEditModal();
        //     props.promotionStatusUpdateFresh();

        // }

        if (props.popup_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("PopUp Banner Deleted");
            toggleDel();
            props.popUpDeleteFresh();
        }

    }, [props.add_popup_loading, props.popup_edit_loading,
    props.popup_delete_loading, props.popup_status_edit_loading]);


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="PopUp Banner" breadcrumbItem="PopUp Banner" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>PopUp Banner</CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add PopUp Banner
                                        </Button>
                                    </div>

                                    {props.get_all_popup_data ? props.get_all_popup_data.length > 0 ? <DatatableTablesWorking products={props.get_all_popup_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_popup_data?._id} /> : null : null}

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
                                <label className="form-label" htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" placeholder="Enter title" required name="title" value={addInfo.title} onChange={handleAddInputs} />
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

                            <div className="mb-3">
                                <div className="form-check">
                                    <label className="form-label" htmlFor="cancellable">Cancellable </label>
                                    <input type="checkbox" className="form-check-input" id="cancellable" checked={addInfo.cancellable} name="cancellable" onChange={handleAddCheckBox} />

                                </div>
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
                        <form className="mt-1" onSubmit={handleEdit} >

                            <div className="mb-3">
                                <label className="form-label" htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" placeholder="Enter title" required name="title" value={editInfo.title} onChange={handleEditInputs} />
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

                            <div className="mb-3">
                                <div className="form-check">
                                    <label className="form-label" htmlFor="cancellable">Cancellable</label>
                                    <input type="checkbox" className="form-check-input" id="cancellable" checked={editInfo.cancellable} name="cancellable" onChange={handleEditCheckBox} />

                                </div>
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
        add_popup_data,
        add_popup_error,
        add_popup_loading,

        get_all_popup_data,
        get_all_popup_error,
        get_all_popup_loading,

        popup_edit_data,
        popup_edit_loading,

        popup_status_edit_data,
        popup_status_edit_loading,

        popup_delete_loading

    } = state.Popup;

    return {
        add_popup_data,
        add_popup_error,
        add_popup_loading,

        get_all_popup_data,
        get_all_popup_error,
        get_all_popup_loading,

        popup_edit_data,
        popup_edit_loading,

        popup_status_edit_data,
        popup_status_edit_loading,

        popup_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addPopUpAction,
            addPopUpFresh,
            getAllPopUpAction,
            getAllPopUpFresh,
            popUpUpdateAction,
            popUpUpdateFresh,
            popUpStatusUpdateAction,
            popUpStatusUpdateFresh,
            popUpDeleteAction,
            popUpDeleteFresh,
        })(Popup)
);