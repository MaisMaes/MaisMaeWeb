import { DashboardLayout } from "../components/DashboardLayout";
import { NewsCard } from "../components/NewsCard";
import imagem from '../assets/imagem-mulher.png'
import styled from "styled-components";

export function Publicacoes() {
  return (
    <DashboardLayout>
      <CardsContainer>
        <NewsCard
          image={imagem}
          title="Título notícia"
        />

        <NewsCard
          image={imagem}
          title="Título notícia"
        />

        <NewsCard
          image={imagem}
          title="Título notícia"
        />
      </CardsContainer>
    
    </DashboardLayout>
  );
}


export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(320px, 1fr)
  );

  gap: 20px;
`;

// import "./Publicacoes.css";

// const noticias = [1, 2, 3];

// export function Publicacoes() {
//   return (
//     <div className="dashboard">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div>
//           <h1 className="logo">+Mães</h1>

//           <div className="user">
//             <div className="avatar">👩</div>

//             <div>
//               <h4>Aman Admin</h4>
//               <span>Admin</span>
//             </div>
//           </div>

//           <nav>
//             <ul>
//               <li>Dashboard</li>
//               <li>Denúncias</li>
//               <li className="active-menu">Publicações</li>
//               <li>Grupos</li>
//               <li>Perfil</li>
//             </ul>
//           </nav>
//         </div>

//         <button className="logout">
//           Log Out
//         </button>
//       </aside>

//       {/* Conteúdo */}
//       <main className="content">
//         <header className="top-menu">
//           <button>Home</button>
//           <button>Denúncias</button>
//           <button className="active">
//             Publicações
//           </button>
//           <button>Perfil</button>
//         </header>

//         <section className="publicacoes-box">
//           <div className="toolbar">
//             <button className="filtro-btn">
//               Filtros
//             </button>

//             <input
//               type="text"
//               placeholder="Pesquise..."
//             />

//             <button className="novo-btn">
//               Nova +
//             </button>
//           </div>

//           <div className="cards">
//             {noticias.map((item) => (
//               <article
//                 className="card"
//                 key={item}
//               >
//                 <img
//                   src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800"
//                   alt=""
//                 />

//                 <div className="card-body">
//                   <h2>Título notícia</h2>

//                   <div className="info">
//                     <span>15 Mar</span>
//                     <span>2 Views</span>
//                     <span>2 Likes</span>
//                   </div>

//                   <p>
//                     Lorem ipsum dolor sit amet,
//                     consectetur adipiscing elit.
//                     Curabitur tincidunt...
//                   </p>

//                   <div className="actions">
//                     <button className="editar">
//                       Editar
//                     </button>

//                     <button className="delete">
//                       🗑
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>

//           <div className="pagination">
//             <button>{"<"}</button>
//             <button className="page-active">
//               1
//             </button>
//             <button>2</button>
//             <button>3</button>
//             <button>{">"}</button>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }