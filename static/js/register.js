// 아이디 중복 팝업창
$(document).ready(function () {
  $("#check-ID-dup").click(function () {
    var username = $("#inputRegID").val();

    $.ajax({
      type: "POST",
      url: "/signup/",
      data: {
        inputRegID: username,
        checkIDdup: true,
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
      },
      dataType: "json",
      success: function (response) {
        if (response.exists) {
          alert("이미 사용 중인 아이디입니다.");
        } else {
          alert("사용 가능한 아이디입니다.");
        }
      },
      error: function (error) {
        alert("서버 에러 발생");
      },
    });
  });
});

// 회원가입 버튼 클릭시 비번 2개 동일한지 확인 -> 일치하지 않으면 팝업창
$(document).ready(function () {
  $("#btnTryReg").click(function (e) {
    var inputRegPW = $("#inputRegPW").val();
    var repeat = $("#repeat").val();

    if (inputRegPW !== repeat) {
      e.preventDefault();
      alert("비밀번호가 일치하지 않습니다.");
    }
  });
});

/*
$(document).ready(function () {
  $("#repeat").keyup(function () {
    var inputRegPW = $("#inputRegPW").val();
    var repeat = $(this).val();

    if (inputRegPW !== repeat && repeat.length > 0) {
      $("#pwError").text("비밀번호가 일치하지 않습니다.");
    } else {
      $("#pwError").empty();
    }
  });
});
*/
