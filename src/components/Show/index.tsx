import { ReactNode } from 'react';

type ShowProps = {
  children: ReactNode;
  condition: boolean;
}

export default function Show(props: ShowProps) {
  return (
    <>
      {
        props.condition ? props.children : <></>
      }
    </>
  )
}