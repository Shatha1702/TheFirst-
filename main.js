$(document).ready(function () {
    if (typeof startWowSlider === "function") {
        startWowSlider();
    }

    $("form").on("submit", function (event) {
        event.preventDefault();

        var valid = true;
        var form = $(this);

        form.find("[required]").each(function () {
            if (!$(this).val().trim()) {
                valid = false;
            }
        });

        if (form.attr("id") === "registerForm") {
            var password = $("#password").val();
            var confirmPassword = $("#confirm").val();

            if (password.length < 6 || password !== confirmPassword) {
                valid = false;
            }
        }

        if (form.attr("id") === "contactForm") {
            var email = $("#contactEmail").val();

            if (email.indexOf("@") === -1) {
                valid = false;
            }
        }

        if (valid) {
            showToast("تم تنفيذ العملية بنجاح ✅", "success");
            form[0].reset();
        } else {
            showToast("تأكدي من البيانات المطلوبة ❌", "error");
        }
    });

    $(".card").hover(
        function () {
            $(this).css("transform", "translateY(-4px)");
        },
        function () {
            $(this).css("transform", "translateY(0)");
        }
    );
});

function openModal(fileName) {
    $.ajax({
        url: "../modals/" + fileName,
        type: "GET",
        success: function (data) {
            $("#modalBody").html(data);
            $("#modalBox").css("display", "flex");
        },
        error: function () {
            $("#modalBody").html(
                "<h2>Sweet Cake 🍰</h2>" +
                "<p>هذه تفاصيل المنتج. الكيك طازج ومحضر بعناية.</p>" +
                "<button class='btn' onclick='closeModal()'>إغلاق</button>"
            );
            $("#modalBox").css("display", "flex");
        }
    });
}

function closeModal() {
    $("#modalBox").hide();
}
