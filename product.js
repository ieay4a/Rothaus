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
  var button = $("<button>");
  return $('<li>').append(
    $("<div class='avatar'>").append ("<i class='fas fa-user-circle'>"),
    $("<div>").append(
      $("<div class='username'>").text(comment.username),
      $("<div class='content'>").text(comment.content),
      button.click(() => {
        var textarea = $("<textarea placeholder='Leave your reply here'>");
        button.after($("<div>").append(
          $("<div class='button'><i class='fas fa-reply'></i></div>").click(()=>{
            if (! comment.reply) comment.reply = [];
            comment.reply.unshift({username:"Jean-Pierre", content: textarea.val()});
            updateComment();
          }),
          $("<div class='inputbox'>").append(textarea)
        ));
        button.remove();
      }).text("Reply")
    ),
    $("<ul>").append(comment.reply && comment.reply.map (processComment) )
  );
}

$("#comments > .button").click(() => {
  product.comments.unshift({
    username: "Jean-Pierre",
    content: $("#comments > .inputbox > textarea").val(),
  });
  updateComment();
});

});
