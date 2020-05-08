interface Object {
    entries(): [string, any][];
}

Object.prototype.entries = function () {
    return Object.entries(this);
};