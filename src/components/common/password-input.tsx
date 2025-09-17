import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PasswordInput({ value, onValueChange }: { value: string; onValueChange: (_v: string) => void }) {
  const [revealPassword, setRevealPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={revealPassword ? "text" : "password"}
        className="pr-11"
        value={value}
        onChange={(e) => onValueChange(e.currentTarget.value)}
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-1 bottom-0 hover:bg-transparent"
        onClick={() => setRevealPassword((v) => !v)}
      >
        {revealPassword ? <EyeIcon /> : <EyeClosedIcon />}
      </Button>
    </div>
  );
}
