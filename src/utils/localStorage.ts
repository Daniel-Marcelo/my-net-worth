export const LocalStorageUtil = {
  DoUse: () => window.location.href.includes("local=true"),
  Get: <T>(collectionName: string) => JSON.parse(localStorage.getItem(collectionName)) as T,
  GetList: <T>(collectionName: string) => (JSON.parse(localStorage.getItem(collectionName)) as T[]) || [],
  Set: <T>(collectionName: string, value: T) => localStorage.setItem(collectionName, JSON.stringify(value)),
};
