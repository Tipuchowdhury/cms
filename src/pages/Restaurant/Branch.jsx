
import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
    getAllBranchAction, branchStatusEditAction, editBranchStatusFresh, branchPopularEditAction, editBranchPopularFresh, branchDeleteAction, branchDeleteFresh
} from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Branch(props) {

    const [statusInfo, setStatusInfo] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);

    const [isPopular, setIsPopular] = useState(false);;
    const [isPopularModal, setIsPopularModal] = useState(false);
    const togglePopularModal = () => setIsPopularModal(!isPopularModal);

    const [deleteItem, setDeleteItem] = useState()
    const [modalDel, setModalDel] = useState(false);

    const toggleDel = () => setModalDel(!modalDel);

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }

    const handleDelete = () => {
        // toggleDel();
        console.log(deleteItem)
        props.branchDeleteAction(deleteItem);
    }

    const handleStatusModal = row => {
        setStatusInfo(row)

        toggleStatus()
    }

    const handlePopularModal = row => {
        setIsPopular(row)

        togglePopularModal()
    }

    const handleStatusUpdate = () => {
        props.branchStatusEditAction({
            ...statusInfo,
            image: null,
            cover_image: null,
            is_active: !statusInfo.is_active,
        })
    }

    const handlePopularUpdate = () => {
        props.branchPopularEditAction({
            ...isPopular,
            image: null,
            cover_image: null,
            is_popular: !isPopular.is_popular,
        })
    }

    const navigate = useNavigate();
    const handleEditBranch = (row) => {
        console.log(row);
        navigate("/branch-add", { state: row })
    }

    const actionRef = (cell, row) =>
        <div style={{ display: "flex", gap: 10 }}>
            <Button
                color="primary"
                className="btn btn-primary waves-effect waves-light"
                onClick={() => handleEditBranch(row)}
            >
                Edit
            </Button>{" "}
            <Button color="danger" className="btn btn-danger waves-effect waves-light"
                onClick={() => handleDeleteModal(row)} >
                Delete
            </Button>{" "}
        </div>



    // const statusRef = (cell, row) => <Badge color="success" style={{ padding: "12px" }}>Activate</Badge>
    // const statusRef = (cell, row) => <Badge color={row.is_active ? "success" : "secondary"} style={{ padding: "12px" }}>{row.is_active ? "Active" : "Deactivate"}</Badge>

    const statusRef = (cell, row) => (
        <Button
            color={row.is_active ? "success" : "secondary"}
            className="btn waves-effect waves-light"
            onClick={() => handleStatusModal(row)}
        >
            {row.is_active ? "Active" : "Deactivate"}
        </Button>
    )

    const popularRef = (cell, row) => (
        <Button
            color={row.is_popular ? "info" : "warning"}
            className="btn waves-effect waves-light"
            onClick={() => handlePopularModal(row)}
        >
            {row.is_popular ? "Popular" : "Regular"}
        </Button>
    )

    const activeData = [

        {
            dataField: "name",
            text: "Branch Name",
            sort: true,
        },
        // {
        //     //dataField: "",
        //     text: "Restaurant Name",
        //     sort: true,
        //     //formatter: statusRef
        // },
        {
            dataField: "phone_number",
            text: "Phone",
            sort: true,
            //formatter: actionRef,
        },
        {
            dataField: "is_active",
            text: "Status",
            sort: true,
            formatter: statusRef,
        },
        {
            dataField: "is_popular",
            text: "Popular/Regular",
            sort: true,
            formatter: popularRef,
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
            dataField: "name",
            order: "desc"
        }
    ];


    useEffect(() => {
        if (props.get_all_branch_loading == false) {
            props.getAllBranchAction();
        }

        if (props.edit_branch_status_loading === "Success") {
            toast.success("Branch Status Updated Successfully");
            toggleStatus();
            props.editBranchStatusFresh();
        }

        if (props.edit_branch_status_loading === "Failed") {
            toast.error("Something went wrong");
            props.editBranchStatusFresh()
        }

        if (props.edit_branch_popular_loading === "Success") {
            toast.success("Branch Type Updated Successfully");
            togglePopularModal();
            props.editBranchPopularFresh();
        }

        if (props.edit_branch_popular_loading === "Failed") {
            toast.error("Something went wrong");
            props.editBranchPopularFresh();
        }

        if (props.branch_delete_loading === "Success") {
            toast.success("Branch Deleted Successfully");
            toggleDel();
            props.branchDeleteFresh();
        }
    }, [props.get_all_branch_loading, props.edit_branch_status_loading, props.edit_branch_popular_loading, props.branch_delete_loading]);

    console.log(props.get_all_branch_data);
    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Branch" breadcrumbItem="Manage Branch" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Branch </CardTitle>
                                        <Link to="/branch-add">
                                            <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} >
                                                Add Branch
                                            </Button>
                                        </Link>
                                    </div>
                                    {props.get_all_branch_data ? props.get_all_branch_data.length > 0 ? <DatatableTablesWorking products={props.get_all_branch_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_branch_data?._id} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>


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

                {/* ============ status update modal starts=============== */}
                <Modal isOpen={modalStatusUpdate} toggle={toggleStatus} centered>
                    <ModalHeader className="text-center" style={{ textAlign: "center", margin: "0 auto" }} >
                        <div className="icon-box">
                            <i
                                className="fa fa-exclamation-circle"
                                style={{ color: "#DCA218", fontSize: "40px" }}
                            ></i>
                        </div>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>
                        Do you want to {statusInfo.is_active ? "deactivate" : "activate"} this
                        record?{" "}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleStatus}>
                            Cancel
                        </Button>{" "}
                        <Button color="primary" onClick={handleStatusUpdate}>
                            Update
                        </Button>
                    </ModalFooter>
                </Modal>
                {/* ============ status update modal ends=============== */}

                {/* ============ status update modal starts=============== */}
                <Modal isOpen={isPopularModal} toggle={togglePopularModal} centered>
                    <ModalHeader className="text-center" style={{ textAlign: "center", margin: "0 auto" }} >
                        <div className="icon-box">
                            <i
                                className="fa fa-exclamation-circle"
                                style={{ color: "#DCA218", fontSize: "40px" }}
                            ></i>
                        </div>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>
                        Do you want to {isPopular.is_popular ? "regular" : "popular"} this
                        record?{" "}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={togglePopularModal}>
                            Cancel
                        </Button>{" "}
                        <Button color="primary" onClick={handlePopularUpdate}>
                            Update
                        </Button>
                    </ModalFooter>
                </Modal>
                {/* ============ status update modal ends=============== */}
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = state => {

    const {

        get_all_branch_loading,
        get_all_branch_data,
        edit_branch_status_loading,
        edit_branch_popular_loading,
        branch_delete_loading
    } = state.Restaurant;

    return {
        get_all_branch_loading,
        get_all_branch_data,
        edit_branch_status_loading,
        edit_branch_popular_loading,
        branch_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            getAllBranchAction,
            branchStatusEditAction,
            editBranchStatusFresh,
            branchPopularEditAction,
            editBranchPopularFresh,
            branchDeleteAction,
            branchDeleteFresh
        })(Branch)
);