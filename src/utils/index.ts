import { Types } from "mongoose";
import _ from "lodash";

// Hàm chuyển đổi id sang ObjectId của MongoDB
const convertToObjectIdMongodb = (id: string): Types.ObjectId => new Types.ObjectId(id);

// Hàm lấy thông tin từ đối tượng dựa trên các trường cần lấy
const getInfoData = <T>({ fields = [], object }: { fields: string[]; object: T }): Partial<T> => {
    return _.pick(object, fields);
};

// Hàm tạo đối tượng select cho MongoDB
const getSelectData = (select: string[] = []): Record<string, number> => {
    return Object.fromEntries(select.map((el) => [el, 1]));
};

// Hàm tạo đối tượng unselect cho MongoDB
const unGetSelectData = (select: string[] = []): Record<string, number> => {
    return Object.fromEntries(select.map((el) => [el, 0]));
};

// Hàm loại bỏ các giá trị undefined và null khỏi đối tượng
const removeUndefinedObject = (obj: Record<string, any>): Record<string, any> => {
    Object.keys(obj).forEach((k) => {
        if (obj[k] == null) {
            delete obj[k];
        }
    });

    return obj;
};

// Hàm phân tích và cập nhật các đối tượng lồng nhau
const updateNestedObjectParser = (obj: Record<string, any>): Record<string, any> => {
    const final: Record<string, any> = {};
    Object.keys(obj).forEach((k) => {
        if (typeof obj[k] === "object" && !Array.isArray(obj[k])) {
            const response = updateNestedObjectParser(obj[k]);
            Object.keys(response).forEach((a) => {
                final[`${k}.${a}`] = response[a]; // sửa lại phần này
            });
        } else {
            final[k] = obj[k];
        }
    });
    return final;
};

export {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    updateNestedObjectParser,
    convertToObjectIdMongodb,
};
