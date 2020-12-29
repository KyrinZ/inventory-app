import styles from "./MenuItem.module.scss";

export default function MenuItem({ children, image, alt }) {
  return (
    <div className={styles.menuItem}>
      <img src={image} alt={alt} />
      <p>{children}</p>
    </div>
  );
}
