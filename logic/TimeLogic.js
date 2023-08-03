export const giveAnswer = (given)=>{
    const date = given;
    return {
        hour  : date.getHours(),
        min   : date.getMinutes(),
        second: 0,
        day   : date.getDay(),
        ddate : date.getDate(),
        month : date.getMonth(),
        year  : date.getFullYear(),

    }
}
const selectDate = (yourHours, yourMinute, currentHour, currentMinute) => {
    if (yourHours - currentHour < 0) {
        return false;
    }
    if (yourMinute - currentMinute <= 0) {
        return false;
    }
    return true;
    // let s = new Date(Date.now())
    // s.setHours(yourHours)
    // s.setMinutes(yourMinute)
    // let c = new Date(Date.now())
    // c.setHours(currentHour)
    // c.setMinutes(currentMinute)
    // return (s.getTime()-c.getTime())>0
}
export const computeScheduleDate = (hours, minutes) => {
    let currentDate = new Date(Date.now());
    currentHour = currentDate.getHours();
    currentMinute = currentDate.getMinutes();
    // console.log(currentHour,currentMinute,"in");
    const today = selectDate(hours, minutes, currentHour, currentMinute);
    if (!today) {
        currentDate = new Date(Date.now() + (24 * 60 * 60 * 1000));
    }
    // console.log("today=",today);
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    return currentDate
}
function millisecondsToTime(milliseconds) {
    const millisecondsInASecond = 1000;
    const millisecondsInAMinute = 60000; // 60,000 milliseconds = 1 minute
    const millisecondsInAnHour = 3600000; // 3,600,000 milliseconds = 1 hour
  
    const hours = Math.floor(milliseconds / millisecondsInAnHour);
    const minutes = Math.floor((milliseconds % millisecondsInAnHour) / millisecondsInAMinute);
    const seconds = Math.floor((milliseconds % millisecondsInAMinute) / millisecondsInASecond);
  
    return [hours,minutes,seconds];
  }
export const computeDifferenceStatement = (currentDate, scheduleDate) => {
    const timediff = scheduleDate.getTime() - currentDate.getTime();
    let [displayHour,displayMinute,displaySecond] = millisecondsToTime(timediff);
    //-----------------------------------------------------------------
    let res = "Alarm in";
    if (displayHour != 0) {
        res += ` ${displayHour} hours`;
    }
    if(displayMinute!=0){
        res += ` ${displayMinute} minutes`;
    }
    return res + ` ${displaySecond} seconds`;
}
export function convertTo24HourFormat(thatHours, thatMinutes, mode) {
    let hours = parseInt(thatHours)%12;
    const minutes = parseInt(thatMinutes);
    if (mode == 'PM') {
        hours += 12;
    }
    const hoursIn24Format = hours
    const minutesIn24Format = minutes;

    return [hoursIn24Format, minutesIn24Format]
}
//-------------
export function convertTo12HourFormat(hour,minute) {
    
    hour = parseInt(hour);
    minute = parseInt(minute);
    // Convert hours to 12-hour format
    const hour12 = hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
    // Return the converted time in 12-hour format
    return [hour12,minute];
  }
//-------------