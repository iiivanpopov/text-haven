"use client";

import FileContentTextarea from "@features/storage/ui/file-content-textarea";
import FileFormFields from "@features/storage/ui/file-form-fields";
import { useNewFileForm } from "@shared/hooks/new-file";

export default function NewFileForm() {
  const { form, onSubmit, folders, isError, isLoading } = useNewFileForm();
  const { handleSubmit, control } = form;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading storage</div>;

  return (
    <div className="mt-20 grid grid-cols-[2fr_7fr]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <FileFormFields
          control={control}
          FOLDERS={folders}
        />
      </form>
      <FileContentTextarea control={control} />
    </div>
  );
}
