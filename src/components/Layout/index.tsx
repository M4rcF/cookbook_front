import { useState, ReactNode } from "react";
import Sidebar from "../Sidebar/index";
import Topbar from "../Topbar/index";
import styles from './styles.module.scss';

type LayoutProps = {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <Sidebar setIsSidebarExpanded={setIsSidebarExpanded} />
      <div className={styles.content}>
        <Topbar isSidebarExpanded={isSidebarExpanded} />
        { props.children }
      </div>
    </div>
  )
}