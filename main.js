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
