import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect mr-2"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="mdi mdi-bell-outline"></i>
          <span className="badge bg-danger rounded-pill">3</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 font-size-16">
                  {" "}
                  {props.t("Notifications")} (258)
                </h6>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            <Link to="#" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="mdi mdi-cart-outline"></i>
                  </span>
                </div>
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">New order has arrived.</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">Click to go to the order.</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="#" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-warning rounded-circle font-size-16">
                    <i className="mdi mdi-message-text-outline"></i>
                  </span>
                </div>
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">New Voucher Request Received</h6>
                </div>
              </div>
            </Link>
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default NotificationDropdown

NotificationDropdown.propTypes = {
  t: PropTypes.any,
}
