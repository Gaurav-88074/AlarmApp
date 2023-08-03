export class IntervalModel{
    constructor(id,alarm_id,minute,second,active_status){
        this.id = id,
        this.alarm_id=alarm_id,
        this.minute = Number(minute).toFixed(0),
        this.second = Number(second).toFixed(0),
        this.active_status=active_status
        
    }
}
