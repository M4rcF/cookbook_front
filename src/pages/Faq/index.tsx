import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';

const faqData = [
  {
    question: "Como posso cadastrar uma nova receita?",
    answer: "Para cadastrar uma nova receita, vá até a seção 'Minhas Receitas' e clique em 'Cadastrar Receita'. Preencha os campos obrigatórios e clique em 'Salvar'.",
  },
  {
    question: "Posso editar uma receita depois de cadastrada?",
    answer: "Sim! Basta acessar a lista de receitas cadastradas e clicar no botão 'Editar'. Você poderá modificar qualquer campo, incluindo nome, ingredientes e modo de preparo.",
  },
  {
    question: "Como posso tornar uma receita pública ou privada?",
    answer: "Na listagem de receitas, você encontrará um botão de alternância (switch) que permite definir se a receita será pública ou privada.",
  },
  {
    question: "Os comentários nas receitas são reais?",
    answer: "Não, atualmente os comentários são simulados para fins de teste. Em uma versão futura, será possível adicionar comentários reais.",
  },
  {
    question: "Como posso pesquisar receitas cadastradas?",
    answer: "Você pode pesquisar receitas cadastradas manualmente na seção 'Minhas Receitas' ou utilizar a pesquisa avançada na API externa para encontrar novas receitas.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2>Perguntas Frequentes (FAQ)</h2>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <button className={styles.question} onClick={() => toggleFAQ(index)}>
              {item.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <p className={styles.answer}>{item.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
