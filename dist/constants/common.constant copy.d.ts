export declare const LOG_CONTENT: {
    PING: string;
};
export declare enum LogType {
    PING = "PING",
    UNKNOW = "UNKNOW"
}
export declare enum LogFrom {
    GUEST = "GUEST"
}
export declare enum PaginationConstant {
    DEFAULT_PAGE = 1,
    DEFAULT_LIMIT = 8,
    DEFAULT_OFFSET = 0
}
export declare enum FoodCategoryHttp {
    FOOD = "food",
    PETROL = "petrol",
    ENTERTAINMENT = "entertainment",
    PARTY = "party",
    GIVING = "giving",
    RENTAL_FEE = "rental_fee",
    SHOPPING = "shopping",
    OTHERS = "others"
}
export declare const ExpenseByCategoryIndexEnmum: (category: FoodCategoryHttp) => {
    LOAD_CELL: string;
    START_ROW_INDEX: number;
    END_ROW_INDEX: number;
    COLUMN_1: string;
    COLUMN_2: string;
    COLUMN_3: string;
    COLUMN_4: string;
};
