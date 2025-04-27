import type { Settings } from "@entities/settings/types";
import { $api } from "@shared/api";
import type { ApiResponse } from "@shared/types";

const settingsApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<Settings, void, ApiResponse<Settings>>({
      query: () => `/user/settings`,
      transformResponse: (response) => response.data,
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
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useLazyGetSettingsQuery,
} = settingsApi;

export default settingsApi;
