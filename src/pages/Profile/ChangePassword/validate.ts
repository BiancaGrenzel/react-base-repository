import * as Yup from "yup";

const validationSchema = Yup.object({
  password: Yup.string().required("Campo obrigatório"),
  newPassword: Yup.string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Campo obrigatório"),
});

export default validationSchema;