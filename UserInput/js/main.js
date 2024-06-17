const UIN = new clsUserInput(["id-section-1", "id-section-2"]);

(function () {
        let div = document.createElement('div');
        for (k =1; k<3; k++) {
            for (i = 1; i<200;i++) {
                div = document.createElement('div');
                div.innerHTML = String(i)
                div.id = String(i)
                div.classList.add("item")
                // append mouseenter/mouseleave on single elements
                div.addEventListener('mouseenter', UIN.MouseEnter)
                div.addEventListener('mouseleave', UIN.MouseLeave)
                document.getElementById("id-section-" + String(k)).appendChild(div)
            }
        }

        window.addEventListener('mousedown', UIN.MouseDown)
        window.addEventListener('mouseup', UIN.MouseUp)
        window.addEventListener('keyup', UIN.KeyUp)
})();