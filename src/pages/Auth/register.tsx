import React from "react";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Authentication from "../../services/authentication";
import InputText from "../../components/InputText/index";
import useSnackbar from "../../hooks/useSnackbar";
import { User } from "../../@types/model";

export default function Register() {
  const { handleSubmit, control } = useForm<User>();
  const { showSnackbar } = useSnackbar();

  const onSubmit = (data: User) => {
    Authentication.register(data)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src="/logo.svg" />
      </div>

      <div className={styles.right}>
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      label="Name"
                      placeholder="Enter your full name"
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputText
                      {...field}
                      label="E-mail"
                      placeholder="example@email.com"
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
                  render={({ field }) => (
                    <InputText
                      {...field}
                      label="Password"
                      placeholder="********"
                      type="password"
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Sign-up
                </Button>
              </Grid>
            </Grid>
          </form>

          <footer>
            <p>Already have an account? <a href="/login">Log-in</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
}
