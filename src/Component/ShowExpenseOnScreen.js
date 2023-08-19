import React,{useContext} from "react";
import { Container, Row,Table } from "react-bootstrap";
import AuthContext from "../Store/AuthContext";
import axios from "axios";


const ShowExpenseOnScreen = (props) => {

    const emailEx = localStorage.getItem("email").replace(/[^a-zA-Z0-9 ]/g, "");
    const url ='https://expense-tracker-d844b-default-rtdb.firebaseio.com/';

  const authCtx = useContext(AuthContext);

  const removeItem = (item) => {
    const urlRemoveItem = `${url}/expenses/${emailEx}/${item.firebaseID}.json`;

    axios.delete(urlRemoveItem)
    .then((res) => {
        console.log('expense deleted');
        authCtx.removeExpense(item.firebaseID);
    })
    .catch((error) => console.log(error.message));
  };

  const editExpense = (item) => {
    props.editItem(item);
  }

  const Items = authCtx.items.map((item) => {
    return (
      <tr className="text-dark fw-bold" key={item.firebaseID}>
        {/* <td>{item.id}</td> */}
        <td className="text-dark fw-bold">{item.category}</td>
        <td>{item.description}</td>
        <td className="text-dark fw-bold"> ₹ {item.money}.00</td>
        <td>
          <div className="d-grid ">
            <button 
            className="btn btn-success"
            onClick={() => editExpense(item)}>Edit</button>
          </div>
        </td>
        <td>
          <div className="d-grid">
            <button
              className="btn btn-danger "
              onClick={() => removeItem(item)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <Container className="mt-2 " style={{ backgroundColor: "#2FC3BA" }}>
      <Row>
        <Table striped="columns">
          <thead>
            <tr className="fs-5 text-danger">
              {/* <th>Sr. No.</th> */}
              <th className="fs-5 text-danger">Category</th>
              <th>Description</th>
              <th className="fs-5 text-danger">Money Spend</th>
              <th>Edit</th>
              <th className="fs-5 text-danger">Delete</th>
            </tr>
          </thead>
          <tbody>{Items}</tbody>
        </Table>
      </Row>
    </Container>

    );
};


export default ShowExpenseOnScreen;