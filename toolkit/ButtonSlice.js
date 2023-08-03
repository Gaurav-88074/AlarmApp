import {createSlice,configureStore} from '@reduxjs/toolkit';


const initialState = {
    alarmSettingsScreenSaveButton : null,
}
const buttonSlice = createSlice({
    name : "button",
    initialState : initialState,
    reducers : {
        pointAlarmSettingScreenButton(state,action){
            // console.log("I'm pointed bro relax");
            state.alarmSettingsScreenSaveButton = action.payload;
        },
        pressAlarmSettingScreenButton(state,action){
            state.alarmSettingsScreenSaveButton();
        }
    }
    
})
export default buttonSlice;
export const buttonSliceActions = buttonSlice.actions;