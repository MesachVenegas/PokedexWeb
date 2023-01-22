import { createSlice } from '@reduxjs/toolkit';

export const userNameSlice = createSlice({
    name: 'userName',
    initialState: 'example',
    reducers: {
        setUserName: (state, action) =>{
            return 'clickeado'
        }
    }
})

export const { setUserName } = userNameSlice.actions;

export default userNameSlice.reducer;