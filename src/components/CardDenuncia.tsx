import type { Denuncia } from "../pages/Denuncias";



interface Props {
  denuncia: Denuncia;
  abrirDetalhes: () => void;
}

export function CardDenuncia({
  denuncia,
  abrirDetalhes,
}: Props) {

  function formatarData(data: string) {
    return new Date(data).toLocaleString("pt-BR");
  }

  return (
    <Card>

      <Status $status={denuncia.status}>
        {denuncia.status.replace("_", " ")}
      </Status>

      <Campo>
        <strong>Grupo</strong>
        <span>{denuncia.grupoNome}</span>
      </Campo>

      <Campo>
        <strong>Denunciante</strong>
        <span>{denuncia.usuarioNome}</span>
      </Campo>

      <Separador />

      <Campo>
        <strong>Descrição</strong>

        <Descricao>

          {denuncia.descricao}

        </Descricao>

      </Campo>

      <Separador />

      <RodapeCard>

        <Info>

          <TituloInfo>Aberta em</TituloInfo>

          <ValorInfo>

            {formatarData(denuncia.abertoEm)}

          </ValorInfo>

        </Info>

        <Info>

          <TituloInfo>Última alteração</TituloInfo>

          <ValorInfo>

            {formatarData(denuncia.atualizadoEm)}

          </ValorInfo>

        </Info>

      </RodapeCard>

      <BotaoDetalhes
        onClick={abrirDetalhes}
      >
        Visualizar detalhes
      </BotaoDetalhes>

    </Card>
  );
}

import styled from "styled-components";

interface StatusProps {
  $status: string;
}

export const Card = styled.div`
  background: white;

  border-radius: 12px;

  padding: 20px;

  display: flex;
  flex-direction: column;

  gap: 16px;

  border-bottom: 4px solid #72D6E4;

  box-shadow: 0 3px 10px rgba(0,0,0,.08);

  transition: .25s;

  &:hover{

    transform: translateY(-5px);

    box-shadow: 0 10px 24px rgba(0,0,0,.15);

  }
`;

export const Status = styled.div<StatusProps>`
  width: fit-content;

  padding: 6px 14px;

  border-radius: 30px;

  font-size: .8rem;

  font-weight: 700;

  background:${({ $status }) => {

    switch ($status) {

      case "PENDENTE":
        return "#FFF3CD";

      case "EM_ANALISE":
        return "#D6ECFF";

      case "RESOLVIDA":
        return "#D4EDDA";

      case "REJEITADA":
        return "#F8D7DA";

      default:
        return "#EEEEEE";

    }

  }};

  color:${({ $status }) => {

    switch ($status) {

      case "PENDENTE":
        return "#B8860B";

      case "EM_ANALISE":
        return "#0C63E7";

      case "RESOLVIDA":
        return "#198754";

      case "REJEITADA":
        return "#DC3545";

      default:
        return "#555";

    }

  }};
`;

export const Campo = styled.div`
  display:flex;

  flex-direction:column;

  gap:4px;

  strong{

    font-size:.85rem;

    color:#777;

  }

  span{

    font-weight:500;

    color:#333;

  }
`;

export const Descricao = styled.p`
  color:#555;

  line-height:1.5;

  margin:0;

  min-height:70px;

  overflow:hidden;

  display:-webkit-box;

  -webkit-line-clamp:3;

  -webkit-box-orient:vertical;
`;

export const Separador = styled.hr`
  border:none;

  border-top:1px solid #EEEEEE;
`;

export const RodapeCard = styled.div`
  display:flex;

  justify-content:space-between;

  gap:20px;
`;

export const Info = styled.div`
  display:flex;

  flex-direction:column;
`;

export const TituloInfo = styled.small`
  color:#999;

  margin-bottom:4px;
`;

export const ValorInfo = styled.span`
  font-size:.9rem;

  font-weight:500;

  color:#444;
`;

export const BotaoDetalhes = styled.button`
  margin-top:auto;

  height:42px;

  border:none;

  border-radius:8px;

  background:#B68AB0;

  color:white;

  font-weight:600;

  cursor:pointer;

  transition:.25s;

  &:hover{

    background:#A56B9F;

  }

  &:active{

    transform:scale(.98);

  }
`;