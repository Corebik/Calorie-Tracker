type calorieDispalyProps = {
   calories: number
   text: string
}

export const CalorieDisplay = ({ calories, text } : calorieDispalyProps) => {
  return (
      <p className="text-center text-white font-bold rounded-full grid grid-cols-1 gap-3 mt-2">  
         <span className="font-black text-6xl text-orange"> { calories } </span>
         { text }
      </p>
  )
}
