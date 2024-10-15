import passwordValidator from 'password-validator';
import * as emailValidator from 'email-validator';

// This function is used to validate an email, it checks if the email is a valid email address.
// package: https://www.npmjs.com/package/email-validator

export const validateEmail = (email) => {
    if (typeof email !== 'string') return false;
    return emailValidator.validate(email)
};

// This function is used to validate a password, it checks if the password meets the system wide 
// password schema. package: https://www.npmjs.com/package/password-validator

export const validatePassword = (password) => {
    const schema = new passwordValidator();

    schema
        .is().min(8)        // Minimum length 8
        .is().max(100)      // Maximum length 100
        .has().uppercase()  // Must have uppercase letters
        .has().lowercase()  // Must have lowercase letters
        .has().digits(1);   // Must have at least 2 digits

    return {
        pass: schema.validate(password),
        details: schema.validate(password, { details: true })
    };
}

// This regular expression is used to validate ISO 3166-1 alpha-2 country codes.

export const ISO31661Alpha2 = /^(A(D|E|F|G|I|L|M|N|O|R|S|T|Q|U|W|X|Z)|B(A|B|D|E|F|G|H|I|J|L|M|N|O|R|S|T|V|W|Y|Z)|C(A|C|D|F|G|H|I|K|L|M|N|O|R|U|V|X|Y|Z)|D(E|J|K|M|O|Z)|E(C|E|G|H|R|S|T)|F(I|J|K|M|O|R)|G(A|B|D|E|F|G|H|I|L|M|N|P|Q|R|S|T|U|W|Y)|H(K|M|N|R|T|U)|I(D|E|Q|L|M|N|O|R|S|T)|J(E|M|O|P)|K(E|G|H|I|M|N|P|R|W|Y|Z)|L(A|B|C|I|K|R|S|T|U|V|Y)|M(A|C|D|E|F|G|H|K|L|M|N|O|Q|P|R|S|T|U|V|W|X|Y|Z)|N(A|C|E|F|G|I|L|O|P|R|U|Z)|OM|P(A|E|F|G|H|K|L|M|N|R|S|T|W|Y)|QA|R(E|O|S|U|W)|S(A|B|C|D|E|G|H|I|J|K|L|M|N|O|R|T|V|Y|Z)|T(C|D|F|G|H|J|K|L|M|N|O|R|T|V|W|Z)|U(A|G|M|S|Y|Z)|V(A|C|E|G|I|N|U)|W(F|S)|Y(E|T)|Z(A|M|W))$/i;

export const isJson = (str) => {
    try {
        if (typeof str !== 'string') {
            JSON.parse(JSON.stringify(str));
        } else {
            JSON.parse(str);
        }
    } catch (e) {
        return false;
    }
    return true;
};
