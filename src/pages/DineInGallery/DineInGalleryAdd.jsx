import React, { useState, useEffect } from "react"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import withRouter from "components/Common/withRouter"
;` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  getAllBranchAction,
  addDineInCardAction,
  addDineInCardFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { useLocation, useNavigate } from "react-router-dom"
import UploadComponent from "components/MultipleImage/multiple-image-upload"
import Select from "react-select"

function DineInGalleryAdd(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [info, setInfo] = useState({
    name: location.state ? location.state.name : "",
    branch_id: location.state ? location.state.branch_id : "",
    thumbnail_image: location.state ? location.state.thumbnail_image : "",
    is_active: location.state ? location.state.is_active : true,
  })

  // const thumbnail_image = {
  //   iamge: "",
  // }
  const [thumbnailImage, setThumbnailImage] = useState({
    thumbnail_image: "",
  })

  const [selectedBranch, setSelectedBranch] = useState("")

  const handleSelectBranch = e => {
    setInfo({ ...info, branch_id: e.value })
    setSelectedBranch(e)
  }

  let branchData = undefined
  if (props.get_all_branch_data?.length > 0) {
    branchData = props.get_all_branch_data
      ?.filter(data => data.is_dine == true)
      .map((item, key) => ({
        label: item.name,
        value: item._id,
      }))
  }

  let name, value
  const handleInputs = e => {
    name = e.target.name
    value = e.target.value
    setInfo({ ...info, [name]: value })
  }

  const handleFiles = e => {
    // console.log(e.target.files[0])
    name = e.target.name
    value = e.target.files[0]
    setInfo({ ...info, [name]: value })
    const reader = new FileReader()

    reader.onload = () => {
      setThumbnailImage({ ...thumbnailImage, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    const { orginalFile } = state.upload

    // console.log(orginalFile, pictures)
    const val = uuidv4()
    props.addDineInCardAction(val, info, orginalFile)
  }

  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }
    if (props.add_dine_in_card_loading == "Success") {
      toast.success("Added Successfully")
      navigate("/dine-in-gallery")
      props.addDineInCardFresh()
    }
    if (props.add_dine_in_card_loading == "Failed") {
      toast.error("Something went wrong")
      // navigate("/dine-in-gallery")
      props.addDineInCardFresh()
    }
  }, [props.add_dine_in_card_loading, props.get_all_branch_loading])

  const [state, setState] = useState({
    upload: {
      pictures: [],
      orginalFile: [],
      maxFileSize: 5242880,
      label: "Max file size 5mb for each. Accepted file type jpg, jpeg, png",
      imgExtension: [".jpg", ".png", ".jpeg", ".webp", ".bmp"],
      defaultImages: [],
    },
  })

  const handleChange = (pictureFiles, files) => {
    const { pictures, orginalFile } = state.upload

    //console.log(pictures, orginalFile)

    setState({
      ...state,
      upload: {
        ...state.upload,
        pictures: [...files],
        orginalFile: [...pictureFiles],
      },
    })
  }

  // console.log(state.upload.pictures, state.upload.orginalFile)

  // const confirmUpload = () => {
  //   const { pictures, defaultImages } = state.upload
  // }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Dine in Gallery"
            breadcrumbItem="Add Dine in Gallery"
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
                      Add Dine in Gallery
                    </CardTitle>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-10 mx-auto">
              <form className="mt-0" onSubmit={handleFormSubmit}>
                <Row className="mb-3">
                  <label htmlFor="name" className="col-md-2 col-form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter name"
                      name="name"
                      onChange={handleInputs}
                      value={info.name ?? ""}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="branch_id"
                    className="col-md-2 col-form-label"
                  >
                    Restaurant <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <Select
                      value={selectedBranch}
                      onChange={handleSelectBranch}
                      options={branchData}
                      isMulti={false}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    className="col-md-2 col-form-label "
                    htmlFor="thumbnail_image"
                  >
                    Thumbnail Image
                  </label>
                  <div className="col-md-10">
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .bmp, .png, .webp"
                      className="form-control"
                      id="thumbnail_image"
                      placeholder="Enter category description"
                      name="thumbnail_image"
                      onChange={handleFiles}
                    />
                  </div>
                </Row>

                {thumbnailImage?.thumbnail_image && (
                  <Row className="mb-3">
                    <label className="col-md-2">
                      <span></span>
                    </label>
                    <div className="col-md-10">
                      <img
                        src={thumbnailImage.thumbnail_image}
                        alt="preview"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </Row>
                )}

                <Row className="mb-3">
                  <label className="col-md-2 col-form-label " htmlFor="images">
                    Gallery Image
                  </label>
                  <div className="col-md-10">
                    <UploadComponent
                      {...state.upload}
                      handleChange={handleChange}
                    />
                  </div>
                </Row>

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
  const { get_all_branch_loading, get_all_branch_data } = state.Restaurant

  const { add_dine_in_card_loading } = state.dineInCard

  return {
    get_all_branch_loading,
    get_all_branch_data,
    add_dine_in_card_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    addDineInCardAction,
    addDineInCardFresh,
  })(DineInGalleryAdd)
)
