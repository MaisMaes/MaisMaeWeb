// import "./Dashboard.css";

import mulher from "../assets/imagem-mulher.png";
import arow from "../assets/arow.png";


import { DashboardLayout } from "../components/DashboardLayout";
import styled from "styled-components";


export function Dashboard() {
  return (
    <DashboardLayout>
      <Banner>
        <ArrowLeft
          src={arow}
          alt=""
        />

        <ArrowRight
          src={arow}
          alt=""
        />

        <BannerText>
          <h1>
            Seja bem-vindo(a)! Esse é seu portal de administração.
          </h1>

          <p>
            Gerencie conteúdos, grupos temáticos e informações  da plataforma de forma rápida e segura.
          </p>

        
          <p>
          Utilize este painel para acompanhar as principais funcionalidades do sistema, manter as informações atualizadas e garantir uma melhor experiência para todas as usuárias da comunidade +Mães.
        </p>
        </BannerText>

        <WomanImage
          src={mulher}
          alt="Mulher"
        />
      </Banner>
    </DashboardLayout>
  );
}



export const Banner = styled.section`
  position: relative;

  background: #6d9db2;

  border-radius: 12px;

  min-height: 500px;

  padding: 50px;

  overflow: hidden;

  display: flex;
  align-items: center;
`;

export const BannerText = styled.div`
  max-width: 600px;

  z-index: 2;

  h1 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    color: white;
    line-height: 1.8;
  }
`;

export const WomanImage = styled.img`
  position: absolute;

  right: 20px;
  top: 0;

  height: 100%;

  object-fit: contain;
`;

export const ArrowLeft = styled.img`
  position: absolute;

  left: 50px;
  top: 20px;

  width: 120px;

  opacity: 0.8;
`;

export const ArrowRight = styled.img`
  position: absolute;

  right: 450px;
  top: 180px;

  width: 120px;

  transform: rotate(180deg);

  opacity: 0.8;
`;
