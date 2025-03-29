import React from "react";
import styles from "./styles.module.scss";
import { Button, Grid, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Authentication from "../../services/authentication.ts";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { handleSubmit, control } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    Authentication.login(data).then((resp) => {
      if (resp) {
        window.location.href = "/";
      }
    });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.left}>
        <img src="/logo.svg" alt="Ilustração" />
      </div>

      <div className={styles.right}>
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      placeholder="Seu e-mail"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Senha obrigatória" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Senha"
                      type="password"
                      placeholder="Sua senha"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <div className={styles.links}>
                  <a href="#">Esqueceu a senha?</a>
                </div>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Acessar
                </Button>
              </Grid>
            </Grid>
          </form>

          <footer>
            <p>Não possui conta? <a href="/register">Criar conta</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
}
