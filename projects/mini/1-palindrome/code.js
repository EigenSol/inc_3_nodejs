// node code.js 12321
arg = process.argv[2]
if (! Number(arg)) {
    console.log(`Input ${arg} is not a number`)
    process.exit(1)
}

reversed = arg.split("").reverse().join("")
if (arg === reversed) {
    console.log(`${arg} is a palindrome`)
}
else {
    console.log(`${arg} is not a palindrome`)
}

// function reverse(string) {
//     reversed = ""
//     for (i = string.length-1; i >= 0; i--) {
//         reversed += string[i]
//     }
//     return reversed
// }

// length = arg.length
// slice = Math.floor(length / 2)

// if (length % 2 === 0) {
//     firstHalf = arg.slice(0, slice)
//     secondHalf = reverse(arg.slice(slice))
// }
// else {
//     firstHalf = arg.slice(0, slice+1)
//     secondHalf = reverse(arg.slice(slice))
// }


// console.log("First half: ", firstHalf)
// console.log("Second half: ", secondHalf)

// if (firstHalf === secondHalf) {
//     console.log(`${arg} is a palindrome`)
// }
// else {
//     console.log(`${arg} is not a palindrome`)
// }