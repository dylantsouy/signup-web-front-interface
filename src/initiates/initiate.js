import * as localforage from "localforage";

export const LOCALFORAGE_INITIATE = () => {
  if (!require.cache[require.resolveWeak("localforage")]) {
    console.log(
      "Missing locaforage package, please refer https://github.com/localForage/localForage"
    );
  }

  /**
   * driver - set priority for local db egnine, in case browser doesn't support, will fallback one by one.
   */
  if (require.cache[require.resolveWeak("localforage")]) {
    localforage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ],
    });
  }
};
