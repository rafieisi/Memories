import {createSlice} from '@reduxjs/toolkit';

const pageNumberState = createSlice({
    name:"pageNumber",
    initialState:{pageNumber:1,total:1},
    reducers:{
        setPageNumber:(state,action)=>{
            state.pageNumber = action.payload.data
        },
        setTotal:(state,action)=>{
            console.log(action.payload)
            state.total = action.payload.data
        }
    }
})

export const {setPageNumber, setTotal} = pageNumberState.actions
export default pageNumberState.reducer