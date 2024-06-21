import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortOptions } from "../utils/types";

interface SortState {
  sortOption: SortOptions;
}

const initialState: SortState = {
  sortOption: SortOptions.number,
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<SortOptions>) => {
      state.sortOption = action.payload;
    },
  },
});

export const { setSortOption } = sortSlice.actions;
export default sortSlice.reducer;
