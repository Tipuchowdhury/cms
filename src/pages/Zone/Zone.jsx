import React, { useEffect } from 'react'
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import AddZone from './AddZone/AddZone';
import { getAllZoneAction } from 'store/actions';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';

function Zone(props) {
    const navigate = useNavigate();
    const handleEdit = (row) => {
        console.log(row);
        navigate("/add-zone", { state: row })
    }
    const actionRef = (cell, row) =>
        <div style={{ display: "flex", gap: 10 }}>
            <Button
                color="primary"
                className="btn btn-primary waves-effect waves-light"
                onClick={() => handleEdit(row)}
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
            text: "Area Name",
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
        if (props.get_all_zone_loading == false) {
            props.getAllZoneAction();
        }

    }, [props.get_all_zone_loading]);
    console.log(props.get_all_zone_data);
    return (
        <React.Fragment>
            <ToastContainer />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Veltrix" title="Zone & City" breadcrumbItem="Zone" />

                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Zone </CardTitle>
                                        <Link to="/add-zone">
                                            <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} >
                                                Add Zone
                                            </Button>
                                        </Link>
                                    </div>
                                    {props.get_all_zone_data ? props.get_all_zone_data.length > 0 ? <DatatableTablesWorking products={props.get_all_zone_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_zone_data?._id} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

//export default Zone

const mapStateToProps = state => {

    const {
        get_all_zone_data,
        get_all_zone_error,
        get_all_zone_loading
    } = state.Restaurant;
    return {
        get_all_zone_data,
        get_all_zone_error,
        get_all_zone_loading
    };
};

export default withRouter(
    connect(mapStateToProps, {
        getAllZoneAction
    })(Zone)
);
