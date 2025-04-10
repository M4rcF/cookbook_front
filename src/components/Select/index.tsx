import styles from './styles.module.scss';

type SelectProps = {
  label: string;
  options: string[];
  onChange: () => void;
  required?: boolean;
  value?: string;
}

export default function Select(props: SelectProps) {
  return (
    <div className={styles.container}>
      <label>{props.label} { props.required && '*' }</label>
      <select onChange={props.onChange} value={props.value} required={props.required}>
        <option value=""></option>
        {props.options.map((option: string, index: number) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}