import { useMemo, Dispatch } from "react";
import { ActivityActions } from "../reducers/activityReducer";

import { categories } from "../data/categories";
import type { Activity } from "../types/index";

import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";

type ActivityListProps = {
   activities : Activity[],
   dispatch : Dispatch<ActivityActions>
}

export const ActivityList = ({ activities, dispatch } : ActivityListProps ) => {

   const categoryName = useMemo(() => 
      ( category : Activity['category'] ) => categories.map( cat => cat.id === category ? cat.name : '' )
   // eslint-disable-next-line react-hooks/exhaustive-deps
   ,[ activities ]);

   const onUpdateActivity = ( activityId : Activity['id'] ) => {
      dispatch({ type: "setActiveId", payload: activityId });
   }

   const onDeleteActivity = ( activityId : Activity['id'] ) => {
      dispatch({ type: "deleteActivity", payload: activityId });
   }

   const isEmptyActivities = useMemo(() => activities.length === 0, [ activities ]);

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
         Comida y Actividades
      </h2>

      {  isEmptyActivities 
         ? <p className="text-center mt-10"> No hay Actividades</p>
         : activities.map( activity => (
            <div key={ activity.id } className="bg-white px-5 py-10 mt-5 flex justify-between">
               <div className="space-y-2 relative">
                  <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
                     ${ activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500' }`}>
                     { categoryName( +activity.category ) }
                  </p>
                  <p className="text-2xl font-bold pt-5">{ activity.description }</p>
                  <p className="font-black text-4xl text-lime-500">
                     { activity.calories } {''}
                     <span>Calorias</span>
                  </p>
               </div>

               <div className="flex gap-5 items-center">
                  <button
                     onClick={ () => onUpdateActivity( activity.id ) }
                  >
                     <PencilSquareIcon className="w-7 h-7 text-gray-800" />
                  </button>

                  <button
                     onClick={ () => onDeleteActivity( activity.id ) }
                  >
                     <XCircleIcon className="w-7 h-7 text-red-500" />
                  </button>
               </div>
            </div>
         ))
      }

    </>
  )
}
