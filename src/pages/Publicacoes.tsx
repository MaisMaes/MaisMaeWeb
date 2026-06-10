import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { NewsCard } from "../components/NewsCard";
import styled from "styled-components";
import { getNews, updateNews } from "../../service/api";
import { EditNewsModal } from "../components/EdiitNewsModal";


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



  return (
    <DashboardLayout>
      <CardsContainer>
        {loading ? (
          <p>Carregando notícias...</p>
        ) : (
          news.map((item) => (
            // <NewsCard
            //   key={item.id}
            //   image={item.imagem}
            //   title={item.titulo}
            //   description={item.descricao}
            //   link={item.link}
            // />
            // <NewsCard
            //   key={item.id}
            //   id={item.id}
            //   image={item.imagem}
            //   title={item.titulo}
            //   description={item.descricao}
            //   link={item.link}
            //   destaque={item.destaque}
            //   ativo={item.ativo}
            //   onEdit={() => handleOpenEdit(item)}
            // />
            <NewsCard
              key={item.id}
              image={item.imagem}
              title={item.titulo}
              description={item.descricao}
              link={item.link}
              onEdit={() => handleOpenEdit(item)}
            />
          ))
        )}
      </CardsContainer>
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


//0p2
// export const CardsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//   gap: 20px;

//   align-items: stretch;
// `;

export const CardsContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(
    auto-fit,
    minmax(280px, 1fr)
  );

  gap: 20px;
`;