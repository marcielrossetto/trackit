function HabitosPage() {
  const [habits, setHabits] = useState([]); // Estado dos hábitos
  const [isLoading, setIsLoading] = useState(false); // Para mostrar carregamento
  const [formVisible, setFormVisible] = useState(false); // Para mostrar/ocultar formulário
  const [habitName, setHabitName] = useState(""); // Nome do hábito
  const [selectedDays, setSelectedDays] = useState([]); // Dias selecionados para o hábito
  const [error, setError] = useState(""); // Erro ao criar

  // Carregar hábitos do usuário ao montar a página
  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    setIsLoading(true);
    try {
      const response = await getHabits();
      setHabits(response.data);
    } catch (error) {
      console.error("Erro ao carregar hábitos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Lógica para envio do novo hábito
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const habitData = {
      name: habitName,
      days: selectedDays,
    };

    try {
      await postHabit(habitData);
      setHabitName("");
      setSelectedDays([]);
      setFormVisible(false);
      loadHabits(); // Recarregar hábitos após a criação
    } catch (error) {
      setError("Erro ao cadastrar hábito. Tente novamente.");
      console.error("Erro ao criar hábito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para alternar a seleção de dias
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Exibir os hábitos do usuário
  const renderHabits = () => {
    if (isLoading) {
      return <p>Carregando hábitos...</p>;
    }
    if (habits.length === 0) {
      return <p>Você não tem hábitos cadastrados. Adicione um hábito!</p>;
    }
    return (
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="habit-item">
            {habit.name} - Dias: {habit.days.join(", ")}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="habitos-page">
      <h2>Meus Hábitos</h2>

      {/* Botão de criação de hábito */}
      <button onClick={() => setFormVisible(true)} disabled={isLoading}>
        + Criar Hábito
      </button>

      {/* Formulário de criação de hábito */}
      {formVisible && (
        <form onSubmit={handleSubmit} className="habit-form">
          <input
            type="text"
            placeholder="Nome do hábito"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            disabled={isLoading}
            required
          />
          <div className="days-of-week">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
              <button
                type="button"
                key={index}
                onClick={() => toggleDay(index + 1)}
                disabled={isLoading}
                className={selectedDays.includes(index + 1) ? "selected" : ""}
              >
                {day}
              </button>
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>Salvar</button>
          <button type="button" onClick={() => setFormVisible(false)} disabled={isLoading}>Cancelar</button>
        </form>
      )}

      {/* Renderiza a lista de hábitos */}
      {renderHabits()}
    </div>
  );
}

export default HabitosPage;
