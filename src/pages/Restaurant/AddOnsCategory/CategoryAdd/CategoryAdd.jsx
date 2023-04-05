import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { restaurantAddAction, getAllRestaurantAction, restaurantNameUpdateAction } from 'store/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';

function CategoryAdd(props) {
    const [category, setCategory] = useState({
        name: "",
        add_on_category_desc: "",
        num_of_choice: ""


    })
    const [checked, setChecked] = useState(false);
    const addOnsTemplate = { addOnName: "", price: "" }
    const [addOns, setAddOns] = useState([addOnsTemplate]);
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
    const handleChange = () => {

        setChecked(!checked);

    };
    // useEffect(() => {
    //     if (props.get_all_restaurant_loading == false) {
    //         props.getAllRestaurantAction();
    //     }

    // }, [props.get_all_restaurant_loading]);

    // console.log(props.get_all_restaurant_data);
    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Add-ons Category" breadcrumbItem="Add Add-ons Category" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Add-ons Category </CardTitle>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-10 mx-auto">
                            <form className="mt-0" action="#">
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Category Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter branch name" name="name" onChange={handleInputs} value={category.name ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Category Description
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter category description" name="add_on_category_desc" onChange={handleInputs} value={category.add_on_category_desc ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Preser Addons
                                    </label>

                                    <div className="col-md-10">

                                        <input type="checkbox" id="cat_is_multiple" name="cat_is_multiple" onChange={handleInputs} value="true" style={{ margin: "15px 5px 20px 0px" }} />Multiple Selection

                                        {addOns.map((row, idx) => (
                                            <React.Fragment key={idx}>
                                                <div data-repeater-list="group-a" id={"addr" + idx}>
                                                    <div data-repeater-item className="row">

                                                        <div className="mb-3 col-lg-3">
                                                            <label className="form-label" htmlFor="startTime">Add-ons Name</label>
                                                            <input type="text" id="startTime" className="form-control" name="addOnName" placeholder="Add-ons name" value={row.addOnName} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                        </div>

                                                        <div className="mb-3 col-lg-3">
                                                            <label className="form-label" htmlFor="subject">Price</label>
                                                            <input type="number" id="subject" className="form-control" name="price" placeholder="Price" value={row.price} onChange={(e) => handleAddOnsCat(e, idx)} />
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

                                        {checked ?
                                            <div className="mt-4 col-lg-3">
                                                <label className="form-label" htmlFor="subject">Maximum required number of choice(s)</label>
                                                <input type="checkbox" id="subject" className="form-control" placeholder="Enter number" name="num_of_choice" onChange={handleChange} value="true" />
                                            </div>

                                            : ""
                                        }

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

        add_restaurant_data,
        add_restaurant_error,
        add_restaurant_loading,

        get_all_restaurant_data,
        get_all_restaurant_loading,
    } = state.Restaurant;

    return {
        add_restaurant_data,
        add_restaurant_error,
        add_restaurant_loading,

        get_all_restaurant_data,
        get_all_restaurant_loading,
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            restaurantAddAction,
            getAllRestaurantAction,
            restaurantNameUpdateAction
        })(CategoryAdd)
);