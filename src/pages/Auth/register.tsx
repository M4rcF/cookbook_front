import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";

export default function Register() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.left}>
        <img src="/logo.svg" alt="Ilustração" />
      </div>

      <div className={styles.right}>
        <div className={styles.formBox}>
          <form>
            <label>Nome completo</label>
            <input type="text" placeholder="Seu nome" />

            <label>E-mail</label>
            <input type="email" placeholder="exemplo@email.com" />

            <label>Senha</label>
            <input type="password" placeholder="********" />

            <Button type="submit" variant="contained" className={styles.button}>
              Cadastrar
            </Button>
          </form>

          <footer>
            <p>Já possui conta? <a href="/login">Entrar</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
}
