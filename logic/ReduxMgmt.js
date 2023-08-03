import { init } from "../database/databaseSetup";
import { useEffect } from "react";
import { dataSliceActions } from "../toolkit/DataSlice";
import { AlarmModel } from "../models/AlarmModel";
export function FetchAndSetRedux(array,dispatch) {
    dispatch(dataSliceActions.setAlarmData(array))
    // console.log(res);
}
// let AlarmModelObj = new AlarmModel(
//     obj.id ,
//     obj.label,
//     obj.mode ,
//     obj.hour ,
//     obj.minute ,
//     obj.ringtone,
//     obj.ringtone_location,
//     obj.vibrate ,
//     obj.active_status,
//     obj.ends_after
// )
// res.push(AlarmModelObj)
// } 