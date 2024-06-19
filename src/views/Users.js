import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";

import { getAllUsers } from "Api/Api";
import { deleteUser } from "Api/Api";
import { successAlert } from "Alerts/Alerts";
import { errorAlert } from "Alerts/Alerts";
import DynamicModal from "components/Modal/Modal";
import { roundToOneDecimal } from "Common";
import { addProfitToBalance } from "Api/Api";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [updateBalance, setUpdateBalance] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        setAllUsers(response?.data?.users);
        console.log(response);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      successAlert(response?.data?.message);
      window.location.reload(false);
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };

  const openModal = (view,title,modalId) => {
    setIsOpen(true);
    setCurrentView(view);
    setModalId(modalId);
    setTitle(title);
  };

  const updateUserBalance = async (id) => {
    const values = {
      amount: parseFloat(updateBalance || 0),
    };
    try {
      const response = await addProfitToBalance(values, id);
      successAlert(response?.data?.message);
      window.location.reload(false);
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col xl={6}>
                  <CardTitle tag="h4">Users</CardTitle>
                </Col>
                {
                  // <Col xl={6} className="text-right">
                  //   <Button
                  //     color={paymentCheck === "pending" && "primary"}
                  //     onClick={() => setPaymentCheck("pending")}
                  //   >
                  //     Pending
                  //   </Button>
                  //   <Button
                  //     className="ml-3"
                  //     color={paymentCheck === "approved" && "primary"}
                  //     onClick={() => setPaymentCheck("approved")}
                  //   >
                  //     Approved
                  //   </Button>
                  // </Col>
                }
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Balance</th>
                    <th>Update Balance</th>
                    <th>Front ID</th>
                    <th>Back Id</th>
                    <th>Wallet Address</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers?.map((data, index) => (
                    <tr key={index}>
                      <td>
                        {data?.fname || "-"} {data?.lname}
                      </td>
                      <td>{data?.email || "-"}</td>
                      <td>{"$" + roundToOneDecimal(data?.balance) || "-"}</td>
                      <td>
                        <Input
                          // value={updateBalance}
                          onChange={(e) => setUpdateBalance(e.target.value)}
                          type="number"
                          placeholder="Enter amount"
                          required
                        />
                        <Button
                          variant="dark"
                          size="sm"
                          className="mt-2"
                          onClick={() => updateUserBalance(data?._id)}
                        >
                          {" "}
                          update
                        </Button>
                      </td>
                      <td>
                      {
                        // <img
                        //   src={data?.frontId}
                        //   alt="transaction"
                        //   style={{ height: "150px", width: "150px" }}
                        // />
                      }
                      <Button size="md" onClick={() => openModal("ImageViewer","Users", data?.frontId)}>View</Button>
                      </td>
                      <td>
                      {
                        // <img
                        //   src={data?.backId}
                        //   alt="transaction"
                        //   style={{ height: "150px", width: "150px" }}
                        // />
                      }
                       <Button size="md" onClick={() => openModal("ImageViewer","Users", data?.backId)}>View</Button>
                      </td>
                      <td>{data?.walletAddress || "-"}</td>
                      <td>
                        {moment(data?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
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
                            onClick={() => handleDelete(data?._id)}
                          ></i>
                          <i
                            className="fas fa-edit ml-lg-3 "
                            style={{
                              color: "black",
                              fontSize: "18px",
                              cursor: "pointer",
                            }}
                            onClick={() => openModal("updateWallet","Users", data?._id)}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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

export default Users;
