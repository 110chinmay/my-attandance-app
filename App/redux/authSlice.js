import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  userDetails: {}
};

export const initializeToken = createAsyncThunk(
  'auth/initializeToken',
  async () => {
    const [tokenKey, userDetailsKey] = await AsyncStorage.multiGet(['userToken', 'userData']);
    const token = JSON.parse(tokenKey[1]);
    const userDetails = JSON.parse(userDetailsKey[1]);
    return { token, userDetails };
  }
);

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            state.token = action.payload;
        },
        userDetails(state,action){
            state.userDetails = action.payload;
        },
        logout(state){
            state.token = null;
            state.userDetails = {};
        }
    },
    extraReducers: (builder) => {
      builder.addCase(initializeToken.fulfilled, (state, action) => {
        const { token, userDetails } = action.payload;
        state.token = token;
        state.userDetails = userDetails;
      });
    }
});

export const {login,logout,userDetails} = authSlice.actions;
export default authSlice.reducer;
