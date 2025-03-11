import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean; // Rend la prop optionnelle
}

const PasswordField = ({
  showPassword = true,
  ...props
}: PasswordFieldProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  function handleClick() {
    setChecked((prev) => !prev);
  }

  return (
    <div className="flex relative">
      <Input
        type={showPassword || !checked ? "password" : "text"}
        placeholder="Mot de passe"
        {...props}
      />
      {!showPassword &&
        (checked ? (
          <Eye
            onClick={handleClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        ) : (
          <EyeOff
            onClick={handleClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        ))}
    </div>
  );
};

export default PasswordField;
