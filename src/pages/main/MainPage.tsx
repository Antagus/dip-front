import { AccountList } from "features/AccountList/ui";
import { NavBar } from "features/NavBar";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { globalStore } from "shared/store/globalStore";
import { Block, Container, ResponsiveGrid, Row } from "shared/ui";

export const MainPage = observer(() => {
  const navigation = useNavigate();
  const { user, isAuthenticated } = globalStore;

  if (!isAuthenticated) {
    navigation("/");
    return <></>;
  }

  const AccountBlock = () => {
    return (
      <Block>
        <AccountList />
      </Block>
    );
  };

  return (
    <>
      <NavBar />

      <Container>
        <ResponsiveGrid
          leftColumn={<AccountBlock />}
          middleColumn={<Block />}
          rightColumn={<Block />}
        />
      </Container>
    </>
  );
});
