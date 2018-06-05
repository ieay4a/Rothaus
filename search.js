$(() => {
    var searchinput = $('#searchinput');
    var category = $('#category');

    category.selectmenu();
    $('input[type=checkbox]').checkboxradio();
    $('input[type=radio]').checkboxradio();
    $('#filter input').change (updateSearch);
    $('#searchButton').click (updateSearch);
    searchinput.change (updateSearch);

    searchinput.autocomplete({
        source: products.map((product, i) => {return {value:product.name, pid:i};}),
        select: function (e, ui) {
            window.location.href = 'product.html?productid=' + ui.item.pid;
        },
    });

    var resultlist = $('#resultlist');
    var trendinglist = $('#trendinglist');
    var newlist = $('#newlist');
    resultlist.parent().parent().hide();

    //How to revert to suggenstions??
    function updateSearch () {
        resultlist.parent().parent().show();
        trendinglist.parent().parent().hide();
        newlist.parent().parent().hide();
        resultlist.empty();

        results = Object.keys(products).filter (pid =>
            ! products[pid].contains.some (ing => $("#"+ing).prop("checked"))
        );
        var query = searchinput.val();
        if (query)
            results = results.filter (pid => products[pid].name.indexOf(query) >= 0);
        if ($('#byprice').prop("checked"))
            results.sort((a,b) => products[a].price - products[b].price);
        if (! results.length) resultlist.text("No results")
        else resultlist.append(results.map(pid_to_product));
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


    $("#barcodeSearchButton").click (() => {
        var val = $("#barcodeInput").val();
        if (val.length != 13) return;
        var barcode = parseInt(val);
        var pid = Object.keys(products).find (pid => products[pid].barcode == barcode);
        window.location.href = 'product.html?productid=' + pid;
    });

    $("#barcodeUpload").change(e => {
        var inst = $("#barcodeInstruction").text("Decoding...Please wait");
        var input = $("#barcodeInput").val("");

        if (e.target.files && e.target.files.length) {
            Quagga.decodeSingle ({
                decoder: {readers: ["ean_reader"]},
                locate: true,
                src: URL.createObjectURL(e.target.files[0]),
            }, function (result) {
                if (! result.codeResult.code) {
                    inst.html("<p>Sorry, we couldn't recognize your barcode.</p>\n" +
                        "<p>Please take the photo again, or enter the number manually.</p>");
                } else {
                    input.val(result.codeResult.code);
                    inst.text("Is the following correct?");
                }
            });
        }
    });

    $("#barcodeInput").change(()=>{
        if ($("#barcodeInput").val().length == 13)
            $("#barcodeSearchButton").addClass("greyout");
        else $("#barcodeSearchButton").removeClass("greyout");
    });
});