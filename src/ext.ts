interface ObjectConstructor {
    entries(obj: { [key: string]: any }): [string, any][];
}

interface Object {
    entries(): [string, any][];
}

if (!Object.entries) {
    Object.entries = function (obj: { [key: string]: any }) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };
}

Object.prototype.entries = function () {
    return Object.entries(this);
};