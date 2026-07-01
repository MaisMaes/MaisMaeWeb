
export interface Grupo {
    id: number;
    titulo: string;
}

export interface Denuncia {

    id:number;

    descricao:string;

    status:
        | "PENDENTE"
        | "EM_ANALISE"
        | "RESOLVIDA"
        | "REJEITADA";

    grupoId:number;

    grupoNome:string;

    usuarioId:string;

    usuarioNome:string;

    abertoEm:string;

    atualizadoEm:string;

    verdadeira:
        | "SIM"
        | "NAO"
        | "VERIFICANDO";

}

export interface RespostaPaginada{

    content:Denuncia[];

    totalElements:number;

    totalPages:number;

}



import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { ModalDenuncia } from "../components/ModalDenuncia";
import styled from "styled-components";
import { buscarDenuncias, getGroups } from "../../service/api";
import { CardDenuncia } from "../components/CardDenuncia";
import Paginacao from "../components/Paginacao";



export function Denuncias() {

const [denuncias, setDenuncias] = useState<Denuncia[]>([]);

  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalElementos, setTotalElementos] = useState(0);
  

  const [carregando, setCarregando] = useState(true);
  const [status, setStatus] = useState("");
  const [denunciaSelecionada, setDenunciaSelecionada] = useState<Denuncia | null>(null);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [grupoId, setGrupoId] = useState(0);

  async function carregarGrupos(){

    const grupos = await getGroups();

    setGrupos(grupos);

}

async function carregarDenuncias() {

    try {

      setCarregando(true);

    // const resposta = await buscarDenuncias(
    //     grupoId,
    //     status
    // );
    const resposta = await buscarDenuncias(
        grupoId,
        status,
        paginaAtual,
        10
    );

    setDenuncias(resposta.content);
    setTotalPaginas(resposta.totalPages);
    setTotalElementos(resposta.totalElements)


      setDenuncias(resposta.content);

    } catch (error) {

      console.error(error);

      alert("Erro ao carregar denúncias.");

    } finally {

      setCarregando(false);

    }

  }


useEffect(() => {
    // carregarDenuncias();
    carregarGrupos();

}, []);

useEffect(() => {
  carregarDenuncias();
}, [grupoId, status, paginaAtual]);


  function abrirDetalhes(denuncia: Denuncia) {

    setDenunciaSelecionada(denuncia);

  }

  function fecharModal() {

    setDenunciaSelecionada(null);

  }

async function limparFiltros() {
    setGrupoId(0);
    setStatus("");
    setPaginaAtual(0);
}

  return (
    <DashboardLayout>

      <Container>

        <CabecalhoFixo>
          
        <Cabecalho>

          <Titulo>Denúncias</Titulo>

          <Subtitulo>

            Visualize e gerencie as denúncias realizadas pelos usuários.

          </Subtitulo>

        </Cabecalho>

        <BarraFiltros>

              <Filtro>

                <label>Status</label>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >

                    <option value="">Todos</option>
                    <option value="PENDENTE">PENDENTE</option>
                    <option value="EM_ANALISE">EM_ANALISE</option>
                    <option value="RESOLVIDA">RESOLVIDA</option>
                    <option value="REJEITADA">REJEITADA</option>

                </select>

            </Filtro>
          <Filtro>

          <label>Grupo</label>

          <select
              value={grupoId}
              onChange={(e) =>
                  setGrupoId(Number(e.target.value))
              }
          >

              <option value={0}>
                  Todos os grupos
              </option>

              {grupos.map((grupo) => (

                  <option
                      key={grupo.id}
                      value={grupo.id}
                  >
                      {grupo.titulo}
                  </option>

              ))}

          </select>

        </Filtro>

          <BotaoFiltrar
              onClick={carregarDenuncias}
          >
              Filtrar
          </BotaoFiltrar>

          <BotaoLimpar
          onClick={limparFiltros}
          >

            Limpar

          </BotaoLimpar>

        </BarraFiltros>

        <Informacoes>

          Total de denúncias: <strong>{denuncias.length}</strong>

        </Informacoes>
        </CabecalhoFixo>

        <GridDenuncias>

          {carregando && (

            <MensagemVazia>

              Carregando denúncias...

            </MensagemVazia>

          )}

          {!carregando && denuncias.length === 0 && (

            <MensagemVazia>

              Nenhuma denúncia encontrada.

            </MensagemVazia>

          )}

          {!carregando && denuncias.map((denuncia) => (

            <CardDenuncia

              key={denuncia.id}

              denuncia={denuncia}

              abrirDetalhes={() =>
                abrirDetalhes(denuncia)
              }

            />

          ))}

        </GridDenuncias>

        {denunciaSelecionada && (

          <ModalDenuncia

            denuncia={denunciaSelecionada}

            fechar={fecharModal}

            atualizarLista={carregarDenuncias}

          />

        )}
        <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={setPaginaAtual}
      />
      </Container>
    </DashboardLayout>
  );
}

export const CabecalhoFixo = styled.div`
  position: sticky;
  top: 0;

  z-index: 100;

  background: #f6f6f6;

  padding-bottom: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Cabecalho = styled.div`
  margin-bottom: 30px;
`;

export const Titulo = styled.h1`
  color: #333;
  font-size: 2rem;
`;

export const Subtitulo = styled.p`
  color: #777;
  margin-top: 6px;
`;

export const BarraFiltros = styled.div`
  background: white;

  border-radius: 12px;

  padding: 20px;

  display: flex;

  gap: 18px;

  flex-wrap: wrap;

  align-items: end;

  box-shadow: 0 2px 8px rgba(0,0,0,.08);
`;

export const Filtro = styled.div`
  display: flex;
  flex-direction: column;

  label{

    margin-bottom:6px;

    color:#666;

    font-size:.85rem;

  }

  input,
  select{

    width:200px;

    height:42px;

    border:1px solid #DDD;

    border-radius:8px;

    padding:0 12px;

    outline:none;

  }

`;

export const BotaoFiltrar = styled.button`
  height:42px;

  padding:0 24px;

  border:none;

  border-radius:8px;

  background:#B68AB0;

  color:white;

  cursor:pointer;

  transition:.2s;

  &:hover{

    background:#A96EA4;

  }

`;

export const BotaoLimpar = styled.button`
  height:42px;

  padding:0 24px;

  border:1px solid #DDD;

  background:white;

  border-radius:8px;

  cursor:pointer;

  transition:.2s;

  &:hover{

    background:#F6F6F6;

  }

`;

export const Informacoes = styled.div`
  margin: 25px 0;

  color:#555;

  strong{

    color:#B68AB0;

  }

`;

export const GridDenuncias = styled.div`
  display:grid;

  grid-template-columns:repeat(auto-fill,minmax(370px,1fr));

  gap:24px;
`;

export const MensagemVazia = styled.div`
  grid-column:1/-1;

  background:white;

  border-radius:12px;

  padding:40px;

  text-align:center;

  color:#888;

  box-shadow:0 2px 8px rgba(0,0,0,.05);
`;