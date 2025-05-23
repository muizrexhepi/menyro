import { QrCode } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <QrCode className="size-6" />
      <span className="font-serif font-bold text-xl">Menyro</span>
    </div>
  );
};
