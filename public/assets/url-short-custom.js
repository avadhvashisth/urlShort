$(document).ready(function(){

  $('form').on('submit', function(){

      var url = $('form input[name=url]');
      var name = $('form input[name=name]');
      var todo = {url: url.val(), name: name.val()};

      $.ajax({
        type: 'POST',
        url: '/api/custom',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          $('#myInput').text(data.url);
          $('#myInput').attr("href", data.url);
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
    //alert("Copied Url- "+$(element).text());
  }