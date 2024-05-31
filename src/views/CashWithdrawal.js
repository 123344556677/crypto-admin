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
import { errorAlert } from "Alerts/Alerts";
import { successAlert } from "Alerts/Alerts";
import { getApprovedCashWithdrawal } from "Api/Api";
import { getPendingCashWithdrawal } from "Api/Api";
import { updateWithdrawalStatus } from "Api/Api";
import { deleteWithdrawal } from "Api/Api";

const CashWithdrawal = () => {
  const [approvedCash, setApprovedCash] = useState([]);
  const [pendingCash, setPendingCash] = useState([]);
  const [paymentCheck, setPaymentCheck] = useState("pending");

  useEffect(() => {
    const fetchApprovedCash = async () => {
      try {
        const response = await getApprovedCashWithdrawal();
        setApprovedCash(response?.data?.getCashWithDrawal);
      } catch (error) {
        console.error("Error fetching approved cash withdrawal:", error);
      }
    };

    fetchApprovedCash();
  }, []);

  useEffect(() => {
    const fetchPendingCash = async () => {
      try {
        const response = await getPendingCashWithdrawal();
        setPendingCash(response?.data?.getCashWithDrawal);
      } catch (error) {
        console.error("Error fetching pending cash withdrawal:", error);
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
    };
    try {
      const response = await updateWithdrawalStatus(id, values);
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
      const response = await updateWithdrawalStatus(id, values);
      successAlert(response?.data?.message);
      window.location.reload(false);
    } catch (err) {
      errorAlert(err?.response?.data?.err);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteWithdrawal(id);
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
                  <CardTitle tag="h4">Cash Withdrawals</CardTitle>
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
                    <th>Amount</th>
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
                        <td>${data?.amount}</td>
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
                        <td>${data?.amount}</td>
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
    </div>
  );
};

export default CashWithdrawal;
