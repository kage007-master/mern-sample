import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "settings/index.json";
import axios from "axios";

const initialState: NFTState = {
  base: [],
  custom: [],
  loading: false,
  actionState: false,
};

export const getNfts = createAsyncThunk("nft/get", async () => {
  const res = await axios.get<any>(config.baseURL + "/api/nft");
  return res.data;
});

export const add = createAsyncThunk("nft/add", async (data: AddData) => {
  const res = await axios.post<any>(config.baseURL + "/api/nft/add", data);

  return res.data.nfts;
});

export const remove = createAsyncThunk(
  "nft/remove",
  async (data: RemoveData) => {
    const res = await axios.post<any>(config.baseURL + "/api/nft/remove", data);
    return res.data.nfts;
  }
);

export const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNfts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNfts.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.base = action.payload.base.sort((a: NFT, b: NFT) => {
        return b.value - a.value;
      });
      state.custom = action.payload.custom.sort((a: NFT, b: NFT) => {
        return b.value - a.value;
      });
    });
    builder.addCase(getNfts.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(add.pending, (state, action) => {
      state.actionState = true;
    });
    builder.addCase(add.fulfilled, (state, action: PayloadAction<any>) => {
      state.actionState = false;
      state.custom = action.payload.sort((a: NFT, b: NFT) => {
        return b.value - a.value;
      });
    });
    builder.addCase(add.rejected, (state, action) => {
      state.actionState = false;
    });
    builder.addCase(remove.pending, (state, action) => {
      state.actionState = true;
    });
    builder.addCase(remove.fulfilled, (state, action: PayloadAction<any>) => {
      state.actionState = false;
      state.custom = action.payload.sort((a: NFT, b: NFT) => {
        return b.value - a.value;
      });
    });
    builder.addCase(remove.rejected, (state, action) => {
      state.actionState = false;
    });
  },
});

export default nftSlice.reducer;
