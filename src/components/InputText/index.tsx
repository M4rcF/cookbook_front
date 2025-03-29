import React from 'react';
import styles from './styles.module.scss';

type InputTextProps = {
  label: string;
  onChange: any;
  required?: boolean;
  value?: any;
}

export default function InputText(props: InputTextProps) {
  return (
    <div className={styles.container}>
      <label>{props.label} { props.required && '*' }</label>
      <input
        type="text"
        onChange={props.onChange}
        required={props.required}
        value={props.value}
      />
    </div>
  );
}