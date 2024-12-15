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

export const RegistrationForm: React.FC<AuthParams> = ({ setAuth }) => {
  const { isMobile } = useDevice();

  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");

  const [date, setDate] = useState(new Date().toDateString());

  const handleSubmit = (data: Record<string, string>) => {
    console.log("Данные формы:", data);
  };
  return (
    <Container padding={isMobile ? "0px 0px 0px 0px" : "20px 0px 0px 0px"}>
      <AdaptiveBlock>
        <Row tPadding="20px">
          <h2>Регистрация</h2>
        </Row>
        <Row tPadding="10px">
          <p>
            Ваш аккаунт, это ваша собственность не забывайте свои данные и не
            передавайте их другим
          </p>
        </Row>
        <Form onSubmit={handleSubmit}>
          <ValidationInput
            id="email"
            value={email}
            onChange={setEmail}
            typeValidation="email"
            label="Введите электронную почту"
            required={true}
          />
          <ValidationInput
            id="name"
            value={name}
            onChange={setName}
            typeValidation="names"
            label="Введите имя"
          />
          <ValidationInput
            id="secondName"
            value={secondName}
            onChange={setSecondName}
            typeValidation="names"
            label="Введите фамилию"
          />

          <ValidationInput
            id="dateBirth"
            value={date}
            onChange={setDate}
            typeValidation="date"
            label="Укажите дату рождения"
            type="date"
          />

          <ValidationInput
            id="password"
            value={secondName}
            onChange={setSecondName}
            typeValidation="password"
            type="password"
            label="Укажите пароль"
          />

          <StickySection>
            <Row padding="20px 0px 20px 0px">
              <Button type="submit">Зарегистрировать</Button>
            </Row>
            <Row padding="0px 0px 20px 0px">
              <Button
                variant="filled"
                type="button"
                onClick={() => setAuth(true)}
              >
                У меня есть аккаунт
              </Button>
            </Row>
          </StickySection>
        </Form>
      </AdaptiveBlock>
    </Container>
  );
};
