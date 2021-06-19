import {BaseStore} from "@/pages/store";

export class HomeStore{
    baseStore: BaseStore;
    constructor(baseStore: BaseStore) {
      this.baseStore = baseStore;
    }
}
