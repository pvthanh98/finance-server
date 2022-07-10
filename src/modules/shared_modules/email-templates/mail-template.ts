export const MailTemplate = (title, body) => {
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
            <p>
                Thank you!
            </p>
            <p>
                Go to <a href="https://pvthanh98.github.io">Tp Site</a>
            </p>
        </div>
    </div>
</body>

</html>
    `
}