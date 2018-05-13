$(document).ready(function () {
    var barcodePanel = $('#barcodePanel');

    barcodePanel.hide();
    $('#barcodeButton').click(function () {
        filterPanel.hide();
        barcodePanel.toggle();
    })

    var filterPanel = $('#filterPanel');
    filterPanel.hide();
    $('#filterButton').click(function () {
        barcodePanel.hide();
        filterPanel.toggle();
    })
});
