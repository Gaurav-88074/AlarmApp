import { IntervalModel } from "./IntervalModel";
export class AlarmModel{
    constructor({id,label,mode,hour,minute,ringtone,ringtone_location,vibrate,active_status,ends_after,intervalList,schedule_date}){
        this.id = id,
        this.label=label,
        this.mode = mode,
        this.hour = Number(hour).toFixed(0),
        this.minute = Number(minute).toFixed(0),
        this.ringtone=ringtone,
        this.ringtone_location=ringtone_location,
        this.vibrate = vibrate,
        this.active_status=active_status,
        this.ends_after=ends_after,
        this.schedule_date = String(schedule_date),
        this.intervalList = intervalList
        // this.intervalList1 = Array.from(intervalList).map((obj)=>{
            // return new IntervalModel(obj.id,obj.alarm_id,obj.minute,obj.second,obj,active_status);
        // });
    }
    
}
