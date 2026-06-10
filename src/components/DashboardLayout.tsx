import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopMenu } from "./TopMenu";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

export function DashboardLayout({
  children,
}: Props) {
  return (
    <Container>
      <Sidebar />

      <MainContent>
        <TopMenu />

        {children}
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

 const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;
