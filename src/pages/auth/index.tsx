import React, { useState } from "react";

import { observer } from "mobx-react";
import { Container } from "shared/ui/Container";
import { Block } from "shared/ui/Block";
import { Row } from "shared/ui/Row";
import { Button } from "shared/ui/Button";
import { NavBar } from "features/NavBar";
import { ValidationInput } from "shared/ui/ValidationInput";
import { Form } from "shared/ui/Form";

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

          <Form onSubmit={() => console.log("")}>
            <ValidationInput
              id="name"
              value={value}
              onChange={setValue}
              typeValidation="names"
              label="Введите имя"
            />
            <ValidationInput
              value={value}
              onChange={setValue}
              typeValidation="names"
              label="Введите имя"
            />
            <Row>
              <Button>Тест</Button>
            </Row>
          </Form>
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
