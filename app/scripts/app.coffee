define ['jquery','stellar','html2canvas','blur','autosize'], ($)->
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
		$("a[href^=\"#\"], .nav > li > a, .section-up a, .section-down a").click (e) ->
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
			e.preventDefault()

		# Paralax
		$.stellar()

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
			link = img.attr "data-link"
			cap.children("p").first().append " <a href=\"#{link}\">Visit site ›</a>" if link