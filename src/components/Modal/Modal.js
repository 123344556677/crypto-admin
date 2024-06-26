import { errorAlert } from "Alerts/Alerts";
import { successAlert } from "Alerts/Alerts";
import { saveSliderImages } from "Api/Api";
import { addAnnouncement } from "Api/Api";
import { updateWalletAddress } from "Api/Api";
import { uploadImageToFirebase } from "Common";
import { toBase64 } from "Common";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Input, Form, Button } from "reactstrap";

const DynamicModal = ({ isOpen, toggle, view, title, id }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [sliderImage, setSliderImage] = useState("");
  let content;

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (view === "updateWallet") {
        const values = {
          walletAddress: walletAddress,
        };
        const response = await updateWalletAddress(id, values);
        successAlert(response?.data?.message);
        window.location.reload(false);
      }
      if (view === "Announcements") {
        const values = {
          announcement: announcement,
        };
        const response = await addAnnouncement(values);
        if (response?.status === 200) {
          successAlert("Announcement Made");
          window.location.reload(false);
        }
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
      console?.log(err);
    }
  };
  const handleImageChange = async (e) => {
    const { files } = e.target;
    if (files) {
      const file = files[0];
      const base64 = await toBase64(file);
      setSliderImage(base64);
    }
  };

  const updateSliderImage = async () => {
    try {
      const imageUrl = await uploadImageToFirebase(sliderImage);
      const values = {
        image: imageUrl,
      };
      const response = await saveSliderImages(values);
      if (response?.status === 200) {
        successAlert("Image updated successfully");
        window.location.reload(false);
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
      console.log(err, "signup error-->");
    }
  };

  switch (view) {
    case "updateWallet":
      content = (
        <div>
          <h4 className="text-center mb-0"> Wallet Address</h4>
          <Form onSubmit={submit}>
            <Input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              type="text"
              placeholder="wallet Address"
              required
              className="mt-3"
            />

            <Button type="submit" className="border-0 w-100 mt-3 mb-5">
              Update
            </Button>
          </Form>
        </div>
      );
      break;
    case "ImageViewer":
      content = (
        <div>
          <img src={id} alt="cnic" />
        </div>
      );
      break;
    case "SliderImages":
      content = (
        <div>
          <input
            accept="image/*"
            type="file"
            className="fs-6 form-control-file"
            name="backId"
            onChange={handleImageChange}
            required
          />
          <Button
            type="button"
            className="border-0 w-100 mt-3 auth-button mb-5"
            onClick={updateSliderImage}
          >
            Update
          </Button>
        </div>
      );
      break;
    case "Announcements":
      content = (
        <div>
          <h4 className="text-center mb-0"> Announcement</h4>
          <Form onSubmit={submit}>
            <Input
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              type="text"
              placeholder="Make announcement"
              required
              className="mt-3"
            />

            <Button type="submit" className="border-0 w-100 mt-3 mb-5">
              Update
            </Button>
          </Form>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
    </Modal>
  );
};

export default DynamicModal;
