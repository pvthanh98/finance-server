"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
function renderRow(expenses) {
    return expenses.map(expense => {
        return `
                <tr>
                    <td>${expense.date}</td>
                    <td>${expense.category}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.description}</td>
                </tr>
        `;
    }).join("");
}
const emailTemplate = (title, body, expenses) => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TP Site</title>
    <style>
        .body {
            display: flex;
            justify-content: center;
        }

        #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td,
        #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #customers tr:hover {
            background-color: #ddd;
        }

        #customers th {
            padding-top: 6px;
            padding-bottom: 6px;
            text-align: left;
            background-color: #04402a;
            color: white;
        }
    </style>
</head>

<body>
    <div class="body">
        <div>
            <p>
                ${title}
            </p>
            <p>
                ${body}
            </p>
            <table id="customers">
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                </tr>
                ${renderRow(expenses)}
            </table>
            <p>
                Thank you!
            </p>
            <p>
                Go to <a href="https://pvthanh98.github.com">Tp Site</a>
            </p>
        </div>
    </div>
</body>

</html>
    `;
};
exports.emailTemplate = emailTemplate;
//# sourceMappingURL=email-template.js.map