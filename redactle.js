// ==UserScript==
// @name         Redacted Length Tooltip on Redactle
// @namespace    http://tampermonkey.net/
// @author       Jordan Lozinski
// @version      0.1
// @description  Adds a hover tool-tip which shows the length of redacted words on redactle.com
// @include      https://www.redactle.com/*
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

function r() {
    'use strict';
    var redacteds = $('.baffled');
    redacteds.each(function() {
        var len = $(this).text().length + "";
        $(this).append(`<span class="tooltiptext">${len}</span>`)
    });

    var style = $('<style id="tooltipstyle" type="text/css">.baffled{ background-color: rgba(0,0,0,0) !important; position: relative; } .baffled .tooltiptext {visibility: hidden;background-color: #6289ff;color: #fff; font-style: normal;text-align: center;border-radius: 6px;padding: 5px 0;position: absolute;z-index: 1;padding: 0 10px 0 10px;bottom: 50%;left: 50%;transform: translate(-50%, 0%);} .baffled:hover .tooltiptext {visibility: visible;} .display-length{ font-size: 25px; padding: 0 10px;}</style>');
    $('html > head').append(style);

    // Slow solution that works
    /* $('.baffled').mouseenter(function () {
        $(this).children('.tooltiptext').css({"visibility": "visible"});
    }).mouseleave(function() {
        $(this).children('.tooltiptext').css({"visibility": "hidden"});
    }); */

    var input_row = $('.input-group');
    var length_section = $('<div class="display-length"></div>');
    input_row.append(length_section);

    $(".input-group input").on('input', function (e) {
        var val = $(this).val();
        if (val.length > 0) {
            length_section.html("length: " + val.length);
        } else {
            length_section.html("");
        }
        // Display the length of the word in the text input (trimmed) next to the text box in Redactle
    });

}

setTimeout(r, 5000);
