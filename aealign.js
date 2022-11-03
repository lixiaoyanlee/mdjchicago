const commander = require('commander');
const mdjChicago = require('./core/index.js');
const fs = require('fs');
const path = require('path');

const main = () => {
    commander
        .requiredOption('-i, --input <file>', 'input file')
        .option('-o, --output <file>', 'output file', '')
        .option('-h, --human', 'human readable output and html demo file')
        .parse(process.argv);

    let buf = fs.readFileSync(commander.input);
    let aeJson = JSON.parse(buf.toString());

    mdjChicago.afterEffectAlign(aeJson);
    console.log('==== Done ====\n\n');

    if (!commander.output) {
        console.log(JSON.stringify(aeJson, null, 2));
    } else {
        let output;
        if (commander.human) {
            output = JSON.stringify(aeJson, null, 2);
            let html = fs.readFileSync(path.join(__dirname, 'demo', 'tmpl.html'));
            html = html.toString().replace('___ANIMATIONDATA___', output);
            fs.writeFileSync(commander.output + '.html', html);
        } else {
            output = JSON.stringify(aeJson);
        }

        fs.writeFileSync(commander.output, output);
    }
};

main();
