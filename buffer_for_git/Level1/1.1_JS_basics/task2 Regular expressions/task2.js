function Validator() {
    this.validateEmail = function (email) {
        return /^[a-zA-Z\d][a-zA-Z\d-.+]{1,19}@[\w.!$%&’*+/=?^_-]{1,15}\.[a-zA-Z]{1,5}$/.test(email);
    }

    this.validatePhone = function (phone) {
        return /^(?=(\+\d\d)?([\s-\(\)]*\d[\s-\(\)]*){10}$).{10,25}$/.test(phone);
    }

    this.validatePassword = function (password) {
        return /^(?=\w*[0-9])(?=\w*[a-z])(?=\w*[A-Z])\w{8,}$/.test(password);
    }
}

// testing...

let validator = new Validator();

function testEmailOutput(email) {
    console.log('validateEmail ' + validator.validateEmail(email) + ' ' + email);
}

function testPhoneOutput(phone) {
    console.log('validatePhone ' + validator.validatePhone(phone) + ' ' + phone);
}

function testPasswordOutput(password) {
    console.log('validatePassword ' + validator.validatePassword(password) + ' ' + password);
}

testEmailOutput('fi@secondpart.end'); //true
testEmailOutput('first-part@.se=cond%p.art.end'); //true
testEmailOutput('first.part@se=cond%part.r'); //true
testEmailOutput('f@secondart.end,'); //false
testEmailOutput('first-part@.se=cond@part.end'); //false
testEmailOutput('-firstpart@.se=cond%.enddeded'); //false
testEmailOutput('firs_tpart@.se.en'); //false
testEmailOutput('firstpart@.se.enddeded'); //false

testPhoneOutput('+38 (099) 567 8901'); //true
testPhoneOutput('+38 099 5 6 7 8 9  01'); //true
testPhoneOutput('(09-9) 567-890-1 '); //true
testPhoneOutput('--  (099) 567 890-1'); //true
testPhoneOutput('+38 (099) 567 8901 0'); //false
testPhoneOutput('+38 099 a0000000'); //false
testPhoneOutput('+38 (0989) 567 8901'); //false
testPhoneOutput('+48 (0989) 567 8901'); //false

testPasswordOutput('C00l_Pass'); //true
testPasswordOutput('SupperPas1'); //true
testPasswordOutput('Cool_pass'); //false
testPasswordOutput('C00l'); //false