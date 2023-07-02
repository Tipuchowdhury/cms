import React, { useEffect } from "react"
import { Container, Row, Col, Table } from "reactstrap"
import logodarkImg from "../../assets/images/logo-dark.png"
import withRouter from "components/Common/withRouter"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { getRiderInvoice, getRiderInvoiceFresh } from "store/actions"
import PageLoader from "components/CustomLoader/PageLoader"
import { CURRENCY_SYMBOLS } from "constants/defaults"
import moment from "moment"

const RiderInvoice = props => {
  let params = useParams()

  useEffect(() => {
    if (params.orderID) {
      props.getRiderInvoice(params.orderID)
    }
  }, [params.orderID])

  useEffect(() => {
    if (props.get_rider_invoice_data) window.print()
  }, [props.get_rider_invoice_data])

  if (!props.get_rider_invoice_data) return <PageLoader />

  return (
    <Container>
      <Row style={{ width: "100%", textAlign: "center" }}>
        <h1 style={{ fontWeight: "bolder" }}>Rider Invoice</h1>
      </Row>
      <Row style={{ marginTop: "1cm" }}>
        <Col style={{ textAlign: "left" }}>
          <Col>
            <span style={{ fontWeight: "bold" }}>Order ID: </span>
            {props.get_rider_invoice_data._id}
          </Col>
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
          {props.get_rider_invoice_data.items.map((item, index) => (
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
                {parseFloat(item.menu_price).toFixed(2)}
              </td>
              <td>{item.quantity}</td>
              <td></td>
              <td style={{ textAlign: "right" }}>
                <span>{CURRENCY_SYMBOLS} </span>

                {parseFloat(item.item_total).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}></div>

      <table style={{ marginTop: "30px", marginBottom: "30px" }}>
        <tbody>
          <tr>
            <td className="fw-bold">Payment Type:</td>
            <td>
              {
                props.get_rider_invoice_data.restaurant_payable_section
                  .payment_type
              }
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Total Food Bill</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.restaurant_payable_section
                  .total_food_bill
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>(+)SD</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.restaurant_payable_section.sd
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>(+)VAT</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.restaurant_payable_section.vat
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Subtotal</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.restaurant_payable_section
                  .sub_total
              ).toFixed(2)}
            </td>
          </tr>

          <tr style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}>
            <td>
              (-)Commission (
              {
                props.get_rider_invoice_data.restaurant_payable_section
                  .restaurant_commission_in_percent
              }
              %)
            </td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.restaurant_payable_section
                  .restaurant_commission_amount
              ).toFixed(2)}
            </td>
          </tr>

          <tr>
            <td style={{ paddingRight: "50px" }} className="fw-bold">
              Restaurant Payable
            </td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.restaurant_payable_section
                  .restaurant_payable
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}></div> */}
      <h4>Customer Section</h4>
      <div style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}></div>

      <table style={{ marginTop: "30px", marginBottom: "30px" }}>
        <tbody>
          <tr>
            <td className="fw-bold">Total Food Bill</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.customer_payable_section
                  .total_food_bill
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>(+)SD</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.customer_payable_section.sd
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>(+)VAT</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.customer_payable_section.vat
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>Delivery Charge</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.customer_payable_section
                  .delivery_charge
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Subtotal</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.customer_payable_section.sub_total
              ).toFixed(2)}
            </td>
          </tr>
          <tr style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}>
            <td>
              (-)Discount (
              {
                props.get_rider_invoice_data.customer_payable_section
                  .discount_in_percent
              }
              %)
            </td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.customer_payable_section
                  .discount_amount
              ).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td style={{ paddingRight: "50px" }} className="fw-bold">
              Customer Payable
            </td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.customer_payable_section
                  .customer_payable
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}></div> */}
      <h4>Riders Cash Section</h4>
      <div style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}></div>

      <table style={{ marginTop: "30px", marginBottom: "30px" }}>
        <tbody>
          <tr>
            <td>Customer Payable</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.rider_cash_section.customer_payable
              ).toFixed(2)}
            </td>
          </tr>
          <tr style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}>
            <td>Restaurant Payable</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.rider_cash_section
                  .restaurant_payable
              ).toFixed(2)}
            </td>
          </tr>

          <tr>
            <td className="fw-bold" style={{ paddingRight: "20px" }}>
              Foodi payable / Receivable
            </td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.rider_cash_section.foodi_payable
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}></div> */}
      <h4>Rider's Earning Section</h4>
      <div style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}></div>

      <table style={{ marginTop: "30px", marginBottom: "30px" }}>
        <tbody>
          <tr>
            <td>Foodi payable / Receivable</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.rider_earning_section.foodi_payable
              ).toFixed(2)}
            </td>
          </tr>
          <tr style={{ borderBottom: "outset", borderColor: "#EA4D3C" }}>
            <td>Per Ride Charge</td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.rider_earning_section
                  .per_ride_charge
              ).toFixed(2)}
            </td>
          </tr>

          <tr>
            <td className="fw-bold" style={{ paddingRight: "20px" }}>
              Foodi payable / Receivable
            </td>
            <td>
              <span>{CURRENCY_SYMBOLS} </span>

              {parseFloat(
                props.get_rider_invoice_data.rider_earning_section
                  .final_foodi_payable
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}

const mapStateToProps = state => {
  const {
    get_rider_invoice_data,
    get_rider_invoice_error,
    get_rider_invoice_loading,
  } = state.Order

  return {
    get_rider_invoice_data,
    get_rider_invoice_error,
    get_rider_invoice_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getRiderInvoice,
    getRiderInvoiceFresh,
  })(RiderInvoice)
)
