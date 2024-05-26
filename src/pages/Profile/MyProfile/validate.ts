import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  name: Yup.string().required("Campo obrigatório"),
  birthDate: Yup.date().required("Campo obrigatório"),
  phone: Yup.string().required("Campo obrigatório"),
});

export default validationSchema;
