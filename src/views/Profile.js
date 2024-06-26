import { errorAlert } from "Alerts/Alerts";
import { successAlert } from "Alerts/Alerts";
import { updateUserInfo } from "Api/Api";
import { deleteSliderImage } from "Api/Api";
import { getAbout } from "Api/Api";
import { deleteAnnouncement } from "Api/Api";
import { getAnnouncement } from "Api/Api";
import { saveAbout } from "Api/Api";
import { getSliderImages } from "Api/Api";
import { getUser } from "Api/Api";
import DynamicModal from "components/Modal/Modal";
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
  CardHeader,
  Table,
} from "reactstrap";

const Profile = () => {
  const id = localStorage.getItem("id");
  const [userData, setUserData] = useState();
  const [sliderImages, setSliderImages] = useState();
  const [changedFields, setChangedFields] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [announcement, setAnnouncement] = useState();
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
    const fetchSliderImage = async () => {
      try {
        const response = await getSliderImages();
        setSliderImages(response?.data?.existingImage[0]?.images);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
    const fetchAbout = async () => {
      try {
        const response = await getAbout();
        setAbout(response?.data?.about?.content);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };
     const fetchAnnouncement = async () => {
      try {
        const response = await getAnnouncement();
        console.log(response,"annoucne response")
        setAnnouncement(response?.data?.announcements);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchUserInfo();
    fetchSliderImage();
    fetchAbout();
    fetchAnnouncement()
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

  const handleSliderImageDelete = async (id) => {
    try {
      const response = await deleteSliderImage(id);
      successAlert(response?.data?.message);
      window.location.reload(false);
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };
  const handleAnnouncementDelete = async (id) => {
    try {
      const response = await deleteAnnouncement(id);
      successAlert(response?.data?.message);
      window.location.reload(false);
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };

  const updateAboutInfo = async (e) => {
    e.preventDefault();
    const values = {
      content: about,
    };
    try {
      const response = await saveAbout(values);
      if (response?.status === 200) {
        successAlert("Information updated");
        window.location.reload(false);
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };
  const openModal = (view, title, modalId) => {
    setIsOpen(true);
    setCurrentView(view);
    setModalId(modalId);
    setTitle(title);
  };

  return (
    <div className="content">
      <Row className="w-100 justify-content-center mt-5">
        <Col xl={12}>
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
              <h2 className="text-center mb-0"> Profile Information</h2>
              <p className="text-center mt-2">Update Your Profile Info.</p>
            </CardTitle>
            <CardBody>
              <Form onSubmit={submit}>
                <Input
                  type="text"
                  name="fname"
                  placeholder="first name"
                  className="mt-3"
                  defaultValue={formData.fname || userData?.fname}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="lname"
                  placeholder="last name"
                  className="mt-3"
                  defaultValue={formData.lname || userData?.lname}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="mt-3"
                  defaultValue={formData.email || userData?.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  defaultValue={
                    formData.walletAddress || userData?.walletAddress
                  }
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
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Slider Images</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>#</th>
                    <th>Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sliderImages?.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Button
                          size="md"
                          onClick={() =>
                            openModal(
                              "ImageViewer",
                              "Slider Image",
                              data?.image
                            )
                          }
                        >
                          View
                        </Button>
                      </td>
                      <td>
                        <div className="d-flex">
                          <i
                            className="fa fa-trash ml-lg-3"
                            style={{
                              color: "black",
                              fontSize: "18px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleSliderImageDelete(data?._id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                type="button"
                className="border-0  mt-3 auth-button mb-5"
                onClick={() => openModal("SliderImages", "Add Image")}
              >
                + Add
              </Button>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">About Us</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={updateAboutInfo}>
                <Input
                  id="exampleText"
                  name="text"
                  type="textarea"
                  style={{ height: "300px", maxHeight: "1000px" }}
                  onChange={(e) => setAbout(e.target.value)}
                  defaultValue={about}
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
           <Card>
            <CardHeader>
              <CardTitle tag="h4">Announcements</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>#</th>
                    <th>Announcement</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcement?.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                       {data?.announcement}
                      </td>
                      <td>
                        <div className="d-flex">
                          <i
                            className="fa fa-trash ml-lg-3"
                            style={{
                              color: "black",
                              fontSize: "18px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleAnnouncementDelete(data?._id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                type="button"
                className="border-0  mt-3 auth-button mb-5"
                onClick={() => openModal("Announcements", "Add Announcement")}
              >
                + Add
              </Button>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">WhatsApp Numbers</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>#</th>
                    <th>Announcement</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcement?.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                       {data?.announcement}
                      </td>
                      <td>
                        <div className="d-flex">
                          <i
                            className="fa fa-trash ml-lg-3"
                            style={{
                              color: "black",
                              fontSize: "18px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleAnnouncementDelete(data?._id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                type="button"
                className="border-0  mt-3 auth-button mb-5"
                onClick={() => openModal("Announcements", "Add Announcement")}
              >
                + Add
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <DynamicModal
        isOpen={isOpen}
        toggle={() => setIsOpen(false)}
        view={currentView}
        title={title}
        id={modalId}
      />
    </div>
  );
};

export default Profile;
