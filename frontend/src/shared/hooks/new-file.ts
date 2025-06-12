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
import toaster from "react-hot-toast";
import { responseIsError } from "@shared/lib/type-guards";

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
  const foldersData = data?.data;

  const [createFile] = useCreateFileMutation();
  const router = useRouter();

  const folders: SelectOptions = useMemo(() => {
    if (!foldersData) return [];
    return foldersData.map((folder) => ({
      name: folder.name,
      value: folder.id,
    }));
  }, [foldersData]);

  useEffect(() => {
    if (foldersData) form.setValue("folderId", foldersData[0].id);
  }, [foldersData, form]);

  const onSubmit = async (data: NewFileFields) => {
    const response = await createFile({
      ...data,
      expiresAt: new Date(Date.now() + Number(data.expiresAt)).toISOString(),
    });

    if (response.error) {
      if (responseIsError(response.error))
        toaster.error(`Failed to create file. ${response.error.data.message}`);
      return;
    }

    router.push(`/text/${response.data.data.id}`);
    toaster.success(`Created file "${data.name}"`);
  };

  return { form, onSubmit, folders, isLoading, isError };
};
