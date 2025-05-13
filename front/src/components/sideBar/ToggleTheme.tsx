import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} className="mr-3">
      {theme === "dark" ? "Mode clair" : "Mode sombre"}
    </Button>
  );
};

export default ToggleTheme;
