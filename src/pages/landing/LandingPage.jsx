import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { hero, curve, pyramid, visit, logo } from "../../assets/index";
import { isLoggedUser } from "../../utils/session";

const LogoComp = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} />
      <p>FormBot</p>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedUser()) {
      navigate("/dashboard");
    }
  }, []);

  const data = [
    {
      heading: "Product",
      options: ["Status", "Documentation", "Roadmap", "Pricing"],
      class: styles.link,
    },
    {
      heading: "Community",
      options: [
        "Discord",
        "GitHub repository",
        "Twitter",
        "LinkedIn",
        "OSS Friends",
      ],
      class: styles.link,
    },
    {
      heading: "Company",
      options: ["About", "Contact", "Terms of Service", "Privacy Policy"],
      class: styles.label,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LogoComp />
        <button
          className={styles.signin}
          onClick={() => navigate("/login/new")}
        >
          Sign In
        </button>
        <button className={styles.create} onClick={() => navigate("/register")}>
          Create a FormBot
        </button>
      </div>
      <div className={styles.main}>
        <img src={pyramid} />
        <div className={styles.heading}>
          <h1>Build advanced chatbots visually</h1>
          <p>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </p>
          <button
            className={styles.create}
            onClick={() => navigate("/register")}
          >
            Create a FormBot for free
          </button>
        </div>
        <img src={curve} />
      </div>
      <div className={styles.hero}>
        <div className={styles.orange}></div>
        <img src={hero} />
        <div className={styles.blue}></div>
      </div>
      <div className={styles.footer}>
        <div>
          <LogoComp />
          <p className={styles.credit}>
            Made with ❤️ by <span className={styles.option}>@cuvette</span>
          </p>
        </div>
        {data.map((section, idx) => {
          return (
            <div key={idx}>
              <p className={styles.title}>{section.heading}</p>
              {section.options.map((item, index) => {
                return (
                  <div key={index} className={styles.option}>
                    {item}
                    <img src={visit} className={section.class} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
