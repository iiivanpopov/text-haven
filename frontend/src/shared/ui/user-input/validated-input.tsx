import LabeledInput, { type LabeledInputProps } from "./labeled-input";

type InputProps = LabeledInputProps & {
  error?: string;
};

export default function ValidatedInput({ error, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <LabeledInput {...props} />
      <span className="text-red-400 dark:text-red-500">{error}</span>
    </div>
  );
}
