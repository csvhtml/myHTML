Object.defineProperties(Array.prototype, {
    count: {
        value: function(query) {
            /* 
               Counts number of occurrences of query in array, an integer >= 0 
               Uses the javascript == notion of equality.
            */
            var count = 0;
            for(let i=0; i<this.length; i++)
                if (this[i]==query)
                    count++;
            return count;
        }
    }
});


Object.defineProperties(Array.prototype, {
    _remove: {
        value: function(element) {
                let idx = this.indexOf(element);
                this.splice(idx, 1)
        }
    }
});

Object.defineProperties(Array.prototype, {
    removeAll: {
        value: function(element) {
                let n = this.count(element)
                for (let i = 0; i<n;i++) {
                    this.removeX(element)}
        }
    }
});

Object.defineProperties(Array.prototype, {
    removeX: {
        value: function(element) {
            if (this.includes(element)) {
                this._remove(element)
            }
        }
    }
});

Object.defineProperties(Array.prototype, {
    removeItems: {
        value: function(liste) {
            for (element of liste) {
                this.removeAll(element)}
        }
    }
});


Object.defineProperties(Array.prototype, {
    toggle: {
        value: function(element) {
            if (this.includes(element)) {
                this._remove(element)}
            else {
                this.push(element)}
            }
        }
});

Object.defineProperties(Array.prototype, {
    pushX: {
        value: function(element) {
            if (!this.includes(element)) {
                this.push(element)}
            }
        }
});

Object.defineProperties(Array.prototype, {
    preFix: {
        value: function(preFix) {
            ret = []
            for(let i=0; i<this.length; i++)
                if (typeof this[i] === "string")
                    ret.push(preFix + this[i])
            return ret
        }
        }
});

// MOHI: To be reworked
Object.defineProperties(Object.prototype, {
    key: {
        value: function(n) {
            let count = 0
            for (var key in this) {
                if (count == n) {
                    return key;}
                count += 1
              }
              return null;
            }  
    } 
}); 

Object.defineProperties(String.prototype, {
    until: {
        value: function(n) {
            if (n == '') {return this.substring(0)}     // return this will return the wrong data type 'String()'

            let idx = this.indexOf(n)
            if (idx == -1) { 
                return this}
            return this.substring(0,idx)
        }
    } 
});

Object.defineProperties(String.prototype, {
    after: {
        value: function(n) {
            if (n == '') {return this} 

            let idx = this.indexOf(n)
            if (idx == -1) { 
                return this}
            return this.substring(idx + n.length)
        }
    } 
});

Object.defineProperties(String.prototype, {
    count: {
        value: function(n) {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (this.substring(i,i+n.length) === n) {
                    count++;
                }
            }
            return count;
        }
    } 
});

// ################################################################
// DOM /HTML Elements                                             #
// ################################################################

// Note: When no parent with ID was found, then the ego element is returned
Object.defineProperties(Object.prototype, {
    GetParentWithID: {
        value: function(iterations = 10) {
            let parent = this
            for (i = 0; i<iterations; i++) {
                if (parent.tagName == "BODY") {
                    return this}
                if (parent.id != '') {
                    return parent}
                parent = parent.parentElement
            }
            return this
        }
    }
});

Object.defineProperties(Object.prototype, {
    IsDescendantOf: {
        value: function(ancestor, iterations = 20) {
            let ego = this
            for (i = 0; i<iterations; i++) {
                if (ego.tagName == "BODY") {
                    return false}
                if (ego.parentElement === null) {
                    return false}
                if (ego === ancestor) {
                    return true}
                ego = ego.parentElement
            }
            return false
        }
    }
});