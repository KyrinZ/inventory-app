import { useState } from "react";

// Components
import { SignInForm, SignUpForm } from "./Forms";

// Styles
import styles from "./AuthenticationPage.module.scss";

// Utilities
import { sideImage } from "../../assets";
import { logo } from "../../assets/";

export default function Authentication({ logIn }) {
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
            <img src={logo} alt="Logo" />
          </div>

          {/* Forms */}
          {formType === "signIn" ? (
            <SignInForm logIn={logIn} changeFormType={changeFormType} />
          ) : formType === "signUp" ? (
            <SignUpForm logIn={logIn} changeFormType={changeFormType} />
          ) : null}
        </div>
      </div>
      {/* Side Image */}
      <div className={styles.imageSide}>
        <img src={sideImage} alt="sideImage" />
      </div>
    </div>
  );
}
