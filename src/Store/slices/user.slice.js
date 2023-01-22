import { createSlice } from '@reduxjs/toolkit';

export const userNameSlice = createSlice({
    name: 'userName',
    initialState: 'example',
    reducers: {
        setUserName: (state, action) =>{
            const inputValue = action.payload
            return inputValue;
        }
    }
})

export const { setUserName } = userNameSlice.actions;

export default userNameSlice.reducer;