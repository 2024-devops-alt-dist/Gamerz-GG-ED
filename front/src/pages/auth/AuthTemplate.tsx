import { ReactElement } from "react";

interface AuthTemplateProps {
  content: ReactElement;
}
const AuthTemplate = ({ content }: AuthTemplateProps) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full">{content}</div>
    </div>
  );
};

export default AuthTemplate;
