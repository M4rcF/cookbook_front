import React from 'react';
import styles from './styles.module.scss';

type InputTextProps = {
  label: string;
  onChange: any;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: any;
  defaultValue?: any;
}

export default function InputText(props: InputTextProps) {
  return (
    <div className={styles.container}>
      <label>{props.label} { props.required && '*' }</label>
      <input
        type={props.type || "text"}
        onChange={props.onChange}
        required={props.required}
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}