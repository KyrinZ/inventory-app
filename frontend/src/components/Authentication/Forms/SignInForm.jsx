import { useFormik } from "formik";

// Styles
import styles from "./AuthenticationForm.module.scss";

// Utilities
import { axios, signInSchema } from "../../utilities/";

export default function SignInForm({ changeFormType, logIn }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      axios
        .post("user/signin/", { username, password })
        .then((res) => {
          localStorage.setItem("auth-token", res.data.token);
          axios.defaults.headers["auth-token"] = res.data.token;
          logIn();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const switchToSignUp = () => {
    changeFormType("signUp");
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div>
        <h1>Sign in</h1>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          name="username"
          type="text"
        />

        {formik.touched.username && formik.errors.username ? (
          <div className={styles.errorMsg}>{formik.errors.username}</div>
        ) : null}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          name="password"
          type="password"
        />

        {formik.touched.password && formik.errors.password ? (
          <div className={styles.errorMsg}>{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit">Sign in</button>

      <p>
        Don't have an account? <strong onClick={switchToSignUp}>Sign up</strong>
      </p>
    </form>
  );
}
