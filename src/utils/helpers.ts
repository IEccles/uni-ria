import { randomInt, createHash } from 'crypto';
import { config as dotenv } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import Settings from '../utils/settings'

dotenv();

interface HandlebarsBlock {
    fn: (index?: number) => string;
}

// This handlebars helper is used to repeat a block of code a specified number of times,
// this is useful when you need to generate a list of items or when you need to repeat
// a block of code a specified number of times. The helper takes two arguments, the first
// argument is the number of times the block of code should be repeated, and the second
// argument is the block of code that should be repeated. The block of code is repeated
// the specified number of times and the index of the current iteration is passed to the block.

function times(n: number, block: HandlebarsBlock) {
    let accum = '';
    for (let i = 0; i < n; ++i)
        accum += block.fn(i).replace(/<index>/g, i.toString());
    return accum;
}

// This handlebars helper is used to compare two values, this is useful when you need to
// compare two values and perform an action based on the result of the comparison. natively
// handlebars does not support comparison operators, this helper adds support for comparison
// operators in handlebars.

function eq(x, y) {
    return x === y;
}

// This handlebars helper is used to generate a random number between the specified minimum
// and maximum values, this is useful when you need to generate a random number within a
// specified range.

function random(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return randomInt(min, max + 1);
}

// This handlebars helper is used to generate a random id, this is useful when you need to
// generate a unique identifier for an element in the html. For example if you have 2 of the 
// same component in diffrence places on 1 page the javascript from the second component will 
// always targt hte first component because the id is the same. This helper will generate a
// random id for each component using uuidv4 and replace the <rid> in the block.

function randomId(block: HandlebarsBlock) {
    const randomId = uuidv4();
    return block.fn().replace(/<rid>/g, randomId)
}

// This handlebars helper is used to generate a random uuid, this is useful when you need to
// generate a unique identifier for an element in the html. The helper generates a random uuid
// and returns the uuid.

function uuidv4Helper() {
    return uuidv4();
}

// This handlebars helper is used to get the name of the currently logged in user, this is useful
// when you need to display the name of the currently logged in user in the html. The helper takes
// the request object as an argument and returns the name of the currently logged in user.

function getUserName() {
    if (!this.req) {
        console.error('You forgot to pass the request object to the helper')
        return 'You forgot to pass the request object to the helper'
    }

    const user = this.req.session.user;
    return `${user.firstName} ${user.lastName}`;
}

// This handlebars helper is used to get the email of the currently logged in user, this is useful
// when you need to display the email of the currently logged in user in the html. The helper takes
// the request object as an argument and returns the email of the currently logged in user.

function getUserEmail() {
    if (!this.req) {
        console.error('You forgot to pass the request object to the helper')
        return 'You forgot to pass the request object to the helper'
    }

    const user = this.req.session.user;
    return user.email;
}

// This handlebars helper is used to check if the currently logged in user is an admin, this is useful
// when you need to perform actions based on the role of the currently logged in user. The helper takes
// the request object as an argument and returns true if the currently logged in user is an admin, and
// false if the currently logged in user is not an admin.

function isUserAdmin() {
    if (!this.req) {
        console.error('You forgot to pass the request object to the helper')
        return 'You forgot to pass the request object to the helper'
    }

    const user = this.req.session.user;
    return user.roles.includes('admin');
}

// This handlebars helper is used to get the profile picture of the currently logged in user, this is useful
// when you need to display the profile picture of the currently logged in user in the html. The helper takes
// the request object as an argument and returns the profile picture of the currently logged in user, using
// the gravatar service to generate/fetch the profile picture.

function getUserProfilePicture() {
    if (!this.req) {
        console.error('You forgot to pass the request object to the helper')
        return 'You forgot to pass the request object to the helper'
    }

    const user = this.req.session.user;
    const hash = createHash('sha256').update(user.email).digest('hex')
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

// This function is used to encode a string to base64url, this is useful when you need to encode a string
// to base64url. The function takes a string as an argument and returns the base64url encoded string.

function base64url(str) {
    return Buffer.from(str).toString('base64url');
}

async function currency_code() {

    const currencyCode = await Settings('currency_iso_4217')

    if (currencyCode === null) {
        return 'GBP'
    }

    return currencyCode
}

async function currency_symbol() {

    const currencyCode = await Settings('currency_iso_4217')

    if (currencyCode === null) {
        return '£'
    }

    const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode.toString() });
    const parts = format.formatToParts(123);
    let symbol;

    for(let i=0; i<parts.length; i++) {
        if(parts[i].type === "currency") {
        symbol = parts[i].value;
        break;
        }
    }

    return symbol
}

export default async () => {
    return {
        times,
        eq,
        random,
        randomId,
        uuidv4: uuidv4Helper,
        base64url,
    
        getUserName,
        getUserEmail,
        getUserProfilePicture,
        isUserAdmin,
    
        currency_code: await currency_code(),
        currency_symbol: await currency_symbol(),
    
        // Some useful variables that can be used in the application
        // these variables are used to store configuration values that
        // are used throughout the application, such as the name of the
        // system, the domain of the system, and the environment of the
        // application.
    
        inProd: () => process.env.NODE_ENV === 'production',
        systemDomain: () => process.env.system_domain ?? 'rooted-treasures.co.uk',
        systemName: () => process.env.system_name || 'Rooted Treasures',
        systemColour: () => process.env.system_colour || '#29e810',
    }
}