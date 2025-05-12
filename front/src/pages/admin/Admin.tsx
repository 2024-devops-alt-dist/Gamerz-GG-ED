import { ReactElement, useState } from "react";
import AppSidebarAdmin from "@/components/sideBar/AppSidebarAdmin";

const AdminWrapper = () => {
  const [activeComponent, setActiveComponent] = useState<ReactElement | null>(
    null
  );

  return (
    <>
      <AppSidebarAdmin onSelectComponent={setActiveComponent} />
      <div className="flex flex-1 flex-col gap-4">
        {activeComponent ? (
          activeComponent
        ) : (
          <p>Sélectionnez un élément du menu</p>
        )}
      </div>
    </>
  );
};

export default AdminWrapper;
