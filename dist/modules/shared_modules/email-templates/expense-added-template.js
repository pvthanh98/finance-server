"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseAddedEmailTemplate = void 0;
const expenseAddedEmailTemplate = (title, body) => {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TP Site</title>
            <style>
                .body{
                    display: flex;
                    justify-content: center;
                }
                #customers {
                    font-family: Arial, Helvetica, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                  }
                  
                  #customers td, #customers th {
                    border: 1px solid #ddd;
                    padding: 8px;
                  }
                  
                  #customers tr:nth-child(even){background-color: #f2f2f2;}
                  
                  #customers tr:hover {background-color: #ddd;}
                  
                  #customers th {
                    padding-top: 12px;
                    padding-bottom: 12px;
                    text-align: left;
                    background-color: #04AA6D;
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
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td>Germany</td>
                    </tr>
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
exports.expenseAddedEmailTemplate = expenseAddedEmailTemplate;
//# sourceMappingURL=expense-added-template.js.map