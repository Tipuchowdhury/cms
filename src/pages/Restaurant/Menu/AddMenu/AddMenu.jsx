import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardSubtitle, Label, Input, Container, Row, Col, Form } from 'reactstrap';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { connect } from "react-redux";
import withRouter from 'components/Common/withRouter';
import { useEffect } from 'react';
import { getAllRestaurantAction, getAllBranchAction } from 'store/actions';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { boolean } from 'yup';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { useLocation, useNavigate } from 'react-router-dom';

const LoadingContainer = () => <div>Loading...</div>;



function AddMenu(props) {

    const [info, setInfo] = useState({
        name: "",
        menu_description: "",
        restaurant: "",
        category: "",
        Variation_name: "",
        Variation_desc_name: "",
        check_add_ons: "",
        is_popular: "",
        menu_price: "",
        vat: "",
        sd: "",

    })

    const [file, setFile] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [addVariation, setAddVariation] = useState(false);
    // get all restaurant
    let restaurantData = undefined;
    if (props.get_all_branch_data?.length > 0) {
        restaurantData = props.get_all_branch_data?.map((item, key) => (
            <option key={item._id} value={item._id}>
                {item.name}
            </option>
        ));
    }

    function handleChange(event) {
        console.log(event.target.files[0])
        console.log("nooooooooooooooo")
        setFile(event.target.files[0])

    }
    const checkHandler = () => {
        setIsChecked(!isChecked)
    }
    const handleAddVariation = () => {
        setAddVariation(!addVariation);
    }

    //for variation start
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
    //for variation ends
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setInfo({ ...info, [name]: value })

    }
    // }
    useEffect(() => {
        // if (props.get_all_restaurant_loading == false) {
        //     props.getAllRestaurantAction();
        // }

        if (props.get_all_branch_loading == false) {
            props.getAllBranchAction();
        }


        // if (props.edit_branch_loading === "Success") {
        //     naviagte("/manage-branch")
        //     props.editBranchFresh();
        // }
    }, [props.get_all_restaurant_loading]);

    console.log(props.get_all_restaurant_data);
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
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>{location.state ? "Edit Branch" : "Add a New Branch"} </CardTitle>

                                    </div>
                                    {/* {props.get_all_restaurant_data ? props.get_all_restaurant_data.length > 0 ? <DatatableTablesWorking products={props.get_all_restaurant_data}
                                    columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_restaurant_data?._id} /> : null : null} */}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-10 mx-auto">
                            <form className="mt-4" action="#" >

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Menu Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter menu name" name="name" onChange={handleInputs} value={info.name ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Menu Description
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter menu name" name="menu_description" onChange={handleInputs} value={info.menu_description ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Menu Price
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter menu price" name="menu_price" onChange={handleInputs} value={info.menu_price ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Variation Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="Variation_name" placeholder="Enter variation name" name="Variation_name" onChange={handleInputs} value={info.Variation_name ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Variation Description
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="Variation_desc_name" placeholder="Enter variation name" name="Variation_desc_name" onChange={handleInputs} value={info.Variation_desc_name ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Image
                                    </label>
                                    <div className="col-md-10">
                                        <input type="file" className="form-control" id="resume" onChange={handleChange} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Check Add-Ons
                                    </label>
                                    <div className="col-md-10">
                                        <input type="checkbox" id="cat_is_multiple" name="cat_is_multiple" checked={isChecked} onChange={checkHandler} value="true" style={{ margin: "15px 5px 20px 0px" }} />

                                    </div>
                                </Row>
                                {isChecked ?

                                    <Row className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >

                                        </label>
                                        <div className="col-md-10">
                                            <input type="checkbox" id="cat_is_multiple" name="cat_is_multiple" checked={addVariation} onChange={handleAddVariation} value="true" style={{ margin: "15px 5px 20px 0px" }} />Add Variation
                                        </div>
                                    </Row>


                                    : ""}

                                {addVariation ? <>
                                    {addOns.map((row, idx) => (
                                        <Row className="mb-3">
                                            <label
                                                htmlFor="example-text-input"
                                                className="col-md-2 col-form-label"
                                            >

                                            </label>
                                            <div className="col-md-10">
                                                <React.Fragment key={idx}>
                                                    <div data-repeater-list="group-a" id={"addr" + idx}>
                                                        <div data-repeater-item className="row">

                                                            <div className="mb-3 col-lg-3">
                                                                <label className="form-label" htmlFor="startTime">Add-ons Name</label>
                                                                <input type="text" id="startTime" className="form-control" name="addOnName" placeholder="Variation name" value={row.addOnName} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                            </div>

                                                            <div className="mb-3 col-lg-3">
                                                                <label className="form-label" htmlFor="subject">Variation Price</label>
                                                                <input type="number" id="subject" className="form-control" name="price" placeholder="Price" value={row.price} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                            </div>

                                                            <div className="mb-3 col-lg-3">
                                                                <label className="form-label" htmlFor="subject">Variation Price</label>
                                                                <input type="number" id="subject" className="form-control" name="price" placeholder="Price" value={row.price} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                            </div>

                                                            <div className="mb-3 col-lg-3">
                                                                <label className="form-label" htmlFor="subject">Variation Price</label>
                                                                <input type="number" id="subject" className="form-control" name="price" placeholder="Price" value={row.price} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                            </div>

                                                            <Col lg={2} className="align-self-center d-grid mt-3">
                                                                <input data-repeater-delete type="button" className="btn btn-primary" value="Delete" onClick={() => (handleRowDelete(idx))} />
                                                            </Col>

                                                            {addOns?.length == 1 ? "" :
                                                                <Col lg={2} className="align-self-center d-grid mt-3">
                                                                    <input data-repeater-delete type="button" className="btn btn-primary" value="Delete" onClick={() => (handleRowDelete(idx))} />
                                                                </Col>
                                                            }

                                                        </div>


                                                    </div>
                                                </React.Fragment>
                                            </div>

                                        </Row>

                                    ))}
                                    <Row className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >

                                        </label>
                                        <div className="col-md-10">
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


                                </>

                                    :
                                    ""}
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Popular
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_popular"
                                                autoComplete="off"
                                                name="is_popular" onChange={handleInputs} value="true"
                                                checked={info.is_popular == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_popular"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_popular" onChange={handleInputs} value="false"
                                                id="is_popular1"
                                                autoComplete="off"
                                                checked={info.is_popular == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_popular1"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Restaurant Name
                                    </label>
                                    <div className="col-md-10">
                                        <Input
                                            id="exampleSelect"
                                            name="restaurant"
                                            value={info.restaurant}
                                            //required={true}
                                            onChange={handleInputs}
                                            type="select"
                                        >
                                            <option>Choose...</option>
                                            {restaurantData}
                                        </Input>
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Category
                                    </label>
                                    <div className="col-md-10">
                                        <Input
                                            id="exampleSelect"
                                            name="category"
                                            value={info.category}
                                            //required={true}
                                            onChange={handleInputs}
                                            type="select"
                                        >
                                            <option>Choose...</option>
                                            {restaurantData}
                                        </Input>
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Vat(%)
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number" className="form-control" id="vat" placeholder="Enter vat amount" name="vat" onChange={handleInputs} value={info.vat ?? ""} />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        SD(%)
                                    </label>
                                    <div className="col-md-10">
                                        <input type="number" className="form-control" id="sd" placeholder="Enter sd amount" name="sd" onChange={handleInputs} value={info.sd ?? ""} />
                                    </div>
                                </Row>






                                <div className="mb-3 row">
                                    <div className="col-12 text-end">
                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">{location.state ? "Edit Branch" : "Add Branch"}</button>
                                    </div>
                                </div>



                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

//export default AddBranch;

const mapStateToProps = state => {
    const {
        get_all_restaurant_data,
        get_all_restaurant_loading,
        get_all_branch_loading

    } = state.Restaurant;

    const {
        get_all_user_roles_data,
        get_all_user_roles_loading,

    } = state.registerNew;
    return {
        get_all_restaurant_data,
        get_all_restaurant_loading,

        get_all_branch_loading
    };
};



export default withRouter(
    connect(mapStateToProps,
        {
            getAllRestaurantAction,
            getAllBranchAction
        })(AddMenu)
);