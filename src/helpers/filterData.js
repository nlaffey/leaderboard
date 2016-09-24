module.exports = function filterData(name, value) {
    if (name == 'timestamp') {
        value = new Date(value).toLocaleString();
    }
    return value;
};