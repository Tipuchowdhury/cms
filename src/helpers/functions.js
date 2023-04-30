const convertToFormData = dataObject => {
  const formData = new FormData()

  Object.keys(dataObject).forEach(key => {
    formData.append(key, dataObject[key])
  })

  return formData
}

export { convertToFormData }
