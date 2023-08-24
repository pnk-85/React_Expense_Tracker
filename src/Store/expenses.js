import { createSlice } from "@reduxjs/toolkit";

const initialExpensesState = { items: [], total: 0 };

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addExpense(state, action) {
      state.items = [...state.items, action.payload];
      state.total = +state.total + +action.payload.money;
      console.log("state", state.total);
    },

    removeall (state) {
      state.items = []
    },

    removeExpense(state, action) {
      state.items = state.items.filter(
        (el) => el.firebaseID !== action.payload.firebaseID
      );
      state.total = +state.total - +action.payload.money;
      if(state.items.length === 0){
        state.total = 0;
      }else {
        state.total = +state.total - +action.payload.money;
      }
    },

    getItems(state, action) {
      state.items = action.payload;
      if (action.payload.length) {
        state.total = action.payload.reduce(
          (acc, curr) => +acc + +curr.money,
          0
        );
      }
    },
  },
});

export const expenseActions = expensesSlice.actions;

export default expensesSlice.reducer;