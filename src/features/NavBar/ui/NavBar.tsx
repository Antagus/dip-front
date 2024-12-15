import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { themeStore } from "../../../shared/store/index";
import { Container } from "../../../shared/ui/Container";
import styles from "./NavBar.module.scss";
import { TabActive } from "shared/store/type";
import { Link } from "react-router-dom";
import { ThemeSwitch } from "shared/ui/ThemeSwitch";
import { globalStore } from "shared/store/globalStore";

type TabActivies = { nameTab: TabActive; url: string };

const NavBar = observer(() => {
  const { theme, changeTotalTabActive, currentTabActive } = themeStore;
  const { user } = globalStore;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const listMenuTabs: Array<TabActivies> = [
    {
      nameTab: "Главная",
      url: "/main",
    },
    {
      nameTab: "Календарь",
      url: "/calendar",
    },
    {
      nameTab: "Анализ",
      url: "/analyse",
    },
    {
      nameTab: "Категории",
      url: "/category",
    },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className={`${styles.navbar} ${styles[theme]}`}>
      <Container>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img
              src="icons/Dollar Coin.svg"
              width="32px"
              height="32px"
              alt="Иконка лого"
            />
            <span>
              <span color="#007bff">Фин</span>Кон
            </span>
          </div>

          <button
            className={styles.burgerMenu}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>

          <ul
            className={`${styles.menu} ${
              isMenuOpen ? styles.menuOpen : styles.menuClose
            }`}
          >
            {listMenuTabs.map((menuItem) => (
              <li key={menuItem.nameTab} className={styles.menuItem}>
                <Link
                  to={menuItem.url}
                  onClick={() => {
                    changeTotalTabActive(menuItem.nameTab);
                    setIsMenuOpen(false); // Закрываем меню после клика
                  }}
                  className={
                    currentTabActive === menuItem.nameTab
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  {menuItem.nameTab}
                </Link>
              </li>
            ))}
            <ThemeSwitch />
          </ul>

          <div className={styles.profile}>
            <img width="32px" height="32px" src="icons/Male User.svg" alt="" />
            <span>{user?.firstName}</span>
          </div>
        </div>
      </Container>
    </nav>
  );
});

export default NavBar;
