$(document).ready(function(){

  $('form').on('submit', function(){

      var url = $('form input');
      var todo = {url: url.val()};

      $.ajax({
        type: 'POST',
        url: '/api/url',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          $('a').text(data.url);
          $('a').attr("href", data.url);
          $('#copyUrl').css("display", "block");
        }
      });

      return false;

  });

});

  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    alert("Copied Url- "+$(element).text());
  }