export const SessionStorageUtil = {
  Get: <T>(collectionName: string) => JSON.parse(sessionStorage.getItem(collectionName)) as T,
  GetList: <T>(collectionName: string) => (JSON.parse(sessionStorage.getItem(collectionName)) as T[]) || [],
  Set: <T>(collectionName: string, value: T) => sessionStorage.setItem(collectionName, JSON.stringify(value)),
};
