import Button from "@components/shared/Button";
import { Check, Wrench } from "lucide-react";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

const ChangeModeBtn = ({
  mode,
  onClick,
  className,
}: {
  className?: string;
  mode: "edit" | "read";
  onClick: () => void;
}) => (
  <Button
    name="Configure"
    className={twMerge("w-48", className)}
    onClick={() => {
      if (mode == "edit") {
        console.log("Some save logic");
      }
      onClick();
    }}
  >
    {mode == "read" ? <Wrench size={32} /> : <Check size={32} />}
  </Button>
);

export default memo(ChangeModeBtn);
