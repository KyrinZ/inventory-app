import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

// Styles
import styles from "./AuthenticationForm.module.scss";

// Utilities
import { axios, signUpSchema } from "../../utilities/";

export default function SignUpForm({ changeFormType, logIn }) {
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmation: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      axios
        .post("user/signup/", { username, password })
        .then((res) => {
          localStorage.setItem("auth-token", res.data.token);
          axios.defaults.headers["auth-token"] = res.data.token;
          history.push("/inventory");
          logIn();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const switchToSignIn = () => {
    changeFormType("signIn");
  };

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div>
        <h1>Sign up</h1>
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

      <div className={styles.formGroup}>
        <label htmlFor="confirmation">Confirm Password</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmation}
          name="confirmation"
          type="password"
        />

        {formik.touched.confirmation && formik.errors.confirmation ? (
          <div className={styles.errorMsg}>{formik.errors.confirmation}</div>
        ) : null}
      </div>
      <button type="submit">Sign up</button>

      <p>
        Already have an account?{" "}
        <strong onClick={switchToSignIn}>Sign in</strong>
      </p>
    </form>
  );
}
