"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import styles from "./themeToggle.module.css";

export const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.toggleWrapper}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
      onClick={toggle}
    >
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { backgroundColor: "#0f172a", left: "18px" }
            : { backgroundColor: "white", right: "18px" }
        }
      ></div>
    </div>
  );
};
