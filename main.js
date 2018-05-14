$(document).ready(function () {
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
    
    
    var searchinput = $('#searchinput');
    var category = $('#category');
    var exclude = $('#filter').prop('exclude');
    var sortby = $('#filter').prop('sort');

    category.selectmenu();
    $('input[type=checkbox]').checkboxradio();
    $('input[type=radio]').checkboxradio();
    $('#filter input').change (updateSearch);
    $('#searchButton').click (updateSearch);
    searchinput.change (updateSearch);


    var resultlist = $('#resultlist');
    var trendinglist = $('#trendinglist');
    var newlist = $('#newlist');
    resultlist.parent().hide();

    //How to revert to suggenstions??
    function updateSearch () {
        resultlist.parent().show();
        trendinglist.parent().hide();
        newlist.parent().hide();
        resultlist.empty();

        results = Object.keys(products).filter (pid =>
            ! products[pid].contains.some (ing => $("#"+ing).prop("checked"))
        );
        resultlist.append(results.map(pid_to_product));
    }

    trendings = [1, 3, 5];
    news = [2, 4, 6];
    trendinglist.append (
        trendings.map(pid_to_product)
    )
    newlist.append (
        news.map(pid_to_product)
    )

    function pid_to_product (pid) {
	var p = products[pid];
	return $('<li>').append(
	$('<a href="product.html?productid='+pid+'">').append(
		$('<img>').attr('src', p.img),
		$('<div class="productname">').text(p.name),
		$('<span class="contains">').append(p.contains),
		$('<span class="price">').text(p.price + " KRW")
	));
    }
});


