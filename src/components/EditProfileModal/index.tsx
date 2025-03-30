import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, Button, IconButton } from "@mui/material";
import styles from "./styles.module.scss";
import InputText from "../../components/InputText/index.tsx"; // Componente Input customizado
import UserService from "../../services/user.ts";

interface EditProfileModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

interface EditProfileFormData {
  name: string;
  email: string;
  password: string;
}

export default function EditProfileModal(props: EditProfileModalProps) {
  const {
    control,
    handleSubmit,
  } = useForm<EditProfileFormData>();

  const submit = (form: EditProfileFormData) => {
    UserService.updateUser(props.user.id, form)
      .then((resp) => {
        console.log('resp', resp);
      })
    console.log('form', form);
  }

  return (
    <>
      {
        props.isOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Editar Perfil</h2>
                <IconButton className={styles.closeButton} onClick={props.onClose}>
                  &times;
                </IconButton>
              </div>
              <form className={styles.modalForm} onSubmit={handleSubmit(submit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={props.user.name}
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <InputText
                          {...field}
                          label="Nome"
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={props.user.email}
                      rules={{ required: "Email is required" }}
                      render={({ field }) => (
                        <InputText
                          {...field}
                          label="E-mail"
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Password is required" }}
                      render={({ field }) => (
                        <InputText
                          label="Senha"
                          type="password"
                          {...field}
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} className={styles.modalActions}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={props.onClose}
                      className={styles.cancelButton}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      className={styles.saveButton}
                      sx={{
                        backgroundColor: "#FF5733",
                        "&:hover": { backgroundColor: "#e14e2a" },
                      }}
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
}
