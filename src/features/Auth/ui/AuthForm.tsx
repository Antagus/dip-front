import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useDevice } from "shared/hooks";
import { globalStore } from "shared/store/globalStore";
import { useNavigate } from "react-router-dom";

import {
  AdaptiveBlock,
  Block,
  Button,
  Container,
  Form,
  Row,
  StickySection,
  ValidationInput,
} from "shared/ui";
import { getPathAPI } from "shared/api/constant";

type AuthParams = {
  setAuth: (param: boolean) => void;
};

export const AuthForm: React.FC<AuthParams> = observer(({ setAuth }) => {
  const { isMobile } = useDevice();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigate();

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const response = await axios.post(getPathAPI("/users/auth/login"), {
        email: data.email,
        password: data.password,
      });
      const userData = response.data;
      console.log("User Data", userData);

      localStorage.setItem("user", JSON.stringify(userData));

      globalStore.setUser(userData);
      navigation("/main");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError("Неправильный логин или пароль. Повторите попытку еще раз!");
        console.log(err.response.data.message);
      } else {
        console.log("Произошла ошибка, попробуйте снова.", err);
      }
    }

    console.log("Данные формы:", data); // Вывод данных формы
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
            value={email}
            onChange={setEmail}
            typeValidation="email"
            label="Введите электронную почту"
            required={true}
          />
          <ValidationInput
            id="password"
            value={password}
            onChange={setPassword}
            typeValidation="password"
            label="Введите пароль"
            type="password"
          />
          <Row
            padding={
              error.length === 0 ? "0px 0px 0px 0px" : "16px 0px 16px 0px"
            }
          >
            <p style={{ color: "red" }}>{error}</p>
          </Row>

          <Row padding="8px 0px 0px 0px">
            <p
              style={{ color: "#427ba4", cursor: "pointer" }}
              onClick={() => setAuth(false)}
            >
              У меня нет аккаунта. Зарегистрировать?
            </p>
          </Row>
          {/* <StickySection> */}

          <section>
            <Row padding="20px 0px 20px 0px">
              <Button type="submit">Войти</Button>
            </Row>
          </section>

          {/* </StickySection> */}
        </Form>
      </AdaptiveBlock>
    </Container>
  );
});
