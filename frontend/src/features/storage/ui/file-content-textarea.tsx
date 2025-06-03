import { Controller } from "react-hook-form";
import Textarea from "@shared/ui/user-input/textarea";

export default function FileContentTextarea({ control }: { control: any }) {
  return (
    <Controller
      control={control}
      name="content"
      rules={{ required: "Content is required" }}
      render={({ field, fieldState: { error } }) => (
        <Textarea
          {...field}
          error={error?.message}
          className="p-2 h-full"
          placeholder="Enter your content"
        />
      )}
    />
  );
}
