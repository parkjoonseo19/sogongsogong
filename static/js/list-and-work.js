$("#add-list-button").click(function () {
  $("#form-container").show();
});

$("#save-list-button").click(function () {
  var listname = $("#new_list_listname").val();
  $.ajax({
    type: "POST",
    url: "addList/",
    data: {
      listname: listname,
      csrfmiddlewaretoken: "{{ csrf_token }}",
    },
    success: function (data) {
      if (data.status === "success") {
        $("#list-and-work").append("<div>" + data.new_list_listname + "</div>");
      }
      $("#form-container").hide();
      $("#new_list_listname").val("");
    },
  });
});
