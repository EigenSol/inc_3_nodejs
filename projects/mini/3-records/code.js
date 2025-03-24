const os_path = require("path");
const fs = require("fs");


function readFile(path) {
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            console.log("Error reading file", err)
            process.exit(1)
        }
        rows = data.split("\r\n").map(row => row.split(","))
        n = rows[0].length
        for (let i=1; i<6; i++) {
            for (j=0; j<n; j++) {
                process.stdout.write(rows[0][j] + ": " + rows[i][j] + ", ")
            }
            console.log()      
        }
    })
}

path = os_path.join(__dirname, "USERS.csv")
readFile(path)