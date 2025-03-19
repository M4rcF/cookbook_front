import { useState } from "react";
import { PiCookingPotBold } from "react-icons/pi";
import styles from "./styles.module.scss";
import { LogOut, Edit } from "lucide-react";

interface TopbarProps {
  isSidebarExpanded: boolean;
}

export default function Topbar({ isSidebarExpanded }: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const openModal = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className={`${styles.topbar} ${isSidebarExpanded ? "" : styles.collapsed}`}>
      <div className={styles.logo}>
        <PiCookingPotBold size={24} color="#FF5733"/>
        <span className={styles.logoText}>Cookbook</span>
      </div>
      <div className={styles.userSection}>
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className={styles.userImage}
          onClick={toggleMenu}
        />
        {menuOpen && (
          <div className={styles.menuDropdown}>
            <button onClick={openModal} className={styles.menuButton}><Edit size={16} /> Editar Perfil</button>
            <button className={styles.menuButton}><LogOut size={16} /> Sair</button>
          </div>
        )}
      </div>
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Editar Perfil</h2>
            <label>Nome de usuário:</label>
            <input type="text" placeholder="Novo nome" className={styles.input} />
            <label>Nova senha:</label>
            <input type="password" placeholder="Nova senha" className={styles.input} />
            <div className={styles.modalActions}>
              <button onClick={closeModal} className={styles.cancelButton}>Cancelar</button>
              <button className={styles.saveButton}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
