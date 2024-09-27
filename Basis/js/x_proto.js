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

// very simliar to map function
Object.defineProperties(Array.prototype, {
    applyToItems: {
        value: function(func, n = 0) {
            if (n < 0 || 5 < n) return
            for(let i=0; i<this.length; i++) {
                if (typOf(this[i]) == "list") {
                    this[i].applyToItems(func, n+1)
                } else {
                    this[i] = func(this[i])
                }
            }
        }
    }
});

Object.defineProperties(Array.prototype, {
    insertColum: {
        value: function(liste) {
            if (ListDepth(this) == 2) {
                if (this.length == liste.length) {
                    for (let i = 0; i < liste.length; i++) {
                        this[i].push(liste[i])}
                }
            }
        }
    }
});

Object.defineProperties(Array.prototype, {
    convert2: {
        value: function() {
            if (ListDepth(this) == 1) {
                for (let i = 0; i < this.length; i++) {
                    this[i] = [this[i]]}
            }
        }
    }
});

// only up to depth of 3
Object.defineProperties(Array.prototype, {
    Shape: {
        value: function() {
            assert(typOf(this) == 'list')
            if (ListDepth(this) == 1) return [this.length]
            
            if (ListDepth(this) == 2) {
                let r = this.length
                c = this[0].length
                for (let i = 0; i <r; i++) {
                    assert (this[i].length == c)}
                return [r,c]}

            if (ListDepth(this) == 3) {
                let r = this.length
                let s = this[0].Shape()
                for (let i = 0; i <r; i++) {
                    assert (IsEqual(s, this[i].Shape()))}
                return [r, s[0], s[1]]}
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

Object.defineProperties(Object.prototype, {
    keys: {
        value: function() {
              return Object.keys(this)
            }  
    } 
}); 

// key information gets lost here
Object.defineProperties(Object.prototype, {
    values: {
        value: function() {
            return Object.values(this)
            }  
    } 
}); 

Object.defineProperties(String.prototype, {
    until: {
        value: function(n) {
            if (n == '') {return this.substring(0)}     // return this will return the wrong data type 'String()'. Equvivalent to String(this)

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

// Whenever regex for some reason doesnt work
Object.defineProperties(String.prototype, {
    replaceN: {
        value: function(re, place, n = 1000) {
            let ret = String(this)
            for (let i = 0; i < n; i++) {
                if (ret.includes(re)) {
                    ret = ret.replace(re,place)}
                else {
                    break}
            }
            return ret;
        }
    } 
});

Object.defineProperties(String.prototype, {
    AsList: {
        value: function(n) {
            let ret = []
            for (let i = 0; i < n; i++) {
                ret.push(String(this))
            }
            return ret;
        }
    } 
});

Object.defineProperties(String.prototype, {
    trimPlus: {
        value: function(plusList) {
            let ret = String(this)
            // Plus: specifically will remove all spaces if seen in specifc pattern 
            if (typOf(plusList) == 'list') {
                for (element of plusList) {
                    if (element.includes(' ')){
                        let rpl = element.replace(RegExp(' ', 'g'), '')
                        // ret = ret.replace(RegExp(element, 'g'), rpl)       will lead to failue
                        ret = ret.replaceN(element, rpl)
                    } 
                }
            }
            // Plus: generically will remove all multi spaces inside with normal blank space. 
            ret = ret.replace(/  +/g, ' ');
            // Standard: removes starting and ending spaces
            ret = ret.trim()               
            return ret
        }

    } 
});


// ################################################################
// DOM /HTML Elements                                             #
// ################################################################

// ################################################################
// DOM /HTML Elements  - Table                                    #
// ################################################################

Object.defineProperties(Object.prototype, {
    mySetHeaders: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].innerHTML = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetHeadersID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].id = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetHeadersClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows[0].cells.length == liste.length)

            let headerRow = this.querySelector('thead tr');
            let headerCells = headerRow.cells;

            for (let i = 0; i < headerCells.length; i++) {
                headerCells[i].className = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetTHeadID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let thead = this.querySelector('thead');
            thead.id = id
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetTHeadClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let thead = this.querySelector('thead');
            thead.className = classString
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetHRowID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let hrow = this.querySelector('thead tr');
            hrow.id = id
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetHRowClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let hrow = this.querySelector('thead tr');
            hrow.className = classString
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetTBodyID: {
        value: function(id) {
            assert(this.tagName == 'TABLE')
            assert(typOf(id) == 'str')

            let tbody = this.querySelector('tbody');
            tbody.id = id
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetTBodyClass: {
        value: function(classString) {
            assert(this.tagName == 'TABLE')
            assert(typOf(classString) == 'str')

            let tbody = this.querySelector('tbody');
            tbody.className = classString
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetRowsID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length )    // excluding the header row

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                tbody.rows[i].id = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetRowsClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)     // excluding the header row

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                tbody.rows[i].className = liste[i]}
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetCells: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].innerHTML = liste[i][j]}
                }
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetCellsID: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].id = liste[i][j]}
                }
        }
    }
});

Object.defineProperties(Object.prototype, {
    mySetCellsClass: {
        value: function(liste) {
            assert(this.tagName == 'TABLE')
            assert(this.rows.length -1 == liste.length)

            let tbody = this.querySelector('tbody');

            for (let i = 0; i < tbody.rows.length; i++) {
                assert(tbody.rows[i].cells.length == liste[i].length)
                for (let j = 0; j < tbody.rows[i].cells.length; j++) {
                    tbody.rows[i].cells[j].className= liste[i][j]}
                }
        }
    }
});

// ################################################################
// DOM /HTML Elements  - Other                                    #
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