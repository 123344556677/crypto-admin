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
} from "reactstrap";

import { getAllUsers } from "Api/Api";
import { deleteUser } from "Api/Api";
import { successAlert } from "Alerts/Alerts";
import { errorAlert } from "Alerts/Alerts";
import DynamicModal from "components/Modal/Modal";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState(null);
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        setAllUsers(response?.data?.users);
        console.log(response)
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

  const openModal = (view,modalId) => {
    setIsOpen(true);
    setCurrentView(view);
    setModalId(modalId)

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
                      <td>{"$"+data?.balance || "-"}</td>
                      <td>
                        <img
                          src={data?.frontId}
                          alt="transaction"
                          style={{ height: "150px", width: "150px" }}
                        />
                      </td>
                      <td>
                        <img
                          src={data?.backId}
                          alt="transaction"
                          style={{ height: "150px", width: "150px" }}
                        />
                      </td>
                      <td>
                        {data?.walletAddress || "-"}
                      </td>
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
                            onClick={() => openModal("updateWallet",data?._id)}
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
        title="Users"
        id={modalId}
      />
    </div>
  );
};

export default Users;
