// 없는 회원이면 팝업
$(document).ready(function () {
  $("#btnlogin").click(function () {
    const inputID = $("#inputID").val();
    const inputPW = $("#inputPW").val();

    $.ajax({
      type: "POST",
      url: "/",
      data: {
        inputID: inputID,
        inputPW: inputPW,
        csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
      },
      dataType: "json",
      success: function (response) {
        if (response.is_authenticated) {
          window.location.href = "todolist/"; // 로그인 이후창 (작업목록창)
        } else {
          alert("등록되지 않은 회원입니다.");
        }
      },
      error: function (error) {
        alert("서버 에러 발생");
      },
    });
  });
});
