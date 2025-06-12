import { type Control, Controller } from "react-hook-form";
import {
  EXPIRY_OPTIONS,
  EXPOSURES,
  TEXT_CATEGORIES,
} from "@shared/constants/input-fields";
import { NewFileFields } from "@shared/hooks/new-file";
import ValidatedInput from "@shared/ui/user-input/input/validated-input";
import ValidatedSelect from "@shared/ui/user-input/select/validated-select";
import Submit from "@shared/ui/user-input/submit";

export default function FileFormFields({
  control,
  FOLDERS,
}: {
  control: Control<NewFileFields>;
  FOLDERS: { name: string; value: string }[];
}) {
  return (
    <>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field, fieldState: { error } }) => (
          <ValidatedInput
            {...field}
            error={error?.message}
            placeholder="Enter a name"
          />
        )}
      />

      <div className="flex flex-wrap gap-4 justify-between">
        <Controller
          control={control}
          name="exposure"
          rules={{ required: "Exposure is required" }}
          render={({ field, fieldState: { error } }) => (
            <ValidatedSelect
              {...field}
              error={error?.message}
              options={EXPOSURES}
            />
          )}
        />
        <Controller
          control={control}
          name="expiresAt"
          rules={{ required: "Expiration is required" }}
          render={({ field, fieldState: { error } }) => (
            <ValidatedSelect
              {...field}
              error={error?.message}
              options={EXPIRY_OPTIONS}
            />
          )}
        />
        <Controller
          control={control}
          name="textCategory"
          rules={{ required: "Text category is required" }}
          render={({ field, fieldState: { error } }) => (
            <ValidatedSelect
              {...field}
              error={error?.message}
              options={TEXT_CATEGORIES}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="folderId"
        rules={{ required: "Folder is required" }}
        render={({ field, fieldState: { error } }) => (
          <ValidatedSelect
            {...field}
            error={error?.message}
            options={FOLDERS}
          />
        )}
      />

      <Submit />
    </>
  );
}
