import { useForm, Controller } from "react-hook-form";
import { Grid, Button, IconButton } from "@mui/material";
import styles from "./styles.module.scss";
import InputText from "../../components/InputText/index.tsx";
import UserService from "../../services/user";
import { User } from "../../@types/model";

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

interface EditProfileFormData {
  name: string;
  email: string;
  password: string;
}

export default function EditProfileModal(props: EditProfileModalProps) {
  const { control, handleSubmit } = useForm<EditProfileFormData>();

  const submit = async (form: EditProfileFormData) => {
    if (props.user.id) {
      await UserService.updateUser(props.user.id, form);
      props.onClose();
    }
  };

  if (!props.isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Edit Profile</h2>
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
                render={({ field }) => (
                  <InputText {...field} label="Name" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue={props.user.email}
                render={({ field }) => (
                  <InputText {...field} label="Email" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputText {...field} label="Password" type="password" required />
                )}
              />
            </Grid>
            <Grid item xs={12} className={styles.modalActions}>
              <Button type="button" onClick={props.onClose} className={styles.cancelButton}>
                Cancel
              </Button>
              <Button type="submit" className={styles.saveButton}>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
