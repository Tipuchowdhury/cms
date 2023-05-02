// const convertToFormData = dataObject => {
//   const formData = new FormData()

//   Object.keys(dataObject).forEach(key => {
//     formData.append(key, dataObject[key])
//   })

//   return formData
// }

function convertToFormData(dataObject, parentKey = "") {
  console.log("dataObject :", dataObject)
  const formData = new FormData()

  for (const key in dataObject) {
    const fullKey = parentKey ? `${parentKey}[${key}]` : key
    if (dataObject[key] instanceof File) {
      formData.append(fullKey, dataObject[key])
      continue
    }
    if (
      typeof dataObject[key] === "object" &&
      !Array.isArray(dataObject[key])
    ) {
      const childFormData = convertToFormData(dataObject[key], fullKey)
      for (const childKey of childFormData.keys()) {
        formData.append(childKey, childFormData.get(childKey))
      }
    } else if (Array.isArray(dataObject[key])) {
      dataObject[key].forEach((item, index) => {
        const arrayItemKey = `${fullKey}[${index}]`
        const childFormData = convertToFormData(item, arrayItemKey)
        for (const childKey of childFormData.keys()) {
          formData.append(childKey, childFormData.get(childKey))
        }
      })
    } else {
      formData.append(fullKey, dataObject[key])
    }
  }

  console.log("formData :", formData)

  return formData
}

export { convertToFormData }
