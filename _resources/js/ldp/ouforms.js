$(document).ready(function () {
	$(".ou-form [type='submit']").off('click').on('click', function () {
		var f_element = $(this);
		var bid = f_element.attr("id");
		var toRemove = 'btn_';
		var skid = bid.replace(toRemove, '');
		var form_data = $("#forms_" + skid).serialize();

		$("#form_" + skid).off('submit').on('submit', function (e) {
			e.preventDefault();
			$("#btn_"+skid).hide();

			$("#form_" + skid).append("<span id='spin'> <img src='/_resources/images/loading.gif' height='50' width='50'></img> Submitting, Please Wait .. </span>");

			// disable submit while waiting for server response, to prevent multiple submissions
			$("#btn_"+skid).hide();
			$("#clr_"+skid).hide();

			$("#form_" + skid + ".label-important").remove();

			if ($("#form_" + skid + " #hp"+ skid ).val().length > 0) {

			} else {

				// added for file uploads
				var $filesToValidate = $("#form_" + skid).find("input[type='file']");
				var allowSubmissionToConnector = true;
				var errorScroll = 0;
				if ($filesToValidate.length) {
					for (var i = 0; i < $filesToValidate.length; i++) {
						// check to make if there actually was a file selected
						if ($filesToValidate[i].files[0]) {
							// make sure the name is set and length less than 256 characters, the bytes are greater than 0 and less than 25mb
							if ($filesToValidate[i].files[0].name == "" || $filesToValidate[i].files[0].name.length > 256 || $filesToValidate[i].files[0].size == 0 || $filesToValidate[i].files[0].size > 26214400) {
								allowSubmissionToConnector = false;
								var $group = $("#" + $filesToValidate[i].getAttribute("name"));
								$group.addClass("has-error");
								var $errorMessage = document.createElement("span");
								$errorMessage.className = "label label-danger";
								$errorMessage.innerText = decodeURIComponent($filesToValidate[i].getAttribute("data-ou-error-message"));
								$("#" + $filesToValidate[i].getAttribute("name") + " .control-label").append($errorMessage);
								// focus and scroll to the first error element
								if (errorScroll === 0) {
									scrollToMiddle($group);
									$group.focus();
								}
								errorScroll = 1;
							}
						}
					}
				}
				if (allowSubmissionToConnector) {
					var formData = new FormData(this);
					$.ajax({
						type: "POST",
						cache: false,
						// added for file uploads
						contentType: false,
						processData: false,
						// added for file uploads
						url: "/_resources/scripts/ldp/forms.php", //form_submit.aspx
						data: formData,
						success: function (data) {
							var resultObj = jQuery.parseJSON(data);
							var errC = /[faultcode]+\s:/;
							var faultCode = errC.exec(resultObj.message);

							if (resultObj.active == false) {
								// remove the error elements so we can reset errors according to the new validation
								$("#form_" + skid + " .has-error").each(function(){
									$(this).removeClass("has-error");
									$(".label-danger", this).remove();
								});

								if (! this.faultCode) {
									$("#status_" + skid).addClass("alert alert-error");
									var dataSet = resultObj.message + "<br/>";
									$.each(resultObj.data, function (i, data) {
										var d = data.message;
										var $group = $("#" + data.name);
										$group.addClass("has-error");
										var errorHTML = '<span style="margin-left:8px;" class="label label-important" id="' + data.name + 'Error">' + data.message + '</span>';
										if ($('#' + data.name + 'Error').length == 0) {
											$("#" + data.name + " .control-label").append(errorHTML);
										}

										// focus and scroll to the first error element
										if (i === 0) {
											// $(window).scrollTop($group.offset().top);
											scrollToMiddle($group);
											$("#id_" + data.name).focus();
										}
									});
									$("#status_" + skid).html(dataSet);

									// re-enable submit button, so that user may fix errors and try again

									$("#btn_"+skid).show();
									$("#spin").remove();
								} else {
									var dataSet = resultObj.message + " " + resultObj.data[0].message;
									$("#status_" + skid).addClass("alert alert-error");
									$("#status_" + skid).html(dataSet);
									// $(window).scrollTop($("#status_" + skid).offset().top);
									scrollToMiddle($("#status_" + skid));

								}
							} else {
								if(typeof redirectPath != 'undefined' && redirectPath != ''){ //check if there is a url to redirect to when the form is submitted
									window.location.href = redirectPath;
								}else{
									$("#status_" + skid).removeClass("alert alert-error");
									$("#status_" + skid).addClass("alert alert-success");

									$("#form_" + skid).remove();
									$("#status_" + skid).html(resultObj.message);
									// $(document).scrollTop($("#status_" + skid).offset().top);
									scrollToMiddle($("#status_" + skid));
								}
							}
						},
						error: function (data) {
							//added for file uploads
							$("#btn_" + skid).show();
							$("#clr_" + skid).show();
							$("#spin").remove();
							$("#status_" + skid).addClass("alert alert-danger");
							$("#status_" + skid).html("The form was not able to be submitted. Please contact site admin.");
							scrollToMiddle($("#status_" + skid));
						}
					});
				}
				else {
					//added for file uploads
					$("#btn_" + skid).show();
					$("#clr_" + skid).show();
					$("#spin").remove();
					$("#status_" + skid).addClass("alert alert-danger");
					$("#status_" + skid).html(decodeURIComponent($("#form_" + skid).attr("data-ou-form-error")));
					scrollToMiddle($("#status_" + skid));
				}
				return false;
			}
		});
	});

	//	date/time picker configs

	if(typeof OUC !== "undefined" && typeof OUC.dateTimePickers !== "undefined"){

		$.datetimepicker.setLocale('en');

		$(OUC.dateTimePickers).each(function(index, options){

			if(options.format == "datetime"){
				$(options.id).datetimepicker({
					value: options.default,
					format: 'm/d/y g:i A',
					formatTime: 'g:i A',
					step: 15
				});
			}
			else if(options.format == "date"){
				$(options.id).datetimepicker({
					value: options.default,
					timepicker:false,
					format:'m/d/Y',
					step: 15
				});
			}
			else if(options.format == "time"){
				$(options.id).datetimepicker({
					value: options.default,
					datepicker:false,
					format:'g:i A',
					formatTime: 'g:i A',
					step: 15
				});
			}
		});
	}

	scrollToMiddle = function(elem){
		var top = elem.offset().top;
		var speed = 700;
		var elOffset = elem.offset().top;
		var elHeight = elem.height();
		var winHeight = $(window).height();
		var offset;

		if (elHeight < winHeight) {
			offset = elOffset - ((winHeight / 2) - (elHeight / 2));
		}else{
			offset = elOffset;
		}

		$('html, body').animate({scrollTop:offset}, speed);
	};


});