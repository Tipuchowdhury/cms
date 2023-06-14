import React, { useEffect } from "react"
import { Container, Row, Col, Table } from "reactstrap"
import logodarkImg from "../../assets/images/logo-dark.png"
import withRouter from "components/Common/withRouter"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { getOrderInvoice, getOrderInvoiceFresh } from "store/actions"
import PageLoader from "components/CustomLoader/PageLoader"
import { CURRENCY_SYMBOLS } from "constants/defaults"
import moment from "moment"

const Invoice = props => {
  let params = useParams()

  useEffect(() => {
    if (params.orderID) {
      props.getOrderInvoice(params.orderID)
    }
  }, [params.orderID])

  useEffect(() => {
    if (props.get_order_invoice_data) window.print()
  }, [props.get_order_invoice_data])

  if (!props.get_order_invoice_data) return <PageLoader />

  return (
    <Container>
      <Row style={{ width: "100%", textAlign: "center" }}>
        <h1 style={{ fontWeight: "bolder" }}>Invoice</h1>
      </Row>
      <Row style={{ marginTop: "1cm" }}>
        <Col>
          <span className="logo-lg">
            <img src={logodarkImg} alt="" height="40" />
          </span>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Col>
            <span style={{ fontWeight: "bold" }}>Order No: </span>
            {props.get_order_invoice_data._id}
          </Col>
          <Col>
            <span style={{ fontWeight: "bold" }}>Order Date: </span>
            <span>
              {moment(props.get_order_invoice_data.created_at).format(
                "MMMM D, YYYY"
              )}
            </span>
            <br />
            <span>
              {moment(props.get_order_invoice_data.created_at).format(
                "hh:MM:SS A"
              )}
            </span>
          </Col>
        </Col>
      </Row>
      <Row className="invoice-section" style={{ marginTop: "1cm" }}>
        <Col>Ship to</Col>
        <Col style={{ textAlign: "right" }}>Restaurant Details</Col>
      </Row>
      <Row>
        <Col>
          <p>
            {`${props.get_order_invoice_data.customer.firstName} ${props.get_order_invoice_data.customer.lastName}`}
            <br />
            {props.get_order_invoice_data.customer.mobile}
            <br />
            {props.get_order_invoice_data.address}
            <br />
            <span style={{ fontWeight: "bold" }}>
              Payment Type: {props.get_order_invoice_data.payment_method_id}
            </span>
          </p>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <p>
            {props.get_order_invoice_data.branch.name}
            <br />
            {props.get_order_invoice_data.branch.address}
            <br />
            {props.get_order_invoice_data.branch.phone_number}
          </p>
        </Col>
      </Row>
      <Table bordered style={{ marginTop: "1cm" }}>
        <thead>
          <tr className="invoice-section">
            <th>#</th>
            <th>Items</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.get_order_invoice_data.order_details.map((item, index) => (
            <tr key={1}>
              <th scope="row">{index + 1}</th>
              <td>
                <span style={{ fontWeight: "bold" }}>{item.menu_name}</span>
                {item.variations
                  ? item.variations.map(variation => {
                      return (
                        <>
                          <br />
                          <br />
                          <span style={{ fontWeight: "bold" }}>
                            {variation.variation_name}
                          </span>
                          {variation.add_on_category
                            ? variation.add_on_category.map(addon_cat => {
                                return (
                                  <>
                                    <br />
                                    <span>{addon_cat.name}:</span>
                                    {addon_cat.add_on_list
                                      ? addon_cat.add_on_list.map(addon => {
                                          return (
                                            <>
                                              <br />
                                              <span>{addon.add_ons_name}</span>
                                            </>
                                          )
                                        })
                                      : ""}
                                  </>
                                )
                              })
                            : ""}
                        </>
                      )
                    })
                  : ""}
              </td>
              <td style={{ textAlign: "right" }}>
                <span>{CURRENCY_SYMBOLS} </span>
                {item.menu_price}
              </td>
              <td>{item.quantity}</td>
              <td></td>
              <td style={{ textAlign: "right" }}>
                <span>{CURRENCY_SYMBOLS} </span>
                {item.item_total}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" rowSpan="5">
              {`${
                props.get_order_invoice_data.instruction
                  ? "Preference : " + props.get_order_invoice_data.instruction
                  : ""
              }`}
            </td>
            <td>
              <strong>SubTotal</strong>
            </td>
            <td style={{ textAlign: "right" }}>
              <span>{CURRENCY_SYMBOLS} </span>
              {parseFloat(props.get_order_invoice_data.sub_total).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>
              <strong>VAT</strong>
            </td>
            <td style={{ textAlign: "right" }}>
              <span>{CURRENCY_SYMBOLS} </span>
              {parseFloat(
                props.get_order_invoice_data.value_added_tax_inclusive
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>
              <strong>SD</strong>
            </td>
            <td style={{ textAlign: "right" }}>
              <span>{CURRENCY_SYMBOLS} </span>
              {parseFloat(
                props.get_order_invoice_data.supplymentary_duty
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Delivery Charge</strong>
            </td>
            <td style={{ textAlign: "right" }}>
              <span>{CURRENCY_SYMBOLS} </span>
              {parseFloat(props.get_order_invoice_data.delivery_charge).toFixed(
                2
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>
                Discount
                {props.get_order_invoice_data.discount_in_percent > 0
                  ? `(${props.get_order_invoice_data.discount_in_percent}%)`
                  : ""}
              </strong>
            </td>
            <td style={{ textAlign: "right" }}>
              <span>{CURRENCY_SYMBOLS} </span>
              {parseFloat(props.get_order_invoice_data.discount_amount).toFixed(
                2
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="4"></td>
            <td>
              <strong>Total</strong>
            </td>
            <td style={{ textAlign: "right" }}>
              <span>{CURRENCY_SYMBOLS} </span>
              {parseFloat(props.get_order_invoice_data.total_amount).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

const mapStateToProps = state => {
  const {
    get_order_invoice_data,
    get_order_invoice_error,
    get_order_invoice_loading,
  } = state.Order

  return {
    get_order_invoice_data,
    get_order_invoice_error,
    get_order_invoice_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getOrderInvoice,
    getOrderInvoiceFresh,
  })(Invoice)
)
