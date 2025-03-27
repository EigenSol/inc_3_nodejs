// api to get definitions of word
async function getDefinition(word) {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let data = await response.json();
    if (data['title'] == "No Definitions Found") {
        return undefined
    }
    return data
}

// input
let arg = process.argv[2]
if (! arg) {
    console.log('Expected a word as argument')
    console.log('Usage: node code.js [word]')
    process.exit(1)
}

// validation
let original_word = await getDefinition(arg)
if (! original_word) {
    console.log(arg, "is not a valid word")
    process.exit(1)
}

// checking
let reversed = arg.split('').reverse().join('')
let data = await getDefinition(reversed)

if (data) {
    console.log(arg, "is an emordnilap")
}
else {
    console.log(arg, "is not an emordnilap")
}