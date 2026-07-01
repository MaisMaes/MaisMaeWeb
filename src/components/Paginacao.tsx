import styled from "styled-components";

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudarPagina: (pagina: number) => void;
}

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  onMudarPagina,
}: PaginacaoProps) {
  return (
    <ContainerPaginacao>
      <BotaoPagina
        disabled={paginaAtual === 0}
        onClick={() => onMudarPagina(paginaAtual - 1)}
      >
        ←
      </BotaoPagina>

      {[...Array(totalPaginas)].map((_, index) => (
        <NumeroPagina
          key={index}
          ativo={paginaAtual === index}
          onClick={() => onMudarPagina(index)}
        >
          {index + 1}
        </NumeroPagina>
      ))}

      <BotaoPagina
        disabled={paginaAtual === totalPaginas - 1}
        onClick={() => onMudarPagina(paginaAtual + 1)}
      >
        →
      </BotaoPagina>
    </ContainerPaginacao>
  );
}

export const ContainerPaginacao = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
`;
// export const Paginacao = styled.div`
//     display:flex;
//     justify-content:center;
//     align-items:center;

//     gap:8px;

//     margin-top:40px;
// `;

export const NumeroPagina = styled.button<{ativo:boolean}>`

    width:40px;

    height:40px;

    border-radius:8px;

    border:none;

    cursor:pointer;

    background:${props =>
        props.ativo ? "#B68AB0" : "#FFF"};

    color:${props =>
        props.ativo ? "#FFF" : "#444"};

    border:1px solid #DDD;

`;


export const BotaoPagina = styled.button`

    width:40px;

    height:40px;

    border-radius:8px;

    border:1px solid #DDD;

    background:white;

    cursor:pointer;

`;