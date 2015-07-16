if (!this.dataLayer) this.dataLayer = {};
(function () {
    function Data(value) {
        this.value = value
    }

    var p = Data.prototype;
    p.getValue = function () {
        return this.value;
    }

    p.setValue = function (value) {
        this.value = value;
    }

    p.getState = function () {
        return {
            value: this.value
        }
    }


    dataLayer.Data = Data;


}());
