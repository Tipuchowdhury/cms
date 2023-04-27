
import Breadcrumbs from 'components/Common/Breadcrumb';
import withRouter from 'components/Common/withRouter';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import {
    addSubscriptionTypeAction, addSubscriptionTypeFresh, getAllSubscriptionTypeAction,
    getAllSubscriptionTypeFresh, subscriptionTypeUpdateAction, subscriptionTypeUpdateFresh, subscriptionTypeDeleteAction, subscriptionTypeDeleteFresh, subscriptionTypeStatusUpdateAction, subscriptionTypeStatusUpdateFresh
} from 'store/SubscriptionTypes/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { toast } from 'react-toastify';

function SubscriptionTypes(props) {

    document.title = "Subscription Types | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);


    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);


    const [addInfo, setAddInfo] = useState({
        subscriptionTypeId: "",
        subscriptionTypeName: "",
        freeDeliveryAmountLimit: 0,
        freeDeliveryOrderLimit: 0,
        pickupDiscountAmountLimit: 0,
        pickupDiscountOrderLimit: 0,
        deliveryFree: false,
        unlimitedFreeDelivery: false,
        pickupDiscount: false,
        unlimitedPickupDiscount: false
    });


    const [editInfo, setEditInfo] = useState({
        subscriptionTypeId: "",
        subscriptionTypeName: "",
        freeDeliveryAmountLimit: 0,
        freeDeliveryOrderLimit: 0,
        pickupDiscountAmountLimit: 0,
        pickupDiscountOrderLimit: 0,
        deliveryFree: false,
        unlimitedFreeDelivery: false,
        pickupDiscount: false,
        unlimitedPickupDiscount: false,
        isActive: true,
    });

    const [deleteItem, setDeleteItem] = useState();

    const [statusItem, setStatusItem] = useState({
        subscriptionTypeId: "",
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

    const handleCheckBox = (e) => {
        // console.log(e);
        name = e.target.name;
        checked = e.target.checked;
        setAddInfo({ ...addInfo, [name]: checked });
        setEditInfo({ ...editInfo, [name]: checked });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const val = uuidv4();

        props.addSubscriptionTypeAction(addInfo);
    }

    const handleEditSubscriptionType = (row) => {
        // console.log(row);

        setEditInfo(prevState => ({
            subscriptionTypeId: row._id,
            subscriptionTypeName: row.name,
            freeDeliveryAmountLimit: row.free_delivary_amount_limit,
            freeDeliveryOrderLimit: row.free_delivary_order_limit,
            pickupDiscountAmountLimit: row.pick_up_discount_amount_limit,
            pickupDiscountOrderLimit: row.pick_up_discount_order_limit,
            deliveryFree: row.is_delivary_free,
            unlimitedFreeDelivery: row.is_unlimited_free_delivary,
            pickupDiscount: row.is_has_pick_up_discount,
            unlimitedPickupDiscount: row.is_unlimited_pick_up_discount,
            isActive: row.is_active
        }));

        toggleEditModal();

    }

    const handleEdit = (e) => {
        e.preventDefault();
        props.subscriptionTypeUpdateAction(editInfo);

        //toggleEditModal();

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        // console.log(deleteItem)
        props.subscriptionTypeDeleteAction(deleteItem);
        // toggleDel();
    }

    const handleStatusModal = (row) => {
        setEditInfo(prevState => ({
            subscriptionTypeId: row._id,
            subscriptionTypeName: row.name,
            freeDeliveryAmountLimit: row.free_delivary_amount_limit,
            freeDeliveryOrderLimit: row.free_delivary_order_limit,
            pickupDiscountAmountLimit: row.pick_up_discount_amount_limit,
            pickupDiscountOrderLimit: row.pick_up_discount_order_limit,
            deliveryFree: row.is_delivary_free,
            unlimitedFreeDelivery: row.is_unlimited_free_delivary,
            pickupDiscount: row.is_has_pick_up_discount,
            unlimitedPickupDiscount: row.is_unlimited_pick_up_discount,
            isActive: row.is_active
        }));

        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(statusItem);
        props.subscriptionTypeStatusUpdateAction(editInfo);
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
        if (props.get_all_subscription_type_loading == false) {
            //console.log("I am in get all subscription type loading ")
            props.getAllSubscriptionTypeAction();
        }


        if (props.add_subscription_type_loading === "Success") {
            toast.success("Subscription Type Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                subscriptionTypeId: "",
                subscriptionTypeName: "",
                freeDeliveryAmountLimit: 0,
                freeDeliveryOrderLimit: 0,
                pickupDiscountAmountLimit: 0,
                pickupDiscountOrderLimit: 0,
                deliveryFree: false,
                unlimitedFreeDelivery: false,
                pickupDiscount: false,
                unlimitedPickupDiscount: false
            });
            props.addSubscriptionTypeFresh();
        }


        if (props.add_subscription_type_loading === "Failed") {
            //console.log(props.add_subscription_type_data);
            toast.error("Something went wrong");
            props.addSubscriptionTypeFresh();

        }

        if (props.subscription_type_edit_loading === "Success") {
            toast.success("Subscription Type Updated");
            toggleEditModal();
            props.subscriptionTypeUpdateFresh();

        }

        if (props.subscription_type_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.subscriptionTypeUpdateFresh();

        }

        if (props.subscription_type_status_edit_loading === "Success") {
            toast.success("Subscription Type Status Updated");
            toggleStatus();
            props.subscriptionTypeStatusUpdateFresh();

        }

        if (props.subscription_type_status_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.subscriptionTypeStatusUpdateFresh();

        }

        if (props.subscription_type_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Subscription Type Deleted");
            toggleDel();
            props.subscriptionTypeDeleteFresh();

        }


    }, [props.add_subscription_type_loading, props.subscription_type_edit_loading,
    props.subscription_type_delete_loading, props.subscription_type_status_edit_loading]);

    // console.log(props.get_all_subscription_type_data);
    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle='Foodi' title='Users' breadcrumbItem='Subscription-Types' />
                    <Row>
                        <Col className='col-12'>
                            <Card>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Subscription Types </CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Subscription Type
                                        </Button>
                                    </div>

                                    {props.get_all_subscription_type_data ? props.get_all_subscription_type_data.length > 0 ? <DatatableTablesWorking products={props.get_all_subscription_type_data}
                                        columnData={activeData} defaultSorted={defaultSorted} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* ============ create modal start=============== */}


                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>New Subscription Type</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="subscriptionTypeName">Subscription Type Name</label>
                                <input type="text" className="form-control" id="subscriptionTypeName" placeholder="Enter subscription type name" required name="subscriptionTypeName" value={addInfo.subscriptionTypeName} onChange={handleInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="freeDeliveryAmountLimit">Free Delivery Amount Limit</label>
                                <input type="number" className="form-control" id="freeDeliveryAmountLimit" placeholder="Enter free delivery amount limit" required name="freeDeliveryAmountLimit" value={addInfo.freeDeliveryAmountLimit} onChange={handleInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="freeDeliveryOrderLimit">Free Delivery Order Limit</label>
                                <input type="text" className="form-control" id="freeDeliveryOrderLimit" placeholder="Enter Free Delivery Order Limit" required value={addInfo.freeDeliveryOrderLimit} name="freeDeliveryOrderLimit" onChange={handleInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="pickupDiscountAmountLimit">Pickup Discount Amount Limit</label>
                                <input type="text" className="form-control" id="pickupDiscountAmountLimit" placeholder="Enter pickup discount amount limit" value={addInfo.pickupDiscountAmountLimit} required name="pickupDiscountAmountLimit" onChange={handleInputs} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="pickupDiscountOrderLimit">Pickup Discount Order Limit</label>
                                <input type="text" className="form-control" id="pickupDiscountOrderLimit" placeholder="Enter pickup discount order limit" required value={addInfo.pickupDiscountOrderLimit} name="pickupDiscountOrderLimit" onChange={handleInputs} />
                            </div>

                            <div className="mb-3 row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="deliveryFree">Delivery Free</label>
                                        <input type="checkbox" className="form-check-input" id="deliveryFree" checked={addInfo.deliveryFree} name="deliveryFree" onChange={handleCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="unlimitedFreeDelivery">Unlimited Free Delivery</label>
                                        <input type="checkbox" className="form-check-input" id="unlimitedFreeDelivery" checked={addInfo.unlimitedFreeDelivery} name="unlimitedFreeDelivery" onChange={handleCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="pickupDiscount">Pickup Discount</label>
                                        <input type="checkbox" className="form-check-input" id="pickupDiscount" checked={addInfo.pickupDiscount} name="pickupDiscount" onChange={handleCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="unlimitedPickupDiscount">Unlimited Pickup Discount</label>
                                        <input type="checkbox" className="form-check-input" id="unlimitedPickupDiscount" checked={addInfo.unlimitedPickupDiscount} name="unlimitedPickupDiscount" onChange={handleCheckBox} />

                                    </div>
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
                </Modal>
                {/* ============ create modal end=============== */}


                {/* ============ edit modal start=============== */}
                <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
                    <ModalHeader >Edit Subscription Type</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEdit} >

                            <div className="mb-3">
                                <label className="form-label" htmlFor="subscriptionTypeName">Subscription Type Name</label>
                                <input type="text" className="form-control" id="subscriptionTypeName" placeholder="Enter subscription type name" required name="subscriptionTypeName" onChange={handleInputs} value={editInfo.subscriptionTypeName} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="freeDeliveryAmountLimit">Free Delivery Amount Limit</label>
                                <input type="text" className="form-control" id="freeDeliveryAmountLimit" placeholder="Enter free delivery amount limit" required name="freeDeliveryAmountLimit" onChange={handleInputs} value={editInfo.freeDeliveryAmountLimit} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="freeDeliveryOrderLimit">Free Delivery Order Limit</label>
                                <input type="text" className="form-control" id="freeDeliveryOrderLimit" placeholder="Enter Free Delivery Order Limit" required name="freeDeliveryOrderLimit" onChange={handleInputs} value={editInfo.freeDeliveryOrderLimit} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="pickupDiscountAmountLimit">Pickup Discount Amount Limit</label>
                                <input type="text" className="form-control" id="pickupDiscountAmountLimit" placeholder="Enter pickup discount amount limit" required name="pickupDiscountAmountLimit" onChange={handleInputs} value={editInfo.pickupDiscountAmountLimit} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="pickupDiscountOrderLimit">Pickup Discount Order Limit</label>
                                <input type="text" className="form-control" id="pickupDiscountOrderLimit" placeholder="Enter pickup discount order limit" required name="pickupDiscountOrderLimit" onChange={handleInputs} value={editInfo.pickupDiscountOrderLimit} />
                            </div>

                            <div className="mb-3 row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="deliveryFree">Delivery Free</label>
                                        <input type="checkbox" className="form-check-input" id="deliveryFree" checked={editInfo.deliveryFree} name="deliveryFree" onChange={handleCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="unlimitedFreeDelivery">Unlimited Free Delivery</label>
                                        <input type="checkbox" className="form-check-input" id="unlimitedFreeDelivery" checked={editInfo.unlimitedFreeDelivery} name="unlimitedFreeDelivery" onChange={handleCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="pickupDiscount">Pickup Discount</label>
                                        <input type="checkbox" className="form-check-input" id="pickupDiscount" checked={editInfo.pickupDiscount} name="pickupDiscount" onChange={handleCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="unlimitedPickupDiscount">Unlimited Pickup Discount</label>
                                        <input type="checkbox" className="form-check-input" id="unlimitedPickupDiscount" checked={editInfo.unlimitedPickupDiscount} name="unlimitedPickupDiscount" onChange={handleCheckBox} />

                                    </div>
                                </div>
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
        add_subscription_type_data,
        add_subscription_type_error,
        add_subscription_type_loading,

        get_all_subscription_type_data,
        get_all_subscription_type_error,
        get_all_subscription_type_loading,

        subscription_type_edit_data,
        subscription_type_edit_loading,

        subscription_type_status_edit_data,
        subscription_type_status_edit_loading,

        subscription_type_delete_loading

    } = state.SubscriptionTypes;

    return {
        add_subscription_type_data,
        add_subscription_type_error,
        add_subscription_type_loading,

        get_all_subscription_type_data,
        get_all_subscription_type_error,
        get_all_subscription_type_loading,

        subscription_type_edit_data,
        subscription_type_edit_loading,

        subscription_type_status_edit_data,
        subscription_type_status_edit_loading,

        subscription_type_delete_loading

    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addSubscriptionTypeAction,
            addSubscriptionTypeFresh,
            getAllSubscriptionTypeAction,
            getAllSubscriptionTypeFresh,
            subscriptionTypeUpdateAction,
            subscriptionTypeUpdateFresh,
            subscriptionTypeDeleteAction,
            subscriptionTypeDeleteFresh,
            subscriptionTypeStatusUpdateAction,
            subscriptionTypeStatusUpdateFresh
        })(SubscriptionTypes)
);