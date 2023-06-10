import React, { useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap"

const Invoice = ({ order }) => {
  useEffect(() => {
    window.print()
  }, [])

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Food Delivery Invoice</CardTitle>
        <CardText>
          <Row>
            <Col>
              <strong>Order ID:</strong> {order.id}
            </Col>
            <Col>
              <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Customer:</strong> {order.customer}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <strong>Items:</strong>
            </Col>
          </Row>
          {order.items.map(item => (
            <Row key={item.id}>
              <Col>{item.name}</Col>
              <Col>{item.price}</Col>
              <Col>{item.quantity}</Col>
            </Row>
          ))}
          <hr />
          <Row>
            <Col>
              <strong>Total:</strong> {order.total}
            </Col>
          </Row>
        </CardText>
        <Button color="primary" onClick={() => window.print()}>
          Print Invoice
        </Button>
      </CardBody>
    </Card>
  )
}

export default Invoice
