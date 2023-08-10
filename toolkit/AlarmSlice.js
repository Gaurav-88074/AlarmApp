// import {createSlice,configureStore} from '@reduxjs/toolkit';


// const initialState = {

// }
// const alarmSlice = createSlice({
//     name : "alarmslice",
//     initialState : initialState,
//     reducers : {
//         setAllAlarm(state,action){

//             const alarmObjList = action.payload;
//             alarmObjList.forEach((obj)=>{
//                 state[obj.id] = obj;
//             })
//             console.log("All alarms has been set");
//             // console.log(state);
//         },
//         addOneAlarm(state,action){
//             console.log(state.length);
//         },
//         setDataFetched(state,action){
//             state.dataFetched = action.payload;
//         },
//         toggleRefresh(state,action){
//             state.refresh = !state.refresh;
//         },
//         findIntervalListOf(state,action){
//             const res =  state.allData.filter((obj)=>{
//                 return obj.id == action.payload;
//             })
//             return res[0]['intervalList'];
//         },
//         setIndividualAlarmInterval(state,action){
//             // console.log(action);
//             const alarm_id = action.payload.id;
//             const intervalList = action.payload.intervalList;
//             state.alarm_id = intervalList;
//         },
//         updateIndividualAlarmInterval(state,action){
//             const alarm_id = action.payload.id;
//             const intervalList = [...state.alarm_id,action.payload.intervalObj];
//             state.alarm_id = intervalList;
//         },
//         deleteIndividualAlarmInterval(state,action){
//             const alarm_id = action.payload.alarm_id;
//             const interval_id = action.payload.interval_id;
//             const intervalList = state.alarm_id.filter((intervalObj)=>{
//                 return interval_id!=intervalObj.id;
//             });
//             state.alarm_id = intervalList;
//         },
//         setAlarmByAlarmId(state,action){
//             // console.log(action);
//             const alarmId    =  action.payload.alarmId;
//             const alarmObj   = action.payload.alarmObj;
//             state[alarmId]   = alarmObj;
//         },
//     }
    
// })
// export default alarmSlice;
// export const alarmSliceActions = alarmSlice.actions;