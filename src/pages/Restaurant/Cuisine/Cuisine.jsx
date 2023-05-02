import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addCuisineAction, getAllCuisneAction, cuisineEditAction, cuisineStatusEditAction, cuisineDeleteAction, cuisineDeleteFresh } from 'store/actions';


function Cuisine(props) {

    const [name, setName] = useState();
    const [editName, setEditName] = useState();
    const [id, setId] = useState();
    const [status, setStatus] = useState();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [editModal, setEditModal] = useState(false);
    const [color, setColor] = useState({
        fg: "",
        bg: ""
    });
    // const toggleEditModal = () => {
    //     setAddImages({ ...addImages, image: "" });
    //     setEditModal(!editModal);
    // }
    const [file, setFile] = useState();
    const [addImages, setAddImages] = useState({
        image: "",
    })
    const [editImages, setEditImages] = useState({
        image: "",
    })

    const toggleEditModal = () => {
        setEditModal(!editModal);
    }

    const [editInfo, setEditInfo] = useState(false)
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

    const [modalDel, setModalDel] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const toggleDel = () => setModalDel(!modalDel);

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        props.cuisineDeleteAction(deleteItem);
    }

    const handleStatusModal = row => {
        // console.log(row);
        setEditInfo(row)

        toggleStatus()
    }
    const handleStatusUpdate = () => {
        // console.log(editInfo)
        props.cuisineStatusEditAction({
            ...editInfo,
            is_active: !editInfo.is_active,
        })

        toggleStatus()
    }


    const handleEditName = (row) => {
        console.log(row);
        setId(row._id);
        setEditName(row.name);
        setStatus(row.is_active);
        setEditImages({ ...editImages, image: row.image });
        setColor({ ...color, fg: row.color.fg, bg: row.color.bg });
        toggleEditModal();
    }
    // console.log(addImages);
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



    // const statusRef = (cell, row) => <Badge color="success" style={{ padding: "12px" }}>Activated</Badge>

    const statusRef = (cell, row) => <Button color={row.is_active ? "success" : "secondary"}
        className="btn waves-effect waves-light" onClick={() => handleStatusModal(row)}>{row.is_active ? "Active" : "Deactivate"}</Button>


    const activeData = [

        {
            dataField: "name",
            text: "Cuisine Name",
            sort: true,
        },
        {
            dataField: "",
            text: "Status",
            sort: true,
            formatter: statusRef
        },

        {
            dataField: "",
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



    const handleEditFile = (event) => {

        let name = event.target.name
        let value = event.target.files[0]
        setFile(value)

        const reader2 = new FileReader()

        reader2.onload = () => {
            setEditImages({ ...editImages, [name]: reader2.result })
        }

        reader2.readAsDataURL(value)
    }
    const handleAddFile = (event) => {

        let name = event.target.name
        let value = event.target.files[0]
        setFile(value)

        const reader = new FileReader()

        reader.onload = () => {
            setAddImages({ ...addImages, [name]: reader.result })
        }

        reader.readAsDataURL(value)
    }

    const handleAddColors = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setColor({ ...color, [name]: value })

    }

    const handleEditColors = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setColor({ ...color, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        console.log(color);
        const id = uuidv4();
        props.addCuisineAction(id, name, file, color);
        toggle();
        setName("");
    }

    const handleEditModal = (e) => {
        e.preventDefault(e);
        // console.log(editName);
        props.cuisineEditAction(id, editName, status, file, color);
        toggleEditModal();
        setEditName("")
    }
    useEffect(() => {
        if (props.get_all_cuisine_loading == false) {
            props.getAllCuisneAction();
        }

        if (props.cuisine_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Cuisine Deleted");
            toggleDel();
            props.cuisineDeleteFresh();

        }

    }, [props.get_all_cuisine_loading, props.cuisine_delete_loading]);

    console.log(props.get_all_cuisine_data);
    console.log(props.get_all_cuisine_loading);
    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Restaurant" breadcrumbItem="Cuisine" />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>All Cuisine </CardTitle>

                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle}>
                                            Add Cuisine
                                        </Button>

                                    </div>
                                    {props.get_all_cuisine_data ? props.get_all_cuisine_data.length > 0 ? <DatatableTablesWorking products={props.get_all_cuisine_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_cuisine_data?._id} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>Add Cuisine</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="username">Cuisine Name</label>
                                <input type="text" className="form-control" id="username" placeholder="Enter city name" required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="fg">Color FG</label>
                                <input type="color" className="form-control" value={color.fg} name="fg" id="fg" onChange={handleAddColors} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="bg">Color BG</label>
                                <input type="color" className="form-control" value={color.bg} name="bg" id="bg" onChange={handleAddColors} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="image">Image</label>
                                <input type="file" className="form-control" name="image" id="image" onChange={handleAddFile} />
                            </div>
                            {addImages?.image && (
                                <Row className="mb-3">
                                    <label className="col-md-2">
                                        <span></span>
                                    </label>
                                    <div className="col-md-10">
                                        <img
                                            src={addImages.image}
                                            alt="preview"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                </Row>
                            )}

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>{' '}
                                <Button color="primary" type='submit'>
                                    Add
                                </Button>

                            </div>

                        </form>
                    </ModalBody>
                </Modal>

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

                {/* ============ edit modal start=============== */}
                <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
                    <ModalHeader toggle={toggleEditModal}>Edit city name</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEditModal}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="cuisine_name">Cuisine Name</label>
                                <input type="text" className="form-control" id="cuisine_name" placeholder="Enter cuisine name" required value={editName} onChange={(e) => setEditName(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="fg">Color FG</label>
                                <input type="color" className="form-control" value={color.fg} name="fg" id="fg" onChange={handleEditColors} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="bg">Color BG</label>
                                <input type="color" className="form-control" value={color.bg} name="bg" id="bg" onChange={handleEditColors} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="image">Image</label>
                                <input type="file" className="form-control" name="image" id="image" onChange={handleEditFile} />
                            </div>
                            {editImages?.image && (
                                <Row className="mb-3">
                                    <label className="col-md-2">
                                        <span></span>
                                    </label>
                                    <div className="col-md-10">
                                        <img
                                            src={editImages.image}
                                            alt="preview"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                </Row>
                            )}
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
                    <ModalFooter>

                    </ModalFooter>
                </Modal>
                {/* ============ edit modal ends=============== */}

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

        get_all_cuisine_data,
        get_all_cuisine_error,
        get_all_cuisine_loading,
        cuisine_delete_loading
    } = state.Restaurant;

    return {
        get_all_cuisine_data,
        get_all_cuisine_error,
        get_all_cuisine_loading,
        cuisine_delete_loading
    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addCuisineAction,
            getAllCuisneAction,
            cuisineEditAction,
            cuisineStatusEditAction,
            cuisineDeleteAction,
            cuisineDeleteFresh
        })(Cuisine)
);