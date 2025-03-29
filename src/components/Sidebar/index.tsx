import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaClipboardList, FaUtensils } from "react-icons/fa6";
import { MdContactSupport } from "react-icons/md";
import styles from "./styles.module.scss";

interface SidebarProps {
  setIsSidebarExpanded: (expanded: boolean) => void;
}

export default function Sidebar({ setIsSidebarExpanded }: SidebarProps) {
  const token = localStorage.getItem("token");
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
    setIsSidebarExpanded(!expanded);
  };

  return (
    <div className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}>
      <motion.div
        animate={{ width: expanded ? 240 : 40 }}
        transition={{ duration: 0 }}
      >
        <div className={styles.header}>
          <button onClick={toggleSidebar} className={styles.button} disabled={!token}>
            { expanded ? <X size={24} color="#000000"/> : <Menu size={24} color="#000000"/> }
          </button>
        </div>
        {expanded && (
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <Link to="/">
                <span><FaClipboardList /> Lista de receitas</span>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <span>
                <FaUtensils /> Minhas receitas
              </span>
              <ul className={styles.submenu}>
                <li className={styles.submenuItem}><Link to="/new">Cadastrar receita</Link></li>
                <li className={styles.submenuItem}><Link to="/search">Procurar receita</Link></li>
                <li className={styles.submenuItem}><Link to="/recipe_list">Minhas receitas</Link></li>
              </ul>
            </li>
            <li className={styles.menuItem}>
              <span>
                <MdContactSupport /> Suporte
              </span>
              <ul className={styles.submenu}>
                <li className={styles.submenuItem}><Link to="/faq">Faq</Link></li>
              </ul>
            </li>
          </ul>
        )}
      </motion.div>
    </div>
  );
}
