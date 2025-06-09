import LabeledInput, {
  type LabeledInputProps,
} from "@shared/ui/user-input/input/labeled-input";

interface InputProps extends LabeledInputProps {
  error?: string;
}

export default function ValidatedInput({ error, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <LabeledInput {...props} />
      <span className="text-red-400 dark:text-red-500">{error}</span>
    </div>
  );
}
