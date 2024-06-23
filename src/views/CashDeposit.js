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
  Button,
  Input,
} from "reactstrap";
import { getPendingCashDeposits, getApprovedCashDeposits } from "Api/Api";
import { updateDepositStatus } from "Api/Api";
import { errorAlert } from "Alerts/Alerts";
import { successAlert } from "Alerts/Alerts";
import { deleteDeposit } from "Api/Api";
import DynamicModal from "components/Modal/Modal";

const CashDeposit = () => {
  const [approvedCash, setApprovedCash] = useState([]);
  const [pendingCash, setPendingCash] = useState([]);
  const [paymentCheck, setPaymentCheck] = useState("pending");
  const [addAmount, setAddAmount] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState(null);
  const [modalId, setModalId] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchApprovedCash = async () => {
      try {
        const response = await getApprovedCashDeposits();
        setApprovedCash(response?.data?.getCashDeposited);
      } catch (error) {
        console.error("Error fetching approved cash deposits:", error);
      }
    };

    fetchApprovedCash();
  }, []);

  useEffect(() => {
    const fetchPendingCash = async () => {
      try {
        const response = await getPendingCashDeposits();
        setPendingCash(response?.data?.getCashDeposited);
      } catch (error) {
        console.error("Error fetching pending cash deposits:", error);
      }
    };

    fetchPendingCash();
  }, []);

  const handlePendingChange = async (event, index, id) => {
    const { value } = event.target;
    const updatedPendingCash = [...pendingCash];
    updatedPendingCash[index].status = value;
    setPendingCash(updatedPendingCash);
    const values = {
      status: event.target.value,
      additionalAmount: parseFloat(addAmount || 0),
    };
    try {
      const response = await updateDepositStatus(id, values);
      successAlert(response?.data?.message);
      window.location.reload(false);
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };
  const handleApprovedChange = async (event, index, id) => {
    const { value } = event.target;
    const updatedApprovedCash = [...approvedCash];
    updatedApprovedCash[index].status = value;
    setApprovedCash(updatedApprovedCash);
    const values = {
      status: event.target.value,
    };
    try {
      const response = await updateDepositStatus(id, values);
      successAlert(response?.data?.message);
      window.location.reload(false);
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteDeposit(id);
      successAlert(response?.data?.message);
      window.location.reload(false);
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
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col xl={6}>
                  <CardTitle tag="h4">Cash Deposits</CardTitle>
                </Col>
                <Col xl={6} className="text-right">
                  <Button
                    color={paymentCheck === "pending" && "primary"}
                    onClick={() => setPaymentCheck("pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    className="ml-3"
                    color={paymentCheck === "approved" && "primary"}
                    onClick={() => setPaymentCheck("approved")}
                  >
                    Approved
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Transaction Number</th>
                    <th>Amount</th>
                    <th>Screenshot</th>
                    {paymentCheck === "pending" && <th>Add Amount</th>}

                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentCheck === "pending" &&
                    pendingCash?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {data?.userId?.fname || "-"} {data?.userId?.lname}
                        </td>
                        <td>{data?.userId?.email || "-"}</td>
                        <td>{data?.transactionNumber || "-"}</td>
                        <td>${data?.amount}</td>
                        <td>
                          <Button
                            size="md"
                            onClick={() =>
                              openModal(
                                "ImageViewer",
                                "Transaction Image",
                                data?.image
                              )
                            }
                          >
                            View
                          </Button>
                        </td>
                        <td>
                          <Input
                            value={addAmount}
                            onChange={(e) => setAddAmount(e.target.value)}
                            type="number"
                            placeholder="Enter amount"
                            required
                          />
                        </td>
                        <td>
                          <Input
                            id={`exampleSelect-${index}`}
                            name={`select-${index}`}
                            type="select"
                            value={data?.status}
                            onChange={(e) =>
                              handlePendingChange(e, index, data?._id)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                          </Input>
                        </td>
                        <td>
                          {moment(data?.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </td>
                        <td onClick={() => handleDelete(data?._id)}>
                          <i
                            className="fa fa-trash ml-lg-3"
                            style={{
                              color: "black",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  {paymentCheck === "approved" &&
                    approvedCash?.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {data?.userId?.fname || "-"} {data?.userId?.lname}
                        </td>
                        <td>{data?.userId?.email || "-"}</td>
                        <td>{data?.transactionNumber || "-"}</td>
                        <td>${data?.amount}</td>
                        <td>
                          <img
                            src={data?.image}
                            alt="transaction"
                            style={{ height: "150px", width: "150px" }}
                          />
                        </td>
                        <td>
                          <Input
                            id={`exampleSelect-${index}`}
                            name={`select-${index}`}
                            type="select"
                            value={data?.status}
                            onChange={(e) =>
                              handleApprovedChange(e, index, data?._id)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                          </Input>
                        </td>
                        <td>
                          {moment(data?.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </td>
                        <td onClick={() => handleDelete(data?._id)}>
                          <i
                            className="fa fa-trash ml-lg-3"
                            style={{
                              color: "black",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                          ></i>
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

export default CashDeposit;
