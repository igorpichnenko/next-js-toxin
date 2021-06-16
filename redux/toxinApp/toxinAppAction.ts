import ActionTypeLoading from './toxinAppActionTypes';

interface IActionSetAppLoading {
  type: ActionTypeLoading.SET_PAGE_LOADER;
  payload: boolean;
}

interface IActionSetHydration {
  type: ActionTypeLoading.SET_PAGE_HYDRATION;
  payload: boolean;
}

const setPageLoading = (payload: boolean): IActionSetAppLoading => ({
  type: ActionTypeLoading.SET_PAGE_LOADER,
  payload,
});

const setPageHydration = (payload: boolean): IActionSetHydration => ({
  type: ActionTypeLoading.SET_PAGE_HYDRATION,
  payload,
});

export type ActionLoading = IActionSetAppLoading | IActionSetHydration;
export type { IActionSetAppLoading, IActionSetHydration };
export { setPageLoading, setPageHydration };
