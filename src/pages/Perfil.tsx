import styled from "styled-components";
import { DashboardLayout } from "../components/DashboardLayout";
import { EditProfileModal } from "../components/EditProfileModal";
import { useEffect, useState } from "react";
import { getLoggedUser, updateUserProfile } from "../../service/api";
import { toast } from "react-toastify";

interface UserProfile {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  role: string;
}

import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiEdit2,
} from "react-icons/fi";


export function Perfil() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getLoggedUser();
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        toast.error("Erro ao carregar dados do perfil.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function handleUpdateProfile(data: {
    nome: string;
    telefone: string;
    senha?: string;
    email: string;
  }) {
    try {
      const updated = await updateUserProfile(data);

      setUser(updated);
      setIsEditModalOpen(false);

      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil.");
    }
  }

  return (
    <DashboardLayout>
      <ProfileContainer>
        <ProfileCard>
          {loading ? (
            <p>Carregando perfil...</p>
          ) : user ? (
            <>


          <EditButton onClick={() => setIsEditModalOpen(true)}>
            <FiEdit2 />
            Editar
          </EditButton>

          <ProfileHeader>
            <Avatar>
              {user.nome.charAt(0).toUpperCase()}
            </Avatar>

            <UserInfo>
              <h2>{user.nome}</h2>
              <span>{user.role}</span>
            </UserInfo>
          </ProfileHeader>

          <InfoGrid>
            <InfoItem>
              <IconBox>
                <FiUser />
              </IconBox>

              <div>
                <Label>Nome completo</Label>
                <Value>{user.nome}</Value>
              </div>
            </InfoItem>

            <InfoItem>
              <IconBox>
                <FiMail />
              </IconBox>

              <div>
                <Label>Email</Label>
                <Value>{user.email}</Value>
              </div>
            </InfoItem>

            <InfoItem>
              <IconBox>
                <FiPhone />
              </IconBox>

              <div>
                <Label>Telefone</Label>
                <Value>{user.telefone}</Value>
              </div>
            </InfoItem>

            <InfoItem>
              <IconBox>
                <FiShield />
              </IconBox>

              <div>
                <Label>Perfil</Label>
                <Value>{user.role}</Value>
              </div>
            </InfoItem>
          </InfoGrid>
            
              {/* <EditButton onClick={() => setIsEditModalOpen(true)}>
                ✏️ Editar
              </EditButton>

              <Avatar>{user.nome.charAt(0).toUpperCase()}</Avatar>

              <Field>
                <Label>Nome completo</Label>
                <Value>{user.nome}</Value>
              </Field>

              <Field>
                <Label>Email</Label>
                <Value>{user.email}</Value>
              </Field>

              <Field>
                <Label>Telefone</Label>
                <Value>{user.telefone}</Value>
              </Field>

              <Field>
                <Label>Perfil</Label>
                <Value>{user.role}</Value>
              </Field> */}
            </>
          ) : (
            <p>Não foi possível carregar o perfil.</p>
          )}
        </ProfileCard>
      </ProfileContainer>

      {isEditModalOpen && user && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateProfile}
        />
      )}
    </DashboardLayout>
  );
}

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

// export const ProfileCard = styled.div`
//   width: 100%;
//   max-width: 650px;

//   background: white;

//   border-radius: 12px;

//   padding: 40px;

//   position: relative;

//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   box-shadow: 0 2px 8px
//     rgba(0, 0, 0, 0.08);
// `;

// export const EditButton = styled.button`
//   position: absolute;

//   top: 20px;
//   right: 20px;

//   border: none;
//   background: transparent;

//   cursor: pointer;

//   font-weight: 600;
//   color: #555;

//   transition: 0.2s;

//   &:hover {
//     color: #d764c8;
//   }
// `;


// export const Avatar = styled.div`
//   width: 110px;
//   height: 110px;

//   border-radius: 50%;

//   background: #fbbc04;
//   color: #ffffff;

//   margin-bottom: 20px;

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   font-size: 2.5rem;
//   font-weight: 700;
// `;

export const Field = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

// export const Label = styled.p`
//   color: #777;
//   font-size: 0.85rem;
// `;

// export const Value = styled.h3`
//   color: #222;
//   font-weight: 700;
// `;


export const ProfileCard = styled.div`
  width: 100%;
  max-width: 720px;
  background: white;
  border-radius: 18px;
  padding: 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
`;

export const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #d764c8, #65d3d4);
  padding: 38px 40px;
  display: flex;
  align-items: center;
  gap: 22px;
`;

export const Avatar = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: white;
  color: #d764c8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  font-weight: 800;
`;

export const UserInfo = styled.div`
  h2 {
    color: white;
    font-size: 1.7rem;
    margin-bottom: 6px;
  }

  span {
    background: rgba(255, 255, 255, 0.22);
    color: white;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
  }
`;

export const InfoGrid = styled.div`
  padding: 34px 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-radius: 14px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
`;

export const IconBox = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(215, 100, 200, 0.12);
  color: #d764c8;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.2rem;
  }
`;

export const Label = styled.p`
  color: #777;
  font-size: 0.78rem;
  margin-bottom: 4px;
`;

export const Value = styled.h3`
  color: #222;
  font-size: 0.98rem;
  font-weight: 700;
`;

export const EditButton = styled.button`
  position: absolute;
  top: 22px;
  right: 24px;
  z-index: 2;
  border: none;
  background: white;
  color: #d764c8;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;