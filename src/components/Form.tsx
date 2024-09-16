import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { categories } from "../data/categories";

//Types
import { Activity } from "../types/index";

const activityForm : Activity = {
   id: uuidv4(),
   category: 1,
   description: "",
   calories: 0
}

type FormProps = {
   dispatch : Dispatch<ActivityActions>
   state: ActivityState
}

export const Form = ( { dispatch, state } : FormProps ) => {

   const [activity, setActivity] = useState<Activity>( activityForm );

   useEffect(() => {

      if( state.activeId ){

         const selectedActivity = state.activities.filter( activity => activity.id === state.activeId )[0];
         setActivity( selectedActivity );
      }
     
  
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ state.activeId ]);
   

   const onInputChange = ( event : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {
      
      const isNumberField = ['category', "calories"].includes(event.target.id); //Esto es para que sepa si es un campo numerico, ya que cuando se ejecuta en producción los cambios, los agrega en el state como sting.
      
      setActivity({
         ...activity,
         [event.target.name]: isNumberField ? +event.target.value : event.target.value
      })
   }

   const isValidActivity = () => {
      const { description, calories } = activity;
      return description.trim() !== "" && calories > 0;
   }

   const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
      event.preventDefault();
      dispatch({ type: "saveActivity", payload: activity});
      setActivity({ ...activityForm, id: uuidv4() });
   }

  return (
    <form 
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={ onSubmit }
   >
      <div className="grid grid-cols-1 gap-3">
         <label htmlFor="category">Categoría</label>
         <select 
            name="category" id="category" 
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            value={ activity.category }
            onChange={ onInputChange }
         >
            { categories.map((category) => (
               <option 
                  key={category.id} 
                  value={category.id}
               >
                  {category.name}
               </option>
            ))}
         </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
         <label htmlFor="description">Actividad:</label>
         <input 
            id="description"
            name="description"
            type="text" 
            className="border border-slate-300 p-2 rounded-lg" 
            placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta..."
            value={ activity.description }
            onChange={ onInputChange }
         />
      </div>

      <div className="grid grid-cols-1 gap-3">
         <label htmlFor="calories">Calorías:</label>
         <input 
            id="calories"
            name="calories"
            type="number" 
            className="border border-slate-300 p-2 rounded-lg" 
            placeholder="Calorías. ej. 300, 500..."
            value={ activity.calories }
            onChange={ onInputChange }
         />
      </div>

      <input 
         type="submit" 
         className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer
         disabled:opacity-10"
         value={ activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio" }
         disabled={ !isValidActivity() }
      />
    </form>
  )
}
