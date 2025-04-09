import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaClipboardList, FaUtensils } from "react-icons/fa6";
import { MdContactSupport } from "react-icons/md";
import styles from "./styles.module.scss";
import Show from "../Show/index.tsx";

interface SidebarProps {
  setIsSidebarExpanded: (expanded: boolean) => void;
}

export default function Sidebar({ setIsSidebarExpanded }: SidebarProps) {
  const token = localStorage.getItem("token");
  const [expanded, setExpanded] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser") || '{}');

  const toggleSidebar = () => {
    setExpanded(!expanded);
    setIsSidebarExpanded(!expanded);
  };

  return (
    <Show condition={!!token}>
      {expanded && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
      {
        user?.name && (
          <div className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}>
            <motion.div
              animate={{ width: expanded ? 240 : 40 }}
              transition={{ duration: 0 }}
            >
              <div className={styles.header}>
                <button onClick={toggleSidebar} className={styles.button} disabled={!token}>
                  {expanded ? <X size={24} color="#000" /> : <Menu size={24} color="#000" />}
                </button>
              </div>
              {expanded && (
                <ul className={styles.menu}>
                  <li className={styles.menuItem}>
                    <Link to="/">
                      <span>
                        <FaClipboardList /> Public Recipes
                      </span>
                    </Link>
                  </li>
                  <li className={styles.menuItem}>
                    <span>
                      <FaUtensils /> Recipes
                    </span>
                    <ul className={styles.submenu}>
                      <li className={styles.submenuItem}>
                        <Link to="/new">Register Recipe</Link>
                      </li>
                      <li className={styles.submenuItem}>
                        <Link to="/search">Search Recipe</Link>
                      </li>
                      <li className={styles.submenuItem}>
                        <Link to="/list">My Recipes</Link>
                      </li>
                    </ul>
                  </li>
                  <li className={styles.menuItem}>
                    <span>
                      <MdContactSupport /> Support
                    </span>
                    <ul className={styles.submenu}>
                      <li className={styles.submenuItem}>
                        <Link to="/faq">FAQ</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}
            </motion.div>
          </div>
        )
      }
    </Show>
  );
}
