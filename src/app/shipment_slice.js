import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_DATA_LOADING,
  FETCH_DATA_IDLE,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "./actionType";

export const fetchThunkShipment = createAsyncThunk(
  "shipment/fetchThunkShipment",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        "https://tracking.bosta.co/shipments/track/" + id
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

var initialState = {
  data: [],
  status: FETCH_DATA_IDLE,
  error: null,
};

export const shipmentSlice = createSlice({
  name: "shipment",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThunkShipment.pending, (state, action) => {
        state.status = FETCH_DATA_LOADING;
      })
      .addCase(fetchThunkShipment.fulfilled, (state, action) => {
        state.status = FETCH_DATA_SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchThunkShipment.rejected, (state, action) => {
        state.status = FETCH_DATA_ERROR;
        state.error = "Invalid ID";
      });
  },
});
export const selectData = (state) => state.shipment.data;
export const selectError = (state) => state.shipment.error;
export const selectStatus = (state) => state.shipment.status;

export default shipmentSlice.reducer;
