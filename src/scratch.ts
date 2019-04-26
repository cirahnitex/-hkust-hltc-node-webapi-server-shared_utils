import {render} from "jsx-xml";

const value = "agagf";

if(value == null) {
    console.log('null')
}
else if(typeof(value) === 'string') {
    console.log('str')
}
else {
    console.log('oth')
}