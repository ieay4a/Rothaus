var excludeTable;
var sortTable;
var excluding;
var sortMethod;
var tds;
var sortTds;
$(document).ready(function () {
    $('#category').selectmenu();
    $('input[type=checkbox]').checkboxradio();
    $('input[type=radio]').checkboxradio();
    
    var barcodePanel = $('#barcodePanel');
    excludeTable = document.getElementById('excludeTable');
    sortTable = document.getElementById('sortTable');
    excluding = [0, 0, 0, 0];
    sortMethod=0;

    barcodePanel.hide();
    $('#barcodeButton').click(function () {
        filterPanel.hide();
        barcodePanel.toggle();
    });

    var filterPanel = $('#filterPanel');
    filterPanel.hide();
    $('#filterButton').click(function () {
        barcodePanel.hide();
        filterPanel.toggle();
    });
    tds = excludeTable.rows[0].getElementsByTagName("td");
    tds[0].onclick = function () {
        console.log(0);
        toggleExcluding(0);
    };
    tds[1].onclick = function () {
        console.log(1);
        toggleExcluding(1);
    };
    tds[2].onclick = function () {
        console.log(2);
        toggleExcluding(2);
    };
    tds[3].onclick = function () {
        console.log(3);
        toggleExcluding(3);
    };
    sortTds=sortTable.rows[0].getElementsByTagName("td");
    sortTds[0].onclick=function(){
        toggleSorting(0);
    };
    sortTds[1].onclick=function(){
        toggleSorting(1);
    };
});

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
        sortMethod=0;
        sortTds[0].style.fontWeight = "bold";
        sortTds[1].style.fontWeight = "normal";
    } else {
        sortMethod=1;
        sortTds[1].style.fontWeight = "bold";
        sortTds[0].style.fontWeight = "normal";
    }
}
