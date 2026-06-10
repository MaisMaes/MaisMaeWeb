import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiTrash2, FiUsers, FiLock, FiUnlock } from "react-icons/fi";
import { toast } from "react-toastify";
import { DashboardLayout } from "../components/DashboardLayout";
import { getGroups, deleteGroup } from "../../service/api";
import { DeleteGroupModal } from "../components/DeleteGroupModal";

interface Grupo {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  nomeCriador: string;
  privado: boolean;
  numeroParticipantes: number;
  qtdParticipantesAtual: number;
  bairros: string[];
}

export function Grupos() {
  const [groups, setGroups] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Grupo | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    async function loadGroups() {
      try {
        const data = await getGroups();
        setGroups(data);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
        toast.error("Erro ao carregar grupos.");
      } finally {
        setLoading(false);
      }
    }

    loadGroups();
  }, []);

  async function handleDeleteGroup(group: Grupo) {
    const confirmed = window.confirm(
      `Deseja realmente excluir o grupo "${group.titulo}"?`
    );

    if (!confirmed) return;

    try {
      await deleteGroup(group.id);

      setGroups((prev) =>
        prev.filter((item) => item.id !== group.id)
      );

      toast.success("Grupo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir grupo:", error);
      toast.error("Erro ao excluir grupo.");
    }
  }

  function handleOpenDelete(group: Grupo) {
  setSelectedGroup(group);
  setIsDeleteModalOpen(true);
}

function handleCloseDelete() {
  setSelectedGroup(null);
  setIsDeleteModalOpen(false);
}

async function handleConfirmDelete() {
  if (!selectedGroup) return;

  try {
    await deleteGroup(selectedGroup.id);

    setGroups((prev) =>
      prev.filter((item) => item.id !== selectedGroup.id)
    );

    handleCloseDelete();
    toast.success("Grupo excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir grupo:", error);
    toast.error("Erro ao excluir grupo.");
  }
}

  return (
    <DashboardLayout>
      <PageHeader>
        <div>
          <h1>Grupos temáticos</h1>
          <p>Visualize e gerencie os grupos cadastrados.</p>
        </div>
      </PageHeader>

      <TableCard>
        {loading ? (
          <Loading>Carregando grupos...</Loading>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Grupo</th>
                <th>Categoria</th>
                <th>Criador</th>
                <th>Participantes</th>
                <th>Privacidade</th>
                <th>Bairros</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td>
                    <GroupInfo>
                      <strong>{group.titulo}</strong>
                      <span>{group.descricao}</span>
                    </GroupInfo>
                  </td>

                  <td>{group.categoria}</td>

                  <td>{group.nomeCriador}</td>

                  <td>
                    <Participants>
                      <FiUsers />
                      {group.qtdParticipantesAtual}/{group.numeroParticipantes}
                    </Participants>
                  </td>

                  <td>
                    <PrivacyBadge $private={group.privado}>
                      {group.privado ? <FiLock /> : <FiUnlock />}
                      {group.privado ? "Privado" : "Público"}
                    </PrivacyBadge>
                  </td>

                  <td>
                    {group.bairros?.length
                      ? group.bairros.join(", ")
                      : "-"}
                  </td>

                  <td>
                    <DeleteButton
                      type="button"
                      onClick={() => handleOpenDelete(group)}
                    >
                      <FiTrash2 />
                      Excluir
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableCard>
      {isDeleteModalOpen && selectedGroup && (
      <DeleteGroupModal
        group={selectedGroup}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    )}
    </DashboardLayout>
  );
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

const Loading = styled.p`
  color: #777;
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

const GroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: #222;
    font-size: 0.9rem;
  }

  span {
    color: #777;
    font-size: 0.78rem;
    max-width: 260px;
  }
`;

const Participants = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: #6b9eb3;
  font-weight: 700;
`;

const PrivacyBadge = styled.span<{ $private: boolean }>`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  padding: 6px 10px;
  border-radius: 999px;

  font-size: 0.75rem;
  font-weight: 700;

  color: ${({ $private }) => ($private ? "#b45309" : "#047857")};
  background: ${({ $private }) => ($private ? "#fef3c7" : "#d1fae5")};
`;

const DeleteButton = styled.button`
  border: 1px solid #ff6b6b;
  background: #fff0f0;
  color: #e03131;

  height: 34px;
  padding: 0 12px;

  border-radius: 8px;

  display: flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;
  font-weight: 700;
  font-size: 0.8rem;

  transition: 0.2s;

  &:hover {
    background: #ff6b6b;
    color: #ffffff;
  }
`;