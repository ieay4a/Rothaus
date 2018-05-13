var params = new URLSearchParams(location.search.substr(1));
var product;

if (params.has("productid"))
  product = products[params.get("productid")];

$(() => {

$(".productname")[0].text(product.name);
$(".contains")[0].append(
  product.contains.map (str => str + ", ") //needs change to icons
);
$(".price")[0].text(product.price + " KRW");

$("#ingredients ul")[0].append(
  products.ingredients.map(ing => $("<li>").text(ing)) //may need change, also?
);

var commentlist = $("#commentlist");
updateComment ();
function updateComment () {
  commentlist.empty();
  commentlist.append(
    products.comments.map (processComment)
  );
}
function processComment (comment) {
  return $('<li>').append(
    $("<div class='avatar'>").append ("<i class='fas fa-user-circle'>"),
    $("<div>").append(
      $("<div class='username'>").text(comment.username),
      $("<div class='content'>").text(comment.content),
      $("<button>").text("Reply")
    ),
    $("<ul>").append(comment.reply.map (processComment) )
  );
}

});
