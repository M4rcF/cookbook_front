import React from 'react';
import { useState } from "react";
import Sidebar from "../Sidebar/index.tsx";
import Topbar from "../Topbar/index.tsx";
import styles from './styles.module.scss';

export default function Layout({ children }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <Sidebar setIsSidebarExpanded={setIsSidebarExpanded} />
      <div className={styles.content}>
        <Topbar isSidebarExpanded={isSidebarExpanded} />
        { children }
      </div>
    </div>
  )
}