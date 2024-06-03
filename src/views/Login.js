import { errorAlert } from 'Alerts/Alerts';
import { successAlert } from 'Alerts/Alerts';
import { login } from 'Api/Api';
import { setLocalStorage } from 'Common';
import React, { useState } from 'react'
import { Col, Row,Button, Card, CardTitle, CardBody, Input, Form } from "reactstrap";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  /* Submit Form */
  const submit = async (e) => {
    e.preventDefault();

    const values = {
      email,
      password,
    };

    try {
      const response = await login(values);
      if (response.status === 200) {
        successAlert(response?.data?.message);
        setLocalStorage("token", response.data?.data?.token);
        setLocalStorage("id", response.data?.data?._id);
        window.location.assign('/admin/dashboard');
        
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
      console?.log(err)
    }
  };
  return (
    <div className="content">
    <Row className="w-100 justify-content-center mt-5">
        <Col xl={4}>
          <Card className="">
            <CardTitle>
              <div className="d-flex justify-content-center">
                <img
                  className="logo"
                  src={require('../assets/img/Family Loan Insurance Logo.png')}
                  style={{height:"100px",width:"100px"}}
                  alt="Logo"
                />
              </div>
              <h2 className="text-center mb-0"> Login</h2>
              <p className="text-center mt-2">
                Welcome back sign in to your account
              </p>
            </CardTitle>
            <CardBody>
              <Form onSubmit={submit}>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className='mt-3'
                    required
                  />

                <Button
                  type="submit"
                  className="border-0 w-100 mt-3 auth-button mb-5"
                >
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
  )
}
