import {BaseStore} from "@/pages/store";

export class DeviceStore{
  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }
}
