import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
// import { withRouter } from "react-router-dom"
import withRouter from "components/Common/withRouter"

import SidebarContent from "./SidebarContent"

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(mapStatetoProps, {})(withRouter(Sidebar))
