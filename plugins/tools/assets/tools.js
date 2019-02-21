$(document).on('rex:ready',function() {

    $("select[data-yform-tools-select2]").each(function () {
        var options = $(this).attr('data-yform-tools-select2');
        var placeholder = $(this).attr("placeholder");
        if (options == "tags") {
            options = {"theme":"bootstrap", placeholder: placeholder, allowClear: true, tags: true, tokenSeparators: [','] };
        } else {
            options = {"theme":"bootstrap", placeholder: placeholder, allowClear: true };
        }
        $(this).select2(options);
    });

    $("input[data-yform-tools-inputmask]").each(function () {
        var format = $(this).attr('data-yform-tools-inputmask');
        if (format != "") {
            format = format.toLowerCase();
            $(this).inputmask(format);
        }
    });

    var locale = {
            "format": "DD.MM.YYYY",
            "separator": " - ",
            "weekLabel": "W",
            "daysOfWeek": [
                "So",
                "Mo",
                "Di",
                "Mi",
                "Do",
                "Fr",
                "Sa"
              ],
              "monthNames": [
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember"
              ],
              "firstDay": 1
          };


    $("input[data-yform-tools-datepicker]").each(function () {
        var format = $(this).attr('data-yform-tools-datepicker');
        locale.format = format;
        if (format != "") {
            $(this).daterangepicker({
                "autoUpdateInput": true,
                "singleDatePicker": true,
                "showDropdowns": true,
                "showWeekNumbers": true,
                "showISOWeekNumbers": true,
                "autoApply": true,
                "locale": locale
              });

        }
    });

    $("input[data-yform-tools-datetimepicker]").each(function () {
        var format = $(this).attr('data-yform-tools-datetimepicker');
        if (format != "") {
            // ii -> mm
            var format = format.replace("ii", "mm");
			locale.format = format;
            $(this).daterangepicker({
                "timePicker": true,
                "timePicker24Hour": true,
                "timePickerSeconds": false,
                "singleDatePicker": true,
                "showDropdowns": true,
                "showWeekNumbers": true,
                "showISOWeekNumbers": true,
                "autoApply": true,
				"autoUpdateInput": true,
                "locale": locale
              }, function(start, end, label) {
                  // console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
              })
              .on('apply.daterangepicker', function(e, picker) {

                  var format = $(this).attr('data-yform-tools-datetimepicker');
                  var format = format.replace("ii", "mm");
                  if (format != "") {
                      $(this).val(picker.startDate.format(format));
                  }

              });
        }
    });


    $("input[data-yform-tools-daterangepicker]").each(function () {
        var format = $(this).attr('data-yform-tools-daterangepicker');
        if (format != "") {
            var format = format.replace("ii", "mm");
			locale.format = format;
            $(this).daterangepicker({
                "autoUpdateInput": true,
                "showDropdowns": true,
                "showWeekNumbers": true,
                "showISOWeekNumbers": true,
                "linkedCalendars": false,
	            "autoApply": true,
                "ranges": {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    'This Year': [moment().startOf('year'), moment().endOf('year')],
                    'Last Year': [moment().subtract(365, 'days').startOf('year'), moment().subtract(365, 'days').endOf('year')],
                },
                "locale": locale
            }, function (start, end, label) {
                // console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");

            }).on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format(format) + ' - ' + picker.endDate.format(format));

            }).on('cancel.daterangepicker', function(ev, picker) {
                $(this).val('');

            });
        }
    })

});