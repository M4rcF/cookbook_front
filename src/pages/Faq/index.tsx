import { useState } from 'react';
import styles from './styles.module.scss';

const faqData = [
  {
    question: "How can I register a new recipe?",
    answer: "To register a new recipe, go to the 'My Recipes' section and click on 'Register Recipe'. Fill in the required fields and click 'Save'.",
  },
  {
    question: "Can I edit a recipe after it is registered?",
    answer: "Yes! Just go to your list of registered recipes and click the 'Edit' button. You will be able to modify any field, including name, ingredients, and preparation method.",
  },
  {
    question: "How can I make a recipe public or private?",
    answer: "In the recipe list, you will find a toggle switch that allows you to set whether the recipe is public or private.",
  },
  {
    question: "Are the recipe comments real?",
    answer: "No, currently the comments are simulated for testing purposes.",
  },
  {
    question: "How can I search for registered recipes?",
    answer: "You can search for manually registered recipes in the 'My Recipes' section or use the advanced search through the external API to find new recipes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2>Frequently Asked Questions (FAQ)</h2>
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
