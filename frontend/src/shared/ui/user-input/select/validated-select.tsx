import LabeledSelect, {
  type LabeledSelectProps,
} from "@shared/ui/user-input/select/labeled-select";

interface ValidatedSelectProps extends LabeledSelectProps {
  error?: string;
}

export default function ValidatedSelect({
  error,
  ...props
}: ValidatedSelectProps) {
  return (
    <div className="flex flex-col">
      <LabeledSelect {...props} />
      <span className="text-red-400 dark:text-red-500">{error}</span>
    </div>
  );
}
