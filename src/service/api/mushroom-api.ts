import mushroom, { defineAsyncResource } from "mushroomjs";
import type { IMushroom, MushroomRequest, MushroomResponse, MushroomResourceBase, MushroomListResource, MushroomCountResource, MushroomFindByIdResource, MushroomCreateResource, MushroomPartialUpdateResource, MushroomDeleteResource } from "mushroomjs";

import * as AuthExtension from "mushroomjs-auth";
import * as FileExtension from "mushroomjs-file";
export * from "mushroomjs";
export const extensions = {
    File: FileExtension,
    Auth: AuthExtension
};

export type ISODateValue = string | Date;
export type IdValue = string;

export interface CustomMethodRequest<TParam extends Record<string, unknown>, TBody> extends MushroomRequest {
  params?: TParam;
  body?: TBody;
}

export interface CustomMethodParamsRequest<TParam extends Record<string, unknown>> extends MushroomRequest {
  params?: TParam;
}

export interface CustomMethodBodyRequest<TBody> extends MushroomRequest {
  body?: TBody;
}

export interface Service_group {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Mã nhóm dịch vụ công cha
     */
    parent_id?: IdValue | null;
    /**
     * Đường dẫn nhóm dịch vụ
     */
    route?: string | null;
    /**
     * Tên nhóm dịch vụ công
     */
    name?: string | null;
    /**
     * Mã ảnh icon của nhóm
     */
    icon_id?: IdValue | null;
    /**
     * Thứ tự sắp xếp
     */
    index?: number | null;
}

defineAsyncResource<Service_group>({"name":"service_group","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{},"deleteOne":{}},"views":{}});

export interface Service {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Mã nhóm dịch vụ công
     */
    group_id?: IdValue | null;
    /**
     * Đường dẫn dịch vụ
     */
    route?: string | null;
    /**
     * Mã dịch vụ công (trên cổng dịch vụ công)
     */
    code?: string | null;
    /**
     * Tên dịch vụ công
     */
    name?: string | null;
    /**
     * Thứ tự sắp xếp
     */
    index?: number | null;
    /**
     * Template thông tin tư vấn
     */
    consulting_template?: Service_Consulting_template | null;
}

export interface Service_Consulting_template {
    /**
     * Mô tả ngắn gọn về dịch vụ
     */
    description?: string | null;
    /**
     * Tóm tắt ngắn
     */
    summary?: string | null;
    /**
     * Chuẩn bị trước khi thực hiện
     */
    preparation?: string | null;
    /**
     * Mức độ đáp ứng của dịch vụ: trực tuyến, toàn trình (online) hoặc trực tiếp, một phần (onsite)
     */
    type?: string | null;
    /**
     * Danh sách các bước thực hiện
     */
    progress?: string | null;
    /**
     * Phí, lệ phí (nếu có)
     */
    fee?: string | null;
    /**
     * Lưu ý quan trọng
     */
    note?: string | null;
    /**
     * Lưu ý quan trọng
     */
    checklist?: string | null;
}

defineAsyncResource<Service>({"name":"service","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{},"deleteOne":{}},"views":{}});

export interface Session {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Mã cccd
     */
    id_number?: string | null;
    /**
     * Họ và tên
     */
    full_name?: string | null;
    /**
     * Thông tin thẻ cccd. Định dạng json
     */
    card_info?: string | null;
    /**
     * Dữ liệu tư vấn. Định dạng json
     */
    consuting_info?: string | null;
    /**
     * Mã dịch vụ công
     */
    service_id?: IdValue | null;
    /**
     * Thông tin phiếu in Số thứ tự
     */
    ticket?: Session_Ticket | null;
    /**
     * Ngày phục vụ
     */
    date?: ISODateValue | null;
    /**
     * Các thông tin thời điểm
     */
    time?: Session_Time | null;
}

export interface Session_Ticket {
    /**
     * Số thứ tự trong ngày
     */
    index?: number | null;
    /**
     * Đã in phiếu
     */
    printed?: boolean | null;
    /**
     * Thời điểm in phiếu
     */
    time?: ISODateValue | null;
}

export interface Session_Time {
    /**
     * Thời điểm bắt đầu phục vụ
     */
    start?: ISODateValue | null;
}

export interface Session_Get_ticket_indexResult {
    /**
     * Số thứ tự tiếp theo
     */
    index: number;
    /**
     * Ngày phục vụ
     */
    day: ISODateValue;
}

export interface Session_Get_ticket_indexRequest {
    /**
     * Mã session
     */
    id: string;
}

export interface Session$CustomMethodResource {
    get_ticket_indexAsync: (request: CustomMethodBodyRequest<Session_Get_ticket_indexRequest>) => Promise<MushroomResponse<Session_Get_ticket_indexResult>>;
}
defineAsyncResource<Session>({"name":"session","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{},"deleteOne":{},"_raw_http_method_get_ticket_index":{}},"views":{}});

export interface System_config {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Quy định khả năng truy cập giá trị cấu hình
     */
    scope?: string | null;
    /**
     * Các role cho phép truy xuất giá trị cấu hình
     */
    roles?: Array<string | null | undefined> | null;
    /**
     * Mã cấu hình
     */
    code?: string | null;
    /**
     * Giá trị cấu hình
     */
    value?: string | null;
    /**
     * Ghi chú
     */
    note?: string | null;
}

defineAsyncResource<System_config>({"name":"system_config","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{},"deleteOne":{}},"views":{}});

export interface Elevenlab {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
}

export interface Elevenlab_Get_signed_urlResult {
    /**
     * Signed url
     */
    url?: string | null;
}

export interface Elevenlab$CustomMethodResource {
    get_signed_urlAsync: (request: MushroomRequest) => Promise<MushroomResponse<Elevenlab_Get_signed_urlResult>>;
}
defineAsyncResource<Elevenlab>({"name":"elevenlab","actions":{"_raw_http_method_get_signed_url":{}},"views":{}});


mushroom.$using("https://kiosk-dvc-api.test2.siten.vn/api/kioskdvc/v1/");

(function(){
AuthExtension.useAuth(AuthExtension.AuthLocalStorage, mushroom);
FileExtension.useFile(mushroom);
})();

export interface IApi extends IMushroom {
    /**
     * Nhóm dịch vụ công
     */
    service_group: MushroomResourceBase & MushroomListResource<Service_group> & MushroomCountResource & MushroomFindByIdResource<Service_group> & MushroomCreateResource<Service_group> & MushroomPartialUpdateResource<Service_group> & MushroomDeleteResource,
    /**
     * Dịch vụ công
     */
    service: MushroomResourceBase & MushroomListResource<Service> & MushroomCountResource & MushroomFindByIdResource<Service> & MushroomCreateResource<Service> & MushroomPartialUpdateResource<Service> & MushroomDeleteResource,
    /**
     * Phiên phục vụ công dân
     */
    session: MushroomResourceBase & MushroomListResource<Session> & MushroomCountResource & MushroomFindByIdResource<Session> & MushroomCreateResource<Session> & MushroomPartialUpdateResource<Session> & MushroomDeleteResource & Session$CustomMethodResource,
    /**
     * Cấu hình hệ thống
     */
    system_config: MushroomResourceBase & MushroomListResource<System_config> & MushroomCountResource & MushroomFindByIdResource<System_config> & MushroomCreateResource<System_config> & MushroomPartialUpdateResource<System_config> & MushroomDeleteResource,
    /**
     * elevenlabs
     */
    elevenlab: MushroomResourceBase & Elevenlab$CustomMethodResource,
};

export type Api = AuthExtension.IMushroomAuth & FileExtension.IMushroomFile & IApi;

export default mushroom as Api;