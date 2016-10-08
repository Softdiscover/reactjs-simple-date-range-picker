var ZGFMdatePicker = React.createClass({
    getInitialState: function () {
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
    getCoordToOverlayBox: function () {
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
    onShowDT: function () {
        this.setState({
            focused: true,
            inputFocused: true
        });
    },
    onCloseButton: function () {
        this.setState({
            focused: false,
            inputFocused: false
        });
    },
    onChangeDay: function (var1, var2) {

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
    onChangeDatePicker: function () {
    },
    onShowresult: function () {
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
        end.setDate(end.getDate()-1);

        var year = start.getFullYear();
        var month = start.getMonth();
        var day = start.getDate();
        var dates = [start];

        while (dates[dates.length - 1] < end) {
            dates.push(new Date(year, month, ++day));
        }

        return (
            <div>
                <div id="zgfm-result-content">
                    <h1>Range of {dates.length} days</h1>
                    <ul>{dates.map(function (listValue, i) {
                        var tmp_str = listValue.getFullYear() + '/' + listValue.getMonth() + '/' + listValue.getDate();
                        return <li key={i}>{tmp_str}</li>;
                    })} </ul>
                </div>
            </div>
        )
    },
    render: function () {
        var tmp_value = zgfm_format_date(this.state.input1_sel) + ' - ' + zgfm_format_date(this.state.input2_sel);
        var tmp_coord = this.getCoordToOverlayBox();
        var tmp_display = this.state.focused ? 'block' : 'none';
        return <div>
            <div className="zgfm-content-show-result">
                {this.onShowresult()}
            </div>
            <div className="zgfm-content-show-rpicker">
                <input ref="zgfmRefDatePicker" onFocus={this.onShowDT} onChange={this.onChangeDatePicker}
                       id="zgfm-field-datepicker" type="textbox" value={tmp_value} placeholder="click here"
                       className="zgfm-rgdatepicker-input"/>

                <div style={{"top" : tmp_coord['top'],"left" : tmp_coord['left'], 'display': tmp_display}}
                     className="zgfm-overlay-container">
                    <div ref="zgfmRefOverlayBox" className="zgfm-overlay-box">

                        <div className="zgfm-overlay-box-arrow"></div>
                        <div className="zgfm-overlay-box-options">
                            <span onClick={this.onCloseButton} className="zgfm_btn zgfm_btn2"> Cancel</span>
                            <span onClick={this.onCloseButton} className="zgfm_btn zgfm_btn2"> Apply</span>
                        </div>
                        <div className="zgfm-overlay-box-container">
                            <ZGFMcalendar zgfmid={'1'}
                                          zgfmStartDate={this.state.input1}
                                          zgfmCurYear={this.state.input1_year}
                                          zgfmSelDate={this.state.input1_sel}
                                          zgfmCurMonth={this.state.input1_month}
                                          zgfmCurDay={this.state.input1_day}
                                          zgfmSelDateOther={this.state.input2_sel}
                                          zgfmtype={'1'} label1={'Start : '} onChangeDay={this.onChangeDay}/>
                        </div>
                        <div className="zgfm-overlay-box-container">
                            <ZGFMcalendar zgfmid={'2'}
                                          zgfmStartDate={this.state.input2}
                                          zgfmCurYear={this.state.input2_year}
                                          zgfmSelDate={this.state.input2_sel}
                                          zgfmCurMonth={this.state.input2_month}
                                          zgfmCurDay={this.state.input2_day}
                                          zgfmSelDateOther={this.state.input1_sel}
                                          zgfmtype={'2'} label1={'End : '} onChangeDay={this.onChangeDay}/>
                        </div>
                    </div>
                </div>
            </div>


        </div>;
    }
});