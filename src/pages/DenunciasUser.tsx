
import { useState } from "react";
import styled from "styled-components";
import {
  FiUsers,
  FiCheckCircle,
  FiFileText,
  FiSearch,
  FiMonitor,
} from "react-icons/fi";
import { DashboardLayout } from "../components/DashboardLayout";

type StatusDenuncia = "ABERTA" | "FECHADA";

interface Denuncia {
  id: number;
  usuario: string;
  endereco: string;
  contato: string;
  email: string;
  auxilio: string;
  status: StatusDenuncia;
}

// Dados fictícios para desenvolver a interface
const denunciasMock: Denuncia[] = [
  {
    id: 1,
    usuario: "Jane Cooper",
    endereco: "Rua tal, 25",
    contato: "(206) 555-0100",
    email: "jane.cooper@email.com",
    auxilio: "Sim",
    status: "FECHADA",
  },
  {
    id: 2,
    usuario: "Floyd Miles",
    endereco: "Rua tal",
    contato: "(206) 555-0199",
    email: "floyd.miles@email.com",
    auxilio: "Sim",
    status: "ABERTA",
  },
  {
    id: 3,
    usuario: "Ronald Richards",
    endereco: "Rua Adélia",
    contato: "(206) 555-0177",
    email: "ronald.richards@email.com",
    auxilio: "Sim",
    status: "ABERTA",
  },
  {
    id: 4,
    usuario: "Marvin McKinney",
    endereco: "Rua Tupã",
    contato: "(206) 555-0125",
    email: "marvin@email.com",
    auxilio: "Não",
    status: "FECHADA",
  },
  {
    id: 5,
    usuario: "Cody Fisher",
    endereco: "Av. Brasil, 120",
    contato: "(206) 555-0145",
    email: "cody@email.com",
    auxilio: "Sim",
    status: "ABERTA",
  },
  {
    id: 6,
    usuario: "Esther Howard",
    endereco: "Rua das Flores",
    contato: "(206) 555-0160",
    email: "esther@email.com",
    auxilio: "Não",
    status: "FECHADA",
  },
];

export function DenunciasUser() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");

  // Filtra os registros de acordo com a pesquisa e o status
  const denunciasFiltradas = denunciasMock.filter((denuncia) => {
    const correspondePesquisa =
      denuncia.usuario.toLowerCase().includes(search.toLowerCase()) ||
      denuncia.email.toLowerCase().includes(search.toLowerCase()) ||
      denuncia.endereco.toLowerCase().includes(search.toLowerCase());

    const correspondeStatus =
      statusFilter === "TODOS" ||
      denuncia.status === statusFilter;

    return correspondePesquisa && correspondeStatus;
  });

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
              <span>Denúncias abertas</span>
              <strong>25</strong>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="#d5f5f2">
              <FiCheckCircle />
            </StatIcon>

            <StatInfo>
              <span>Denúncias analisadas</span>
              <strong>100</strong>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon $color="#d5f5f2">
              <FiMonitor />
            </StatIcon>

            <StatInfo>
              <span>Total de denúncias</span>
              <strong>367</strong>
            </StatInfo>
          </StatCard>
        </StatsContainer>

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
                  <th>Auxílio</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {denunciasFiltradas.map((denuncia) => (
                  <tr key={denuncia.id}>
                    <td>{denuncia.usuario}</td>
                    <td>{denuncia.endereco}</td>
                    <td>{denuncia.contato}</td>
                    <td>{denuncia.email}</td>
                    <td>{denuncia.auxilio}</td>

                    <td>
                      <StatusBadge $status={denuncia.status}>
                        {denuncia.status === "ABERTA"
                          ? "Aberta"
                          : "Fechada"}
                      </StatusBadge>
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
              {denunciasMock.length} denúncias
            </span>

            <Pagination>
              <PageButton disabled>{"<"}</PageButton>
              <PageButton $active>1</PageButton>
              <PageButton>2</PageButton>
              <PageButton>3</PageButton>
              <span>...</span>
              <PageButton>40</PageButton>
              <PageButton>{">"}</PageButton>
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
