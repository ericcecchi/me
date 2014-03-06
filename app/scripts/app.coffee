define ['jquery','stellar','autosize'], ($)->
	'use strict'

	$(document).ready ->
		# Smooth scrolling
		$('a[href="#design"],
			a[href="#development"],
			a[href="#education"],
			a[href="#contact-me"],
			a[href="#"]').click (e) ->
			e.preventDefault()
			anchor = $(this)
			if anchor.prop("href") == '#'
				offset = 0
			else if document.documentElement.clientWidth <= 480
				offset = $(anchor.attr("href")).offset().top
			else
				offset = $(anchor.attr("href")).offset().top
			$("html, body").stop().animate
				scrollTop: offset
				, 1000, "easeInOutQuart"

		# Paralax
		ua = navigator.userAgent
		isMobileWebkit = /WebKit/.test(ua) and /Mobile/.test(ua)

		$("html").addClass "mobile" if isMobileWebkit
		w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

		if isMobileWebkit or w < 768
			$.stellar
				horizontalScrolling: false,
				verticalScrolling: false
		else
			$.stellar
				horizontalScrolling: false

		# Hidden navbar
		$(".navbar").addClass 'open' if $(window).scrollTop() > 450
		$(window).on "scroll", ->
			scrolltop = $(this).scrollTop()
			if scrolltop > 450
				$(".navbar").addClass 'open'

			else $(".navbar").removeClass 'open' if scrolltop < 450

		# Design collection
		$('div[id$="-collection"] a[href$="-collection"]').click (e)->
			e.preventDefault()
			$('div[id^="overlay-"]').removeClass 'target'

		$('div[id$="-collection"] a[href^="#overlay-"]').click (e)->
			e.preventDefault()
			$('div[id^="overlay-"]').addClass 'target'
			img = $(this).children("img").first()

			src = img.prop "src"
			ext = src.slice -4
			name = src.slice 0, -4
			sectionOverlay = $(this).attr "href"
			$("#{sectionOverlay} img").prop "src", "#{name}-lg#{ext}"

			cap = $("#{sectionOverlay} .caption").first()
			cap.html $(this).children(".caption").first().html()
			link = img.data "link"
			cap.children("p").first().append " <a href=\"#{link}\">Visit site ›</a>" if link

		# Dynamic form stuff
		$("#first-name").change ()->
			$("#salutation").html $(this).val()

		$("#contact-type").change ()->
			switch $(this).val()
				when "texting", "calling"
					$("#contact-info").prop "placeholder", "312 865 5309"
					$("#contact-info").prop "type", "tel"
				when "yodeling to"
					$("#contact-info").prop "placeholder", "my address in the Himalayas"
					$("#contact-info").prop "type", "text"
				else
					$("#contact-info").prop "placeholder", "joe@example.com"
					$("#contact-info").prop "type", "email"

		# Textarea autosize
		$('textarea').autosize()

		# Text input autosize
		resizeInput = ->
			console.log "in resizeInput"
			$(this).prop "size", $(this).val().length + 1

		$("input[type=\"text\"], input[type=\"email\"]").keyup(resizeInput).each resizeInput

		# Form validation
		$.fn.checkRequired = (valid = true)->
			it = $(this)
			if it.is "form"
				for field in it.find("[required]")
					valid = $(field).checkRequired(valid)

			else if it.is "input, textarea"
				if it.val() == ''
					it.tooltip 'show'
					valid = false
				else
					it.tooltip 'hide'

			return valid

		$("[required]").blur ()->
			$(this).checkRequired()

		# Mandrill email
		$("#send-form").submit (e)->
			e.preventDefault()
			return false unless $(this).checkRequired()

			date = new Date()
			contact_info = "#{$('#contact-info').val()}"
			contact_type = "#{$('#contact-type').val()}"
			if contact_type == "emailing" and contact_info != ""
				from_email = contact_info
			else
				from_email = "me@ericcecchi.com"
			first_name = "#{$('#first-name').val()}"
			last_name = "#{$('#last-name').val()}"
			from_name = "#{first_name} #{last_name}"
			html =
				"
				<h1>New Message on EricCecchi.com</h1>
				<p>
				#{from_name} sent you a message on #{date}. #{first_name} wanted to #{$('#message-type').val()} about
				 #{$('#message-topic').val()}
				</p>
				<p>
				#{$('#message').val()}
				</p>
				<p>
				You can contact #{first_name} by #{contact_type} them at #{contact_info}.
				</p>
				"
			$("#submit-button").button "loading"
			$.ajax(
				url: "https://mandrillapp.com/api/1.0/messages/send.json",
				dataType: "json",
				data: {
					"key": "QK-uhXomdIRoi4_EXM9dwQ",
					"message": {
						"html": "#{html}",
						"text": "#{html}",
						"subject": "Contact on EricCecchi.com",
						"from_email": "#{from_email}",
						"from_name": "#{from_name}",
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
			).done (json)->
				resp = json[0]
				if resp['status'] not in ["sent", "queued", "scheduled"]
					alertClass = 'alert-warning'
					message = "The message failed to send: #{resp['reject_reason']}. Reload the page and try again."
					$("#submit-button").text "Send Failed"
				else
					alertClass = 'alert-success'
					message = "The message was sent successfully."
					$("#submit-button").text "Message Sent"

				$("#send-form").prepend "<div id=\"contact-alert\" class=\"alert fade in #{alertClass}\">
					<button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>
					<span class=\"message\">#{message}</span>
				</div>"