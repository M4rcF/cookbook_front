import styles from './styles.module.scss';

type InputTextProps = {
  label: string;
  onChange: () => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
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