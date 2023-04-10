
import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';



function Menu(props) {

    const [modalDel, setModalDel] = useState(false);

    const toggleDel = () => setModalDel(!modalDel);

    const handleDelete = () => {
        toggleDel();
        console.log(deleteItem)
        props.cityDeleteAction(deleteItem);
    }
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



    const statusRef = (cell, row) => <Badge color="success" style={{ padding: "8px" }}>Activate</Badge>


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
            dataField: "hello",
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
        if (props.get_all_restaurant_loading == false) {
            props.getAllRestaurantAction();
        }

    }, [props.get_all_restaurant_loading]);

    console.log(props.get_all_restaurant_data);
    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Restaurant" breadcrumbItem="Manage Restaurant Menu" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Menu </CardTitle>
                                        <Link to="/add-menu">
                                            <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}>
                                                Add Menu
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* {props.get_all_restaurant_data ? props.get_all_restaurant_data.length > 0 ? <DatatableTablesWorking products={props.get_all_restaurant_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_restaurant_data?._id} /> : null : null} */}

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


    } = state.Restaurant;

    return {

    };
};

export default withRouter(
    connect(mapStateToProps,
        {

        })(Menu)
);