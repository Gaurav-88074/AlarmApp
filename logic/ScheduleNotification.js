import * as Notifications from 'expo-notifications';
export async function scheduleAlarmById(alarmModelObj) {
    Notifications.cancelScheduledNotificationAsync(alarmModelObj.id);
    async function performSchedulingComputation(params) {
        return new Promise((resolve, reject) => {
            resolve(computeScheduleDate(alarmModelObj.hour, alarmModelObj.minute));
        })
    }
    performSchedulingComputation().then((schedule_date) => {
        //------------------------------------
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Alarm",
                body: "I'm ringing right now",
                data: {
                    alarm_unique_id: alarmModelObj.id
                },
                // sound: "brown",
                vibrate: [1, 2, 1],
            },
            // trigger : null
            trigger: {
                'seconds': (schedule_date.getTime() - new Date(Date.now()).getTime()) / 1000
            },
            // channelId: 'special'
            identifier: alarmModelObj.id

        })
        //------------
        // console.log(alarmModelObj);
        // alarmModelObj.intervalList
    })
}

export function cancelAlarmById(alarmModelObj) {
    
}

