var lovesayQuotes;

// define default
var lovesayColors = {
    "catppuccin" : {
        "colorOne": "#F28FAD",
        "colorTwo": "#DDB6F2",
        "colorThree": "#96CDFB",
        "colorFour": "#ABE9B3",
        "colorFive": "#F8BD96",
        "colorSix": "#FAE3B0",
        "fg": "#D9E0EE"
    },
};

async function lovesayFetch(quotes_url, colors_url) {
    if (quotes_url) {
        await fetch(quotes_url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                lovesayQuotes = data;
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
    }
    
    if (colors_url) {
        await fetch(colors_url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                lovesayColors = data;
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
    }
}

function format_quote(quote, heartOneStyle, quoteStyle) {
    let quoteList = ["", "", "", "", ""];
    let heart = "🤍";

    if (quote != '') {
        if (quote.length < 80) {
            quoteList[0] = `<span ${heartOneStyle}>${heart}</span><span ${quoteStyle}> ${quote} </span><span ${heartOneStyle}>${heart}<\span>`;
        }
        else {
            let split = quote.match(/([\s\S]{1,80})(?=\b)/g);
    
            if (split.length > quoteList.length) {
                console.log("lovesay.js Error: Quote exceeds 5*80 character limit.");
            }
            else {
                for (let i = 0; i < split.length; i++) {
                    quoteList[i] = `<span ${heartOneStyle}>${heart}</span><span ${quoteStyle}> ${split[i]} </span><span ${heartOneStyle}>${heart}<\span>`;
                }
            }
        }
    }

    return quoteList
}

function lovesay(quote, theme='catppuccin') {
    let colorscheme = lovesayColors[theme];

    if (quote == '' && lovesayQuotes) {
        quote = lovesayQuotes[Math.floor(Math.random() * lovesayQuotes.length)];
    }

    let heart = "🤍";
    let heartOneStyle = `style='color: transparent; text-shadow: 0 0 0 ${colorscheme['colorOne']}';`
    let heartTwoStyle = `style='color: transparent; text-shadow: 0 0 0 ${colorscheme['colorTwo']}';`
    let heartThreeStyle = `style='color: transparent; text-shadow: 0 0 0 ${colorscheme['colorThree']}';`
    let heartFourStyle = `style='color: transparent; text-shadow: 0 0 0 ${colorscheme['colorFour']}';`
    let heartFiveStyle = `style='color: transparent; text-shadow: 0 0 0 ${colorscheme['colorFive']}';`
    let heartSixStyle = `style='color: transparent; text-shadow: 0 0 0 ${colorscheme['colorSix']}';`

    let quoteStyle = `style='font-family: initial; color: ${colorscheme['fg']}';`

    let quoteList = format_quote(quote, heartOneStyle, quoteStyle);

    let div = document.createElement('div');
    div.style = `white-space: pre-wrap; font-family:monospace; font-size: 1em; line-height: 75%; margin: 2em; padding: 0.5em; border-radius: 5px; display: inline-block; background-color: #000000`;

    div.innerHTML = `<p><span ${heartOneStyle}>   ${heart} ${heart}    ${heart} ${heart}   </span></p>` +
    `<p><span ${heartTwoStyle}> ${heart}      ${heart}      ${heart}     </span>${quoteList[0]}</p>` +
    `<p><span ${heartThreeStyle}>  ${heart}            ${heart}      </span>${quoteList[1]}</p>` +
    `<p><span ${heartFourStyle}>    ${heart}        ${heart}        </span>${quoteList[2]}</p>` +
    `<p><span ${heartFiveStyle}>      ${heart}    ${heart}          </span>${quoteList[3]}</p>` +
    `<p><span ${heartSixStyle}>         ${heart}            </span>${quoteList[4]}</p>`;

    // return text as HTML for viewport
    return div;
}