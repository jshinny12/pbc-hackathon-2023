import React, { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Landing.css";

const Landing = () => {
  
  return (
    <Container className="landing-page">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <h1 className="text-center one-liner">
            A Place to Find and Fund Projects
          </h1>
          <Button variant="primary" size="lg" block>
            Let's Begin
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Landing