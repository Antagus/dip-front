import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import {
  AiFillHome,
  AiOutlineBarChart,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaRegCreditCard } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai";
import { IoIosChatbubbles } from "react-icons/io";
import { TabActive } from "shared/store/type";
import { globalStore } from "shared/store/globalStore";
import { TbCategory2 } from "react-icons/tb";

// Контейнер навигационной панели
const NavContainer = styled.nav<{ visible: boolean }>`
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%)
    translateY(${(p) => (p.visible ? "0" : "calc(100% + 60px)")});
  width: 80vw;
  max-width: 80vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #2e2e2e;
  border-radius: 16px;
  padding: 12px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: ${(p) => (p.visible ? 1 : 0)};
  z-index: 1000;
`;

// Кнопка-элемент навбара
const NavItem = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(p) => (p.active ? "#ffffff" : "rgba(255, 255, 255, 0.6)")};
  cursor: pointer;
  font-size: 12px;
  flex: 1;

  svg {
    font-size: 26px;
  }

  span {
    margin-top: 6px;
    line-height: 1;
    user-select: none;
  }
`;

export const PhoneNavBar: React.FC = observer(() => {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [activeTab, setActiveTab] = useState<TabActive>("Главная");

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.pageYOffset;
      setVisible(currentY < lastY);
      setLastY(currentY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const items: { tab: TabActive; icon: JSX.Element; label: string }[] = [
    { tab: "Главная", icon: <AiFillHome color="white" />, label: "Главная" },
    {
      tab: "Анализ",
      icon: <AiOutlineBarChart color="white" />,
      label: "Анализ",
    },
    {
      tab: "Календарь",
      icon: <AiOutlineCalendar color="white" />,
      label: "Календарь",
    },
    {
      tab: "Категории",
      icon: <TbCategory2 color="white" />,
      label: "Категории",
    },
  ];

  // Обработчик выбора таба
  const handleClick = (tab: TabActive) => {
    globalStore.setTotalMenuTab(tab);
  };

  return (
    <NavContainer visible={visible}>
      {items.map((item) => (
        <NavItem
          key={item.tab}
          active={activeTab === item.tab}
          onClick={() => handleClick(item.tab)}
        >
          {item.icon}
          <span>{item.label}</span>
        </NavItem>
      ))}
    </NavContainer>
  );
});
