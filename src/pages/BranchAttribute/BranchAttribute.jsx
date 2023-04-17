
import Breadcrumbs from 'components/Common/Breadcrumb';
import withRouter from 'components/Common/withRouter';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import {
    addBranchAttributeAction, addBranchAttributeFresh, getAllBranchAttributeAction,
    getAllBranchAttributeFresh, branchAttributeUpdateAction, branchAttributeUpdateFresh, branchAttributeDeleteAction, branchAttributeDeleteFresh, branchAttributeStatusUpdateAction, branchAttributeStatusUpdateFresh
} from 'store/BranchAttribute/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { toast } from 'react-toastify';

function BranchAttribute(props) {

    document.title = "Branch Attribute | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);


    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);


    const [addInfo, setAddInfo] = useState({
        branchAttributeId: "",
        branchAttributeName: "",
    });


    const [editInfo, setEditInfo] = useState({
        branchAttributeId: "",
        branchAttributeName: "",
        isActive: true,
    });

    const [deleteItem, setDeleteItem] = useState();

    const [statusItem, setStatusItem] = useState({
        branchAttributeId: "",
        is_active: "",
    });

    let name, value, checked;
    const handleInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setAddInfo({ ...addInfo, [name]: value });
        setEditInfo({ ...editInfo, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const val = uuidv4();

        props.addBranchAttributeAction(addInfo);
    }

    const handleEditSubscriptionType = (row) => {
        // console.log(row);

        setEditInfo(prevState => ({
            branchAttributeId: row._id,
            branchAttributeName: row.name,
            isActive: row.is_active
        }));

        toggleEditModal();

    }

    const handleEdit = (e) => {
        console.log(e);
        e.preventDefault();
        props.branchAttributeUpdateAction(editInfo);

        //toggleEditModal();

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        // console.log(deleteItem)
        props.branchAttributeDeleteAction(deleteItem);
        // toggleDel();
    }

    const handleStatusModal = (row) => {
        setEditInfo(prevState => ({
            branchAttributeId: row._id,
            branchAttributeName: row.name,
            isActive: row.is_active
        }));

        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(statusItem);
        props.branchAttributeStatusUpdateAction(editInfo);
        // toggleDel();
    }


    const actionRef = (cell, row) =>
        <div style={{ display: "flex", gap: 10 }}>
            <Button
                color="primary"
                className="btn btn-primary waves-effect waves-light"
                onClick={() => handleEditSubscriptionType(row)}
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



    // const statusRef = (cell, row) => <Badge color={row.is_active ? "success" : "secondary"} style={{ padding: "12px" }}>{row.is_active ? "Active" : "Deactivate"}</Badge>

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
        if (props.get_all_branch_attribute_loading == false) {
            //console.log("I am in get all subscription type loading ")
            props.getAllBranchAttributeAction();
        }


        if (props.add_branch_attribute_loading === "Success") {
            toast.success("Branch Attribute Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                branchAttributeId: "",
                branchAttributeName: "",
            });
            props.addBranchAttributeFresh();
        }


        if (props.add_branch_attribute_loading === "Failed") {
            //console.log(props.add_branch_attribute_data);
            toast.error("Something went wrong");
            props.addBranchAttributeFresh();

        }

        if (props.branch_attribute_edit_loading === "Success") {
            toast.success("Branch Attribute Updated");
            toggleEditModal();
            props.branchAttributeUpdateFresh();

        }

        if (props.branch_attribute_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.branchAttributeUpdateFresh();

        }

        if (props.branch_attribute_status_edit_loading === "Success") {
            toast.success("Branch Attribute Status Updated");
            toggleStatus();
            props.branchAttributeStatusUpdateFresh();

        }

        if (props.branch_attribute_status_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.branchAttributeStatusUpdateFresh();

        }

        if (props.branch_attribute_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Branch Attribute Deleted");
            toggleDel();
            props.branchAttributeDeleteFresh();

        }


    }, [props.add_branch_attribute_loading, props.branch_attribute_edit_loading,
    props.branch_attribute_delete_loading, props.branch_attribute_status_edit_loading]);

    // console.log(props.get_all_branch_attribute_data);
    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle='Foodie' title='Branch' breadcrumbItem='Branch-Attribute' />
                    <Row>
                        <Col className='col-12'>
                            <Card>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Branch Attribute </CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Branch Attribute
                                        </Button>
                                    </div>

                                    {props.get_all_branch_attribute_data ? props.get_all_branch_attribute_data.length > 0 ? <DatatableTablesWorking products={props.get_all_branch_attribute_data}
                                        columnData={activeData} defaultSorted={defaultSorted} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* ============ create modal start=============== */}


                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>New Branch Attribute</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="branchAttributeName">Branch Attribute Name</label>
                                <input type="text" className="form-control" id="branchAttributeName" placeholder="Enter branch attribute name" required name="branchAttributeName" value={addInfo.branchAttributeName} onChange={handleInputs} />
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
                    <ModalHeader >Edit Subscription Type</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEdit} >

                            <div className="mb-3">
                                <label className="form-label" htmlFor="branchAttributeName">Branch Attribute Name</label>
                                <input type="text" className="form-control" id="branchAttributeName" placeholder="Enter branch attribute name" required name="branchAttributeName" onChange={handleInputs} value={editInfo.branchAttributeName} />
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
        add_branch_attribute_data,
        add_branch_attribute_error,
        add_branch_attribute_loading,

        get_all_branch_attribute_data,
        get_all_branch_attribute_error,
        get_all_branch_attribute_loading,

        branch_attribute_edit_data,
        branch_attribute_edit_loading,

        branch_attribute_status_edit_data,
        branch_attribute_status_edit_loading,

        branch_attribute_delete_loading

    } = state.BranchAttribute;

    return {
        add_branch_attribute_data,
        add_branch_attribute_error,
        add_branch_attribute_loading,

        get_all_branch_attribute_data,
        get_all_branch_attribute_error,
        get_all_branch_attribute_loading,

        branch_attribute_edit_data,
        branch_attribute_edit_loading,

        branch_attribute_status_edit_data,
        branch_attribute_status_edit_loading,

        branch_attribute_delete_loading

    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addBranchAttributeAction,
            addBranchAttributeFresh,
            getAllBranchAttributeAction,
            getAllBranchAttributeFresh,
            branchAttributeUpdateAction,
            branchAttributeUpdateFresh,
            branchAttributeDeleteAction,
            branchAttributeDeleteFresh,
            branchAttributeStatusUpdateAction,
            branchAttributeStatusUpdateFresh
        })(BranchAttribute)
);