function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


function stop(ms) {

    log(`Aguardando ${ms} ms...`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
            log("Fim!");

        }, ms);

    });
}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');







// constants for switch/case checking representation type
const HEX = 1;
const RGB = 2;
const RGBA = 3;

// get the string representation 
// type and set it on the element (HEX/RGB/RGBA)
function getType(val) {
    if (val.indexOf('#') > -1) return HEX;
    if (val.indexOf('rgb(') > -1) return RGB;
    if (val.indexOf('rgba(') > -1) return RGBA;
}

// process the value irrespective of representation type
function processValue(el) {
    switch (el.dataType) {
        case HEX:
            {
                return processHEX(el.value);
            }
        case RGB: {
            return processRGB(el.value);
        }
        case RGBA: {
            return processRGB(el.value);
        }

    }
}

//return a workable RGB int array [r,g,b] from rgb/rgba representation
function processRGB(val) {
    var rgb = val.split('(')[1].split(')')[0].split(',');
    alert(rgb.toString());
    return [
        parseInt(rgb[0], 10),
        parseInt(rgb[1], 10),
        parseInt(rgb[2], 10)
    ];
}

//return a workable RGB int array [r,g,b] from hex representation
function processHEX(val) {
    //does the hex contain extra char?
    var hex = (val.length > 6) ? val.substr(1, val.length - 1) : val;
    // is it a six character hex?
    if (hex.length > 3) {

        //scrape out the numerics
        var r = hex.substr(0, 2);
        var g = hex.substr(2, 2);
        var b = hex.substr(4, 2);

        // if not six character hex,
        // then work as if its a three character hex
    } else {

        // just concat the pieces with themselves
        var r = hex.substr(0, 1) + hex.substr(0, 1);
        var g = hex.substr(1, 1) + hex.substr(1, 1);
        var b = hex.substr(2, 1) + hex.substr(2, 1);

    }
    // return our clean values
    return [
        parseInt(r, 16),
        parseInt(g, 16),
        parseInt(b, 16)
    ]
}

function getRainbow(val1, val2, steps) {


    var val1RGB = processHEX(val1);
    var val2RGB = processHEX(val2);

    var colors = [
        // somewhere to dump gradient
    ];

    //the number of steps in the gradient
    var stepsInt = parseInt(steps, 10);
    //the percentage representation of the step
    var stepsPerc = 100 / (stepsInt + 1);

    // diffs between two values 
    var valClampRGB = [
        val2RGB[0] - val1RGB[0],
        val2RGB[1] - val1RGB[1],
        val2RGB[2] - val1RGB[2]
    ];

    // build the color array out with color steps
    for (var i = 0; i < stepsInt; i++) {
        var clampedR = (valClampRGB[0] > 0)
            ? pad((Math.round(valClampRGB[0] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
            : pad((Math.round((val1RGB[0] + (valClampRGB[0]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);

        var clampedG = (valClampRGB[1] > 0)
            ? pad((Math.round(valClampRGB[1] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
            : pad((Math.round((val1RGB[1] + (valClampRGB[1]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);

        var clampedB = (valClampRGB[2] > 0)
            ? pad((Math.round(valClampRGB[2] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
            : pad((Math.round((val1RGB[2] + (valClampRGB[2]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);
        colors[i] = [
            '#',
            clampedR,
            clampedG,
            clampedB
        ].join('');
    }

    return colors;

}
/**
 * padding function:
 * cba to roll my own, thanks Pointy!
 * ==================================
 * source: http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
 */
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


//Iniciar sort
async function start(btn) {

    const msSpeed = 6000;
    const quantity = $("#amount").val();
    const sortingType = $("#sortingType").val();

    let speed = $("#speed").val() ?? 5;

    log("Iniciando bubble sort: \n\n");
    log("Velocidade: \n\n");

    //inicia sort
    $("#amount").attr("disabled", true);
    $(btn).attr("disabled", true);


    //Gera números
    let list = [];

    for (var i = 1; i <= quantity; i++) {
        list.push(i);
    }

    //Renderiza ordenado para que o degrade fique correto
    renderList(list, true);

    //Embaralha lista
    list = shuffle(list);

    //Renderiza novamente embaralhado
    renderList(list);

    $("#sort-container").show();


    switch (sortingType) {
        case SortTypes.Bubble:
            await startBubbleSort(list, msSpeed);

        case SortTypes.Selection:
            await startSelectionSort(list, msSpeed);            

        default:
    }

    $("#amount").attr("disabled", false);
    $(btn).attr("disabled", false);

}


//Gera variação da cor selecionada

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

function renderList(list, load) {

    const cor1 = $("#cor").val();
    const cor2 = shadeColor(cor1, -40);

    let html = "";

    //debugger;

    log("ehload: " + load);

    for (var i = 0; i < list.length; i++) {

        let width = 100 / list.length;

        let color = "";

        if (load) {

            var rainbow = getRainbow(cor1, cor2, list.length * 1);

            color = rainbow[i];

            log(color);
        }
        else {
            let element = $("#div-" + list[i]);
            color = $(element).attr("data-color");
        }

        html +=
            `
                <div id="div-${list[i]}" data-color="${color}" class="text-center p-0 m-0"
                style="width: ${width}%; font-size:0.5em; background-color: ${color}; border-radius: 1px;  box-shadow: 0px 0px 0px 1px rgba(255,255,255,0.05);">
                </div>
            `;
        //<b>${list[i]}</b>
    }

    $("#sort-container").html("");
    $("#sort-container").append(html);
}


const SortTypes = {
    Bubble: "bubble",
    Selection: "selection"
}