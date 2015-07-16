(function () {
    function GrandParentObj(a) {
        this.grandParentVar = a;
        this._wasDisposed = false;
        Object.defineProperty(this, 'wasDisposed', {
            get: function () {
                return this._wasDisposed;
            }
        });
    }


    var gpp = GrandParentObj.prototype;

    gpp.grandParentMethod = function () {
        console.log("Grand-ParentVar: ", this.grandParentVar);
        return this.grandParentVar;
    }

    gpp.dispose = function () {
        console.log(this.wasDisposed);
        //this._wasDisposed = true;
    };

    this.GrandParentObj = GrandParentObj;

    /*
     *
     * Parent Object Definition
     *
     */

    function ParentObj(a, b) {
        GrandParentObj.call(this, a);
        this.parentVar = b;
    }

    ParentObj.prototype = new GrandParentObj("i am Inherited Parent Prototype");
    ParentObj.prototype.constructor = ParentObj;
    //ParentObj.constructor = GrandParentObj.prototype.constructor;

    var pp = ParentObj.prototype;
    pp.parentMethod = function () {
        console.log("Parent Var: ", this.parentVar);
        return this.parentVar;
    }

    this.ParentObj = ParentObj;

    /*
     *
     * Child Object Definition
     *
     */

    function ChildObj(a, b, c) {
        ParentObj.call(this, a, b);
        this.childVar = c;
    }

    ChildObj.prototype = new ParentObj("i am Inherited Parent Prototype");
    ChildObj.prototype.constructor = ChildObj;
    //ChildObj.constructor = ParentObj.prototype.constructor;

    var cp = ChildObj.prototype;
    cp.childMethod = function () {
        console.log("childVar: ", this.childVar);
        return this.childVar;
    }

    this.ChildObj = ChildObj;

}());
