import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
// eslint-disable-next-line no-unused-vars
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {Button, Container} from "react-bootstrap";
import "../CSS/Profile.css";


export default function Profile() {
  const [data, setData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    async function getUser() {
    }
    getUser();
  }, []);

  return (
    <Container fluid className="profile-container">

      <h2 className="headline">Profile</h2>

        <Form >

            <Form.Group className="form-container mb-3">
              <Form.Label>Change Email</Form.Label>
              <Form.Control defaultValue={data.email} className="text-center col-md-6 mx-auto" type="email" placeholder="Change Email"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Change Password</Form.Label>
              <Form.Control className="text-center col-md-6 mx-auto" type="password" placeholder="Change Password" />
            </Form.Group>

            <Button className="text-center col-md-6 mx-auto save-edit-btn" variant="primary" type="submit">
              Save
            </Button>

        </Form>
    </Container>
  );
}