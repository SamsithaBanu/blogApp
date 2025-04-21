"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";
import { ThemeToggle } from "../themeToggle/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { FaBars } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { toggle, theme } = useContext(ThemeContext);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [barClicked, setBarClicked] = useState(false);
  const pathname = usePathname();
  const { status, data } = useSession();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 800) {
        setBarClicked(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setBarClicked(false);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href={'https://www.facebook.com/'}><Image src="/facebook.png" alt="facebook" width={24} height={24} /></Link>
        <Link href={'https://www.instagram.com/s3k65/#'}><Image src="/instagram.png" alt="instagram" width={24} height={24} /></Link>
        <Link href={'https://www.youtube.com/'}><Image src="/youtube.png" alt="youtube" width={24} height={24} /></Link>
      </div>
      <Link href="/" className={styles.middle}>
        SamBlog
      </Link>

      {screenWidth > 800 ? (
        <div className={styles.right}>
          <ThemeToggle />
          <div className={styles.navs}>
            <Link
              className={`${styles.navLink} ${
                pathname === "/" ? styles.active : ""
              }`}
              href="/"
            >
              HomePage
            </Link>
            <Link
              className={`${styles.navLink} ${
                pathname === "/contact" ? styles.active : ""
              }`}
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className={`${styles.navLink} ${
                pathname === "/about" ? styles.active : ""
              }`}
              href="/about"
            >
              About
            </Link>
            {status === "authenticated" ? (
              <>
                <Link
                  className={`${styles.navLink} ${
                    pathname === "/login" ? styles.active : ""
                  }`}
                  href="/write"
                >
                  Write
                </Link>
                <span className={styles.link} onClick={signOut}>
            Logout
          </span>
              </>
            ) : (
              <Link
                className={`${styles.navLink} ${
                  pathname === "/login" ? styles.active : ""
                }`}
                href="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.right}>
          <ThemeToggle />
          <FaBars
            size={22}
            onClick={() => setBarClicked(!barClicked)}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      {barClicked && screenWidth <= 800 && (
        <div
          className={styles.sidebarWrapper}
          style={
            theme === "dark"
              ? { background: "#0f172a", color: "#ddd" }
              : { background: "#fff", color: "#333" }
          }
        >
          <Link
            className={`${styles.navLink} ${
              pathname === "/" ? styles.active : ""
            }`}
            href="/"
          >
            HomePage
          </Link>
          <Link
            className={`${styles.navLink} ${
              pathname === "/contact" ? styles.active : ""
            }`}
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className={`${styles.navLink} ${
              pathname === "/about" ? styles.active : ""
            }`}
            href="/about"
          >
            About
          </Link>
          <Link
            className={`${styles.navLink} ${
              pathname === "/login" ? styles.active : ""
            }`}
            href="/login"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
