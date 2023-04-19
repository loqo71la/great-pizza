export abstract class StorageUtil {

  static toLocal(key: string, data: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }

  static fromLocal(key: string): any {
    let data = null;
    try {
      const value = window.localStorage.getItem(key);
      if (value != null) {
        data = JSON.parse(value);
      }
    } catch (error) {
      console.error(error);
    }
    return data;
  }
}