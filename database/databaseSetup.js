import * as SQLite from 'expo-sqlite';
//-------------------------------------------------------------
const database = SQLite.openDatabase('alarm.db', "1.0");
//-------------------------------------------------------------
export function init() {
    const promise1 = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `
                CREATE TABLE IF NOT EXISTS alarm (
                    id TEXT PRIMARY KEY NOT NULL,
                    label TEXT NOT NULL,
                    mode TEXT NOT NULL,
                    hour TEXT NOT NULL,
                    minute TEXT NOT NULL,
                    ringtone TEXT NOT NULL,
                    ringtone_location TEXT NOT NULL,
                    vibrate TEXT NOT NULL,
                    active_status TEXT NOT NULL,
                    ends_after TEXT NOT NULL,
                    schedule_date TEXT NOT NULL 
                    )`,
                [],
                () => {
                    console.log("alarm task done");
                    resolve();
                }, // succeeded
                (_, error) => {
                    reject(error);
                } // failed
            );
        });
    });
    const promise2 = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `
                CREATE TABLE IF NOT EXISTS interval (
                    id TEXT PRIMARY KEY NOT NULL,
                    alarm_id TEXT NOT NULL,
                    minute TEXT NOT NULL,
                    second TEXT NOT NULL,
                    active_status TEXT NOT NULL
                )`,
                [],
                () => {
                    console.log("interval task done");
                    resolve();
                }, // succeeded
                (_, error) => {
                    reject(error);
                } // failed
            );
        });
    });

    // return promise1;


    return new Promise.all([promise1, promise2])
    // return promise2;


    // this.id = id,
    // this.alarm_id=alarm_id,
    // this.minute = minute,
    // this.second = second,
    // this.active_status=active_status
}

//-------------------------------------------------------------
export function insertOneAlarm(alarmObj) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `
                INSERT INTO ALARM (
                    id,
                    label,
                    mode,
                    hour,
                    minute,
                    ringtone,
                    ringtone_location,
                    vibrate,
                    active_status,
                    ends_after,
                    schedule_date
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    alarmObj.id,
                    alarmObj.label,
                    alarmObj.mode,
                    alarmObj.hour,
                    alarmObj.minute,
                    alarmObj.ringtone,
                    alarmObj.ringtone_location,
                    alarmObj.vibrate,
                    alarmObj.active_status,
                    alarmObj.ends_after,
                    alarmObj.schedule_date,
                ],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}
//-------------------------------------------------------------
// import { AlarmModel } from '../models/AlarmModel';
// let x = new AlarmModel(); 
export function updateOneAlarm(alarmObj) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `
                UPDATE ALARM 
                SET 
                label = ?,
                mode = ?,
                hour = ?,
                minute = ?,
                ringtone = ?,
                ringtone_location = ?,
                vibrate = ?,
                active_status = ?,
                ends_after = ?,
                schedule_date=?
                WHERE id = ?
                `,
                [
                    alarmObj.label,
                    alarmObj.mode,
                    alarmObj.hour,
                    alarmObj.minute,
                    alarmObj.ringtone,
                    alarmObj.ringtone_location,
                    alarmObj.vibrate,
                    alarmObj.active_status,
                    alarmObj.ends_after,
                    alarmObj.schedule_date,
                    alarmObj.id
                ],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error);
                }
            );
        });
    });
    return promise;
}

//-------------------------------------------------------------
//-------------------------------------------------------------
// import { AlarmModel } from '../models/AlarmModel';
// let x = new AlarmModel(); 
export function deleteOneAlarm(alarm_id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `
                DELETE FROM ALARM 
                WHERE id = ?
                `,
                [
                    alarm_id
                ],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error);
                }
            );
        });
    });
    return promise;
}
export function DeleteAllAlarm() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`delete * from alarm`,
                [],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error)
                }
            )
        })
    });
    return promise;
}
export function FetchAllAlarm() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`select * from alarm`,
                [],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error)
                }
            )
        })
    });
    return promise;
}
//------------------------------------------------------------
// INTERVAL SECTION
//-------------------------------------------------------------

//-------------------------------------------------------------
export function FetchOneAlarmInterval(alarm_id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`select * from interval 
                            where 
                            alarm_id = ?
                            `,
                [alarm_id],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error)
                }
            )
        })
    });
    return promise;
}
//-------------------------------------------------------------

//-------------------------------------------------------------
export function insertOneAlarmInterval(intervalObj) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`
                INSERT INTO INTERVAL (
                    id,
                    alarm_id,
                    minute,
                    second,
                    active_status
                    )
                    VALUES (?,?,?,?,?)`,
                [
                    intervalObj.id,
                    intervalObj.alarm_id,
                    intervalObj.minute,
                    intervalObj.second,
                    intervalObj.active_status,
                ],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error)
                }
            )
        })
    });
    return promise;

}
//------------------------------------------
export function DeleteAllInterval() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`delete * from interval`,
                [],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error)
                }
            )
        })
    });
    return promise;
}
//-------------------------------------------------------------
export function DeleteIntervalByAlarmID(alarm_id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`delete from interval where alarm_id = ?`,
                [alarm_id],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error)
                }
            )
        })
    });
    return promise;
}
//-------------------------------------------------------------
export function DeleteIntervalByIntervalID(interval_id) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`delete from interval where id  =  ? `,
                [interval_id],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error)
                }
            )
        })
    });
    return promise;
}
//--------------------------------------------------------
// useless
export function randomTask() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`
                ALTER TABLE ALARM (
                    id,
                    label,
                    mode,
                    hour,
                    minute,
                    ringtone,
                    ringtone_location,
                    vibrate,
                    active_status,
                    ends_after
                    )
                    VALUES (?,?,?,?,?,?,?,?,?,?)`,
                [
                    alarmObj.id,
                    alarmObj.label,
                    alarmObj.mode,
                    alarmObj.hour,
                    alarmObj.minute,
                    alarmObj.ringtone,
                    alarmObj.ringtone_location,
                    alarmObj.vibrate,
                    alarmObj.active_status,
                    alarmObj.ends_after
                ],
                (_, result) => {
                    // console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    // console.log(error);
                    reject(error)
                }
            )
        })
    });
    return promise;

}