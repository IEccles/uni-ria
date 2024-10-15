'use strict';

const Color = require('color')
require('dotenv').config();

function hex_to_rgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function hex_inverse_bw(hex) {
  let rgb = hex_to_rgb(hex);
  let luminance = (0.2126 * rgb["r"] + 0.7152 * rgb["g"] + 0.0722 * rgb["b"]);
  return (luminance < 140) ? "#ffffff" : "#000000";
}

const rooted_treasures = process.env.system_colour || "#29e810"

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./views/**/*.{html,hbs,hb,handlebars}', './public/**/*.js'],
  theme: {
    extend: {
      colors: {
        'rooted': rooted_treasures,
        'rooted-lighter': Color(rooted_treasures).lighten(0.5).rgb().string(),
        'rooted-foreground': hex_inverse_bw(rooted_treasures)
      }
    }
  },
  plugins: []
};
