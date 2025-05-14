import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Setup from "./pages/ProfileSetup";
import ProtectedRoute from "./context/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";

import ThemesPage from "./pages/dashboard/ThemesPage";
import ProfileSettings from "./pages/dashboard/ProfileSettings";
import ListPages from "./pages/dashboard/pages/Listpages";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import PortfolioCard from "./pages/PortfolioCard";
import DashboardHelp from "./pages/DashHelp";

// import ProfileSettings from "./pages/dashboard/ProfileSettings";
// import ThemesPage from "./pages/dashboard/ThemesPage";
// import Analytics from "./pages/dashboard/Analytics";
// import ProfileSetup from "./pages/ProfileSetup";
// import DashboardLayout from "./components/dashboard/DashboardLayout";

// import LinksManagement from "./pages/dashboard/LinksManagement";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/setup"
              element={
                <ProtectedRoute>
                  <Setup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-page/:id"
              element={
                <ProtectedRoute>
                  <EditPage />
                </ProtectedRoute>
              }
            />
         
            <Route path="/" element={<Index />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />

              <Route path="pages">
                <Route path="" element={<ListPages />} />
                <Route
                  path="create"
                  element={
                    <ProtectedRoute>
                      <CreatePage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="themes" element={<ThemesPage />} />
              <Route path="profile" element={<ProfileSettings />} />

              <Route path="help" element={<DashboardHelp />} />
            </Route>

            <Route path="/:username" element={<PortfolioCard />} />
            <Route path="/:username/:slug" element={<PortfolioCard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
