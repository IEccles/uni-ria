// This function is used to add the class "required-label" to labels that link
// to required inputs, this is so we can add required indicators to labels.

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[required]').forEach(function (input) {
        const id = input.getAttribute('id');
        const label = document.querySelector(`label[for="${id}"]`);
        if (!label) return;
        label.classList.add('required-label');
    });
});

function english_ordinal_suffix(dt) {
    return dt.getDate() +
        (dt.getDate() % 10 === 1 && dt.getDate() !== 11 ? 'st' :
            (dt.getDate() % 10 === 2 && dt.getDate() !== 12 ? 'nd' :
                (dt.getDate() % 10 === 3 && dt.getDate() !== 13 ? 'rd' : 'th')));
}

function formatCurrency(amount, currency = 'GBP') {

    if (amount === undefined || amount < 0) return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency }).format(0);

    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency }).format(amount);
}

function addAlpha(color, opacity) {
    var _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

function iso2FlagEmoji(iso) {
    if (iso === undefined || iso === null) return '';
    if (iso.length !== 2) return '';
    return String.fromCodePoint(...[...iso.toUpperCase()].map(char => char.charCodeAt(0) + 127397));
}

function isJson(str) {
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

function iso2Name(iso) {
    if (iso === undefined || iso === null) return '';
    if (iso.length !== 2) return '';
    try {
        let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        return regionNames.of(iso);
    } catch (error) {
        return iso
    }
}

function parsePercentage(num) {
    return (num === Infinity || isNaN(num)) ? 0 : num
}

class taxCalc {
    constructor(price_ex_tax, tax_rate, price_inc_tax) {
        this.price_ex_tax = document.querySelector(price_ex_tax);
        this.tax_rate = document.querySelector(tax_rate);
        this.price_inc_tax = document.querySelector(price_inc_tax);

        this.calc = this.calc.bind(this);
        this.init = this.init.bind(this);

        document.addEventListener('DOMContentLoaded', this.init);
    }

    calc() {
        if (this.tax_rate.value === '0') {
            this.price_inc_tax.value = this.price_ex_tax.value;
            return;
        }
        this.price_inc_tax.value = (parseFloat(this.price_ex_tax.value) + (parseFloat(this.price_ex_tax.value) * (parseFloat(this.tax_rate.value) / 100))).toFixed(2);
    }

    init() {
        this.price_ex_tax.addEventListener('input', this.calc);
        this.tax_rate.addEventListener('input', this.calc);
    }
}

function hexToComplimentary(hex) {

    // Convert hex to rgb
    // Credit to Denis http://stackoverflow.com/a/36253499/4939630
    var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function (l) { return parseInt(hex.length % 2 ? l + l : l, 16); }).join(',') + ')';

    // Get array of RGB values
    rgb = rgb.replace(/[^\d,]/g, '').split(',');

    var r = rgb[0], g = rgb[1], b = rgb[2];

    // Convert RGB to HSL
    // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2.0;

    if (max == min) {
        h = s = 0;  //achromatic
    } else {
        var d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));

        if (max == r && g >= b) {
            h = 1.0472 * (g - b) / d;
        } else if (max == r && g < b) {
            h = 1.0472 * (g - b) / d + 6.2832;
        } else if (max == g) {
            h = 1.0472 * (b - r) / d + 2.0944;
        } else if (max == b) {
            h = 1.0472 * (r - g) / d + 4.1888;
        }
    }

    h = h / 6.2832 * 360.0 + 0;

    // Shift hue to opposite side of wheel and convert to [0-1] value
    h += 180;
    if (h > 360) { h -= 360; }
    h /= 360;

    // Convert h s and l values into r g and b values
    // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    // Convert r b and g values to hex
    rgb = b | (g << 8) | (r << 16);
    return "#" + (0x1000000 | rgb).toString(16).substring(1);
}

// Colour lightening algorithms (Some nob has made it unreadable)

const pSBC = (p, c0, c1, l) => {
    let r, g, b, P, f, t, h, m = Math.round, a = typeof (c1) == "string";
    if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = pSBC.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? pSBC.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
    else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}

pSBC.pSBCr = (d) => {
    const i = parseInt;
    let n = d.length, x = {};
    if (n > 9) {
        const [r, g, b, a] = (d = d.split(','));
        n = d.length;
        if (n < 3 || n > 4) return null;
        x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
    } else {
        if (n == 8 || n == 6 || n < 4) return null;
        if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
        d = i(d.slice(1), 16);
        if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = Math.round((d & 255) / 0.255) / 1000;
        else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
    } return x
};