import { CustomerFormData } from "@/components/Homepage/BillGeneratorForm";
import { createSlice } from "@reduxjs/toolkit";

interface BillState {
  customerList: CustomerFormData[];
}

const initialState: BillState = {
    customerList: []
};
  
const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        addBill: (state, action) => {
            state.customerList.push(action.payload)
        },
      updateFormField: (state, action) => {
        const { field, value } = action.payload;
        state.customerList[field] = value;
      },
      // addProduct: (state, action) => {
      //   state.customerList.products.push(action.payload);
      // },
      // updateProduct: (state, action) => {
      //   const { index, updatedProduct } = action.payload;
      //   state.customerList.products[index] = updatedProduct;
      // },
      // removeProduct: (state, action) => {
      //   state.customerList.products.splice(action.payload, 1);
      // },
      resetForm: () => initialState,
    },
  });
  
  // Export Actions & Reducer
  export const { addBill, updateFormField, resetForm } = formSlice.actions;
  export default formSlice.reducer;