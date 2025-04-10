import styles from './styles.module.scss';

type InputTextProps = {
  label: string;
  onChange: () => void;
  required?: boolean;
  value?: string;
  maxLength?: number;
}

export default function TextArea(props: InputTextProps) {
  return (
    <div className={styles.container}>
      <label>{props.label} { props.required && '*' }</label>
      <textarea
        onChange={props.onChange}
        required={props.required}
        maxLength={props.maxLength || 1500}
        value={props.value}
      />
    </div>
  );
}