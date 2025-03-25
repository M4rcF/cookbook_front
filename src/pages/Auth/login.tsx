import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";

export default function Login() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.left}>
        <img src="/logo.svg" alt="Ilustração"/>
      </div>

      <div className={styles.right}>
        <div className={styles.formBox}>
          <form>
            <label>Usuário</label>
            <input type="text" placeholder="Seu e-mail ou CPF" />

            <label>Senha</label>
            <input type="password" placeholder="Sua senha" />

            <div className={styles.links}>
              <a href="#">Esqueceu a senha?</a>
            </div>

            <Button type="submit" variant="contained" className={styles.button}>
              Acessar
            </Button>
          </form>

          <footer>
            <p>Não possui conta? <a href="/register">Criar conta</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
}
