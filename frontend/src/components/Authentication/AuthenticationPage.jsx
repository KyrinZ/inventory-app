import { useState, useContext } from "react";

// Components
import { SignInForm, SignUpForm } from "./Forms";

// Styles
import styles from "./AuthenticationPage.module.scss";

// Utilities
import { illustrationBox } from "../../assets";
import { logo } from "../../assets/";
import { UserContext } from "../EntryPoint";

export default function Authentication({ logIn }) {
  const [formType, setFormType] = useState("signUp");

  const changeFormType = (type) => {
    setFormType(type);
  };

  const userObject = useContext(UserContext);

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
            <SignInForm
              logIn={userObject.logIn}
              changeFormType={changeFormType}
            />
          ) : formType === "signUp" ? (
            <SignUpForm
              logIn={userObject.logIn}
              changeFormType={changeFormType}
            />
          ) : null}
        </div>
      </div>
      {/* Side Image */}
      <div className={styles.imageSide}>
        <div className={styles.illustration}>
          <img src={illustrationBox} alt="illustrationBox" />
        </div>
        <div className={styles.text}>
          <h1>Manage your items</h1>
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est nunc,
            ligula ipsum placerat.
          </h2>
        </div>
      </div>
    </div>
  );
}
