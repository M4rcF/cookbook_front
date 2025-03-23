import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function SuggestionBox() {
  const [suggestion, setSuggestion] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);

  useEffect(() => {
    const storedSuggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
    setSuggestionsList(storedSuggestions);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    const newSuggestions = [...suggestionsList, { text: suggestion, date: new Date().toLocaleString() }];
    setSuggestionsList(newSuggestions);
    localStorage.setItem("suggestions", JSON.stringify(newSuggestions));

    setSuggestion("");
  };

  return (
    <div className={styles.container}>
      <h1>Caixa de Sugestões</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          placeholder="Digite sua sugestão aqui..."
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          required
        />
        <button type="submit">Enviar Sugestão</button>
      </form>

      <h2>Sugestões Enviadas</h2>
      {suggestionsList.length === 0 ? (
        <p className={styles.empty}>Nenhuma sugestão enviada ainda.</p>
      ) : (
        <ul className={styles.suggestionList}>
          {suggestionsList.map((item, index) => (
            <li key={index} className={styles.suggestionItem}>
              <p>{item.text}</p>
              <span>{item.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
