module.exports = validate = function(validator, data) {
    for(const key in validator)
        if(
            ![null, undefined].includes(data[key]) &&
            [validator[key], validator[key].constructor].includes(data[key].constructor)
        ) {
            if(validator[key].constructor === Array && validator[key].length === 1)
                if(!validate(Array(data[key].length).fill(validator[key][0]), data[key])) return false;
                else;
            else if([Array, Object].includes(data[key].constructor))
                if(!validate(validator[key], data[key])) return false;
        }
        else return false;
    return true;
}