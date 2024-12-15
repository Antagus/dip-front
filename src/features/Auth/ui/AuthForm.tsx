import React, { useState } from "react";
import { useDevice } from "shared/hooks";
import {
  AdaptiveBlock,
  Button,
  Container,
  Form,
  Row,
  StickySection,
  ValidationInput,
} from "shared/ui";

type AuthParams = {
  setAuth: (param: boolean) => void;
};

export const AuthForm: React.FC<AuthParams> = ({ setAuth }) => {
  const { isMobile } = useDevice();
  const [value, setValue] = useState("");

  const handleSubmit = (data: Record<string, string>) => {
    console.log("Данные формы:", data);
  };
  return (
    <Container padding={isMobile ? "0px 0px 0px 0px" : "20px 0px 0px 0px"}>
      <AdaptiveBlock>
        <Row tPadding="20px">
          <h2>Авторизация</h2>
        </Row>
        <Row tPadding="10px">
          <p>Перед началом работы необходимо войти в свой аккаунт</p>
        </Row>

        <Form onSubmit={handleSubmit}>
          <ValidationInput
            id="email"
            value={value}
            onChange={setValue}
            typeValidation="email"
            label="Введите почту"
            required={true}
          />
          <ValidationInput
            id="name"
            value={value}
            onChange={setValue}
            typeValidation="names"
            label="Введите имя"
          />

          <Row padding="16px 0px 0px 0px">
            <p color="#427ba4" onClick={() => setAuth(false)}>
              У меня нет аккаунта. Зарегистрировать?
            </p>
          </Row>

          <StickySection>
            <Row padding="20px 0px 20px 0px">
              <Button type="submit">Войти</Button>
            </Row>
          </StickySection>
        </Form>
      </AdaptiveBlock>
    </Container>
  );
};
