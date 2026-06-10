


import styled from "styled-components";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <SidebarContainer>
      <div>
        <Logo>+Mães</Logo>

        <UserInfo>
          <div className="avatar" />

          <div>
            <h4>Aman Admin</h4>
            <span>Administrador</span>
          </div>
        </UserInfo>

        <Menu>
          <MenuItem to="/dashboard">
            Dashboard
          </MenuItem>

          <MenuItem to="/denuncias">
            Denúncias
          </MenuItem>

          <MenuItem to="/publicacoes">
            Publicações
          </MenuItem>

          <MenuItem to="/grupos">
            Grupos
          </MenuItem>

          <MenuItem to="/perfil">
            Perfil
          </MenuItem>
        </Menu>
      </div>

      <LogoutButton>
        Log Out
      </LogoutButton>
    </SidebarContainer>
  );
}


export const LogoutButton = styled.button`
  height: 44px;

  border: none;
  border-radius: 10px;

  background: #b68ab0;
  color: white;

  cursor: pointer;

  transition: 0.25s ease;

  &:hover {
    background: #d764c8;
  }
`;

export const SidebarContainer = styled.aside`
  width: 280px;
  min-width: 280px;

  background: linear-gradient(
    180deg,
    #2f2f2f 0%,
    #252525 100%
  );

  color: white;

  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  color: #d78db6;
  font-size: 2.2rem;
  margin-bottom: 50px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  margin-bottom: 50px;

  .avatar {
    width: 58px;
    height: 58px;

    border-radius: 50%;
    background: white;
  }

  h4 {
    margin-bottom: 4px;
  }

  span {
    color: #cfcfcf;
    font-size: 0.9rem;
  }
`;

export const Menu = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MenuItem = styled(NavLink)`
  height: 48px;

  display: flex;
  align-items: center;

  padding: 0 16px;

  border-radius: 10px;

  text-decoration: none;

  color: white;

  transition: 0.25s;

  &:hover {
    background: rgba(215, 100, 200, 0.15);
    color: #d764c8;
  }

  &.active {
    background: rgba(215, 100, 200, 0.15);
    color: #d764c8;
  }
`;
