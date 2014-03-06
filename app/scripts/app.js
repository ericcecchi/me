(function() {
  define(['jquery', 'stellar', 'autosize'], function($) {
    'use strict';
    return $(document).ready(function() {
      var isMobileWebkit, resizeInput, ua, w;
      $('a[href="#design"],\
			a[href="#development"],\
			a[href="#education"],\
			a[href="#contact-me"],\
			a[href="#"]').click(function(e) {
        var anchor, offset;
        e.preventDefault();
        anchor = $(this);
        if (anchor.prop("href") === '#') {
          offset = 0;
        } else if (document.documentElement.clientWidth <= 480) {
          offset = $(anchor.attr("href")).offset().top;
        } else {
          offset = $(anchor.attr("href")).offset().top;
        }
        return $("html, body").stop().animate({
          scrollTop: offset
        }, 1000, "easeInOutQuart");
      });
      ua = navigator.userAgent;
      isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
      if (isMobileWebkit) {
        $("html").addClass("mobile");
      }
      w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (isMobileWebkit || w < 768) {
        $.stellar({
          horizontalScrolling: false,
          verticalScrolling: false
        });
      } else {
        $.stellar({
          horizontalScrolling: false
        });
      }
      if ($(window).scrollTop() > 450) {
        $(".navbar").addClass('open');
      }
      $(window).on("scroll", function() {
        var scrolltop;
        scrolltop = $(this).scrollTop();
        if (scrolltop > 450) {
          return $(".navbar").addClass('open');
        } else {
          if (scrolltop < 450) {
            return $(".navbar").removeClass('open');
          }
        }
      });
      $('div[id$="-collection"] a[href$="-collection"]').click(function(e) {
        e.preventDefault();
        return $('div[id^="overlay-"]').removeClass('target');
      });
      $('div[id$="-collection"] a[href^="#overlay-"]').click(function(e) {
        var cap, ext, img, link, name, sectionOverlay, src;
        e.preventDefault();
        $('div[id^="overlay-"]').addClass('target');
        img = $(this).children("img").first();
        src = img.prop("src");
        ext = src.slice(-4);
        name = src.slice(0, -4);
        sectionOverlay = $(this).attr("href");
        $("" + sectionOverlay + " img").prop("src", "" + name + "-lg" + ext);
        cap = $("" + sectionOverlay + " .caption").first();
        cap.html($(this).children(".caption").first().html());
        link = img.data("link");
        if (link) {
          return cap.children("p").first().append(" <a href=\"" + link + "\">Visit site ›</a>");
        }
      });
      $("#first-name").change(function() {
        return $("#salutation").html($(this).val());
      });
      $("#contact-type").change(function() {
        switch ($(this).val()) {
          case "texting":
          case "calling":
            $("#contact-info").prop("placeholder", "312 865 5309");
            return $("#contact-info").prop("type", "tel");
          case "yodeling to":
            $("#contact-info").prop("placeholder", "my address in the Himalayas");
            return $("#contact-info").prop("type", "text");
          default:
            $("#contact-info").prop("placeholder", "joe@example.com");
            return $("#contact-info").prop("type", "email");
        }
      });
      $('textarea').autosize();
      resizeInput = function() {
        console.log("in resizeInput");
        return $(this).prop("size", $(this).val().length + 1);
      };
      $("input[type=\"text\"], input[type=\"email\"]").keyup(resizeInput).each(resizeInput);
      $.fn.checkRequired = function(valid) {
        var field, it, _i, _len, _ref;
        if (valid == null) {
          valid = true;
        }
        it = $(this);
        if (it.is("form")) {
          _ref = it.find("[required]");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            field = _ref[_i];
            valid = $(field).checkRequired(valid);
          }
        } else if (it.is("input, textarea")) {
          if (it.val() === '') {
            it.tooltip('show');
            valid = false;
          } else {
            it.tooltip('hide');
          }
        }
        return valid;
      };
      $("[required]").blur(function() {
        return $(this).checkRequired();
      });
      return $("#send-form").submit(function(e) {
        var contact_info, contact_type, date, first_name, from_email, from_name, html, last_name;
        e.preventDefault();
        if (!$(this).checkRequired()) {
          return false;
        }
        date = new Date();
        contact_info = "" + ($('#contact-info').val());
        contact_type = "" + ($('#contact-type').val());
        if (contact_type === "emailing" && contact_info !== "") {
          from_email = contact_info;
        } else {
          from_email = "me@ericcecchi.com";
        }
        first_name = "" + ($('#first-name').val());
        last_name = "" + ($('#last-name').val());
        from_name = "" + first_name + " " + last_name;
        html = "				<h1>New Message on EricCecchi.com</h1>				<p>				" + from_name + " sent you a message on " + date + ". " + first_name + " wanted to " + ($('#message-type').val()) + " about				 " + ($('#message-topic').val()) + "				</p>				<p>				" + ($('#message').val()) + "				</p>				<p>				You can contact " + first_name + " by " + contact_type + " them at " + contact_info + ".				</p>				";
        $("#submit-button").button("loading");
        return $.ajax({
          url: "https://mandrillapp.com/api/1.0/messages/send.json",
          dataType: "json",
          data: {
            "key": "QK-uhXomdIRoi4_EXM9dwQ",
            "message": {
              "html": "" + html,
              "text": "" + html,
              "subject": "Contact on EricCecchi.com",
              "from_email": "" + from_email,
              "from_name": "" + from_name,
              "to": [
                {
                  "email": "me@ericcecchi.com",
                  "name": "Eric Cecchi"
                }
              ],
              "headers": {
                "Reply-To": "me@ericcecchi.com"
              }
            }
          }
        }).done(function(json) {
          var alertClass, message, resp, _ref;
          resp = json[0];
          if ((_ref = resp['status']) !== "sent" && _ref !== "queued" && _ref !== "scheduled") {
            alertClass = 'alert-warning';
            message = "The message failed to send: " + resp['reject_reason'] + ". Reload the page and try again.";
            $("#submit-button").text("Send Failed");
          } else {
            alertClass = 'alert-success';
            message = "The message was sent successfully.";
            $("#submit-button").text("Message Sent");
          }
          return $("#send-form").prepend("<div id=\"contact-alert\" class=\"alert fade in " + alertClass + "\">					<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>					<span class=\"message\">" + message + "</span>				</div>");
        });
      });
    });
  });

}).call(this);
