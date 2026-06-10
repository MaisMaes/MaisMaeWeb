// import {
//   MenuContainer,
//   MenuButton,
// } from "./styles";

import styled from "styled-components";

interface Props {
  active?: boolean;
}

export function TopMenu() {
  return (
    <MenuContainer>
      <MenuButton active>
        Home
      </MenuButton>

      <MenuButton>
        Denúncias
      </MenuButton>

      <MenuButton>
        Publicações
      </MenuButton>

      <MenuButton>
        Perfil
      </MenuButton>
    </MenuContainer>
  );
}

export const MenuContainer =
  styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  `;

export const MenuButton =
  styled.button<Props>`
    width: 150px;
    height: 42px;

    border: none;
    border-radius: 8px;

    color: white;

    background: ${({ active }) =>
      active ? "#D764C8" : "#B68AB0"};
  `;

  