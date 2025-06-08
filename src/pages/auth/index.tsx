import React, { useState } from "react";

import { observer } from "mobx-react";
import { AuthForm, RegistrationForm } from "features/Auth";

import styled from "styled-components";


const CenterElement = styled.section`
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: center;
`;

export const LoginPage = observer(() => {
  const [authPage, setAuthPage] = useState(true);


return (
    <CenterElement>
      {/* <NavBar /> */}
    {authPage ? (
        <AuthForm setAuth={setAuthPage} />
      ) : (
        <RegistrationForm setAuth={setAuthPage} />
      )}
    </CenterElement>
  );
});
