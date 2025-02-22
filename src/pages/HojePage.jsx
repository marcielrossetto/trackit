import { useState, useEffect } from "react";
import { getTodayHabits, toggleHabitStatus } from "../services/habitService";


function HojePage() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadTodayHabits();
  }, []);

  const loadTodayHabits = async () => {
    try {
      const response = await getTodayHabits();
      setHabits(response);
    } catch (error) {
      console.error("Erro ao carregar hábitos do dia:", error);
    }
  };

  const handleToggleHabit = async (id) => {
    try {
      await toggleHabitStatus(id);
      loadTodayHabits();
    } catch (error) {
      console.error("Erro ao atualizar status do hábito:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl mb-4">Hábitos de Hoje</h2>
      {habits.length === 0 ? (
        <p>Nenhum hábito para hoje!</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li 
              key={habit.id} 
              className="p-2 border-b border-gray-300 flex justify-between items-center"
            >
              <span>{habit.name}</span>
              <button 
                onClick={() => handleToggleHabit(habit.id)}
                className={`p-2 rounded ${habit.done ? 'bg-green-500' : 'bg-red-500'} text-white`}
              >
                {habit.done ? 'Desmarcar' : 'Marcar'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HojePage;
