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
  dineInCardEditAction,
  dineInCardEditFresh,
  getDineInCardByIdAction,
  getDineInCardByIdActionFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { useLocation, useNavigate } from "react-router-dom"
import UploadComponent from "components/MultipleImage/multiple-image-upload"
import Select from "react-select"
import PageLoader from "components/CustomLoader/PageLoader"

function DineInGalleryEdit(props) {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    props.getDineInCardByIdActionFresh()
  }, [])

  const [getInfo, SetGetInfo] = useState(true)

  const [info, setInfo] = useState({
    _id: location.state ? location.state._id : "",
    name:
      props?.get_dine_in_card_by_id_data != undefined
        ? props?.get_dine_in_card_by_id_data?.name
        : "",
    branch_id:
      props?.get_dine_in_card_by_id_data != undefined
        ? props?.get_dine_in_card_by_id_data?.branch_id
        : "",
    thumbnail_image:
      props?.get_dine_in_card_by_id_data != undefined
        ? props?.get_dine_in_card_by_id_data?.thumbnail_image
        : "",
    is_active:
      props?.get_dine_in_card_by_id_data != undefined
        ? props?.get_dine_in_card_by_id_data?.is_active
        : true,
  })

  // const thumbnail_image = {
  //   iamge: "",
  // }
  const [thumbnailImage, setThumbnailImage] = useState({
    thumbnail_image: props?.get_dine_in_card_by_id_data
      ? props?.get_dine_in_card_by_id_data?.thumbnail_image
      : "",
  })

  const common_branch = props?.get_all_branch_data?.filter(
    elem => elem._id === props?.get_dine_in_card_by_id_data?.branch_id
  )

  const branch_data_edit = common_branch
    ? common_branch?.map((item, key) => {
        return {
          label: item.name,
          value: item._id,
        }
      })
    : ""

  const [selectedBranch, setSelectedBranch] = useState(
    branch_data_edit ? branch_data_edit : ""
  )

  useEffect(() => {
    if (props.get_all_branch_loading === "Success")
      setSelectedBranch(branch_data_edit)
  }, [props.get_all_branch_loading])

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
    const { defaultImages } = state.upload
    const { orginalFile } = newState.upload

    //console.log(orginalFile, defaultImages)
    // const val = uuidv4()
    props.dineInCardEditAction(info, orginalFile, defaultImages)
  }

  useEffect(() => {
    if (props.get_dine_in_card_by_id_data != undefined) {
      setInfo({
        ...info,
        _id: props.get_dine_in_card_by_id_data._id,
        name: props.get_dine_in_card_by_id_data.name,
        branch_id: props.get_dine_in_card_by_id_data.branch_id,
        thumbnail_image: props.get_dine_in_card_by_id_data.thumbnail_image,
        is_active: props.get_dine_in_card_by_id_data.is_active,
      })

      const common_branch = props?.get_all_branch_data?.filter(
        elem => elem._id === props?.get_dine_in_card_by_id_data?.branch_id
      )

      const branch_data_edit = common_branch
        ? common_branch?.map((item, key) => {
            return {
              label: item.name,
              value: item._id,
            }
          })
        : ""

      setSelectedBranch(branch_data_edit)

      setThumbnailImage({
        ...thumbnailImage,
        thumbnail_image: props.get_dine_in_card_by_id_data.thumbnail_image,
      })

      setState({
        ...state,
        upload: {
          ...state.upload,
          defaultImages: props.get_dine_in_card_by_id_data.images,
        },
      })
    }
  }, [props.get_dine_in_card_by_id_data])

  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }
    if (props.dine_in_card_edit_loading == "Success") {
      toast.success("Edited Successfully")
      navigate("/dine-in-gallery")
      props.dineInCardEditFresh()
    }

    if (props.dine_in_card_edit_loading == "Failed") {
      toast.error("Something went wrong")
      // navigate("/dine-in-gallery")
      props.dineInCardEditFresh()
    }

    if (getInfo) {
      props.getDineInCardByIdAction(location?.state?._id)
      SetGetInfo(false)
    }

    // setState({
    //   ...state,
    //   upload: {
    //     ...state.upload,
    //     defaultImages: location.state?.images,
    //   },
    // })
  }, [props.dine_in_card_edit_loading, props.get_all_branch_loading])

  const [state, setState] = useState({
    upload: {
      pictures: [],
      orginalFile: [],
      maxFileSize: 5242880,
      withIcon: false,
      withLabel: false,
      label: "Max file size 5mb for each. Accepted file type jpg, jpeg, png",
      imgExtension: [".jpg", ".png", ".jpeg", ".webp", ".bmp"],
      defaultImages: [],
      buttonStyles: {
        display: "none",
      },
    },
  })

  const [newState, setNewState] = useState({
    upload: {
      pictures: [],
      orginalFile: [],
      maxFileSize: 5242880,
      withIcon: true,
      withLabel: true,
      label: "Max file size 5mb for each. Accepted file type jpg, jpeg, png",
      imgExtension: [".jpg", ".png", ".jpeg", ".webp", ".bmp"],
      defaultImages: [],
      buttonStyles: {},
    },
  })

  const handleChange = (pictureFiles, files, previous) => {
    setState({
      ...state,
      upload: {
        ...state.upload,
        defaultImages: [...previous],
      },
    })
  }

  const handleChangeNew = (pictureFiles, files, previous) => {
    setNewState({
      ...newState,
      upload: {
        ...newState.upload,
        orginalFile: [...pictureFiles],
      },
    })
  }

  if (props.get_dine_in_card_by_id_data == null) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Dine in Gallery"
            breadcrumbItem="Edit Dine in Gallery"
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
                      Edit Dine in Gallery
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
                      {...newState.upload}
                      handleChange={handleChangeNew}
                    />
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

  const {
    dine_in_card_edit_loading,
    get_dine_in_card_by_id_data,
    get_dine_in_card_by_id_loading,
  } = state.dineInCard

  return {
    get_all_branch_loading,
    get_all_branch_data,
    dine_in_card_edit_loading,
    get_dine_in_card_by_id_data,
    get_dine_in_card_by_id_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    dineInCardEditAction,
    dineInCardEditFresh,
    getDineInCardByIdAction,
    getDineInCardByIdActionFresh,
  })(DineInGalleryEdit)
)
