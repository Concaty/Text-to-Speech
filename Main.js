const maxCharacters = 1000;
const url = 'http://api.voicerss.org/';
const apiKey = 'b0c43a2f67f74a31915d50ec5b1dbe89';

const tooLongError = 'Text exceeds 1000 characters';
const whitespaceError = 'Text must contain text characters other than white spaces';

const buildUrl = (str)=> `${url}?key=${apiKey}&src=${str}&f=48khz_16bit_stereo`;
const tooLong = (str)=> str.length >= maxCharacters;



const emptyString = (str)=> str.split('').every(_char =>_char ===''||_char ==='\n');



const playBtn = () => document.getElementById('Playbtn');
const textInput = () => document.getElementById('text-input');
const appContainer = ()=> document.getElementById('app-container');
const errorContainer = ()=> document.getElementById('error-message');


const listenerFn  = ($event) =>{
   if($event.target.value ||$event.type ==='paste')
        playBtn().disabled=false;
    else
        playBtn().disabled=true;
};

const displayErrorMsg = (val) =>{
    const errs=[];
    if(tooLong(val)) errs.push(tooLongError);
    if(emptyString(val)) errs.push(whitespaceError);
    errs.forEach(_err =>{
        const div = document.createElement('div');
        div.innerText = _err;
        errorContainer().appendChild(div);
    });
};
const clearErrors = () =>errorContainer().innerHTML = '';

playBtn().addEventListener('click', ()=>{
    clearErrors();

    if(!emptyString(textInput().value) && !tooLong(textInput().value)) {
        textInput().value = textInput().value.trim();
        new Audio(buildUrl(textInput().value)).play();
    }
    else
        displayErrorMsg(textInput().value);
});
document.addEventListener('DOMContentLoaded', () =>{
    const containerHeight = appContainer().clientHeight;
    const docHeight = window.innerHeight;
    appContainer().style.marginTop = `${docHeight/2 - containerHeight/2-25}px`;
    textInput().addEventListener('keyup', listenerFn);
    textInput().addEventListener('paste', listenerFn);

});