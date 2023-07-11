import React from "react"
import { Spinner } from "reactstrap"

function CustomLoader({ color = "warning" }) {
  //   console.log("abc")
  return <Spinner style={{ width: "2rem", height: "2rem" }} color={color} />
}

export default CustomLoader
