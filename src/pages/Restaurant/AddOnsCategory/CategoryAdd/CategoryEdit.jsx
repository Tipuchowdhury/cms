import React, { useState, useEffect } from "react"
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import withRouter from "components/Common/withRouter"
    ; ` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
    editAddOnsCategoryAction,
    editAddOnCategoryFresh,
    getAddOnsCategoryByIdAction
} from "store/actions"
import { useLocation, useNavigate } from "react-router-dom"

function CategoryEdit(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const [getInfo, SetGetInfo] = useState(true)
    const [category, setCategory] = useState({

        name: props?.get_add_ons_by_id_data != undefined ? props?.get_add_ons_by_id_data?.name : "",
        add_on_category_desc: props?.get_add_ons_by_id_data != undefined ? props?.get_add_ons_by_id_data?.add_on_category_desc : "",
        num_of_choice: props?.get_add_ons_by_id_data != undefined ? props?.get_add_ons_by_id_data?.cat_max_choice : "",
    })
    const [checked, setChecked] = useState(false)
    const [isChecked, setIsChecked] = useState(
        location.state ? location.state.cat_is_multiple : false
    )
    const addOnsTemplate = {
        add_on_name: "",
        add_on_price: "",
        categoryName: category?.name,
    }
    const [addOns, setAddOns] = useState(
        props?.get_add_ons_by_id_data ? props?.get_add_ons_by_id_data.preset_add_ons : [addOnsTemplate]
        //location.state ? location.state.preset_add_ons : [addOnsTemplate]
    )
    const handleAddOnsCat = (e, index) => {
        const updatedValue = addOns.map((row, i) =>
            index === i
                ? Object.assign(row, { [e.target.name]: e.target.value })
                : row
        )
        setAddOns(updatedValue)
    }
    function handleAddRowNested() {
        setAddOns([...addOns, addOnsTemplate])
    }
    const handleRowDelete = index => {
        const filteredTime = [...addOns]
        if (filteredTime.length > 1) {
            filteredTime.splice(index, 1)
            setAddOns(filteredTime)
        }
    }

    let name, value
    const handleInputs = e => {
        name = e.target.name
        value = e.target.value
        setCategory({ ...category, [name]: value })
    }

    const checkHandler = () => {
        setIsChecked(!isChecked)
    }
    const handleChange = () => {
        setChecked(!checked)
    }


    const handleEdit = e => {
        e.preventDefault()
        props.editAddOnsCategoryAction(
            location.state?._id,
            category,
            isChecked,
            addOns
        )
    }
    useEffect(() => {

        if (props.edit_addOn_category_loading == "Success") {
            navigate("/addons-category")
            props.editAddOnCategoryFresh()
        }

        if (props.get_add_ons_by_id_data != undefined) {
            setCategory({
                ...category,
                name: props?.get_add_ons_by_id_data?.name,
                add_on_category_desc: props.get_add_ons_by_id_data.add_on_category_desc,
                num_of_choice: props.get_add_ons_by_id_data.cat_max_choice,
            })

            const preset_add_ons = props?.get_add_ons_by_id_data?.preset_add_ons?.map(item => ({
                add_on_name: item.add_on_name,
                add_on_price: item.add_on_price,
                categoryName: item.add_on_category_name,
            }))

            setAddOns(preset_add_ons)

        }

        if (getInfo) {
            props.getAddOnsCategoryByIdAction(location?.state?._id)
            SetGetInfo(false)
        }
    }, [props])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs
                        maintitle="Foodi"
                        title="Add-ons Category"
                        breadcrumbItem="Edit Add-ons Category"
                    />
                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "40px",
                                            marginTop: "20px",
                                            backgroundColor: "#1E417D",
                                            padding: "15px",
                                        }}
                                    >
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                                            Edit Add-ons Category
                                            {" "}
                                        </CardTitle>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-10 mx-auto">
                            <form
                                className="mt-0"
                                onSubmit={handleEdit}
                            >
                                <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Category Name
                                    </label>
                                    <div className="col-md-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter category name"
                                            name="name"
                                            onChange={handleInputs}
                                            value={category.name ?? ""}
                                        />
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter category description"
                                            name="add_on_category_desc"
                                            onChange={handleInputs}
                                            value={category.add_on_category_desc ?? ""}
                                        />
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
                                        <input
                                            type="checkbox"
                                            id="cat_is_multiple"
                                            name="cat_is_multiple"
                                            checked={isChecked}
                                            onChange={checkHandler}
                                            value="true"
                                            style={{ margin: "15px 5px 20px 0px" }}
                                        />
                                        Multiple Selection
                                        {addOns.map((row, idx) => (
                                            <React.Fragment key={idx}>
                                                <div data-repeater-list="group-a" id={"addr" + idx}>
                                                    <div data-repeater-item className="row">
                                                        <div className="mb-3 col-lg-3">
                                                            <label className="form-label" htmlFor="startTime">
                                                                Add-ons Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="startTime"
                                                                className="form-control"
                                                                name="add_on_name"
                                                                placeholder="Add-ons name"
                                                                value={row.add_on_name}
                                                                onChange={e => handleAddOnsCat(e, idx)}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-lg-3">
                                                            <label className="form-label" htmlFor="subject">
                                                                Price
                                                            </label>
                                                            <input
                                                                type="number"
                                                                id="subject"
                                                                className="form-control"
                                                                name="add_on_price"
                                                                placeholder="Price"
                                                                value={row.add_on_price}
                                                                onChange={e => handleAddOnsCat(e, idx)}
                                                            />
                                                        </div>


                                                        <Col
                                                            lg={2}
                                                            className="align-self-center d-grid mt-3"
                                                        >
                                                            <input
                                                                data-repeater-delete
                                                                type="button"
                                                                className="btn btn-primary"
                                                                value="Delete"
                                                                onClick={() => handleRowDelete(idx)}
                                                            />
                                                        </Col>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))}
                                        <Button
                                            onClick={() => {
                                                handleAddRowNested()
                                            }}
                                            color="success"
                                            className="btn btn-success mt-3 mt-lg-0"
                                        >
                                            Add
                                        </Button>
                                        {isChecked ? (
                                            <div className="mt-4 col-lg-3">
                                                <label className="form-label" htmlFor="subject">
                                                    Maximum required number of choice(s)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="subject"
                                                    className="form-control"
                                                    placeholder="Enter number"
                                                    name="num_of_choice"
                                                    value={category.num_of_choice}
                                                    onChange={handleInputs}
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </Row>

                                {/* ==================restaurant time================= */}

                                <div className="mb-3 row">
                                    <div className="col-12 text-end">
                                        <button
                                            className="btn btn-primary w-md waves-effect waves-light"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
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

        edit_addOn_category_loading,
        get_add_ons_by_id_data
    } = state.Restaurant

    return {
        add_ons_category_data,
        add_ons_category_error,
        add_ons_category_loading,

        edit_addOn_category_loading,
        get_add_ons_by_id_data
    }
}

export default withRouter(
    connect(mapStateToProps, {
        editAddOnsCategoryAction,
        editAddOnCategoryFresh,
        getAddOnsCategoryByIdAction
    })(CategoryEdit)
)
