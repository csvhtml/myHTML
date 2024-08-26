Object.defineProperties(document, {
    getElementsWithOnClickEvent: {
        value: function() {
            ret = []
            let all = document.getElementsByTagName('*');
            for (let a of all) {
                if (typeof a.onclick === 'function') {
                    ret.push(a)}    
            }
            return ret
        }
    }
});

Object.defineProperties(document, {
    getElementsByIDSubstring: {
        value: function(substring) {
            ret = []
            let all = document.getElementsByTagName('*');
            for (let a of all) {
                if (a.id.includes(substring)) {
                    ret.push(a)}    
            }
            return ret
        }
    }
});
