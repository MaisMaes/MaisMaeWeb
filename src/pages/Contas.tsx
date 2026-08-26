
import { useEffect, useState } from "react";
import styled from "styled-components";


import {
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiXCircle,
  FiSlash,
} from "react-icons/fi";

import { changeAccountStatus } from "../../service/api";
import { toast } from "react-toastify";
import { DashboardLayout } from "../components/DashboardLayout";
import { getContas } from "../../service/api";


interface Conta {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: string;
  role: string;
}
 type StatusConta =
  | "ATIVADO"
  | "DESATIVADO"
  | "BANIDO"; 


export function Contas() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(true);


  async function handleChangeStatus(
  conta: Conta,
  novoStatus: StatusConta
) {
  try {
    await changeAccountStatus(
      conta.id,
      novoStatus
    );

    setContas((prev) =>
      prev.map((item) =>
        item.id === conta.id
          ? {
              ...item,
              status: novoStatus,
            }
          : item
      )
    );

    toast.success(
      `Status da conta de ${conta.nome} alterado com sucesso!`
    );
  } catch (error) {
    console.error(
      "Erro ao alterar status da conta:",
      error
    );

    toast.error(
      "Erro ao alterar status da conta."
    );
  }
}

  useEffect(() => {
    async function loadContas() {
      try {
        const data = await getContas();

        setContas(data);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);

        toast.error("Erro ao carregar contas.");
      } finally {
        setLoading(false);
      }
    }

    loadContas();
  }, []);

  return (
    <DashboardLayout>
      <PageHeader>
        <div>
          <h1>Gerenciamento de contas</h1>

          <p>
            Visualize e gerencie as contas cadastradas na plataforma.
          </p>
        </div>
      </PageHeader>

      <TableCard>
        {loading ? (
          <Loading>Carregando contas...</Loading>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Contato</th>
                <th>Perfil</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {contas.map((conta) => (
                <tr key={conta.id}>
                  <td>
                    <UserInfo>
                      <UserAvatar>
                        <FiUser />
                      </UserAvatar>

                      <div>
                        <strong>{conta.nome}</strong>

                        <span>ID: {conta.id}</span>
                      </div>
                    </UserInfo>
                  </td>

                  <td>
                    <ContactInfo>
                      <span>
                        <FiMail />
                        {conta.email}
                      </span>

                      <span>
                        <FiPhone />
                        {conta.telefone}
                      </span>
                    </ContactInfo>
                  </td>

                  <td>
                    <RoleBadge>
                      {formatRole(conta.role)}
                    </RoleBadge>
                  </td>

                  <td>
                    <StatusBadge
                      $status={conta.status}
                    >
                      {conta.status === "ATIVO" ? (
                        <FiCheckCircle />
                      ) : (
                        <FiXCircle />
                      )}

                      {formatStatus(conta.status)}
                    </StatusBadge>
                  </td>

                  <td>
                    <Actions>
                      {/* <ActivateButton
                        type="button"
                        title="Ativar conta"
                      >
                        <FiCheckCircle />
                      </ActivateButton> */}

                      <ActivateButton
                        type="button"
                        title="Ativar conta"
                        onClick={() =>
                          handleChangeStatus(
                            conta,
                            "ATIVADO"
                          )
                        }
                      >
                          <FiCheckCircle />
                      </ActivateButton>

                      {/* <DeactivateButton
                        type="button"
                        title="Desativar conta"
                      >
                        <FiXCircle />
                      </DeactivateButton> */}

                      <DeactivateButton
                        type="button"
                        title="Desativar conta"
                        onClick={() =>
                          handleChangeStatus(
                            conta,
                            "DESATIVADO"
                          )
                        }
                      >
                        <FiXCircle />
                      </DeactivateButton>

                      {/* <BanButton
                        type="button"
                        title="Banir usuário"
                      >
                        <FiSlash />
                      </BanButton> */}

                      <BanButton
                        type="button"
                        title="Banir usuário"
                        onClick={() =>
                          handleChangeStatus(
                            conta,
                            "BANIDO"
                          )
                        }
                      >
                        <FiSlash />
                      </BanButton>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableCard>
    </DashboardLayout>
  );
}




// function formatStatus(status: string) {
//   const statusMap: Record<string, string> = {
//     ATIVO: "Ativo",
//     DESATIVADO: "Desativado",
//     BANIDO: "Banido",
//   };

//   return statusMap[status] || status;
// }

function formatStatus(status: string) {
  const statusMap: Record<string, string> = {
    ATIVADO: "Ativado",
    DESATIVADO: "Desativado",
    BANIDO: "Banido",
  };

  return statusMap[status] || status;
}


function formatRole(role: string) {
  const roleMap: Record<string, string> = {
    MAE_SOLO: "Mãe Solo",
    ADMIN: "Administrador",
    USUARIO: "Usuário",
  };

  return roleMap[role] || role;
}

const PageHeader = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 1.4rem;
    color: #222;
    margin-bottom: 6px;
  }

  p {
    color: #777;
    font-size: 0.9rem;
  }
`;

const TableCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    font-size: 0.78rem;
    color: #aaa;
    font-weight: 600;
    padding: 14px 12px;
    border-bottom: 1px solid #eee;
  }

  td {
    padding: 18px 12px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
    font-size: 0.85rem;
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  strong {
    display: block;
    color: #222;
    margin-bottom: 4px;
  }

  span {
    color: #999;
    font-size: 0.72rem;
    max-width: 180px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const UserAvatar = styled.div`
  width: 38px;
  height: 38px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eef6f8;
  color: #6b9eb3;

  font-size: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;

    color: #666;
    font-size: 0.8rem;
  }

  svg {
    color: #6b9eb3;
  }
`;

const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;

  padding: 6px 10px;

  border-radius: 999px;

  background: #eef6f8;
  color: #4d7d90;

  font-size: 0.75rem;
  font-weight: 700;
`;


const Loading = styled.p`
  color: #777;
`;


const StatusBadge = styled.span<{ $status: string }>`
  width: fit-content;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 6px 10px;

  border-radius: 999px;

  font-size: 0.75rem;
  font-weight: 700;

  color: ${({ $status }) => {
    if ($status === "ATIVADO") return "#047857";

    if ($status === "DESATIVADO") return "#b45309";

    if ($status === "BANIDO") return "#b91c1c";

    return "#555";
  }};

  background: ${({ $status }) => {
    if ($status === "ATIVADO") return "#d1fae5";

    if ($status === "DESATIVADO") return "#fef3c7";

    if ($status === "BANIDO") return "#fee2e2";

    return "#f3f4f6";
  }};
`;

// const StatusBadge = styled.span<{ $status: string }>`
//   width: fit-content;

//   display: inline-flex;
//   align-items: center;
//   gap: 6px;

//   padding: 6px 10px;

//   border-radius: 999px;

//   font-size: 0.75rem;
//   font-weight: 700;

//   color: ${({ $status }) => {
//     if ($status === "ATIVO") return "#047857";

//     if ($status === "DESATIVADO") return "#b45309";

//     if ($status === "BANIDO") return "#b91c1c";

//     return "#555";
//   }};

//   background: ${({ $status }) => {
//     if ($status === "ATIVO") return "#d1fae5";

//     if ($status === "DESATIVADO") return "#fef3c7";

//     if ($status === "BANIDO") return "#fee2e2";

//     return "#f3f4f6";
//   }};
// `;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActivateButton = styled.button`
  width: 44px;
  height: 44px;

  border: 1px solid #86efac;
  background: #f0fdf4;
  color: #15803d;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #22c55e;
    color: white;
  }
`;

const DeactivateButton = styled.button`
  width: 44px;
  height: 44px;

  border: 1px solid #fcd34d;
  background: #fffbeb;
  color: #b45309;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #f59e0b;
    color: white;
  }
`;

const BanButton = styled.button`
  width: 44px;
  height: 44px;

  border: 1px solid #fca5a5;
  background: #fef2f2;
  color: #dc2626;

  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #dc2626;
    color: white;
  }
`;