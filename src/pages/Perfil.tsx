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

// export function Perfil() {
//   return (
//     <DashboardLayout>
//       <ProfileContainer>
//         <ProfileCard>
//           <EditButton>
//             ✏️ Editar
//           </EditButton>

//           <Avatar />

//           <Field>
//             <Label>Nome completo</Label>
//             <Value>Aman Admin</Value>
//           </Field>

//           <Field>
//             <Label>Email</Label>
//             <Value>
//               Aman.Admin@email.com
//             </Value>
//           </Field>

//           <Field>
//             <Label>Senha</Label>
//             <Value>••••••••••••••</Value>
//           </Field>

//           <Field>
//             <Label>Confirmar senha</Label>
//             <Value>••••••••••••••</Value>
//           </Field>
//         </ProfileCard>
//       </ProfileContainer>
//     </DashboardLayout>
//   );
// }


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
              </Field>
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

export const ProfileCard = styled.div`
  width: 100%;
  max-width: 650px;

  background: white;

  border-radius: 12px;

  padding: 40px;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0 2px 8px
    rgba(0, 0, 0, 0.08);
`;

export const EditButton = styled.button`
  position: absolute;

  top: 20px;
  right: 20px;

  border: none;
  background: transparent;

  cursor: pointer;

  font-weight: 600;
  color: #555;

  transition: 0.2s;

  &:hover {
    color: #d764c8;
  }
`;

// export const Avatar = styled.div`
//   width: 110px;
//   height: 110px;

//   border-radius: 50%;

//   background: #fbbc04;

//   margin-bottom: 20px;
// `;

export const Avatar = styled.div`
  width: 110px;
  height: 110px;

  border-radius: 50%;

  background: #fbbc04;
  color: #ffffff;

  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2.5rem;
  font-weight: 700;
`;

export const Field = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const Label = styled.p`
  color: #777;
  font-size: 0.85rem;
`;

export const Value = styled.h3`
  color: #222;
  font-weight: 700;
`;