import {createSlice,configureStore} from '@reduxjs/toolkit';


const initialState = {

}
const intervalSlice = createSlice({
    name : "interval",
    initialState : initialState,
    reducers : {
        setIntervalListOfThisAlarmId(state,action){
            const alarmId      = action.payload.alarmId;
            const intervalList = action.payload.intervalList;
            state[alarmId] = intervalList;
        },
        updateIntervalListOfThisAlarmId(state,action){
            const alarmId = action.payload.alarmId;
            const intervalList = [...state[alarmId],action.payload.intervalObj];
            state[alarmId] = intervalList;
        },
        deleteIntervalListOfThisAlarmId(state,action){
            const alarmId = action.payload.alarmId;
            const intervalId = action.payload.intervalId;
            const intervalList = state[alarmId].filter((intervalObj)=>{
                return intervalId!=intervalObj.id;
            });
            state[alarmId] = intervalList;
        },
    }
    
})
export default intervalSlice;
export const intervalSliceActions = intervalSlice.actions;