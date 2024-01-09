import {createSlice} from '@reduxjs/toolkit';
const initialAuthState:{token:string} = {
    token: localStorage.getItem('token') || '',
}
const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        addToken(state,action){
            state.token = action.payload;
            localStorage.setItem('token',action.payload);
        },
        logout(state){
            state.token='';
            localStorage.removeItem('token');
        }
    }
})
export default authSlice;