import mushroom, { defineAsyncResource } from "mushroomjs";
import type {
  IMushroom,
  MushroomResourceBase,
  MushroomListResource,
  MushroomFindByIdResource,
} from "mushroomjs";
import * as AuthExtension from "mushroomjs-auth";
import * as FileExtension from "mushroomjs-file";
export * from "mushroomjs";
export const extensions = {
  File: FileExtension,
  Auth: AuthExtension,
};

export type ISODateValue = string | Date;
export type IdValue = string;

export interface User {
  id?: IdValue;
  disabled?: boolean;
  account?: string;
}
defineAsyncResource<User>({
  name: "user",
  actions: {
    findMany: { clientCache: true, includeTotal: true },
    findById: { clientCache: true },
  },
  views: {},
});
mushroom.$using("https://cloud-api.mongodb.siten.vn/api/mongocloud/v1/");

(function () {
  AuthExtension.useAuth(AuthExtension.AuthLocalStorage, mushroom);
  FileExtension.useFile(mushroom);
})();

export interface IApi extends IMushroom {
  user: MushroomResourceBase &
    MushroomListResource<User> &
    MushroomFindByIdResource<User>;
}

export type Api = AuthExtension.IMushroomAuth &
  FileExtension.IMushroomFile &
  IApi;

export default mushroom as Api;
