import * as yup from "yup";

export let signInSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export let signUpSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8).max(16),
  confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

export let addProductSchema = yup.object().shape({
  productId: yup.string().required(),
  productName: yup.string().required(),
  quantity: yup.number().required(),
});
