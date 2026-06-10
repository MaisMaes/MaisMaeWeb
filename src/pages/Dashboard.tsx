// import "./Dashboard.css";

import mulher from "../assets/imagem-mulher.png";
import arow from "../assets/arow.png";


import { DashboardLayout } from "../components/DashboardLayout";
import styled from "styled-components";


export function Dashboard() {
  return (
    <DashboardLayout>
      <Banner>
        <ArrowLeft
          src={arow}
          alt=""
        />

        <ArrowRight
          src={arow}
          alt=""
        />

        <BannerText>
          <h1>
            Principal Publicação no APP
          </h1>

          <p>Texto texto texto</p>

          <p>
            is simply dummy text of the
            printing and typesetting
            industry. Lorem Ipsum has been
            the industry's standard dummy
            text ever since the 1500s...
          </p>
        </BannerText>

        <WomanImage
          src={mulher}
          alt="Mulher"
        />
      </Banner>
    </DashboardLayout>
  );
}



export const Banner = styled.section`
  position: relative;

  background: #6d9db2;

  border-radius: 12px;

  min-height: 500px;

  padding: 50px;

  overflow: hidden;

  display: flex;
  align-items: center;
`;

export const BannerText = styled.div`
  max-width: 600px;

  z-index: 2;

  h1 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    color: white;
    line-height: 1.8;
  }
`;

export const WomanImage = styled.img`
  position: absolute;

  right: 20px;
  top: 0;

  height: 100%;

  object-fit: contain;
`;

export const ArrowLeft = styled.img`
  position: absolute;

  left: 50px;
  top: 20px;

  width: 120px;

  opacity: 0.8;
`;

export const ArrowRight = styled.img`
  position: absolute;

  right: 450px;
  top: 180px;

  width: 120px;

  transform: rotate(180deg);

  opacity: 0.8;
`;

// export function Dashboard() {
//   return (
//     <div className="dashboard">
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
//               <li>Publicações</li>
//               <li>Grupos</li>
//               <li>Perfil</li>
//             </ul>
//           </nav>
//         </div>

//         <button className="logout">
//           Log Out
//         </button>
//       </aside>

//       <main className="content">
//         <header className="top-menu">
//           <button className="active">Home</button>
//           <button>Denúncias</button>
//           <button>Publicações</button>
//           <button>Perfil</button>
//         </header>

//         <section className="banner">
//           <img
//             src={arow}
//             alt=""
//             className="arrow-left"
//           />

//           <img
//             src={arow}
//             alt=""
//             className="arrow-right"
//           />

//           <div className="banner-text">
//             <h1>Principal Publicação no APP</h1>

//             <p>Texto texto texto</p>

//             <p>
//               is simply dummy text of the printing and
//               typesetting industry. Lorem Ipsum has
//               been the industry's standard dummy text
//               ever since the 1500s...
//             </p>
//           </div>

//           <img
//             src={mulher}
//             alt="Mulher"
//             className="woman"
//           />
//         </section>
//       </main>
//     </div>
//   );
// }