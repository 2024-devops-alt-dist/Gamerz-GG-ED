import { useAuth } from "@/context/AuthContext";
import AccountSettingsPage from "@/pages/account/components/AccountSettingsPage";

export default function AccountPage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex items-center² flex-col bg-backgroud p-6 w-full h-full">
      <h1 className="pl-6"> Mon compte</h1>
      <div className="w-full p-6 flex flex-col gap-3 h-full">
        {loading && <div>Chargement utilisateur...</div>}
        {!loading && !user && <div>Vous devez être connecté</div>}
        {!loading && user && <AccountSettingsPage />}
      </div>
    </div>
  );
}
