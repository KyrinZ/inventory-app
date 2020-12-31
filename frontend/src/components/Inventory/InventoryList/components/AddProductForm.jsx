import { useFormik } from "formik";

// Styles
import styles from "./styles/AddProductForm.module.scss";

// Utilities
import { axios, addProductSchema } from "../../../utilities";

export default function AddProductForm({ setIsAddFormOpen, loadProducts }) {
  const formik = useFormik({
    initialValues: {
      productId: "",
      productName: "",
      quantity: "",
    },
    validationSchema: addProductSchema,
    onSubmit: (values) => {
      const { productId, productName, quantity } = values;

      axios
        .post("product/add/", { productId, productName, quantity })
        .then((res) => {
          setIsAddFormOpen(false);
          loadProducts();
        })
        .catch((err) => console.log(err));
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
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
