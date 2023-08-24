import {createSlice,configureStore} from '@reduxjs/toolkit';


const initialState = {
    allData : null,
    reduxHasData :false,
    refresh : true,
    

}
const dataSlice = createSlice({
    name : "alarm",
    initialState : initialState,
    reducers : {
        setAlarmData(state,action){
            state.allData = action.payload;
            console.log("message from redux : data has been set");
            state.reduxHasData = true
            console.log("message from redux : reduxHasData set to true");
            const alarmObjList = action.payload;
            alarmObjList.forEach((obj)=>{
                state[obj.id] = obj;
            })
            // console.log(state);
        },
        addOneAlarmData(state,action){
            console.log(state.length);
        },
        setDataFetched(state,action){
            state.dataFetched = action.payload;
        },
        toggleRefresh(state,action){
            state.refresh = !state.refresh;
        },
        findIntervalListOf(state,action){
            const res =  state.allData.filter((obj)=>{
                return obj.id == action.payload;
            })
            return res[0]['intervalList'];
        },
        setAlarmByAlarmId(state,action){
            // console.log(action);
            const alarmId    =  action.payload.alarmId;
            const alarmObj   = action.payload.alarmObj;
            state[alarmId]   = alarmObj;
        },
        addAlarmByAlarmId(state,action){
            // console.log(action);
            const alarmId    =  action.payload.alarmId;
            const alarmObj   = action.payload.alarmObj;
            state.allData = [...state.allData,alarmObj];
            state[alarmId]   = alarmObj;
        },
    }
    
})
export default dataSlice;
export const dataSliceActions = dataSlice.actions;