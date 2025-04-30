// content.js

let bg = '#2c2c2c'
let t4 = '#E1E4E8'
let t3 = '#8B8F97'
let t2 = '#B0B5C0'
let t1 = '#d0d0d0'
let b1 = '#383838'
let b2 = '#424242'
let b3 = '#373737'
let b4 = '#00000000'


const styleDom = document.documentElement.style;
const bgVars = [
    '--bg1', '--bg2', '--bg3',
    '--bg1_float', '--bg2_float', '--bg3_float',
    '--graph_bg_thin_float', '--graph_bg_regular_float',
    '--graph_bg_bright', '--graph_bg_regular_float'
];

const textVars = {
    '--text1': t1,
    '--text2': t2,
    '--text3': t3,
    '--text4': t4
};

const borderVars = {
    '--graph_bg_regular': b1,
    '--graph_bg_thick': b2,
    '--line_regular': b2,
    '--graph_bg_thin': b3,
    '--line_light': b4
};

chrome.storage.local.get('theme', (result) => {
    if (result.theme === 'dark') {
        setDark();  
    }
});



function setDark() {
    // 批量设置背景颜色
    bgVars.forEach(varName => {
        styleDom.setProperty(varName, bg);
    });
  
    // 批量设置文字颜色
    Object.entries(textVars).forEach(([varName, value]) => {
        styleDom.setProperty(varName, value);
    });

    // 批量设置边框颜色
    Object.entries(borderVars).forEach(([varName, value]) => {
        styleDom.setProperty(varName, value);
    });
}


function setLight() {
    bgVars.forEach(varName => {
        styleDom.removeProperty(varName);
    });

    Object.keys(textVars).forEach(varName => {
        styleDom.removeProperty(varName);
    });

    Object.keys(borderVars).forEach(varName => {
        styleDom.removeProperty(varName);
    });
}

  

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'set-dark-vars') {
        setDark();
    }else{
        setLight();
    }
});
  