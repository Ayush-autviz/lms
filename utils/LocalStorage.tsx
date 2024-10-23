import * as SecureStore from "expo-secure-store";
interface Storage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
export const Storage: Storage = {
  async getItem(key: string) {
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
    console.log(`${key} key Saved SuccessFully`);
  },
  async removeItem(key: string) {
    await SecureStore.deleteItemAsync(key);
    console.log(`${key} key Deleted SuccessFully`);
  },
};
