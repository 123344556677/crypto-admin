import { errorAlert } from "Alerts/Alerts";
import { successAlert } from "Alerts/Alerts";
import { updateWalletAddress } from "Api/Api";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Input, Form, Button } from "reactstrap";

const DynamicModal = ({ isOpen, toggle, view, title, id }) => {
  const [walletAddress, setWalletAddress] = useState("");
  let content;

  const submit = async (e) => {
    e.preventDefault();

    const values = {
      walletAddress: walletAddress,
    };

    try {
      if (view === "updateWallet") {
        const response = await updateWalletAddress(id, values);
        successAlert(response?.data?.message);
        window.location.reload(false);
      }
    } catch (err) {
      errorAlert(err?.response?.data?.err);
      console?.log(err);
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
