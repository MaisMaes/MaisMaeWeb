


import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLoggedUser } from "../../service/api";
import { FiLogOut } from "react-icons/fi";
interface UserProfile {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  role: string;
}

export function Sidebar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
  async function loadUser() {
    try {
      const data = await getLoggedUser();
      setUser(data);
    } catch (error) {
      console.error(
        "Erro ao carregar usuário:",
        error
      );
    }
  }

  loadUser();
}, []);


function handleLogout() {
  localStorage.removeItem("token");

  navigate("/");
}



  return (
    <SidebarContainer>
      <div>
        <Logo>+Mães</Logo>

        <UserInfo>
          {/* <div className="avatar" /> */}
          <UserAvatar>
          {user?.nome?.charAt(0).toUpperCase()}
        </UserAvatar>

          <div>
            <h4>{user?.nome ?? "Carregando..."}</h4>
            <span>
            {user?.role === "ADMINISTRADOR"
              ? "Administrador"
              : user?.role}
          </span>
          </div>
        </UserInfo>

        <Menu>
          <MenuItem to="/dashboard">
            Dashboard
          </MenuItem>

          {/* <MenuItem to="/denuncias">
            Denúncias
          </MenuItem> */}

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

      <LogoutButton
      type="button"
      onClick={handleLogout}
    >
      <FiLogOut />
      Sair
    </LogoutButton>
    </SidebarContainer>
  );
}

export const UserAvatar = styled.div`
  width: 58px;
  height: 58px;

  border-radius: 50%;

  background: #d764c8;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.4rem;
  font-weight: 700;

  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  margin-bottom: 50px;

  h4 {
    margin-bottom: 4px;
    font-size: 1rem;
  }

  span {
    color: #cfcfcf;
    font-size: 0.9rem;
  }
`;

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

// export const UserInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;

//   margin-bottom: 50px;

//   .avatar {
//     width: 58px;
//     height: 58px;

//     border-radius: 50%;
//     background: white;
//   }

//   h4 {
//     margin-bottom: 4px;
//   }

//   span {
//     color: #cfcfcf;
//     font-size: 0.9rem;
//   }
// `;

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
