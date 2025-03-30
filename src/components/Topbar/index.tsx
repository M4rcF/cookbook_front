import React, { useState } from "react";
import { PiCookingPotBold } from "react-icons/pi";
import { LogOut, Edit } from "lucide-react";
import styles from "./styles.module.scss";
import Authentication from "../../services/authentication.ts";
import useSnackbar from "../../hooks/useSnackbar.ts";
import EditProfileModal from "../EditProfileModal/index.tsx"; // ajuste o caminho conforme sua estrutura

interface TopbarProps {
  isSidebarExpanded: boolean;
}

export default function Topbar({ isSidebarExpanded }: TopbarProps) {
  const { showSnackbar } = useSnackbar();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const openModal = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

  const handleLogout = () => {
    Authentication.logout()
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        showSnackbar(`Erro ao fazer logout. ${error.data.message}`, "error");
      });
  };
  const user = JSON.parse(localStorage.getItem("currentUser") || '{}');

  return (
    <div className={`${styles.topbar} ${isSidebarExpanded ? "" : styles.collapsed}`}>
      <div className={styles.logo}>
        <PiCookingPotBold size={24} color="#FF5733" />
        <span className={styles.logoText}>Cookbook</span>
      </div>
      <div className={styles.userSection}>
        <span onClick={toggleMenu}>{user.name}</span>
        {menuOpen && (
          <div className={styles.menuDropdown}>
            <button onClick={openModal} className={styles.menuButton}>
              <Edit size={16} /> Editar Perfil
            </button>
            <button className={styles.menuButton} onClick={handleLogout}>
              <LogOut size={16} /> Sair
            </button>
          </div>
        )}
      </div>
      <EditProfileModal
        user={user}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
