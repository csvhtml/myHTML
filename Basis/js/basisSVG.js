const dictSVG = {
    'pdf-img': '<svg id="pdf-img" width="100" height="125" viewBox="0 0 80 100" fill="none"> \
            <path d="M 10 0 \
            L 70 0 Q 80 0 80 10 \
            L 80 90 Q 80 100 70 100 \
            L 10 100 Q 0 100 0 90 \
            L 0 10 Q 0 0 10 0" fill="#E2574C"></path> \
            <path d="M 45 0 \
            L 70 0 Q 80 0 80 10 \
            L 80 35 \
            Z" fill="white"></path> \
            <path d="M 45 0 \
            L 80 35 \
            L 55 35 Q 45 35 45 25 \
            Z" fill="#B53629"></path> \
            <text x="8" y="25" fill="white" font-size="20">pdf</text> \
            <text x="5" y="80" fill="black" font-size="10"></text> \
            </svg>',

    'pdf-icon': '<svg id="pdf-icon" width="16" height="20" viewBox="0 0 16 20" fill="none"> \
            <path d="M 2 0 \
            L 14 0 Q 16 0 16 2 \
            L 16 18 Q 16 20 14 20 \
            L 2 20 Q 0 20 0 18 \
            L 0 2 Q 0 0 2 0" fill="#E2574C"></path> \
            <text x="1" y="12" fill="white" font-size="9">pdf</text> \
            </svg>',

    'a-x': '<svg id="a-x" width="20" height="20" fill="currentColor" class="m-1" viewBox="2 2 18 18">\
            <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" stroke-width="2"/>\
            <line x1="4" y1="16" x2="16" y2="4" stroke="currentColor" stroke-width="2"/>\
            </svg>',

    'a-ArrowDown': '<svg id="a-ArrowDown" width="20" height="20" fill="currentColor" class="m-1" viewBox="0 0 16 16"> \
            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 \
            3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/> \
            </svg>',
        }

class clsSVG {
    constructor() {
        for (let key of Object.keys(dictSVG)) {
            this[key] = dictSVG[key]}
    }

    CreateAll_BasedOnDivClasses(tags) {
        let svgKeys = Object.keys(this)
        var svgKeyClasses = svgKeys.preFix('svg:')
        let listDIVS = ListOfDivs(tags)

        for (let div of listDIVS) {
            for (let cls of div.classList)
                if (svgKeyClasses.includes(cls)) {
                    div.innerHTML = this[cls.after('svg:')] + div.innerHTML}
        }
    }

    Create_ToDIV(divID, SVGName) {
        if (Object.keys(this).includes(SVGName)) {
            let div = document.getElementById(divID); 
            div.innerHTML = this[SVGName] + div.innerHTML
        }
    }
}