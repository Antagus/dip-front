// src/features/NavBar/ui/NavBar.tsx
import React from "react";
import { observer } from "mobx-react-lite";
import { themeStore } from "../../../shared/store/index";
import { Container } from "../../../shared/ui/Container"; // Импорт UI-компонента Container
import styles from "./NavBar.module.scss";
import { TabActive } from "shared/store/type";
import { Link } from "react-router-dom";
import { ThemeSwitch } from "shared/ui/ThemeSwitch";

type TabActivies = { nameTab: TabActive; url: string };

const NavBar = observer(() => {
  const { theme, changeTotalTabActive, currentTabActive } = themeStore;

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
            <span>ФинКон</span>
          </div>
          <ul className={styles.menu}>
            {listMenuTabs.map((menuItem) => (
              <li key={menuItem.nameTab} className={styles.menuItem}>
                <Link
                  to={menuItem.url}
                  onClick={() => changeTotalTabActive(menuItem.nameTab)}
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
          </ul>
          <div className={styles.profile}>
            <img width="32px" height="32px" src="icons/Male User.svg" alt="" />
            <span>Анатолий</span>
            <ThemeSwitch />
          </div>
        </div>
      </Container>
    </nav>
  );
});

export default NavBar;
