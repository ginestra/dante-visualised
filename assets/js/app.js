$(document).ready(function() {
  // Expand collapse toggle
  $('.collapser').bind("click", function() {
    $(this).next('.collapsible').slideToggle(400).toggleClass("hide");
    return false;
  });
});