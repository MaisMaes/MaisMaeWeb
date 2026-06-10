import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";
import { Publicacoes } from "../pages/Publicacoes";
import { Denuncias } from "../pages/Denuncias";
import { Grupos } from "../pages/Grupos";
import { Perfil } from "../pages/Perfil";
import { Login } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/cadastro"
          element={<Cadastro />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/denuncias"
          element={<Denuncias />}
        />

        <Route
          path="/publicacoes"
          element={<Publicacoes />}
        />

        <Route
          path="/grupos"
          element={<Grupos />}
        />

        <Route
          path="/perfil"
          element={<Perfil />}
        />
      </Routes>
    </BrowserRouter>
  );
}