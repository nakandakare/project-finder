export const jsonToArray = (json) => {
    const array = [];
    for (let elm in json) {
        array.push(json[elm]);
    }
    return array;
}