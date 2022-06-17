"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const emailTemplate = (title, body) => {
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