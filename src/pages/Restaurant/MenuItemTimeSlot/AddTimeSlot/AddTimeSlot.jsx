import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addOnsCategoryAction, addOnCategoryAddFresh } from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { useLocation, useNavigate } from 'react-router-dom';

function AddTimeSlot(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: location.state ? location.state.name : "",
    })
    const addOnsTemplate = { start_time: "", end_time: "" }
    const [addOns, setAddOns] = useState(location.state ? location.state.preset_add_ons : [addOnsTemplate]);
    const handleAddOnsCat = (e, index) => {
        console.log(index);
        const updatedValue = addOns.map((row, i) => index === i ? Object.assign(row, { [e.target.name]: e.target.value }) : row);
        setAddOns(updatedValue)

    }
    function handleAddRowNested() {
        setAddOns([...addOns, addOnsTemplate]);
    }
    const handleRowDelete = (index) => {
        const filteredTime = [...addOns];
        if (filteredTime.length > 1) {
            filteredTime.splice(index, 1);
            setAddOns(filteredTime)
        }

    }

    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setCategory({ ...category, [name]: value })

    }

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }
    const handleChange = () => {

        setChecked(!checked);

    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(category);
        console.log(isChecked);
        const val = uuidv4();
        props.addOnsCategoryAction(val, category, isChecked, addOns)
    }
    useEffect(() => {
        if (props.add_ons_category_loading == "Success") {
            navigate("/addons-category")
            props.addOnCategoryAddFresh();
        }

    }, [props.get_all_restaurant_loading, props.add_ons_category_loading]);

    console.log(props.get_all_restaurant_data);

    console.log(props.add_ons_category_data);
    console.log(location.state);
    console.log(props.add_ons_category_loading);

    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Menu Time Slot" breadcrumbItem="Add Menu Time Slot" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Add Menu Time Slot </CardTitle>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-10 mx-auto">
                            <form className="mt-0" onSubmit={handleFormSubmit}>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Slot Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter slot name" name="name" onChange={handleInputs} value={category.name ?? ""} />
                                    </div>
                                </Row>



                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Menu Availability
                                    </label>

                                    <div className="col-md-10">


                                        {addOns.map((row, idx) => (
                                            <React.Fragment key={idx}>
                                                <div data-repeater-list="group-a" id={"addr" + idx}>
                                                    <div data-repeater-item className="row">

                                                        <div className="mb-3 col-lg-3">
                                                            <label className="form-label" htmlFor="startTime">Start Time</label>
                                                            <input type="time" id="startTime" className="form-control" name="start_time" placeholder="Add-ons name" value={row.start_time} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                        </div>

                                                        <div className="mb-3 col-lg-3">
                                                            <label className="form-label" htmlFor="subject">End Time</label>
                                                            <input type="time" id="subject" className="form-control" name="end_time" placeholder="Price" value={row.end_time} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                        </div>


                                                        <Col lg={2} className="align-self-center d-grid mt-3">
                                                            <input data-repeater-delete type="button" className="btn btn-primary" value="Delete" onClick={() => (handleRowDelete(idx))} />
                                                        </Col>
                                                    </div>

                                                </div>
                                            </React.Fragment>
                                        ))}
                                        <Button
                                            onClick={() => {
                                                handleAddRowNested();
                                            }}
                                            color="success"
                                            className="btn btn-success mt-3 mt-lg-0"
                                        >
                                            Add
                                        </Button>



                                    </div>

                                </Row>

                                {/* ==================restaurant time================= */}


                                <div className="mb-3 row">
                                    <div className="col-12 text-end">
                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Submit</button>
                                    </div>
                                </div>



                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = state => {

    const {

        add_ons_category_data,
        add_ons_category_error,
        add_ons_category_loading,

    } = state.Restaurant;

    return {
        add_ons_category_data,
        add_ons_category_error,
        add_ons_category_loading,

    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addOnsCategoryAction,
            addOnCategoryAddFresh
        })(AddTimeSlot)
);