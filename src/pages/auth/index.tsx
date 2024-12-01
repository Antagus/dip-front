import React, { Dispatch, useEffect, useState } from "react";

import { observer } from "mobx-react";
import { themeStore } from "shared/store";

import { Container } from "shared/ui/Container";
import { Block } from "shared/ui/Block";
import { Row } from "shared/ui/Row";
import { Button } from "shared/ui/Button";
import { ThemeSwitch } from "shared/ui/ThemeSwitch";
import { Input } from "shared/ui/Input";

type User = {
  id: number;
  name: string;
  email: string;
};

export const LoginPage = observer(() => {
  const { theme, toggleTheme } = themeStore;
  const [dataUsers, setDataUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3222/users/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.json();
      })
      .then((data: User[]) => {
        setDataUsers(data);
        console.log(data); // Вывод данных
      })
      .catch((error) => {
        console.error("Ошибка загрузки:", error);
      });
  }, []);

  return (
    <Container>
      <Block style={{ padding: "20px" }}>
        <ThemeSwitch />
        <Row>
          <h3>Авторизация</h3>
        </Row>
        <Row tPadding="10px">
          <p>Прежде чем заняться своими делами, будь добр, авторизуйся</p>
        </Row>
        <Row tPadding="10px">
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "12px",
              boxSizing: "border-box",
              border: "3px solid",
            }}
          >
            <input
              type="text"
              style={{
                textOverflow: "ellipsis",
                textAlign: "left",
                whiteSpace: "nowrap",
                border: "none",
                padding: "5px",
                width: "100%",
                outline: "none",
                paddingLeft: "10px",
                borderRadius: "12px",
              }}
            />
          </div> */}
          <Input
            id="test"
            label="Введите имя"
            placeholder="Введите имя"
            value="test"
            onChange={() => console.log("t")}
          />
        </Row>
        <Row gapRow="16px" padding="20px 0px 20px 0px">
          <Button variant="filled" onClick={() => console.log("TEST")}>
            Отменить
          </Button>
          <Button onClick={() => console.log("TEST")}>Отправить</Button>
        </Row>
      </Block>
    </Container>
  );
});
