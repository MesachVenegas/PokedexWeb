import { createSlice } from "@reduxjs/toolkit";


export const userName = createSlice({
    name: 'userName',
    initialState: "example",
    reducers: {
        setName: (state, actions) =>{
            // state = actions.payload
            console.log(state);
        }
    }
})

export const { setName } = userName.actions;
export default userName.slice;