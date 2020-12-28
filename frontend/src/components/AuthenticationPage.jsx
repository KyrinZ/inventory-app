// import warehouseImg from "../assets/warehouse.jpg";
import { useState } from "react";

// Components
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

// Styles
import styles from "./AuthenticationPage.module.scss";

import wareHouseIma from "../assets/warehouse.jpg";

export default function Authentication() {
  const [formType, setFormType] = useState("signUp");

  const changeFormType = (type) => {
    setFormType(type);
  };
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formSide}>
        <div className={styles.formInner}>
          {/* Logo */}
          <div className={styles.logo}>
            <img alt="Logo" />
          </div>

          {/* Forms */}
          {formType === "signIn" ? (
            <SignInForm changeFormType={changeFormType} />
          ) : formType === "signUp" ? (
            <SignUpForm changeFormType={changeFormType} />
          ) : null}
        </div>
      </div>
      {/* Side Image */}
      <div className={styles.imageSide}>
        <img src={wareHouseIma} alt="Warehouse" />
      </div>
    </div>
  );
}
