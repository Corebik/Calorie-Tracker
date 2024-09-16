import { useMemo } from "react";
import type { Activity } from "../types"
import { CalorieDisplay } from "./CalorieDisplay";

type CalorieTrackerProps = {
   activities: Activity[]
}

export const CalorieTracker = ({ activities }: CalorieTrackerProps ) => {

   const consumedCalories = useMemo(() => activities.reduce( ( total, activity ) => 
      activity.category === 1 ? total + activity.calories : total, 0)
   , [ activities ]);

   const burnedCalories = useMemo(() => activities.reduce( ( total, activity ) => 
      activity.category === 2 ? total + activity.calories : total, 0)
   , [ activities ]);

   const TotalCalories = useMemo(() => consumedCalories - burnedCalories, [ consumedCalories, burnedCalories ]);

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
         Resumen de Calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
         <CalorieDisplay calories={ consumedCalories } text="Consumidas" />
         <CalorieDisplay calories={ TotalCalories } text="Diferencia" />
         <CalorieDisplay calories={ burnedCalories } text="Quemadas" />
      </div>
    </>
  )
}
