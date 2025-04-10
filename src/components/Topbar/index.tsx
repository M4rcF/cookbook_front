import { useState } from "react";
import { PiCookingPotBold } from "react-icons/pi";
import { LogOut, Edit } from "lucide-react";
import styles from "./styles.module.scss";
import Authentication from "../../services/authentication";
import useSnackbar from "../../hooks/useSnackbar";
import EditProfileModal from "../EditProfileModal/index";

interface TopbarProps {
  isSidebarExpanded: boolean;
}

export default function Topbar(props: TopbarProps) {
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
        console.log('error', error.response.data);
        showSnackbar(error.response.data.msg, "error");
      });
  };
  const user = JSON.parse(localStorage.getItem("currentUser") || '{}');

  return (
    <div className={`${styles.topbar} ${props.isSidebarExpanded ? "" : styles.collapsed}`}>
      <div className={styles.logo}>
        <PiCookingPotBold size={24} color="#FF5733" />
        <span className={styles.logoText}>Cookbook</span>
      </div>
      <div className={styles.userSection}>
        {
          user?.name && (
            <span
              onClick={toggleMenu}
            >
              {user.name}
            </span>
          )
        }
        {menuOpen && (
          <div className={styles.menuDropdown}>
            <button onClick={openModal} className={styles.menuButton}>
              <Edit size={16} /> Edit profile
            </button>
            <button className={styles.menuButton} onClick={handleLogout}>
              <LogOut size={16} /> Log-out
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
