$(document).ready(function () {
    $('#category').selectmenu();
    $('input[type=checkbox]').checkboxradio();
    $('input[type=radio]').checkboxradio();
    
    var barcodePanel = $('#barcodePanel');
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
});

