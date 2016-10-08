/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function zgfm_format_date(date){
    var date1 = new Date(date);
    var tmp_result = date1.getDate()+'/'+(date1.getMonth()+1)+'/'+date1.getFullYear();
    return tmp_result;
}


"use strict";

var ZGFMcalendar = React.createClass({
    displayName: "ZGFMcalendar",

    getInitialState: function getInitialState() {

        return {
            start_date: this.props.zgfmStartDate,
            cur_year: this.props.zgfmCurYear,
            sel_date: this.props.zgfmSelDate,
            cur_month: this.props.zgfmCurMonth,
            cur_day: this.props.zgfmCurDay,
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            dayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        };
    },
    checkDateInRange: function checkDateInRange(dateToCheck, monthToCheck, yearTocheck) {

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var input1;

        var input2;

        if (parseInt(this.props.zgfmtype) === 1) {
            input1 = this.state.sel_date;
            input2 = this.props.zgfmSelDateOther;
        } else {
            input2 = this.state.sel_date;
            input1 = this.props.zgfmSelDateOther;
        }

        var start = new Date(input1);

        start.setHours(12);
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);

        var end = new Date(input2);

        end.setHours(12);
        end.setMinutes(0);
        end.setSeconds(0);
        end.setMilliseconds(0);

        var toCheck = new Date();
        toCheck.setYear(parseInt(yearTocheck));
        toCheck.setMonth(parseInt(monthToCheck));
        toCheck.setDate(parseInt(dateToCheck));
        toCheck.setHours(12);
        toCheck.setMinutes(0);
        toCheck.setSeconds(0);
        toCheck.setMilliseconds(0);

        if (parseInt(this.props.zgfmtype) === 1) {
            return start < toCheck && toCheck <= end;
        } else {

            return start <= toCheck && toCheck < end;
        }
    },
    renderDays: function renderDays() {
        var sel_date = this.state.sel_date;
        var sel_day = sel_date.getDate();
        var sel_month = sel_date.getMonth();
        var sel_year = sel_date.getFullYear();
        var date1 = this.state.start_date;
        var day = date1.getDate();
        var month = date1.getMonth();
        var year = date1.getFullYear();
        var months = this.state.monthNames;
        var this_month = new Date(year, month, 1);
        var next_month = new Date(year, month + 1, 1);
        var first_week_day = this_month.getDay();
        var days_in_this_month = Math.round((next_month.getTime() - this_month.getTime()) / (1000 * 60 * 60 * 24));
        var classWeek = '';
        var html_show_days = [];
        var cal_counter = 1;

        for (week_day = 0; week_day < first_week_day; week_day++) {
            classWeek = '';
            if (parseInt(cal_counter) === 1) {
                classWeek = 'zgfm-calendar-weekend';
            }
            html_show_days.push(React.createElement(
                "span",
                { key: cal_counter, className: classWeek },
                " "
            ));
            cal_counter++;
        }

        var day_counter;
        var wDate;
        var classWeek_tmp;
        for (day_counter = 1; day_counter <= days_in_this_month; day_counter++) {

            wDate = new Date(date1.getFullYear(), date1.getMonth(), day_counter);
            classWeek = '';
            classWeek_tmp = [];
            if (wDate.getDay() == 0 || wDate.getDay() == 6) {
                classWeek_tmp.push("zgfm-calendar-weekend");
            }

            if (this.checkDateInRange(day_counter, month, year) === true) {
                classWeek_tmp.push("zgfm-calendar-in-range");
            }

            if (sel_day == day_counter && sel_month == month && sel_year == year) {
                classWeek_tmp.push("zgfm-calendar-cur-day");
                classWeek = classWeek_tmp.join(" ");
                html_show_days.push(React.createElement(
                    "span",
                    { key: cal_counter, onClick: this.handleDayClick.bind(this, day_counter),
                        className: classWeek },
                    day_counter
                ));
            } else {
                classWeek = classWeek_tmp.join(" ");
                html_show_days.push(React.createElement(
                    "span",
                    { key: cal_counter, onClick: this.handleDayClick.bind(this, day_counter),
                        className: classWeek },
                    day_counter
                ));
            }
            cal_counter++;
        }
        if (cal_counter < 43) {
            for (var i = cal_counter; i < 43; i++) {
                classWeek = '';
                if (!(cal_counter % 7) || parseInt(cal_counter) === 36) {
                    classWeek = 'zgfm-calendar-weekend';
                }
                html_show_days.push(React.createElement(
                    "span",
                    { key: i, className: classWeek },
                    " "
                ));
                cal_counter++;
            }
        }
        return React.createElement(
            "div",
            null,
            html_show_days
        );
    },
    handleDayClick: function handleDayClick(day) {
        var CurrentDate = this.state.start_date;
        var date2 = new Date(CurrentDate);

        date2.setHours(12);
        date2.setMinutes(0);
        date2.setSeconds(0);
        date2.setMilliseconds(0);
        date2.setDate(day);

        var selDate = this.state.sel_date;
        var date3 = new Date(selDate);

        date3.setHours(12);
        date3.setMinutes(0);
        date3.setSeconds(0);
        date3.setMilliseconds(0);
        date3.setDate(day);

        this.setState({
            start_date: date2,
            sel_date: date3,
            cur_year: date2.getFullYear(),
            cur_month: date2.getMonth(),
            cur_day: date2.getDate()

        });

        this.props.onChangeDay(this.props.zgfmtype, date3);
    },
    renderDayNames: function renderDayNames() {

        var html_list = this.state.dayNames.map(function (name, i) {
            return React.createElement(
                "span",
                null,
                " ",
                name
            );
        });
        return React.createElement(
            "div",
            { className: "zgfm-calendar-row" },
            React.createElement(
                "div",
                { className: "zgfm-calendar-week" },
                React.createElement(
                    "span",
                    null,
                    "su"
                ),
                React.createElement(
                    "span",
                    null,
                    "mo"
                ),
                React.createElement(
                    "span",
                    null,
                    "tu"
                ),
                React.createElement(
                    "span",
                    null,
                    "we"
                ),
                React.createElement(
                    "span",
                    null,
                    "th"
                ),
                React.createElement(
                    "span",
                    null,
                    "fr"
                ),
                React.createElement(
                    "span",
                    null,
                    "sa"
                )
            )
        );
    },
    getcurrentMonthName: function getcurrentMonthName() {
        var month_i = this.state.cur_month;
        var months = this.state.monthNames;
        var get_name = months[month_i];

        return React.createElement(
            "span",
            null,
            get_name,
            " , ",
            this.state.cur_year
        );
    },
    onPrevious: function onPrevious() {
        var CurrentDate = this.state.start_date;
        var date2 = CurrentDate.getDate();
        CurrentDate.setMonth(CurrentDate.getMonth() - 1);

        var selDate = this.state.sel_date;
        var date3 = CurrentDate.getDate();
        selDate.setMonth(selDate.getMonth() - 1);

        var flag = true;
        var input1;
        var input2;
        if (parseInt(this.props.zgfmtype) === 1) {
            input1 = new Date(this.state.start_date);
            input2 = new Date(this.props.zgfmSelDateOther);
        } else {
            input2 = new Date(this.state.start_date);
            input1 = new Date(this.props.zgfmSelDateOther);
        }

        input1.setHours(12);
        input1.setMinutes(0);
        input1.setSeconds(0);
        input1.setMilliseconds(0);
        input1.setDate(1);

        input2.setHours(12);
        input2.setMinutes(0);
        input2.setSeconds(0);
        input2.setMilliseconds(0);
        input2.setDate(1);

        if (input1 > input2 || input2 < input1) {
            flag = false;
        }
        if (flag) {
            this.setState({
                start_date: CurrentDate,
                sel_date: selDate,
                cur_year: CurrentDate.getFullYear(),
                cur_month: CurrentDate.getMonth(),
                cur_day: CurrentDate.getDate()
            });

            this.props.onChangeDay(this.props.zgfmtype, selDate);
        }
    },
    onNext: function onNext() {
        var CurrentDate = this.state.start_date;
        var date2 = CurrentDate.getDate();
        CurrentDate.setMonth(CurrentDate.getMonth() + 1);

        var selDate = this.state.sel_date;
        var date3 = CurrentDate.getDate();
        selDate.setMonth(selDate.getMonth() + 1);

        var flag = true;
        var input1;
        var input2;
        if (parseInt(this.props.zgfmtype) === 1) {
            input1 = new Date(this.state.start_date);
            input2 = new Date(this.props.zgfmSelDateOther);
        } else {
            input2 = new Date(this.state.start_date);
            input1 = new Date(this.props.zgfmSelDateOther);
        }

        input1.setHours(12);
        input1.setMinutes(0);
        input1.setSeconds(0);
        input1.setMilliseconds(0);
        input1.setDate(1);

        input2.setHours(12);
        input2.setMinutes(0);
        input2.setSeconds(0);
        input2.setMilliseconds(0);
        input2.setDate(1);

        if (input1 > input2 || input2 < input1) {
            flag = false;
        }

        if (flag) {
            this.setState({
                start_date: CurrentDate,
                sel_date: selDate,
                cur_year: CurrentDate.getFullYear(),
                cur_month: CurrentDate.getMonth(),
                cur_day: CurrentDate.getDate()
            });

            this.props.onChangeDay(this.props.zgfmtype, selDate);
        }
    },
    render: function render() {
        var tmp_selected_date = zgfm_format_date(this.state.sel_date);
        var tmp_id = 'zgfm' + this.props.zgfmid;
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "zgfm-calendar-box" },
                React.createElement(
                    "div",
                    { className: "zgfm-calendar-sel-day" },
                    this.props.label1,
                    " ",
                    tmp_selected_date
                ),
                React.createElement("input", { ref: tmp_id, id: tmp_id, type: "hidden", value: tmp_selected_date }),
                React.createElement(
                    "div",
                    { className: "zgfm-calendar-row" },
                    React.createElement(
                        "div",
                        { className: "zgfm-calendar-header" },
                        React.createElement(
                            "div",
                            { className: "zgfm-calendar-bl zgfm-calendar-header-left" },
                            React.createElement(
                                "span",
                                { className: "zgfm_btn",
                                    onClick: this.onPrevious },
                                "Previous"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "zgfm-calendar-bl zgfm-calendar-header-middle" },
                            this.getcurrentMonthName()
                        ),
                        React.createElement(
                            "div",
                            { className: "zgfm-calendar-bl zgfm-calendar-header-right" },
                            React.createElement(
                                "span",
                                { className: "zgfm_btn",
                                    onClick: this.onNext },
                                "Next"
                            )
                        )
                    )
                ),
                this.renderDayNames(),
                React.createElement(
                    "div",
                    { className: "zgfm-calendar-row" },
                    React.createElement(
                        "div",
                        { className: "zgfm-calendar-days" },
                        this.renderDays()
                    )
                )
            )
        );
    }
});
'use strict';

var ZGFMdatePicker = React.createClass({
    displayName: 'ZGFMdatePicker',

    getInitialState: function getInitialState() {
        var today = new Date();
        return {
            input1: today,
            input1_sel: today,
            input1_year: today.getFullYear(),
            input1_day: today.getDate(),
            input1_month: today.getMonth(),
            input2: today,
            input2_sel: today,
            input2_year: today.getFullYear(),
            input2_day: today.getDate(),
            input2_month: today.getMonth(),
            focused: false,
            inputFocused: false
        };
    },
    getCoordToOverlayBox: function getCoordToOverlayBox() {
        var leftvar = '1200';
        var tmp_coord = [];
        tmp_coord['left'] = String(0) + 'px';
        tmp_coord['top'] = String(0) + 'px';
        var input_field = this.refs.zgfmRefDatePicker || null;

        if (input_field) {
            var inputRect = input_field.getBoundingClientRect();
            var top = inputRect.top;
            var left = inputRect.left;
            tmp_coord['left'] = String(left) + 'px';
            tmp_coord['top'] = String(top + 55) + 'px';
        }

        return tmp_coord;
    },
    onShowDT: function onShowDT() {
        this.setState({
            focused: true,
            inputFocused: true
        });
    },
    onCloseButton: function onCloseButton() {
        this.setState({
            focused: false,
            inputFocused: false
        });
    },
    onChangeDay: function onChangeDay(var1, var2) {

        if (parseInt(var1) === 1) {
            var input_field1 = var2;
            var date1 = new Date(input_field1);

            this.setState({
                input1: date1,
                input1_sel: date1
            });
        }

        if (parseInt(var1) === 2) {
            var input_field2 = var2;

            var date2 = new Date(input_field2);

            this.setState({
                input2: date2,
                input2_sel: date2
            });
        }
    },
    onChangeDatePicker: function onChangeDatePicker() {},
    onShowresult: function onShowresult() {
        var input1 = this.state.input1;
        var start = new Date(input1);
        start.setHours(12);
        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);

        var input2 = this.state.input2;
        var end = new Date(input2);
        end.setHours(12);
        end.setMinutes(0);
        end.setSeconds(0);
        end.setMilliseconds(0);
        end.setDate(end.getDate() - 1);

        var year = start.getFullYear();
        var month = start.getMonth();
        var day = start.getDate();
        var dates = [start];

        while (dates[dates.length - 1] < end) {
            dates.push(new Date(year, month, ++day));
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { id: 'zgfm-result-content' },
                React.createElement(
                    'h1',
                    null,
                    'Range of ',
                    dates.length,
                    ' days'
                ),
                React.createElement(
                    'ul',
                    null,
                    dates.map(function (listValue, i) {
                        var tmp_str = listValue.getFullYear() + '/' + listValue.getMonth() + '/' + listValue.getDate();
                        return React.createElement(
                            'li',
                            { key: i },
                            tmp_str
                        );
                    }),
                    ' '
                )
            )
        );
    },
    render: function render() {
        var tmp_value = zgfm_format_date(this.state.input1_sel) + ' - ' + zgfm_format_date(this.state.input2_sel);
        var tmp_coord = this.getCoordToOverlayBox();
        var tmp_display = this.state.focused ? 'block' : 'none';
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'zgfm-content-show-result' },
                this.onShowresult()
            ),
            React.createElement(
                'div',
                { className: 'zgfm-content-show-rpicker' },
                React.createElement('input', { ref: 'zgfmRefDatePicker', onFocus: this.onShowDT, onChange: this.onChangeDatePicker,
                    id: 'zgfm-field-datepicker', type: 'textbox', value: tmp_value, placeholder: 'click here',
                    className: 'zgfm-rgdatepicker-input' }),
                React.createElement(
                    'div',
                    { style: { "top": tmp_coord['top'], "left": tmp_coord['left'], 'display': tmp_display },
                        className: 'zgfm-overlay-container' },
                    React.createElement(
                        'div',
                        { ref: 'zgfmRefOverlayBox', className: 'zgfm-overlay-box' },
                        React.createElement('div', { className: 'zgfm-overlay-box-arrow' }),
                        React.createElement(
                            'div',
                            { className: 'zgfm-overlay-box-options' },
                            React.createElement(
                                'span',
                                { onClick: this.onCloseButton, className: 'zgfm_btn zgfm_btn2' },
                                ' Cancel'
                            ),
                            React.createElement(
                                'span',
                                { onClick: this.onCloseButton, className: 'zgfm_btn zgfm_btn2' },
                                ' Apply'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'zgfm-overlay-box-container' },
                            React.createElement(ZGFMcalendar, { zgfmid: '1',
                                zgfmStartDate: this.state.input1,
                                zgfmCurYear: this.state.input1_year,
                                zgfmSelDate: this.state.input1_sel,
                                zgfmCurMonth: this.state.input1_month,
                                zgfmCurDay: this.state.input1_day,
                                zgfmSelDateOther: this.state.input2_sel,
                                zgfmtype: '1', label1: 'Start : ', onChangeDay: this.onChangeDay })
                        ),
                        React.createElement(
                            'div',
                            { className: 'zgfm-overlay-box-container' },
                            React.createElement(ZGFMcalendar, { zgfmid: '2',
                                zgfmStartDate: this.state.input2,
                                zgfmCurYear: this.state.input2_year,
                                zgfmSelDate: this.state.input2_sel,
                                zgfmCurMonth: this.state.input2_month,
                                zgfmCurDay: this.state.input2_day,
                                zgfmSelDateOther: this.state.input1_sel,
                                zgfmtype: '2', label1: 'End : ', onChangeDay: this.onChangeDay })
                        )
                    )
                )
            )
        );
    }
});
/*ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('zgfm-calendar')
);*/

"use strict";

var data = "que haceeee";

ReactDOM.render(React.createElement(ZGFMdatePicker, null), document.getElementById('zgfm-calendar'));
//# sourceMappingURL=app.js.map
