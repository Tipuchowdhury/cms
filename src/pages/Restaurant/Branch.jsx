
import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { getAllBranchAction } from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';


function Branch(props) {


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



    const statusRef = (cell, row) => <Badge color="success" style={{ padding: "12px" }}>Activate</Badge>


    const activeData = [

        {
            dataField: "name",
            text: "Branch Name",
            sort: true,
        },
        {
            //dataField: "",
            text: "Restaurant Name",
            sort: true,
            //formatter: statusRef
        },
        {
            dataField: "phone_number",
            text: "Phone",
            sort: true,
            //formatter: actionRef,
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
    }, [props.get_all_branch_loading]);

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
                {/* <Modal isOpen={modalDel} toggle={toggleDel} centered>
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
                </Modal> */}
                {/* ============ delete modal ends=============== */}
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = state => {

    const {

        get_all_branch_loading,
        get_all_branch_data
    } = state.Restaurant;

    return {
        get_all_branch_loading,
        get_all_branch_data
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            getAllBranchAction
        })(Branch)
);