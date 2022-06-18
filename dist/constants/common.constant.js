"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseByCategoryIndexEnmum = exports.FoodCategoryHttp = exports.PaginationConstant = exports.LogFrom = exports.LogType = exports.LOG_CONTENT = void 0;
exports.LOG_CONTENT = {
    PING: "Ping count: "
};
var LogType;
(function (LogType) {
    LogType["PING"] = "PING";
    LogType["UNKNOW"] = "UNKNOW";
})(LogType = exports.LogType || (exports.LogType = {}));
var LogFrom;
(function (LogFrom) {
    LogFrom["GUEST"] = "GUEST";
})(LogFrom = exports.LogFrom || (exports.LogFrom = {}));
var PaginationConstant;
(function (PaginationConstant) {
    PaginationConstant[PaginationConstant["DEFAULT_PAGE"] = 1] = "DEFAULT_PAGE";
    PaginationConstant[PaginationConstant["DEFAULT_LIMIT"] = 8] = "DEFAULT_LIMIT";
    PaginationConstant[PaginationConstant["DEFAULT_OFFSET"] = 0] = "DEFAULT_OFFSET";
})(PaginationConstant = exports.PaginationConstant || (exports.PaginationConstant = {}));
var FoodCategoryHttp;
(function (FoodCategoryHttp) {
    FoodCategoryHttp["FOOD"] = "food";
    FoodCategoryHttp["PETROL"] = "petrol";
    FoodCategoryHttp["ENTERTAINMENT"] = "entertainment";
    FoodCategoryHttp["PARTY"] = "party";
    FoodCategoryHttp["GIVING"] = "giving";
    FoodCategoryHttp["RENTAL_FEE"] = "rental_fee";
    FoodCategoryHttp["SHOPPING"] = "shopping";
    FoodCategoryHttp["OTHERS"] = "others";
})(FoodCategoryHttp = exports.FoodCategoryHttp || (exports.FoodCategoryHttp = {}));
const ExpenseByCategoryIndexEnmum = (category) => {
    switch (category) {
        case FoodCategoryHttp.FOOD:
            return {
                LOAD_CELL: "A4:D100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "A",
                COLUMN_2: "B",
                COLUMN_3: "C",
                COLUMN_4: "D",
            };
        case FoodCategoryHttp.PETROL:
            return {
                LOAD_CELL: "F4:I100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "F",
                COLUMN_2: "G",
                COLUMN_3: "H",
                COLUMN_4: "I",
            };
        case FoodCategoryHttp.ENTERTAINMENT:
            return {
                LOAD_CELL: "K4:N100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "K",
                COLUMN_2: "L",
                COLUMN_3: "M",
                COLUMN_4: "N",
            };
        case FoodCategoryHttp.PARTY:
            return {
                LOAD_CELL: "P4:S100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "P",
                COLUMN_2: "Q",
                COLUMN_3: "R",
                COLUMN_4: "S",
            };
        case FoodCategoryHttp.GIVING:
            return {
                LOAD_CELL: "U4:X100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "U",
                COLUMN_2: "V",
                COLUMN_3: "W",
                COLUMN_4: "X",
            };
        case FoodCategoryHttp.RENTAL_FEE:
            return {
                LOAD_CELL: "Z4:AC100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "Z",
                COLUMN_2: "AA",
                COLUMN_3: "AB",
                COLUMN_4: "AC",
            };
        case FoodCategoryHttp.SHOPPING:
            return {
                LOAD_CELL: "AE4:AH100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "AE",
                COLUMN_2: "AF",
                COLUMN_3: "AG",
                COLUMN_4: "AH",
            };
        case FoodCategoryHttp.OTHERS:
            return {
                LOAD_CELL: "AJ4:AM100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "AJ",
                COLUMN_2: "AK",
                COLUMN_3: "AL",
                COLUMN_4: "AM",
            };
        default:
            return {
                LOAD_CELL: "A4:D100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "A",
                COLUMN_2: "B",
                COLUMN_3: "C",
                COLUMN_4: "D",
            };
    }
};
exports.ExpenseByCategoryIndexEnmum = ExpenseByCategoryIndexEnmum;
//# sourceMappingURL=common.constant.js.map