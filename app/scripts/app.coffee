define ['jquery','stellar','html2canvas','blur','autosize','validate'], ($)->
	'use strict';
	console.log "'Allo from CoffeeScript!"

	$(document).ready ->
		# Textarea autosize
		$('textarea').autosize()

		# Text input autosize
		resizeInput = ->
			$(this).attr "size", $(this).val().length + 1

		$("input[type=\"text\"], input[type=\"email\"]").keyup(resizeInput).each resizeInput

		# Smooth scrolling
		$('a[href="#design"],
			a[href="#development"],
			a[href="#education"],
			a[href="#contact-me"],
			a[href="#"]').click (e) ->
			e.preventDefault()
			anchor = $(this)
			if anchor.attr("href") == '#'
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
		$ ->
			if isMobileWebkit
				# iScrollInstance = new iScroll("wrapper")
				# $("#scroller").stellar
				# 	scrollProperty: "transform"
				# 	positionProperty: "transform"
				# 	horizontalScrolling: false

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

		# Blurred navbar background
		# html2canvas document.body,
		# 	onrendered: (canvas) ->
		# 		$("#page-canvas").html canvas
		# 		canvas = document.getElementById("page-canvas").firstChild
		# 		$("#page-img").css 'background-image', "url("+canvas.toDataURL()+")"
		# 		$(".navbar").blurjs
		# 			source: "#page-img"
		# 			radius: 7
		# 			overlay: "rgba(255,255,255,0.4)"

		# Design collection
		$('div[id$="-collection"] a[href$="-collection"]').click (e)->
			e.preventDefault()
			$('div[id^="overlay-"]').removeClass 'target'

		$('div[id$="-collection"] a[href^="#overlay-"]').click (e)->
			e.preventDefault()
			$('div[id^="overlay-"]').addClass 'target'
			img = $(this).children("img").first()

			src = img.attr "src"
			ext = src.slice -4
			name = src.slice 0, -4
			sectionOverlay = $(this).attr "href"
			$("#{sectionOverlay} img").prop "src", "#{name}-lg#{ext}"
			console.log "Changed image"

			cap = $("#{sectionOverlay} .caption").first()
			cap.html $(this).children(".caption").first().html()
			link = img.data "link"
			cap.children("p").first().append " <a href=\"#{link}\">Visit site ›</a>" if link

		# Mandrill email
		$("#send-form").validate
			# showErrors: (errorMap, errorList)->
			# 	for error in errorList
			# 		$(error['element']).tooltip('show')

			# success: (label, element)->
			# 	$(element).tooltip('destroy')

			submitHandler: (form)->
				$(form).submit (e)->
					e.preventDefault()
					return false unless $(this).valid()
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
						You can contact #{first_name} by #{contact_type} them at #{from_email}.
						</p>
						"
					$("#submit-button").button "loading"
					$.ajax(
						url: "https://mandrillapp.com/api/1.0/messages/send.json",
						type: "POST",
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
							$("#contact-alert .message").first().html resp['reject_reason']
							$("#submit-button").text "Send Failed"
						else
							$("#submit-button").text "Message Sent"
						$("#contact-alert").addClass 'in'
