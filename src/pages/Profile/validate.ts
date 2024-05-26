import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  password: Yup.string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Campo obrigatório"),
});

export default validationSchema;
