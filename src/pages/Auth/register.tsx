import React from "react";
import styles from "./styles.module.scss";
import { Button, Grid, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Authentication from "../../services/authentication.ts";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { handleSubmit, control } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    Authentication.register(data).then((resp) => {
      window.location.href="/login"
    }).catch((error) => {
      console.error("Erro ao cadastrar:", error);
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
                  name="name"
                  control={control}
                  rules={{ required: "Nome obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nome"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "E-mail obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="E-mail"
                      placeholder="exemplo@email.com"
                      type="email"
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
                      fullWidth
                      label="Senha"
                      placeholder="********"
                      type="password"
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </form>

          <footer>
            <p>Já possui conta? <a href="/login">Entrar</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
}
