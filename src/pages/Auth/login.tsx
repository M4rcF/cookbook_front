import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Authentication from "../../services/authentication";
import useSnackbar from "../../hooks/useSnackbar";
import InputText from "../../components/InputText/index";
import { User } from "../../@types/model";

export default function Login() {
  const { handleSubmit, control } = useForm<User>();
  const { showSnackbar } = useSnackbar();

  const onSubmit = (data: User) => {
    Authentication.login(data)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        showSnackbar(error.response.data.message, "error");
      });
  };

  return (
    <div className={styles.container}>
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
                  render={({ field }) => (
                    <InputText
                      {...field}
                      label="Email"
                      placeholder="Your e-mail"
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
                      placeholder="Your password"
                      type="password"
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Log-in
                </Button>
              </Grid>
            </Grid>
          </form>

          <footer>
            <p>Don't have an account? <a href="/register">Sign-up</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
}
