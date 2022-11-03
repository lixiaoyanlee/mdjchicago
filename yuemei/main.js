const chicago = require('mdjchicago');
const aeAnimation = require('./export/data.json');
const ret = require('./apiret.json');
const yuemeiAnimation = require('./yuemei');
const fs = require('fs');
const path = require('path');

const main = () => {
    // chicago.afterEffectAlign(aeAnimation);
    // console.log(yuemeiAnimation);

    let animation = yuemeiAnimation(ret, {w: 750, h: 1624});

    let outputH = JSON.stringify(animation, null, 2);
    let output = JSON.stringify(animation);
    let html = fs.readFileSync('./tmpl.html');
    html = html.toString().replace('___ANIMATIONDATA___', output);
    fs.writeFileSync(path.join(__dirname, 'export', 'render.html'), html);
    fs.writeFileSync(path.join(__dirname, 'export', 'render.json'), outputH);
};

main();