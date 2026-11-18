
import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FiUsers,
  FiCheckCircle,
  FiFileText,
  FiSearch,
  FiMonitor,
} from "react-icons/fi";
import { DashboardLayout } from "../components/DashboardLayout";
import { api } from "../../service/api";

export type StatusDenuncia =
  | "ABERTA"
  | "EM_ANDAMENTO"
  | "FECHADA";

export interface Denuncia {
  id: number;
  nomeUsuario: string;
  email: string;
  endereco: string;
  contato: string;
  status: StatusDenuncia;
  descricao: string;
  dataDenuncia: string;
  atualizadoEm: string;
}

export interface PaginaDenuncias {
  content: Denuncia[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

// LISTAR DENÚNCIAS
export async function listarDenuncias(
  pagina = 0,
  tamanho = 10
): Promise<PaginaDenuncias> {
  const response = await api.get("/denuncias/admin/todas", {
    params: {
      pagina,
      tamanho,
    },
  });

  return response.data;
}

// ATUALIZAR STATUS
export async function atualizarStatusDenuncia(
  id: number,
  status: StatusDenuncia
): Promise<Denuncia> {
  const response = await api.put(`/denuncias/${id}/status`, {
    status,
  });

  return response.data;
}


export function DenunciasUser() {

  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");

  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalDenuncias, setTotalDenuncias] = useState(0);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Busca as denúncias no backend
  async function carregarDenuncias() {
    try {
      setLoading(true);
      setErro("");

      const resposta = await listarDenuncias(pagina, 10);

      setDenuncias(resposta.content);
      setTotalPaginas(resposta.totalPages);
      setTotalDenuncias(resposta.totalElements);

    } catch (error) {
      console.error("Erro ao buscar denúncias:", error);
      setErro("Não foi possível carregar as denúncias.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDenuncias();
  }, [pagina]);

  // Atualiza o status de uma denúncia
  async function alterarStatus(
    id: number,
    novoStatus: StatusDenuncia
  ) {
    try {
      const denunciaAtualizada = await atualizarStatusDenuncia(
        id,
        novoStatus
      );

      setDenuncias((anteriores) =>
        anteriores.map((denuncia) =>
          denuncia.id === id ? denunciaAtualizada : denuncia
        )
      );

    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Não foi possível atualizar o status.");
    }
  }

  // Pesquisa e filtros
  const denunciasFiltradas = denuncias.filter((denuncia) => {
    const correspondePesquisa =
      denuncia.nomeUsuario.toLowerCase().includes(search.toLowerCase()) ||
      denuncia.email.toLowerCase().includes(search.toLowerCase()) ||
      denuncia.endereco.toLowerCase().includes(search.toLowerCase());

    const correspondeStatus =
      statusFilter === "TODOS" ||
      denuncia.status === statusFilter;

    return correspondePesquisa && correspondeStatus;
  });

  // Indicadores da página atual
  const abertas = denuncias.filter(
    (d) => d.status === "ABERTA"
  ).length;

  const emAndamento = denuncias.filter(
    (d) => d.status === "EM_ANDAMENTO"
  ).length;
 

  return (
    <DashboardLayout>
      <PageContainer>
        <PageHeader>
          <h1>Dashboard</h1>
        </PageHeader>

        {/* Indicadores */}
        <StatsContainer>
          <StatCard>
            <StatIcon $color="#d5f5f2">
              <FiUsers />
            </StatIcon>

            <StatInfo>
              {/* <span>Denúncias abertas</span>
              <strong>25</strong> */}
              <span>Denúncias abertas</span>
              <strong>{abertas}</strong> 
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="#d5f5f2">
              <FiCheckCircle />
            </StatIcon>

            <StatInfo>
              <span>Em andamento</span>
              <strong>{emAndamento}</strong>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="#d5f5f2">
              <FiMonitor />
            </StatIcon>

            <StatInfo>
              {/* <span>Total de denúncias</span>
              <strong>367</strong> */}
              <span>Total de denúncias</span>
              <strong>{totalDenuncias}</strong> 
            </StatInfo>
          </StatCard>
        </StatsContainer>

        {loading && <p>Carregando denúncias...</p>}
        {erro && <p>{erro}</p>}
        {!loading && !erro && (
          <TableWrapper>
            {/* Sua tabela atual */}
          </TableWrapper>
        )}

        {/* Tabela */}
        <TableCard>
          <TableHeader>
            <h2>Todas as denúncias</h2>

            <Filters>
              <SearchContainer>
                <FiSearch />

                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </SearchContainer>

              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="TODOS">Todos</option>
                <option value="ABERTA">Aberta</option>
                <option value="FECHADA">Fechada</option>
              </Select>
            </Filters>
          </TableHeader>

          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Endereço</th>
                  <th>Contato</th>
                  <th>Email</th>
                  {/* <th>Auxílio</th> */}
                  <th>Descrição</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {denunciasFiltradas.map((denuncia) => (
                  <tr key={denuncia.id}>
                    <td>{denuncia.nomeUsuario}</td>
                    <td>{denuncia.endereco || "Não informado"}</td>
                    <td>{denuncia.contato || "Não informado"}</td>
                    <td>{denuncia.email}</td>
                    <td>{denuncia.descricao || "Sem descrição"}</td>

                    <td>
                      <StatusSelect
                        value={denuncia.status}
                        onChange={(e) =>
                          alterarStatus(
                            denuncia.id,
                            e.target.value as StatusDenuncia
                          )
                        }
                      >
                        <option value="ABERTA">Aberta</option>
                        <option value="EM_ANDAMENTO">Em andamento</option>
                        <option value="FECHADA">Fechada</option>
                      </StatusSelect>
                    </td>
                  </tr>
                ))}

                {denunciasFiltradas.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <EmptyMessage>
                        Nenhuma denúncia encontrada.
                      </EmptyMessage>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableWrapper>

          <TableFooter>
           

            <span>
              Mostrando {denunciasFiltradas.length} de{" "}
              {totalDenuncias} denúncias
            </span>

            

            <Pagination>
              <PageButton
                disabled={pagina === 0}
                onClick={() => setPagina((p) => p - 1)}
              >
                {"<"}
              </PageButton>

              <span>
                Página {pagina + 1} de {totalPaginas}
              </span>

              <PageButton
                disabled={pagina + 1 >= totalPaginas}
                onClick={() => setPagina((p) => p + 1)}
              >
                {">"}
              </PageButton>
            </Pagination>
          </TableFooter>
        </TableCard>
      </PageContainer>
    </DashboardLayout>
  );
}

// ESTILIZAÇÃO

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PageHeader = styled.div`
  h1 {
    font-size: 1.4rem;
    color: #222;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 14px;
  padding: 20px 24px;

  display: flex;
  align-items: center;
  gap: 16px;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

const StatIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;

  background: ${({ $color }) => $color};
  color: #68bcb5;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.3rem;
  flex-shrink: 0;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-size: 0.75rem;
    color: #999;
  }

  strong {
    font-size: 1.25rem;
    color: #333;
  }
`;

const StatusSelect = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: white;
  color: #555;
  font-size: 0.7rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #b68ab0;
  }
`;

const TableCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 22px;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

  h2 {
    font-size: 0.95rem;
    color: #333;
  }

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  height: 36px;
  width: 180px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 0 10px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;

  color: #999;

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 0.75rem;
    color: #333;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Select = styled.select`
  height: 36px;
  padding: 0 12px;

  border: 1px solid #e5e5e5;
  border-radius: 8px;

  background: white;
  color: #777;
  font-size: 0.75rem;

  cursor: pointer;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 750px;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 0.68rem;
    font-weight: 500;
    color: #aaa;

    padding: 16px 10px;
    border-bottom: 1px solid #eee;
  }

  td {
    padding: 17px 10px;
    border-bottom: 1px solid #f0f0f0;

    font-size: 0.7rem;
    color: #444;
    white-space: nowrap;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span<{ $status: StatusDenuncia }>`
  display: inline-block;

  padding: 5px 12px;
  border-radius: 4px;

  font-size: 0.65rem;
  font-weight: 600;

  color: ${({ $status }) =>
    $status === "ABERTA" ? "#e03131" : "#008f72"};

  background: ${({ $status }) =>
    $status === "ABERTA" ? "#ffe5e5" : "#d5f5ec"};

  border: 1px solid
    ${({ $status }) =>
      $status === "ABERTA" ? "#ff9999" : "#8bdac6"};
`;

const EmptyMessage = styled.div`
  padding: 30px;
  text-align: center;
  color: #999;
`;

const TableFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  margin-top: 20px;

  span {
    color: #aaa;
    font-size: 0.68rem;
  }

  @media (max-width: 650px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 32px;
  height: 32px;

  border: none;
  border-radius: 5px;

  background: ${({ $active }) =>
    $active ? "#b68ab0" : "#f5f5f5"};

  color: ${({ $active }) =>
    $active ? "white" : "#777"};

  font-size: 0.7rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
