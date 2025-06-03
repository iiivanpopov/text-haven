import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateFileMutation,
  useGetFoldersQuery,
} from "@features/storage/model/api";
import {
  EXPIRY_OPTIONS,
  EXPOSURES,
  TEXT_CATEGORIES,
} from "@shared/constants/input-fields";
import type { Exposure, SelectOptions, TextCategory } from "@shared/types";

export interface NewFileFields {
  folderId: string;
  exposure: Exposure;
  content: string;
  name: string;
  textCategory: TextCategory;
  expiresAt: string;
}

export const useNewFileForm = () => {
  const form = useForm<NewFileFields>({
    defaultValues: {
      folderId: "",
      exposure: EXPOSURES[0].value,
      content: "",
      name: "",
      textCategory: TEXT_CATEGORIES[0].value,
      expiresAt: EXPIRY_OPTIONS[0].value,
    },
  });

  const { data, isLoading, isError } = useGetFoldersQuery();
  const [createFile] = useCreateFileMutation();
  const router = useRouter();

  const folders: SelectOptions = useMemo(() => {
    if (!data) return [];
    return data.map((folder) => ({ name: folder.name, value: folder.id }));
  }, [data]);

  useEffect(() => {
    if (data) form.setValue("folderId", data[0].id);
  }, [data, form]);

  const onSubmit = async (data: NewFileFields) => {
    const response = await createFile({
      ...data,
      expiresAt: new Date(Date.now() + Number(data.expiresAt)).toISOString(),
    });
    if (!response.error) {
      router.push(`/text/${response.data.id}`);
    }
  };

  return { form, onSubmit, folders, isLoading, isError };
};
