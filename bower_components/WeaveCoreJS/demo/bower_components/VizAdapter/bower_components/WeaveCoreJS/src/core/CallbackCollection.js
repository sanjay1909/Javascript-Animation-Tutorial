/*
    Weave (Web-based Analysis and Visualization Environment)
    Copyright (C) 2008-2011 University of Massachusetts Lowell
    This file is a part of Weave.
    Weave is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License, Version 3,
    as published by the Free Software Foundation.
    Weave is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with Weave.  If not, see <http://www.gnu.org/licenses/>.
*/

// namespace

if(!this.weavecore)
    this.weavecore = {};
/**
 * This class manages a list of callback functions.
 *
 * @author adufilie
 * @author sanjay1909
 */

(function() {

    // Static Public Const Properties
    /**
     * The name of the property containing the name assigned to the object when the session state is generated.
     */
    Object.defineProperty(CallbackCollection, 'DEFAULT_TRIGGER_COUNT', {
            value: 1
        });

    // constructor
    /**
     * @param preCallback An optional function to call before each immediate callback.
     * If specified, the preCallback function will be called immediately before running each
     * callback using the parameters passed to _runCallbacksImmediately(). This means if there
     * are five callbacks added, preCallback() gets called five times whenever
     * _runCallbacksImmediately() is called.  An example usage of this is to make sure a relevant
     * variable is set to the appropriate value while each callback is running.  The preCallback
     * function will not be called before grouped callbacks.
     */

    function CallbackCollection(preCallback) {

        //private properties

        /**
         * Set this to true to enable stack traces for debugging.
         */
        CallbackCollection.debug = false;

        /**
         * @interanl
         * @property _linkableObject
         * @type ILinkableObject
         **/
        this._linkableObject; // for debugging only... will be set when debug==true

        /**
         * @private
         * @property _lastTriggerStackTrace
         * @type string
         **/
        this._lastTriggerStackTrace; // for debugging only... will be set when debug==true
        /**
         * @private
         * @property _oldEntries
         * @type Array
         **/
        this._oldEntries;

        /**
         * This is a list of CallbackEntry objects in the order they were created.
         * @private
         * @property _callbackEntries
         * @type Array
         **/
        this._callbackEntries = [];

        /**
         * This is the function that gets called immediately before every callback.
         * @protected
         * @property _precallback
         * @type function
         **/
        this._preCallback = preCallback;

        /**
         * If this is true, it means triggerCallbacks() has been called while delayed was true.
         * @private
         * @property _runCallbacksIsPending
         * @type boolean
         **/
        this._runCallbacksIsPending = false;

        /**
         * This is the number of times delayCallbacks() has been called without a matching call to resumeCallbacks().
         * While this is greater than zero, effects of triggerCallbacks() will be delayed.
         * @private
         * @property _delayCount
         * @type number
         **/
        this._delayCount = 0;

        /**
         * This value keeps track of how many times callbacks were triggered, and is returned by the public triggerCounter accessor function.
         * The value starts at 1 to simplify code that compares the counter to a previous value.
         * This allows the previous value to be set to zero so change will be detected the first time the counter is compared.
         * This fixes potential bugs where the base case of zero is not considered.
         * @private
         * @property _runCallbacksIsPending
         * @type boolean
         **/
        this._triggerCounter = CallbackCollection.DEFAULT_TRIGGER_COUNT;

        /**
         * A list of CallbackEntry objects for when dispose() is called.
         */
        this._disposeCallbackEntries = [];
        /**
         * This value is used internally to remember if dispose() was called.
         */
        this._wasDisposed = false;

        /**
		 * This flag is used in _runCallbacksImmediately() to detect when a recursive call has completed running all the callbacks.
		 */
        this._runCallbacksCompleted;

    }

    CallbackCollection.prototype = new weavecore.ILinkableObject();
    CallbackCollection.prototype.constructor = CallbackCollection;

    // Prototypes
    var p = CallbackCollection.prototype;

    /**
		 * This adds the given function as a callback.  The function must not require any parameters.
		 * The callback function will not be called recursively as a result of it triggering callbacks recursively.
		 * @param relevantContext If this is not null, then the callback will be removed when the relevantContext object is disposed via SessionManager.dispose().  This parameter is typically a 'this' pointer.
		 * @param callback The function to call when callbacks are triggered.
		 * @param runCallbackNow If this is set to true, the callback will be run immediately after it is added.
		 * @param alwaysCallLast If this is set to true, the callback will be always be called after any callbacks that were added with alwaysCallLast=false.  Use this to establish the desired child-to-parent triggering order.
    */
    p.addImmediateCallback = function(contextObj, callbackFn, runCallbackNow, alwaysCallLast) {
        if (callbackFn === null || callbackFn === undefined)
            return;

        // set default value for parameters
        if (runCallbackNow === null || runCallbackNow === undefined)
            runCallbackNow = false;

        if (alwaysCallLast === null || alwaysCallLast === undefined)
            alwaysCallLast = false;

        // remove the callback if it was previously added
        this.removeCallback(callbackFn);

        var entry = new CallbackEntry(contextObj, callbackFn);
        if (alwaysCallLast)
            entry.schedule = 1;
        this._callbackEntries.push(entry);

        if (runCallbackNow) {
            // increase the recursion count while the function is running
            entry.recursionCount++;
            callbackFn.call(this);
            entry.recursionCount--;
        }
    };

    /**
     * This will trigger every callback function to be called with their saved arguments.
     * If the delay count is greater than zero, the callbacks will not be called immediately.
     */
    p.triggerCallbacks = function() {
        if (CallbackCollection.debug)
            this._lastTriggerStackTrace = new Error(CallbackCollection.STACK_TRACE_TRIGGER).stack();
        if (this._delayCount > 0) {
            // we still want to increase the counter even if callbacks are delayed
            this._triggerCounter++;
            this._runCallbacksIsPending = true;
            return;
        }
        this._runCallbacksImmediately.call(this);
    };


    /**
     * This function runs callbacks immediately, ignoring any delays.
     * The preCallback function will be called with the specified preCallbackParams arguments.
     * @param preCallbackParams The arguments to pass to the preCallback function given in the constructor.
     */
    p._runCallbacksImmediately = function() {
        var preCallbackParams = arguments;
        //increase the counter immediately
        this._triggerCounter++;
        this._runCallbacksIsPending = false;

        // This flag is set to false before running the callbacks.  When it becomes true, the loop exits.
        this._runCallbacksCompleted = false;

        for (var schedule = 0; schedule < 2; schedule++) {
            // run the callbacks in the order they were added
            for (var i = 0; i < this._callbackEntries.length; i++) {
                // If this flag is set to true, it means a recursive call has finished running callbacks.
                // If _preCallback is specified, we don't want to exit the loop because that cause a loss of information.
                if (this._runCallbacksCompleted && (this._preCallback === undefined || this._preCallback === null))
                    break;

                var entry = this._callbackEntries[i];

                // if we haven't reached the matching schedule yet, skip this callback
                if (entry.schedule != schedule)
                    continue;
                // Remove the entry if the context was disposed by SessionManager.
                var shouldRemoveEntry;
                if (entry.callback === null || entry.callback === undefined)
                    shouldRemoveEntry = true;
                else if (entry.context instanceof CallbackCollection) // special case
                    shouldRemoveEntry = entry.context.wasDisposed;
                else
                    shouldRemoveEntry = WeaveAPI.SessionManager.objectWasDisposed(entry.context);
                if (shouldRemoveEntry) {
                    entry.dispose();
                    // remove the empty callback reference from the list
                    var removed = this._callbackEntries.splice(i--, 1); // decrease i because remaining entries have shifted
                    if (CallbackCollection.debug)
                        this._oldEntries = this._oldEntries ? this._oldEntries.concat(removed) : removed;
                    continue;
                }
                // if _preCallback is specified, we don't want to limit recursion because that would cause a loss of information.
                if (entry.recursionCount === 0 || (this._preCallback !== undefined && this._preCallback !== null)) {
                    entry.recursionCount++; // increase count to signal that we are currently running this callback.

                    if (this._preCallback !== undefined && this._preCallback !== null)
                        this._preCallback.apply(null, preCallbackParams);

                    entry.callback.call();

                    entry.recursionCount--; // decrease count because the callback finished.
                }
            }
        }
        // This flag is now set to true in case this function was called recursively.  This causes the outer call to exit its loop.
        this._runCallbacksCompleted = true;
    };

    /**
     * This function will remove a callback that was previously added.
     * @param callback The function to remove from the list of callbacks.
     */
    p.removeCallback = function(callback) {
        // if the callback was added as a grouped callback, we need to remove the trigger function
        GroupedCallbackEntry.removeGroupedCallback(this, callback);
        // find the matching CallbackEntry, if any
        for (var outerLoop = 0; outerLoop < 2; outerLoop++) {
            var entries = outerLoop === 0 ? this._callbackEntries : this._disposeCallbackEntries;
            for (var index = 0; index < entries.length; index++) {
                var entry = entries[index];
                if (entry !== null && entry !== undefined && callback === entry.callback) {
                    // Remove the callback by setting the function pointer to null.
                    // This is done instead of removing the entry because we may be looping over the _callbackEntries Array right now.
                    entry.dispose();
                }
            }
        }
    };

    /**
     * This counter gets incremented at the time that callbacks are triggered and before they are actually called.
     * It is necessary in some situations to check this counter to determine if cached data should be used.
     */
    p.__defineGetter__("triggerCounter", function() {
        return this._triggerCounter;
    });

    /**
     * While this is true, it means the delay count is greater than zero and the effects of
     * triggerCallbacks() are delayed until resumeCallbacks() is called to reduce the delay count.
     */
    p.__defineGetter__("callbacksAreDelayed", function() {
        return this._delayCount > 0;
    });


    /**
     * This will increase the delay count by 1.  To decrease the delay count, use resumeCallbacks().
     * As long as the delay count is greater than zero, effects of triggerCallbacks() will be delayed.
     */
    p.delayCallbacks = function() {
        this._delayCount++;
    };

    /**
     * This will decrease the delay count by one if it is greater than zero.
     * If triggerCallbacks() was called while the delay count was greater than zero, immediate callbacks will be called now.
     */
    p.resumeCallbacks = function() {
        if (this._delayCount > 0)
            this._delayCount--;

        if (this._delayCount === 0 && this._runCallbacksIsPending)
            this.triggerCallbacks();
    };

    /**
     * This will add a callback that will only be called once, when this callback collection is disposed.
     * @param relevantContext If this is not null, then the callback will be removed when the relevantContext object is disposed via SessionManager.dispose().  This parameter is typically a 'this' pointer.
     * @param callback The function to call when this callback collection is disposed.
     */
    p.addDisposeCallback = function(relevantContext, callback) {
        // don't do anything if the dispose callback was already added
        for (var i = 0; i < this._disposeCallbackEntries.length; i++) {
            var entry = this._disposeCallbackEntries[i];
            if (entry.callback === callback)
                return;
        }


        this._disposeCallbackEntries.push(new CallbackEntry(relevantContext, callback));
    };


    /**
     * This function will be called automatically when the object is no longer needed, and should not be called directly.
     * Use disposeObject() instead so parent-child relationships get cleaned up automatically.
     */
    p.dispose = function() {
        // remove all callbacks
        if (CallbackCollection.debug)
				this._oldEntries = this._oldEntries ? this._oldEntries.concat(this._callbackEntries) : this._callbackEntries.concat();

        this._callbackEntries.length = 0;
        this._wasDisposed = true;

        // run & remove dispose callbacks
        while (this._disposeCallbackEntries.length) {
            var entry = this._disposeCallbackEntries.shift();
            if (entry.callback !== null && entry.callback !== undefined && !WeaveAPI.SessionManager.objectWasDisposed(entry.context)){
                entry.callback();
            }
        }
    };



    /**
     * This flag becomes true after dispose() is called.
     */
    p.__defineGetter__("wasDisposed", function() {
        return this._wasDisposed;
    });

    /**
     * Adds a callback that will only be called during a scheduled time each frame.  Grouped callbacks use a central trigger list,
     * meaning that if multiple ICallbackCollections trigger the same grouped callback before the scheduled time, it will behave as
     * if it were only triggered once.  For this reason, grouped callback functions cannot have any parameters.  Adding a grouped
     * callback to a ICallbackCollection will undo any previous effects of addImmediateCallback() or addDisposeCallback() made to the
     * same ICallbackCollection.  The callback function will not be called recursively as a result of it triggering callbacks recursively.
     * @param relevantContext If this is not null, then the callback will be removed when the relevantContext object is disposed via SessionManager.dispose().  This parameter is typically a 'this' pointer.
     * @param groupedCallback The callback function that will only be allowed to run during a scheduled time each frame.  It must not require any parameters.
     * @param triggerCallbackNow If this is set to true, the callback will be triggered to run during the scheduled time after it is added.
     */
    p.addGroupedCallback = function(relevantContext, groupedCallback, triggerCallbackNow) {
        //set default value for parameters
        if (triggerCallbackNow === null || triggerCallbackNow === undefined)
            triggerCallbackNow = false;
        GroupedCallbackEntry.addGroupedCallback(this, relevantContext, groupedCallback, triggerCallbackNow);
    };



    weavecore.CallbackCollection = CallbackCollection;


     function CallbackEntry(context, callback) {
        /**
         * This is the context in which the callback function is relevant.
         * When the context is disposed, the callback should not be called anymore.
         *
         * Note that the context could be stored using a weak reference in an effort to make the garbage-
         * collector take care of removing the callback, but in most situations this would not work because
         * the callback function is typically a class member of the context object.  This means that as long
         * as you have a strong reference to the callback function, you effectively have a strong reference
         * to the owner of the function.  Storing the callback function as a weak reference would solve this
         * problem, but you cannot create reliable weak references to functions due to a bug in the Flash
         * Player.  Weak references to functions get garbage-collected even if the owner of the function still
         * exists.
         * @public
         * @property context
         * @type Object
         */
        this.context = context;
        /**
         * This is the callback function.
         * @public
         * @property callback
         * @type Function
         */
        this.callback = callback;
        /**
         * This is the current recursion depth.
         * If this is greater than zero, it means the function is currently running.
         * Note that it IS possible for this to go above 1 if an external JavaScript popup interrupts our code.
         * @public
         * @property recursionCount
         * @type number
         */
        this.recursionCount = 0;
        /**
         * This is 0 if the callback was added with alwaysCallLast=false, or 1 for alwaysCallLast=true
         * @public
         * @property schedule
         * @type number
         */
        this.schedule = 0;

        /**
         * This is a stack trace from when the callback was added.
         * @public
         * @property addCallback_stackTrace
         * @type string
         */
        this.addCallback_stackTrace;
        /**
         * This is a stack trace from when the callback was removed.
         * @public
         * @property removeCallback_stackTrace
         * @type string
         */
        this.removeCallback_stackTrace;

        if (CallbackCollection.debug)
            this.addCallback_stackTrace = new Error(CallbackEntry.STACK_TRACE_ADD).stack;
    }

    Object.defineProperty(CallbackEntry, 'STACK_TRACE_TRIGGER', {
            value: "This is the stack trace from when the callbacks were last triggered."
        });
    Object.defineProperty(CallbackEntry, 'STACK_TRACE_ADD', {
            value: "This is the stack trace from when the callback was added."
        });
    Object.defineProperty(CallbackEntry, 'STACK_TRACE_REMOVE', {
            value: "This is the stack trace from when the callback was removed."
        });

    CallbackEntry.prototype.dispose = function() {
        if (CallbackCollection.debug && this.callback !== null && this.callback !== undefined)
            this.removeCallback_stackTrace = new Error(CallbackEntry.STACK_TRACE_REMOVE).stack;

        this.context = null;
        this.callback = null;
    };

    weavecore.CallbackEntry = CallbackEntry;


    /**
     * Constructor
     */

    function GroupedCallbackEntry(groupedCallback) {
         /**
         * This gets set to true when the static _handleGroupedCallbacks() callback has been added as a frame listener.
         */
        GroupedCallbackEntry._initialized = false;
        CallbackEntry.call(this, [],groupedCallback);
        /**
         * If true, the callback was triggered this frame.
         */
        this.triggered = false;

        /**
         * If true, the callback was triggered again from another grouped callback.
         */
        this.triggeredAgain = false;


        if (!GroupedCallbackEntry._initialized) {
            weavecore.StageUtils.addEventCallback("tick", null, GroupedCallbackEntry._handleGroupedCallbacks.bind(this));
            GroupedCallbackEntry._initialized = true;
        }
    }

    GroupedCallbackEntry.prototype = new CallbackEntry();
    GroupedCallbackEntry.prototype.constructor = GroupedCallbackEntry;
    /**
     * True while handling grouped callbacks.
     */
    GroupedCallbackEntry._handlingGroupedCallbacks = false;

    /**
     * True while handling grouped callbacks called recursively from other grouped callbacks.
     */
    GroupedCallbackEntry._handlingRecursiveGroupedCallbacks = false;



    /**
     * This maps a groupedCallback function to its corresponding GroupedCallbackEntry.
     */
    Object.defineProperty(GroupedCallbackEntry, '_entryLookup', {
            value: new Map()
        });

    /**
     * This is a list of GroupedCallbackEntry objects in the order they were triggered.
     */
    Object.defineProperty(GroupedCallbackEntry, '_triggeredEntries', {
            value: []
        });

    GroupedCallbackEntry.addGroupedCallback = function(callbackCollection, relevantContext, groupedCallback, triggerCallbackNow) {
        // get (or create) the shared entry for the groupedCallback
        var entry = GroupedCallbackEntry._entryLookup.get(groupedCallback);
        if (!entry) {
            entry = new GroupedCallbackEntry(groupedCallback);
            GroupedCallbackEntry._entryLookup.set(groupedCallback,entry );
        }

        // context shouldn't be null because we use it to determine when to clean up the GroupedCallbackEntry.
        if (relevantContext === null || relevantContext === undefined)
            relevantContext = callbackCollection;

        // add this context to the list of relevant contexts
         entry.context.push(relevantContext);


        // make sure the actual function is not already added as a callback.
        callbackCollection.removeCallback(groupedCallback);

        // add the trigger function as a callback
        // The relevantContext parameter is set to null for entry.trigger so the same callback can be added multiple times to the same
        // target using different contexts without having the side effect of losing the callback when one of those contexts is disposed.
        // The entry.trigger function will be removed once all contexts are disposed.
        callbackCollection.addImmediateCallback(null, entry.trigger.bind(entry), triggerCallbackNow);
    }

    GroupedCallbackEntry.removeGroupedCallback = function(callbackCollection, groupedCallback) {
        // remove the trigger function as a callback
        var entry = GroupedCallbackEntry._entryLookup.get(groupedCallback);
        if (entry)
            callbackCollection.removeCallback(entry.trigger);
    }

    /**
     * This function gets called once per frame and allows grouped callbacks to run.
     */
    GroupedCallbackEntry._handleGroupedCallbacks = function() {
        var i;
        var entry;

        GroupedCallbackEntry._handlingGroupedCallbacks = true; {
            // Handle grouped callbacks in the order they were triggered,
            // anticipating that more may be added to the end of the list in the process.
            // This first pass does not allow grouped callbacks to call each other immediately.
            for (i = 0; i < GroupedCallbackEntry._triggeredEntries.length; i++) {
                entry = GroupedCallbackEntry._triggeredEntries[i];
                entry.handleGroupedCallback();
            }

            // after all grouped callbacks have been handled once, run those which were triggered recursively and allow them to call other grouped callbacks immediately.
            GroupedCallbackEntry._handlingRecursiveGroupedCallbacks = true; {
                // handle grouped callbacks that were triggered recursively
                for (i = 0; i < GroupedCallbackEntry._triggeredEntries.length; i++) {
                    entry = GroupedCallbackEntry._triggeredEntries[i];
                    if (entry.triggeredAgain)
                        entry.handleGroupedCallback();
                }
            }
            GroupedCallbackEntry._handlingRecursiveGroupedCallbacks = false;
        }
        GroupedCallbackEntry._handlingGroupedCallbacks = false;

        // reset for next frame
        for (i = 0; i < GroupedCallbackEntry._triggeredEntries.length; i++) {
            entry = GroupedCallbackEntry._triggeredEntries[i];
            entry.triggered = entry.triggeredAgain = false;
        }
        GroupedCallbackEntry._triggeredEntries.length = 0;

    };

    var p = GroupedCallbackEntry.prototype;

    /**
     * Marks the entry to be handled later (unless already triggered this frame).
     * This also takes care of preventing recursion.
     */
    p.trigger = function() {
        // if handling recursive callbacks, call now
        if (GroupedCallbackEntry._handlingRecursiveGroupedCallbacks) {
            this.handleGroupedCallback();
        } else if (!this.triggered) {
            // not previously triggered
            GroupedCallbackEntry._triggeredEntries.push(this);
            this.triggered = true;
        } else if (GroupedCallbackEntry._handlingGroupedCallbacks) {
            // triggered recursively - call later
            this.triggeredAgain = true;
        }
    };


    /**
     * Checks the context(s) before calling groupedCallback
     */
    p.handleGroupedCallback = function() {
        if (!this.context)
            return;

        // first, make sure there is at least one relevant context for this callback.
        var allContexts = this.context;
        // remove the contexts that have been disposed.
        for (var i = 0; i < allContexts.length; i++)
            if (WeaveAPI.SessionManager.objectWasDisposed(allContexts[i]))
                allContexts.splice(i--, 1);
        // if there are no more relevant contexts for this callback, don't run it.
        if (allContexts.length === 0) {
            this.dispose();
            GroupedCallbackEntry._entryLookup.delete(this.callback);
            return;
        }

        // avoid immediate recursion
        if (this.recursionCount === 0) {
            this.recursionCount++;
            this.callback.apply();
            this.recursionCount--;
        }
        // avoid delayed recursion
        this.triggeredAgain = false;
    };

    weavecore.GroupedCallbackEntry = GroupedCallbackEntry;

}());
