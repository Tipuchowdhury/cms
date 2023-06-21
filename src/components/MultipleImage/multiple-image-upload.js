import React from "react"
import ReactImageUploadComponent from "react-images-upload"

function UploadComponent(props) {
  const onDrop = (pictureFiles, pictureDataURLs) => {
    const newImagesUploaded = pictureDataURLs.slice(props.defaultImages.length)
    props.handleChange(pictureFiles, newImagesUploaded, pictureDataURLs)
  }

  return (
    <ReactImageUploadComponent
      withIcon={props.withIcon}
      withLabel={props.withLabel}
      withPreview={true}
      buttonText={"Add photos"}
      fileSizeError={"File size is too big!"}
      fileTypeError={"This extension is not supported!"}
      onChange={onDrop}
      label={props.label}
      imgExtension={props.imgExtension}
      maxFileSize={props.maxFileSize}
      defaultImages={props.defaultImages}
      buttonClassName={props.buttonClassName}
      buttonType={props.buttonType}
      buttonStyles={props.buttonStyles}
    />
  )
}

export default UploadComponent
