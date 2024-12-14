import React, { useEffect, useState } from "react";

import { observer } from "mobx-react";
import { themeStore } from "shared/store";

import { Container } from "shared/ui/Container";
import { Block } from "shared/ui/Block";
import { Row } from "shared/ui/Row";
import { Button } from "shared/ui/Button";
import { ThemeSwitch } from "shared/ui/ThemeSwitch";
import { Input } from "shared/ui/Input";
import { VscAccount } from "react-icons/vsc";
import { Modal } from "shared/ui/Modal";
import { NavBar } from "features/NavBar";
import { ValidationInput } from "shared/ui/ValidationInput";

export const LoginPage = observer(() => {
  const [value, setValue] = useState("");

  return (
    <>
      <NavBar />

      <Container padding="20px 0px 20px 0px">
        <Block>
          <Row>
            <h2>Авторизация</h2>
          </Row>
          <Row tPadding="10px">
            <p>Прежде чем заняться своими делами, будь добр, авторизуйся</p>
          </Row>

          <Row>
            <ValidationInput
              value={value}
              onChange={setValue}
              typeValidation="email"
              label="Введите почту"
            />
          </Row>
          <Row>
            <ValidationInput
              value={value}
              onChange={setValue}
              typeValidation="names"
              label="Введите имя"
            />
          </Row>
          <Row gapRow="16px">
            <Button variant="filled" onClick={() => console.log("TEST")}>
              Отменить
            </Button>
            <Button onClick={() => console.log("TEST")}>Отправить</Button>
          </Row>
        </Block>
      </Container>
    </>
  );
});
