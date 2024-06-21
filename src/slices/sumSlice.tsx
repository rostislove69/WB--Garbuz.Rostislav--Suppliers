import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Api from "../utils/Api";

export const getSum = createAsyncThunk("data/getSum", async () => {
  const response = await Api.getSum();
  return response;
});

export const updateSum = createAsyncThunk(
  "data/updateSum",
  async (data: number) => {
    const response = await Api.updateSum(data);
    return response;
  }
);

interface InitialState {
  sum: number;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  sum: 0,
  loading: false,
  error: null,
};

const sumSlice = createSlice({
  name: "sum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSum.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.sum = action.payload[0].data.sum;
      })
      .addCase(getSum.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Ошибка при получении количества поставок";
      })
      .addCase(updateSum.fulfilled, (state, action: PayloadAction<any>) => {
        state.sum = action.payload.data.sum;
      })
      .addCase(updateSum.rejected, (state, action) => {
        state.error =
          action.error.message || "Ошибка при обновлении количества поставок";
      });
  },
});

export default sumSlice.reducer;
