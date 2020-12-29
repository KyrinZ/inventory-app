import { useFormik } from "formik";

// Styles
import styles from "./AuthenticationForm.module.scss";

import { signInSchema } from "./authentication_schema";

export default function SignInForm({ changeFormType }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
      <button>Sign in</button>

      <p>
        Don't have an account? <strong onClick={switchToSignUp}>Sign up</strong>
      </p>
    </form>
  );
}
