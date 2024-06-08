import { errorAlert } from "Alerts/Alerts";
import { successAlert } from "Alerts/Alerts";
import { updateUserInfo } from "Api/Api";
import { getUser } from "Api/Api";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  CardTitle,
  CardBody,
  Input,
  Form,
} from "reactstrap";

const Profile = () => {
  const id = localStorage.getItem("id");
  const [userData, setUserData] = useState();
  const [changedFields, setChangedFields] = useState({});
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    walletAddress: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUser(id);
        setUserData(response?.data?.user);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setChangedFields((prevChangedFields) => ({
      ...prevChangedFields,
      [name]: true,
    }));
  };

  /* Submit Form */
  const submit = async (e) => {
    e.preventDefault();
    const changedValues = {};
    Object.keys(changedFields).forEach((field) => {
      if (changedFields[field]) {
        changedValues[field] = formData[field];
      }
    });
    // Submit only the changed values
    try {
      const response = await updateUserInfo(changedValues);
      if (response?.status === 200) {
        successAlert("Profile updated");
        window.location.assign("/admin/dashboard");
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
      console?.log(err);
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
                  src={require("../assets/img/Family Loan Insurance Logo.png")}
                  style={{ height: "100px", width: "100px" }}
                  alt="Logo"
                />
              </div>
              <h2 className="text-center mb-0"> Profie Information</h2>
              <p className="text-center mt-2">Update Your Profile Info.</p>
            </CardTitle>
            <CardBody>
              <Form onSubmit={submit}>
                <Input
                  type="text"
                  name="fname"
                  placeholder="first name"
                  className="mt-3"
                  defaultValue={formData.fname||userData?.fname}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="lname"
                  placeholder="last name"
                  className="mt-3"
                  defaultValue={formData.lname||userData?.lname}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="mt-3"
                  defaultValue={formData.email||userData?.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  defaultValue={formData.walletAddress||userData?.walletAddress}
                  type="text"
                  name="walletAddress"
                  placeholder="wallet address"
                  className="mt-3"
                  onChange={handleChange}
                  required
                />
                <Button
                  type="submit"
                  className="border-0 w-100 mt-3 auth-button mb-5"
                >
                  Update
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
