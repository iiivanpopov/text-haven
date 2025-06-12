import type { Settings } from "@entities/settings/types";
import { $api } from "@shared/api";
import type { ApiResponse } from "@shared/types";

const settingsApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<ApiResponse<Settings>, void>({
      query: () => `/user/settings`,
    }),
    updateSettings: build.mutation<
      Settings,
      Partial<Settings>,
      ApiResponse<Settings>
    >({
      query: (user) => ({
        url: `/user/settings`,
        method: "PATCH",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useLazyGetSettingsQuery,
} = settingsApi;

export default settingsApi;
