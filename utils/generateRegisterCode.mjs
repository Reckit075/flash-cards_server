export default () => {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let signs = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm',]
    let code = ''

    for (let i = 0; i < 8; i++) {
        const randomNumber = Math.floor(Math.random() * 2)

        let codeSigns
        if (randomNumber == 0) {
            codeSigns = numbers
        } else {
            codeSigns = signs
        }

        const i = Math.floor(Math.random() * codeSigns.length)
        const sign = codeSigns[i]

        code += sign
    }
    console.log(code)

    return code
}