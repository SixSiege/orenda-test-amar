/**
 * @param {number} x
 * @return {boolean}
 */

const isPalindrome = (x: Number) => {
    let stringNumber = x.toString();
    let newString = ""
    for(let i = stringNumber.length; i >= 0; i--) {
        newString += stringNumber.charAt(i)
    }
    
    if (newString == stringNumber) {
        return true;
    } else {
        return false;
    }
}

console.log(isPalindrome(121))
console.log(isPalindrome(-121))
console.log(isPalindrome(10))