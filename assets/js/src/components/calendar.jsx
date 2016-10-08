var ZGFMcalendar = React.createClass({
    getInitialState: function () {

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
    checkDateInRange: function (dateToCheck, monthToCheck, yearTocheck) {

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

        return start < toCheck && toCheck < end;
    },
    renderDays: function () {
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
            html_show_days.push(<span key={cal_counter} className={classWeek}>&nbsp;</span>);
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
                html_show_days.push(<span key={cal_counter} onClick={this.handleDayClick.bind(this,day_counter)}
                                          className={classWeek}>{day_counter}</span>);
            } else {
                classWeek = classWeek_tmp.join(" ");
                html_show_days.push(<span key={cal_counter} onClick={this.handleDayClick.bind(this,day_counter)}
                                          className={classWeek}>{day_counter}</span>);
            }
            cal_counter++;
        }
        if (cal_counter < 43) {
            for (var i = cal_counter; i < 43; i++) {
                classWeek = '';
                if (!(cal_counter % 7) || (parseInt(cal_counter) === 36)) {
                    classWeek = 'zgfm-calendar-weekend';
                }
                html_show_days.push(<span key={i} className={classWeek}>&nbsp;</span>);
                cal_counter++;
            }
        }
        return (
            <div>
                {html_show_days}
            </div>
        )
    },
    handleDayClick: function (day) {
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
    renderDayNames: function () {

        var html_list = this.state.dayNames.map(function (name, i) {
            return <span  > {name}</span>;
        });
        return (
            <div className="zgfm-calendar-row">
                <div className="zgfm-calendar-week">
                    <span>su</span>
                    <span>mo</span>
                    <span>tu</span>
                    <span>we</span>
                    <span>th</span>
                    <span>fr</span>
                    <span>sa</span>
                </div>
            </div>
        )
    },
    getcurrentMonthName: function () {
        var month_i = this.state.cur_month;
        var months = this.state.monthNames;
        var get_name = months[month_i];

        return (
            <span>
                {get_name} , {this.state.cur_year}
            </span>
        )
    },
    onPrevious: function () {
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
    onNext: function () {
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
    render: function () {
        var tmp_selected_date = zgfm_format_date(this.state.sel_date);
        var tmp_id = 'zgfm' + this.props.zgfmid;
        return <div>
            <div className="zgfm-calendar-box">
                <div className="zgfm-calendar-sel-day">{this.props.label1} {tmp_selected_date}</div>
                <input ref={tmp_id} id={tmp_id} type="hidden" value={tmp_selected_date}/>
                <div className="zgfm-calendar-row">
                    <div className="zgfm-calendar-header">
                        <div className="zgfm-calendar-bl zgfm-calendar-header-left"><span className="zgfm_btn"
                                                                                          onClick={this.onPrevious}>Previous</span>
                        </div>
                        <div className="zgfm-calendar-bl zgfm-calendar-header-middle">{this.getcurrentMonthName()}</div>
                        <div className="zgfm-calendar-bl zgfm-calendar-header-right"><span className="zgfm_btn"
                                                                                           onClick={this.onNext}>Next</span>
                        </div>
                    </div>
                </div>
                {this.renderDayNames()}
                <div className="zgfm-calendar-row">
                    <div className="zgfm-calendar-days">
                        {this.renderDays()}
                    </div>
                </div>
            </div>
        </div>;
    }
});