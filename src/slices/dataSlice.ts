import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Api from "../utils/Api";
import { ResponsedData, SupplyData } from "../utils/types";

export const getSupplys = createAsyncThunk("data/getSupplys", async () => {
  const response = await Api.getSupplys();
  return response;
});

export const addSupply = createAsyncThunk(
  "data/addSupply",
  async (newSupply: SupplyData) => {
    const response = await Api.createSupply(newSupply);
    return response;
  }
);

export const updateSupply = createAsyncThunk(
  "data/updateSupply",
  async ({ id, data }: { id: string; data: SupplyData }) => {
    const response = await Api.updateSupply(data, id);
    return response;
  }
);

export const deleteSupply = createAsyncThunk(
  "data/deleteSupply",
  async (id: string) => {
    await Api.deleteSupply(id);
    return id;
  }
);

interface DataState {
  data: ResponsedData[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSupplys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSupplys.fulfilled,
        (state, action: PayloadAction<ResponsedData[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getSupplys.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Ошибка при получении данных о поставках";
      })
      .addCase(
        addSupply.fulfilled,
        (state, action: PayloadAction<ResponsedData>) => {
          state.data.push(action.payload);
        }
      )
      .addCase(addSupply.rejected, (state, action) => {
        state.error =
          action.error.message || "Ошибка при добавлении новой поставки";
      })
      .addCase(updateSupply.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateSupply.rejected, (state, action) => {
        state.error = action.error.message || "Ошибка при обновлении поставки";
      })
      .addCase(
        deleteSupply.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((item) => item.id !== action.payload);
        }
      )
      .addCase(deleteSupply.rejected, (state, action) => {
        state.error = action.error.message || "Ошибка при удалении поставки";
      });
  },
});

export default dataSlice.reducer;
