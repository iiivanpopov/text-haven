import $api from "@/api/api";
import { User } from "@models/User";
import { userSlice } from "@store/reducers/UserSlice";
import { AppDispatch } from "@store/store";

export const fetchUser = (id?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching());
    const response = await $api.get<{ user: User }>(
      `/api/user${id ? "/" + id : ""}`,
    );
    dispatch(userSlice.actions.userFetchingSuccess(response.data.user));
  } catch (e) {
    dispatch(userSlice.actions.userFetchingError(e));
  }
};
