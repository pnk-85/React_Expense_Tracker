import React, { useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom'

import { Container, Row, Col } from "react-bootstrap";
import ShowExpenseOnScreen from "../Component/ShowExpenseOnScreen";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../Store/expenses";
import { authActions } from "../Store/auth";



const Profile = () => {

  const item = useSelector(state => state.expenses.items);
  const token = localStorage.getItem('token');
  const isProfileCompleted = useSelector(state => state.auth.isProfileCompleted);

  const dispatch = useDispatch();

  const history = useHistory();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const moneyRef = useRef();
  const url = 'https://expense-tracker-d844b-default-rtdb.firebaseio.com/';
  let emailEx = localStorage.getItem("email").replace(/[^a-zA-Z0-9 ]/g, "");

  const goToPrifile = () => {
    history.push("/profilepage");
  };

  function getData() {
    axios
      .get(`${url}/expenses/${emailEx}.json`)
      .then((res) => {
        console.log(res.data);
        const firebaseIDs = Object.keys(res.data);
        const newItems = [];
        Object.values(res.data).forEach((el) => {
          newItems.push({
            ...JSON.parse(el.body),
            key: firebaseIDs[newItems.length],
            firebaseID: firebaseIDs[newItems.length],
          });
        });
        dispatch(expenseActions.getItems(newItems))
      })
      .catch((error) => console.log(error.message));


      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB_KrVsqVyvnfxCyCt-K0OsCwLiMnhrEVU',
      {
        idToken : token
      })
      .then((res) => {
        if(!res.data.users[0].displayName && !res.data.users[0].photoUrl){

        }else {
          dispatch(authActions.profileCompleted);
        }
      })
      .catch((error) => console.log(error.response.data.error.message));
  }

  useEffect(() => {
    getData();
  }, []);

  const addExpenseHandler = () => {
    const item = {
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      money: moneyRef.current.value,
    };
    console.log("item in profile", item);

    axios.post(`${url}/expenses/${emailEx}.json`, {
      body: JSON.stringify(item)
    })
      .then((res) => {

        const newItem = {
          ...item,
          firebaseID: res.data.name,
          key: res.data.name,
        };

        dispatch(expenseActions.addExpense(newItem));


        categoryRef.current.value = "Category";
        descriptionRef.current.value = "";
        moneyRef.current.value = "";
      })
      .catch((error) => console.log(error.message));
  };

  const editItem = (item) => {
    
    categoryRef.current.value = item.category;
    descriptionRef.current.value = item.description;
    moneyRef.current.value = item.money;

    axios
      .delete(`${url}/expenses/${emailEx}/${item.firebaseID}.json`)
      .then((res) => {
        console.log(res);

        dispatch(expenseActions.removeExpense(item.firebaseID));
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <>
      <div>
        <h1>Welcome to Expense Tracker!!!</h1>
        {!isProfileCompleted && (
          <h3 className="float-end me-4">
            Your profile is incomplete
            <button
              className="btn btn-link"
              style={{ marginTop: "-1rem" }}
              onClick={goToPrifile}
            >
              Complete Now{" "}
            </button>
          </h3>
        )}
        {isProfileCompleted && (
          <button 
          className="btn btn-primary float-end me-5"
          style={{
            marginTop: "-7rem ",
              position: "fixed",
              marginLeft: "90%",
              zIndex: 1,
          }}
          onClick={goToPrifile}
          >
            Profile
          </button>
        )}
      </div>
      <h3 className="text-center mt-3">Add Expenses</h3>
      <Container className="mt-2 bg-info p-4 rounded-3">
        <Row>
          <Col>
            <label className="fw-bold me-1 text-danger fs-5">
              {" "}
              Select Category :
            </label>
            <select
              aria-label="Default select example"
              className="rounded-pill ms-2 p-1 ps-3"
              style={{ width: "14rem" }}
              ref={categoryRef}
            >
              <option>Category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Medicine">Medicine</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </Col>
          <Col>
            <form>
              <label className="fw-bold me-1 text-danger fs-5">
                {" "}
                Description :
              </label>
              <input
                type="text"
                ref={descriptionRef}
                className="rounded-pill ms-2 p-1 ps-3"
                style={{ width: "16rem" }}
              />
            </form>
          </Col>
          <Col>
            <form>
              <label className="fw-bold me-1 text-danger fs-5">
                Money Spend : ₹
              </label>
              <input
                type="number"
                ref={moneyRef}
                className="rounded-pill ms-2 p-1 ps-3"
              />
            </form>
          </Col>
        </Row>
        <Row className="text-end mt-3 me-4 ">
          <Col xs={8}>
            <h4>
              Do not cut down on your expenses, Increase your income!!!!
            </h4>
          </Col>
          <Col xs={4}>
            <button
              className="btn btn-danger rounded-pill fw-bold"
              style={{ width: "190px", marginRight: "12px" }}
              onClick={addExpenseHandler}
            >
              {" "}
              Add Expence
            </button>
          </Col>
        </Row>
      </Container>
      {!!item.length && <ShowExpenseOnScreen editItem={editItem} />}
    </>
  )
};


export default Profile;