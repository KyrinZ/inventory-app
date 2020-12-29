import { useFormik } from "formik";

// Styles
import styles from "./AuthenticationForm.module.scss";

import { signUpSchema } from "./authentication_schema";

export default function SignUpForm({ changeFormType }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmation: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
      <button>Sign up</button>

      <p>
        Already have an account?{" "}
        <strong onClick={switchToSignIn}>Sign in</strong>
      </p>
    </form>
  );
}
