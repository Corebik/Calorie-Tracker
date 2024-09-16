import { Activity } from "../types/index";

export type ActivityState = {
   activities : Activity[],
   activeId : Activity['id']
}

export const initialState : ActivityState = {
   activities : localStorage.getItem( "activities" ) ? JSON.parse( localStorage.getItem( "activities" )! ) : [],
   activeId : ""
}

export type ActivityActions = 
   { type : "saveActivity", payload : Activity } |
   { type : "setActiveId", payload : Activity['id'] } |
   { type : "deleteActivity", payload : Activity['id'] } |
   { type: "restartList" }


export const activityReducer = ( 
      state : ActivityState = initialState, 
      action : ActivityActions 
   ) => {

      switch (action.type) {

         case "saveActivity": {

            let activitiesUpdated : Activity[] = [];
            
            if( state.activeId ) {
               activitiesUpdated = state.activities.map( activity => activity.id === state.activeId ? action.payload : activity )
            }else{
               activitiesUpdated = [ ...state.activities, action.payload ]
            }

            return {
               ...state,
               activities : activitiesUpdated,
               activeId : ""
            }

         }

         case "setActiveId":
            return {
               ...state,
               activeId : action.payload
            }

         case "deleteActivity":
            return {
               ...state,
               activities : state.activities.filter( activity => activity.id !== action.payload )
            }

         case "restartList":
            return {
               ...state,
               activities : [],
               activeId: ""
            }

         default:
            return state
      }

   }