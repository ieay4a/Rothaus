var excludeTable;
var sortTable;
var excluding;
var sortMethod;
var tds;
var sortTds;
var x, i, j, selElmnt, a, b, c;
$(document).ready(function () {
    var barcodePanel = $('#barcodePanel');
    excludeTable = document.getElementById('excludeTable');
    sortTable = document.getElementById('sortTable');
    excluding = [0, 0, 0, 0];
    sortMethod = 0;
    x = document.getElementsByClassName("customSelect");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    document.addEventListener("click", closeAllSelect);
    barcodePanel.hide();
    $('#barcodeButton, #closeBarcode').click(function () {
        filterPanel.hide();
        barcodePanel.toggle();
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    var filterPanel = $('#filterPanel');
    filterPanel.hide();
    $('#filterButton, #closeFilter').click(function () {
        barcodePanel.hide();
        filterPanel.toggle();
        $('html, body').animate({ scrollTop: 0 }, 500);
    });



});

function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

function toggleExcluding(idx) {
    if (excluding[idx] == 0) {
        excluding[idx] = 1;
        tds[idx].style.fontWeight = "bold";
    } else {
        excluding[idx] = 0;
        tds[idx].style.fontWeight = "normal";
    }
}

function toggleSorting(idx) {
    if (idx == 0) {
        sortMethod = 0;
        sortTds[0].style.fontWeight = "bold";
        sortTds[1].style.fontWeight = "normal";
    } else {
        sortMethod = 1;
        sortTds[1].style.fontWeight = "bold";
        sortTds[0].style.fontWeight = "normal";
    }
}
