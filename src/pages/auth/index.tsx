import React, { useState } from "react";

import { observer } from "mobx-react";
import { AuthForm, RegistrationForm } from "features/Auth";

export const LoginPage = observer(() => {
  const [authPage, setAuthPage] = useState(true);

  return (
    <>
      {/* <NavBar /> */}{" "}
      {authPage ? (
        <AuthForm setAuth={setAuthPage} />
      ) : (
        <RegistrationForm setAuth={setAuthPage} />
      )}
    </>
  );
});
