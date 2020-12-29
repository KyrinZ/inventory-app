import { useFormik } from "formik";

import styles from "./AddProductForm.module.scss";

import { addProductSchema } from "./authentication_schema";

export default function AddProductForm({ setIsAddFormOpen }) {
  const formik = useFormik({
    initialValues: {
      productId: "",
      productName: "",
      quantity: "",
    },
    validationSchema: addProductSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div
      onClick={(e) => {
        setIsAddFormOpen(false);
      }}
      className={styles.formContainer}
    >
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.form}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.heading}>
          <h1>Add Item</h1>
          <p
            onClick={(e) => {
              setIsAddFormOpen(false);
            }}
          >
            close
          </p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="productId">Id</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productId}
            name="productId"
            type="text"
          />

          {formik.touched.productId && formik.errors.productId ? (
            <div className={styles.errorMsg}>{formik.errors.productId}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="productName">Name</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.productName}
            name="productName"
            type="text"
          />

          {formik.touched.productName && formik.errors.productName ? (
            <div className={styles.errorMsg}>{formik.errors.productName}</div>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
            name="quantity"
            type="number"
          />

          {formik.touched.quantity && formik.errors.quantity ? (
            <div className={styles.errorMsg}>{formik.errors.quantity}</div>
          ) : null}
        </div>
        <button>Add Item</button>
      </form>
    </div>
  );
}
