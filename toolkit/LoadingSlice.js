import {createSlice,configureStore} from '@reduxjs/toolkit';


const initialState = {

}
const loadingSlice = createSlice({
    name : "interval",
    initialState : initialState,
    reducers : {
        setLoadingStateByAlarmId(state,action){
            const alarmId  = action.payload.alarmId;
            state[alarmId] = false;
        },
        toggleLoadingStateByAlarmId(state,action){
            const alarmId  = action.payload.alarmId;
            state[alarmId] = !state[alarmId];
        },
        
        
    }
    
})
export default loadingSlice;
export const loadingSliceActions = loadingSlice.actions;