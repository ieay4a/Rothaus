var params = new URLSearchParams(location.search.substr(1));
var product;

if (params.has("productid"))
  product = products[params.get("productid")];

$(() => {
$("img").attr("src", product.img);
$(".productname").text(product.name);
$(".contains").append(
  product.contains.map (str => str + ", ") //needs change to icons
);
$(".price").text(product.price + " KRW");

$("#ingredients ul").append(
  product.ingredients.map(ing => $("<li>").text(ing)) //may need change, also?
);

var commentlist = $("#commentlist");
updateComment ();
function updateComment () {
  commentlist.empty();
  commentlist.append(
    product.comments.map (processComment)
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
    $("<ul>").append(comment.reply && comment.reply.map (processComment) )
  );
}

});
