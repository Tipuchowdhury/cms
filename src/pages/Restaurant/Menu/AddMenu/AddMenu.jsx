import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardSubtitle, Label, Input, Container, Row, Col, Form } from 'reactstrap';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import { connect } from "react-redux";
import withRouter from 'components/Common/withRouter';
import { useEffect } from 'react';
import { getAllRestaurantAction, getAllBranchAction, addRestaurantMenuAction, addRestaurantMenuAddFresh, getAllAddOnsCategoryAction } from 'store/actions';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { boolean } from 'yup';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { useLocation, useNavigate } from 'react-router-dom';

const LoadingContainer = () => <div>Loading...</div>;



function AddMenu(props) {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        name: "",
        menu_description: "",
        menu_grp_name: "",
        restaurant: "",
        category: "",
        Variation_group_name: "",
        Variation_grp_desc: "",
        check_add_ons: "",
        is_popular: "true",
        is_delivery: "true",
        is_pickup: "true",
        is_dine: "true",
        menu_price: "",
        pickup_menu_price: "",
        vat: "",
        sd: "",

    })

    const [file, setFile] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [addVariation, setAddVariation] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    // get all branch
    console.log(props.get_all_branch_data);
    let branchData = undefined;
    if (props.get_all_branch_data?.length > 0) {
        branchData = props.get_all_branch_data?.map((item, key) => (
            <option key={item._id} value={item._id}>
                {item.name}
            </option>
        ));
    }

    // get all category
    console.log(props.get_all_addOns_category_data);
    let categoryData = undefined;
    if (props.get_all_addOns_category_data?.length > 0) {
        categoryData = props.get_all_addOns_category_data?.map((item, key) => (
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
    const addOnsTemplate = { addOnName: "", price: "", group: info.Variation_group_name, desc: info.Variation_grp_desc }
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

    // ** here is all value for "Add Ad-ons Modal"
    // *********************** start from here ****************************
    const [addAddOns, setAddAddOns] = useState({
        category: "",
        num_of_choice_new: ""
    });
    const [isCheckAddOns, setIsCheckAddOns] = useState(false);


    const checkHandlerAddOns = () => {
        setIsCheckAddOns(!isCheckAddOns)
    }
    const addOnsTemplateNew = { add_on_name: "", add_on_price: "" }
    const [addOnsNew, setAddOnsNew] = useState([addOnsTemplateNew]);
    const handleAddOnsCatNew = (e, index) => {
        console.log(index);
        const updatedValue = addOns.map((row, i) => index === i ? Object.assign(row, { [e.target.name]: e.target.value }) : row);
        setAddOnsNew(updatedValue)

    }
    function handleAddRowNested() {
        setAddOnsNew([...addOns, addOnsTemplateNew]);
    }
    const handleRowDeleteNew = (index) => {
        const filteredTime = [...addOns];
        if (filteredTime.length > 1) {
            filteredTime.splice(index, 1);
            setAddOnsNew(filteredTime)
        }

    }
    let addAddOnName, addAddOnValue;
    const handleInputsAddOns = (e) => {
        addAddOnName = e.target.name;
        addAddOnValue = e.target.value;
        setAddAddOns({ ...info, [addAddOnName]: addAddOnValue })

    }

    // ************************ ends here ********************************
    const handleAddMenu = (e) => {
        e.preventDefault();
        console.log(info);
        console.log(isChecked);
        const val = uuidv4();
        props.addRestaurantMenuAction(val, info, isChecked);
    }

    useEffect(() => {
        // if (props.get_all_restaurant_loading == false) {
        //     props.getAllRestaurantAction();
        // }

        if (props.get_all_branch_loading == false) {
            props.getAllBranchAction();
        }
        if (props.get_all_addOns_category_loading == false) {
            props.getAllAddOnsCategoryAction();
        }


        if (props.add_restaurant_menu_loading === "Success") {
            navigate("/menu")
            props.addRestaurantMenuAddFresh();
        }
    }, [props.get_all_branch_loading, props.get_all_addOns_category_loading, props.add_restaurant_menu_loading]);

    console.log(props.get_all_restaurant_data);
    console.log(props.get_all_branch_data);


    return (

        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Menu" breadcrumbItem="Add Menu" />

                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>{location.state ? "Edit Menu" : "Add a New Menu"} </CardTitle>

                                    </div>
                                    {/* {props.get_all_restaurant_data ? props.get_all_restaurant_data.length > 0 ? <DatatableTablesWorking products={props.get_all_restaurant_data}
                                    columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_restaurant_data?._id} /> : null : null} */}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-10 mx-auto">
                            <form className="mt-4" onSubmit={handleAddMenu} >

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Menu Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter menu name" name="name" onChange={handleInputs} value={info.name ?? ""} required />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Menu Group Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter menu name" name="menu_grp_name" onChange={handleInputs} value={info.menu_grp_name ?? ""} required />
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
                                        <input type="text" className="form-control" id="name" placeholder="Enter menu name" name="menu_description" onChange={handleInputs} value={info.menu_description ?? ""} required />
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
                                        <input type="text" className="form-control" id="name" placeholder="Enter menu price" name="menu_price" onChange={handleInputs} value={info.menu_price ?? ""} required />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Pickup Menu Price
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="name" placeholder="Enter menu price" name="pickup_menu_price" onChange={handleInputs} value={info.pickup_menu_price ?? ""} required />
                                    </div>
                                </Row>

                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Variation Group Name
                                    </label>
                                    <div className="col-md-10">
                                        <input type="text" className="form-control" id="Variation_group_name" placeholder="Enter variation name" name="Variation_group_name" onChange={handleInputs} value={info.Variation_group_name ?? ""} required />
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
                                        <input type="text" className="form-control" id="Variation_grp_desc" placeholder="Enter variation name" name="Variation_grp_desc" onChange={handleInputs} value={info.Variation_grp_desc ?? ""} required />
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
                                        <input type="checkbox" id="cat_is_multiple" name="cat_is_multiple" checked={isChecked} onChange={checkHandler} value="true" style={{ margin: "15px 5px 20px 0px" }} required />

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

                                                            <div className="mb-3 col-lg-2">
                                                                <label className="form-label" htmlFor="startTime">Variation Name</label>
                                                                <input type="text" id="startTime" className="form-control" name="addOnName" placeholder="Variation name" value={row.addOnName} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                            </div>

                                                            <div className="mb-3 col-lg-2">
                                                                <label className="form-label" htmlFor="subject">Variation Price</label>
                                                                <input type="number" id="subject" className="form-control" name="price" placeholder="Price" value={row.price} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                            </div>

                                                            <div className="mb-3 col-lg-2">
                                                                <label className="form-label" htmlFor="subject">Group Name</label>
                                                                <input type="text" className="form-control" id="Variation_group_name" placeholder="Enter variation name" name="Variation_group_name" value={info.Variation_group_name ?? ""} />
                                                            </div>


                                                            <div className="mb-3 col-lg-2">
                                                                <label className="form-label" htmlFor="subject">Description</label>
                                                                <input type="text" className="form-control" id="Variation_grp_desc" placeholder="Enter variation name" name="Variation_grp_desc" value={info.Variation_grp_desc ?? ""} />
                                                            </div>


                                                            <div className="mb-3 col-lg-2">
                                                                {addOns?.length == 1 ? "" :


                                                                    <i className="fas fa-times me-1" size={20} style={{ color: "red", marginTop: "40px", cursor: "pointer" }} onClick={() => (handleRowDelete(idx))}></i>

                                                                }
                                                            </div>
                                                            <div className="mb-3 col-lg-2">



                                                                <input data-repeater-delete type="button" className="btn btn-primary" value="Add Ad ons" style={{ marginTop: "30px", cursor: "pointer" }} onClick={toggle} />


                                                            </div>
                                                            {/* <Col lg={2} className="align-self-center d-grid mt-3">
                                                                <input data-repeater-delete type="button" className="btn btn-primary" value="Add Ad ons" onClick={() => (handleRowDelete(idx))} />
                                                            </Col> */}

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
                                        Delivery
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_delivery"
                                                autoComplete="off"
                                                name="is_delivery" onChange={handleInputs} value="true"
                                                checked={info.is_delivery == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_delivery"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_delivery" onChange={handleInputs} value="false"
                                                id="is_delivery1"
                                                autoComplete="off"
                                                checked={info.is_delivery == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_delivery1"
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
                                        Pickup
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_pickup"
                                                autoComplete="off"
                                                name="is_pickup" onChange={handleInputs} value="true"
                                                checked={info.is_pickup == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_pickup"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_pickup" onChange={handleInputs} value="false"
                                                id="is_pickup1"
                                                autoComplete="off"
                                                checked={info.is_pickup == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_pickup1"
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
                                        Dine
                                    </label>
                                    <div className="col-md-10">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id="is_dine"
                                                autoComplete="off"
                                                name="is_dine" onChange={handleInputs} value="true"
                                                checked={info.is_dine == "true"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_dine"
                                            >
                                                Yes
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="is_dine" onChange={handleInputs} value="false"
                                                id="is_dine1"
                                                autoComplete="off"
                                                checked={info.is_dine == "false"}
                                            />
                                            <label
                                                className="btn btn-outline-secondary"
                                                htmlFor="is_dine1"
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
                                            required
                                        >
                                            <option>Choose...</option>
                                            {branchData}
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
                                            required
                                        >
                                            <option>Choose...</option>
                                            {categoryData}
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
                                        <input type="number" className="form-control" id="vat" placeholder="Enter vat amount" name="vat" onChange={handleInputs} value={info.vat ?? ""} required />
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
                                        <input type="number" className="form-control" id="sd" placeholder="Enter sd amount" name="sd" onChange={handleInputs} value={info.sd ?? ""} required />
                                    </div>
                                </Row>






                                <div className="mb-3 row">
                                    <div className="col-12 text-end">
                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">{location.state ? "Edit Menu" : "Add Menu"}</button>
                                    </div>
                                </div>



                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Add Addon</ModalHeader>
                <ModalBody>
                    <form>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="username">Category</label>
                            <Input
                                id="exampleSelect"
                                name="category"
                                value={addAddOns.category}
                                //required={true}
                                onChange={handleInputsAddOns}
                                type="select"
                            >
                                <option>Choose...</option>
                                {categoryData}
                            </Input>
                        </div>

                        <div className="col-md-12">

                            <input type="checkbox" id="cat_is_multiple" name="cat_is_multiple_add_ons" checked={isCheckAddOns} onChange={checkHandlerAddOns} value="true" style={{ margin: "15px 5px 20px 0px" }} />Multiple Selection

                            {addOnsNew.map((row, idx) => (
                                <React.Fragment key={idx}>
                                    <div data-repeater-list="group-a" id={"addr" + idx}>
                                        <div data-repeater-item className="row">

                                            <div className="mb-3 col-lg-4">
                                                <label className="form-label" htmlFor="startTime">Add-ons Name</label>
                                                <input type="text" id="startTime" className="form-control" name="add_on_name" placeholder="Add-ons name" value={row.add_on_name} onChange={(e) => handleAddOnsCatNew(e, idx)} />
                                            </div>

                                            <div className="mb-3 col-lg-4">
                                                <label className="form-label" htmlFor="subject">Price</label>
                                                <input type="number" id="subject" className="form-control" name="add_on_price" placeholder="Price" value={row.add_on_price} onChange={(e) => handleAddOnsCatNew(e, idx)} />
                                            </div>


                                            <Col lg={2} className="align-self-center d-grid mt-3">
                                                <input data-repeater-delete type="button" className="btn btn-primary" value="Delete" onClick={() => (handleRowDeleteNew(idx))} />
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

                            {isCheckAddOns ?
                                <div className="mt-4 col-lg-3">
                                    <label className="form-label" htmlFor="subject">Maximum required number of choice(s)</label>
                                    <input type="number" id="subject" className="form-control" placeholder="Enter number" name="num_of_choice_new" value={addAddOns.num_of_choice_new} onChange={handleInputsAddOns} />
                                </div>
                                : ""}


                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

//export default AddBranch;

const mapStateToProps = state => {
    const {
        get_all_restaurant_data,
        get_all_restaurant_loading,
        get_all_branch_loading,
        get_all_branch_data,
        get_all_addOns_category_data,
        get_all_addOns_category_loading,

        add_restaurant_menu_loading

    } = state.Restaurant;

    const {
        get_all_user_roles_data,
        get_all_user_roles_loading,

    } = state.registerNew;
    return {
        get_all_restaurant_data,
        get_all_restaurant_loading,

        get_all_branch_loading,
        get_all_branch_data,
        get_all_addOns_category_data,
        get_all_addOns_category_loading,

        add_restaurant_menu_loading
    };
};



export default withRouter(
    connect(mapStateToProps,
        {
            getAllRestaurantAction,
            getAllBranchAction,
            addRestaurantMenuAction,
            addRestaurantMenuAddFresh,
            getAllAddOnsCategoryAction
        })(AddMenu)
);