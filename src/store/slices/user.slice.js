import { createSlice } from '@reduxjs/toolkit';

export const userNameSlice = createSlice({
    name: 'userName',
    initialState: '',
    reducers: {
        setUserName: (state, action) =>{
            const inputValue = action.payload
            sessionStorage.setItem('userToken', inputValue)
            return inputValue;
        }
    }
})

export const { setUserName } = userNameSlice.actions;

export default userNameSlice.reducer;