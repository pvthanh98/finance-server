export const LOG_CONTENT = {
    PING: "Ping count: "
}

export enum LogType {
    PING = "PING",
    UNKNOW = "UNKNOW",
}

export enum LogFrom {
    GUEST = "GUEST",
}

export enum PaginationConstant {
    DEFAULT_PAGE = 1,
    DEFAULT_LIMIT = 8,
    DEFAULT_OFFSET = 0
}

export enum FoodCategoryHttp {
    /// for fetch API only, not using for DB value
    FOOD = 'food',
    PETROL = 'petrol',
    ENTERTAINMENT = "entertainment",
    PARTY = 'party',
    GIVING = 'giving',
    RENTAL_FEE = 'rental_fee',
    SHOPPING = 'shopping',
    OTHERS = 'others'
}

export const ExpenseByCategoryIndexEnmum = (category: FoodCategoryHttp) => {
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
            }
        case FoodCategoryHttp.PETROL:
            return {
                LOAD_CELL: "F4:I100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "F",
                COLUMN_2: "G",
                COLUMN_3: "H",
                COLUMN_4: "I",
            }

        case FoodCategoryHttp.ENTERTAINMENT:
            return {
                LOAD_CELL: "K4:N100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "K",
                COLUMN_2: "L",
                COLUMN_3: "M",
                COLUMN_4: "N",
            }

        case FoodCategoryHttp.PARTY:
            return {
                LOAD_CELL: "P4:S100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "P",
                COLUMN_2: "Q",
                COLUMN_3: "R",
                COLUMN_4: "S",
            }

        case FoodCategoryHttp.GIVING:
            return {
                LOAD_CELL: "U4:X100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "U",
                COLUMN_2: "V",
                COLUMN_3: "W",
                COLUMN_4: "X",
            }

        case FoodCategoryHttp.RENTAL_FEE:
            return {
                LOAD_CELL: "Z4:AC100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "Z",
                COLUMN_2: "AA",
                COLUMN_3: "AB",
                COLUMN_4: "AC",
            }

        case FoodCategoryHttp.SHOPPING:
            return {
                LOAD_CELL: "AE4:AH100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "AE",
                COLUMN_2: "AF",
                COLUMN_3: "AG",
                COLUMN_4: "AH",
            }
        case FoodCategoryHttp.OTHERS:
            return {
                LOAD_CELL: "AJ4:AM100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "AJ",
                COLUMN_2: "AK",
                COLUMN_3: "AL",
                COLUMN_4: "AM",
            }

        default: 
            return {
                LOAD_CELL: "A4:D100",
                START_ROW_INDEX: 4,
                END_ROW_INDEX: 100,
                COLUMN_1: "A",
                COLUMN_2: "B",
                COLUMN_3: "C",
                COLUMN_4: "D",
            }
    }
}