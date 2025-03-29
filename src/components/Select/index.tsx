import React from 'react';
import styles from './styles.module.scss';

type SelectProps = {
  label: string;
  options: any;
  onChange: any;
  required?: boolean;
  value?: any;
}

export default function Select(props: SelectProps) {
  return (
    <div className={styles.container}>
      <label>{props.label} { props.required && '*' }</label>
      <select onChange={props.onChange} value={props.value} required={props.required}>
        <option value="">Selecione</option>
        {props.options.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}