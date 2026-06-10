import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { NewsCard } from "../components/NewsCard";
import styled from "styled-components";
import { createNews, deleteNews, getNews, updateNews, updateNewsHighlight } from "../../service/api";
import { EditNewsModal } from "../components/EdiitNewsModal";
import { DeleteNewsModal } from "../components/DeleteNewsModal";
import { CriarButton } from "../components/CriarButton";
import { CreateNewsModal } from "../components/CreateNews";
import { toast } from "react-toastify";


export interface News {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
  destaque: boolean;
  ativo: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}




export function Publicacoes() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDeleteNews, setSelectedDeleteNews] = useState<News | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleOpenEdit(item: News) {
  setSelectedNews(item);
  setIsEditModalOpen(true);
}

function handleCloseEdit() {
  setSelectedNews(null);
  setIsEditModalOpen(false);
}


  useEffect(() => {
    async function loadNews() {
      try {
        const data: PageResponse<News> = await getNews();

        setNews(data.content); 
      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  
 async function handleUpdateNews(data: News) {
  try {
    const updated = await updateNews(data.id, {
      titulo: data.titulo,
      descricao: data.descricao,
      imagem: data.imagem,
      link: data.link,
      destaque: data.destaque,
      ativo: data.ativo,
    });

    setNews((prev) =>
      prev.map((item) => (item.id === data.id ? updated : item))
    );

    handleCloseEdit();
  } catch (error) {
    console.error("Erro ao editar notícia:", error);
    alert("Erro ao editar notícia.");
  }
}


async function handleToggleDestaque(item: News) {
  try {
    const updated = await updateNewsHighlight(item);

    setNews((prev) =>
      prev.map((newsItem) =>
        newsItem.id === item.id ? updated : newsItem
      )
    );
  } catch (error) {
    console.error("Erro ao alterar destaque:", error);
    alert("Erro ao alterar destaque.");
  }
}

async function handleDeleteNews(item: News) {
  const confirmed = window.confirm(
    `Deseja realmente excluir a notícia "${item.titulo}"?`
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteNews(item.id);

    setNews((prev) =>
      prev.filter((newsItem) => newsItem.id !== item.id)
    );

    alert("Notícia excluída com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir notícia:", error);
    alert("Erro ao excluir notícia.");
  }
}

function handleOpenDelete(item: News) {
  setSelectedDeleteNews(item);
  setIsDeleteModalOpen(true);
}

function handleCloseDelete() {
  setSelectedDeleteNews(null);
  setIsDeleteModalOpen(false);
}

async function handleConfirmDelete() {
  if (!selectedDeleteNews) return;

  try {
    await deleteNews(selectedDeleteNews.id);

    setNews((prev) =>
      prev.filter((item) => item.id !== selectedDeleteNews.id)
    );

    handleCloseDelete();
  } catch (error) {
    console.error("Erro ao excluir notícia:", error);
    alert("Erro ao excluir notícia.");
  }
}

function handleOpenCreate() {
  setIsCreateModalOpen(true);
}

function handleCloseCreate() {
  setIsCreateModalOpen(false);
}

async function handleCreateNews(data: {
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
}) {
  try {
    const created = await createNews(data);

    setNews((prev) => [created, ...prev]);

    handleCloseCreate();
    toast.success("Informarção criada!");
  } catch (error) {
    console.error("Erro ao criar publicação:", error);
    toast.error("Erro ao criar!");
  }
}


  return (
    <DashboardLayout>
      <CriarButton onClick={handleOpenCreate} />
      {successMessage && (
        <SuccessMessage>
          {successMessage}
        </SuccessMessage>
      )}
      <CardsContainer>
        {loading ? (
          <p>Carregando notícias...</p>
        ) : (
          news.map((item) => (
            <NewsCard
              key={item.id}
              image={item.imagem}
              title={item.titulo}
              description={item.descricao}
              link={item.link}
              destaque={item.destaque}
              onToggleDestaque={() => handleToggleDestaque(item)}
              onEdit={() => handleOpenEdit(item)}
              onDelete={() => handleOpenDelete(item)}
            />
          ))
        )}
      </CardsContainer>
      {isCreateModalOpen && (
        <CreateNewsModal
          onClose={handleCloseCreate}
          onSave={handleCreateNews}
        />
      )}
      {isDeleteModalOpen && selectedDeleteNews && (
        <DeleteNewsModal
          news={selectedDeleteNews}
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      {isEditModalOpen && selectedNews && (
      <EditNewsModal
        news={selectedNews}
        onClose={handleCloseEdit}
        onSave={handleUpdateNews}
      />
    )}
    </DashboardLayout>
  );
}


export const CardsContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(
    auto-fit,
    minmax(280px, 1fr)
  );

  gap: 20px;
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;

  background: #5fd36a;
  color: white;

  padding: 14px 20px;
  border-radius: 10px;

  font-size: 0.9rem;
  font-weight: 600;

  box-shadow: 0 8px 24px rgba(95, 211, 106, 0.35);
`;