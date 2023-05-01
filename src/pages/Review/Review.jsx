import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    addReviewAction, addReviewFresh, getAllReviewAction, getAllReviewFresh, reviewUpdateAction, reviewUpdateFresh, reviewStatusUpdateAction, reviewStatusUpdateFresh, reviewDeleteAction, reviewDeleteFresh
} from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";


function Review(props) {

    document.title = "Review & Ratings | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);

    // const [addInfo, setAddInfo] = useState({
    //     title: "",
    //     description: "",
    //     cancellable: true,
    //     image: "",
    //     is_active: true,
    // });

    const [editInfo, setEditInfo] = useState({
        _id: "",
        rating: 0,
        review: "",
        is_active: true,
    });

    const [deleteItem, setDeleteItem] = useState();


    let name, value, checked;
    // const handleAddInputs = (e) => {
    //     // console.log(e);
    //     name = e.target.name;
    //     value = e.target.value;
    //     setAddInfo({ ...addInfo, [name]: value });
    // }

    // const handleAddFile = (e) => {
    //     setAddInfo({
    //         ...addInfo,
    //         image: e.target.value,
    //     });
    // }


    // const handleAddCheckBox = (e) => {
    //     // console.log(e);
    //     name = e.target.name;
    //     checked = e.target.checked;
    //     setAddInfo({ ...addInfo, [name]: checked });
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     props.addReviewAction(addInfo);
    // }

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
            rating: row.rating,
            review: row.review,
            rest_id: row.rest_id,
            order_id: row.order_id,
            user_id: row.user_id,
            name: row.user_name,
            is_active: row.is_active,
        }));

        toggleEditModal();
    }

    const handleEdit = (e) => {
        e.preventDefault();
        props.reviewUpdateAction(editInfo);
    }

    const handleStatusModal = (row) => {
        setEditInfo(row);
        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(editInfo);
        props.reviewStatusUpdateAction({
            ...editInfo,
            is_active: !editInfo.is_active,
        })

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        props.reviewDeleteAction(deleteItem);
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
            dataField: "rest_name",
            text: "Restaurant",
            sort: true,
        },
        {
            dataField: "order_id",
            text: "Order ID",
            sort: true,
        },
        {
            dataField: "user_name",
            text: "User Name",
            sort: true,
        },
        {
            dataField: "rating",
            text: "Ratings",
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


        if (props.get_all_review_loading == false) {
            props.getAllReviewAction();
        }


        if (props.add_review_loading === "Success") {
            toast.success("Review Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                title: "",
                description: "",
                cancellable: true,
                image: "",
                is_active: true,
            });
            props.addReviewFresh();
        }


        if (props.add_review_loading === "Failed") {
            toast.error("Something went wrong");
            props.addReviewFresh();

        }

        if (props.review_edit_loading === "Success") {
            toast.success("Review Updated");
            toggleEditModal();
            props.reviewUpdateFresh();
        }

        if (props.review_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.reviewUpdateFresh();

        }

        if (props.review_status_edit_loading === "Success") {
            toast.success("Review Status Updated");
            toggleStatus();
            props.reviewStatusUpdateFresh();

        }

        if (props.review_status_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.reviewStatusUpdateFresh();

        }

        if (props.review_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Review Banner Deleted");
            toggleDel();
            props.reviewDeleteFresh();
        }

    }, [props.add_review_loading, props.review_edit_loading,
    props.review_delete_loading, props.review_status_edit_loading]);


    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Review" breadcrumbItem="Review & Ratings" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Review & Ratings</CardTitle>
                                        {/* <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Review & Ratings
                                        </Button> */}
                                    </div>

                                    {props.get_all_review_data ? props.get_all_review_data.length > 0 ? <DatatableTablesWorking products={props.get_all_review_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_review_data?._id} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* ============ create modal start=============== */}
                {/* <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>New Review Banner</ModalHeader>
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
                </Modal> */}
                {/* ============ create modal end=============== */}

                {/* ============ edit modal start=============== */}
                <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
                    <ModalHeader >Edit Review Banner</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEdit} >

                            <div className="mb-3">
                                <label className="form-label" htmlFor="rating">Title</label>
                                <input type="text" className="form-control" id="rating" placeholder="Enter rating" required name="rating" value={editInfo.rating} onChange={handleEditInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="review">Review</label>
                                <textarea className="form-control" id="review"
                                    placeholder="Enter review" name="review" onChange={handleEditInputs} value={editInfo.review} required></textarea>
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
        add_review_data,
        add_review_error,
        add_review_loading,

        get_all_review_data,
        get_all_review_error,
        get_all_review_loading,

        review_edit_data,
        review_edit_loading,

        review_status_edit_data,
        review_status_edit_loading,

        review_delete_loading

    } = state.Review;

    return {
        add_review_data,
        add_review_error,
        add_review_loading,

        get_all_review_data,
        get_all_review_error,
        get_all_review_loading,

        review_edit_data,
        review_edit_loading,

        review_status_edit_data,
        review_status_edit_loading,

        review_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addReviewAction,
            addReviewFresh,
            getAllReviewAction,
            getAllReviewFresh,
            reviewUpdateAction,
            reviewUpdateFresh,
            reviewStatusUpdateAction,
            reviewStatusUpdateFresh,
            reviewDeleteAction,
            reviewDeleteFresh,
        })(Review)
);