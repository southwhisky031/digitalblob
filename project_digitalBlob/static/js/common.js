//암호화
function generateSHA256(input) {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}

//페이지 이동
function goTopage(target) {
  $(".content").removeClass("shift");
  $(".lnb").removeClass("active");
  window.location.href = "/" + $(target).attr("id").replace("Btn", "");
}

//ESC시 Modal창 닫기
function escCloseModal() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      CloseModal();
    }
  });
}

// 모달창 닫기 //지우는 곳
function CloseModal(id = undefined) {
  if (id) {
    $(`#${id}`).remove();
    $("body").css("overflow", "auto");
    $(".dimmed:last").remove();
  } else {
    $("body").css("overflow", "auto");
    $(".dimmed").remove();
  }
}

// 모달창 열기
function OpenModal(
  title = "", //모달 타이틀
  id = "", // 고유 Id
  isConfirm = true, // 컨펌버튼 표시여부
  isCancle = true, // 취소버튼 표시여부
  confirmFn, // 컨펌 버튼에 전달할 함수
  confirmText = "확인", // 컨펌 버튼 텍스트
  cancleText = "취소", // 취소 버튼 텍스트
  closeBtn = false, // 우측상단 닫기버튼 표시여부
  size = "xs", //모달 사이즈 "md" / "lg"
  response_data = null
) {
  let contents = response_data;

  $("body").css("overflow", "hidden")
    .append(`<div class="dimmed"><div class='modal ${size}' id='${id}'>
      <div class="contents">${contents}</div>
      ${
        isConfirm || isCancle
          ? `<div class="btn-wrap">
          ${
            isCancle
              ? `<button class="btn secondary md"  onclick="CloseModal()">${cancleText}</button>`
              : ""
          }
          ${
            isConfirm
              ? `<button class="btn primary  md" onclick='${
                  confirmFn
                    ? confirmFn
                    : title === "발동 카드 정의 / 시나리오 구성"
                    ? 'location.href = "/scenario/create.html"'
                    : "CloseModal()"
                }'>${confirmText}</button>`
              : ""
          }</div>`
          : ""
      }
      </div></div>`);
}

function toggleMenu() {
  document.querySelector(".menu-toggle").classList.toggle("active");
}

//Header-Button Action
function moveToSection(id) {
  var offset = $(`#${id}`).offset(); //"footer" 라는 클래스 속성을 지닌 객체의 위치값을 변수에 지정
  $("html, body").animate({ scrollTop: offset.top }, 500);
  document.querySelector(".menu-toggle").classList.remove("active");
  id === "section4" ? $(".footer").show() : $(".footer").hide();
  id === "section4" ? (page = 3) : (page = page);
}

//Mobile Action

// 📌 페이지 이동 함수 (중복 실행 방지 추가)
function nextPage() {
  if (isScrolling || page >= lastPage) return;
  page++;
  scrollPage();
}

function prevPage() {
  if (isScrolling || page <= 0) return;
  page--;
  scrollPage();
}

function scrollPage() {
  isScrolling = true;
  wrap.style.transition = "top 0.5s ease-in-out"; // 부드러운 애니메이션 추가
  wrap.style.top = page * -100 + "vh";

  setTimeout(() => {
    isScrolling = false;
  }, 600); // 애니메이션 시간만큼 대기 후 다시 활성화
}

//emailJs
$(document).ready(function () {
  emailjs.init("MVF9rG3vMgvZ_gsAF");

  $("#sendEmail").click(function (e) {
    e.preventDefault(); // 기본 동작 방지
    console.log("버튼 클릭됨!");

    // 폼 검증 (간단하게)
    const name = $("input[name=name]").val().trim();
    const email = $("input[name=email]").val().trim();
    const tel = $("input[name=tel]").val().trim();
    const message = $("textarea[name=message]").val().trim();

    if (!name || !email || !tel || !message) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 버튼 상태 변경
    const $btn = $(this);
    const originalText = $btn.text();

    console.log("로딩 시작");
    $btn.prop("disabled", true).html("⏳ 전송 중...").css("opacity", "0.6");

    let today = new Date();

    var templateParams = {
      name: name,
      customer_number: tel,
      customer_email: email,
      customer_message: message,
      time: `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`,
    };

    console.log("EmailJS 전송 시작", templateParams);

    emailjs.send("service_v7jp6am", "template_jxd1bos", templateParams).then(
      function (response) {
        console.log("전송 성공!", response);

        // 버튼 복구
        $btn.prop("disabled", false).text(originalText).css("opacity", "1");

        alert("문의하기가 완료되었습니다!");
        $("#frm")[0].reset();
      },
      function (error) {
        console.log("전송 실패 상세:", error); // 더 자세한 로그
        console.log("에러 상태:", error.status);
        console.log("에러 텍스트:", error.text);

        // 버튼 복구
        $btn.prop("disabled", false).text(originalText).css("opacity", "1");

        alert("전송에 실패했습니다. 다시 시도해주세요.");
      }
    );
  });
});

// 폼 검증 함수 추가
function checkForm() {
  let isEmpty = false;
  $("#frm input[required], #frm textarea[required]").each(function () {
    if ($(this).val().trim() === "") {
      isEmpty = true;
      return false;
    }
  });
  return !isEmpty;
}

function checkForm(container_id) {
  $(`#${container_id} input, ${container_id} textarea`).each(function () {
    if ($(this).val().trim() === "") {
      // 값이 비어 있으면
      isEmpty = true;
    } else {
      isEmpty = false;
    }
  });
}

//회사소개서
function download_pdf() {
  const pdfPath = "../static/resource/test.pdf";
  const link = document.createElement("a");
  link.href = pdfPath;
  link.download = "디지털블롭_회사소개서.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
