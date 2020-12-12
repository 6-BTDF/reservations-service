import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../client/src/components/App';
import DateSelection from '../../client/src/components/DateSelection';
import CheckingDropDown from '../../client/src/components/CheckingDropDown';
import stylesCheckingDropDown from '../../client/src/components/CheckingDropDown.css';
import stylesCalendarD from '../../client/src/components/CalendarDates.css';

configure({ adapter: new Adapter() });
// jest.mock('axios');

describe('<CheckingDropDown />', () => {
  const mockFn = jest.fn();
  const checkingDropDownProps = {
    setCheckInDate: mockFn,
    setCheckOutDate: mockFn,
    setCheckingDatesSet: mockFn,
    checkingDatesSet: false,
    checkingDates: [undefined, undefined],
    dropDownCheckingToggle: mockFn,
    focusedDate: undefined,
    setFocusedDate: mockFn,
  };
  it('Renders without crashing', () => {
    const wrapper = shallow(<CheckingDropDown props={checkingDropDownProps} />);
    expect(wrapper.find(`.${stylesCheckingDropDown.checkingDropdown}`)).toHaveLength(1);
  });
  it('Autofocuses on the check-in form when opened with no check-in date defined', () => {
    const wrapper = mount(<App />);
    wrapper.find(DateSelection).simulate('click');
    expect(wrapper.find('#checkIn').props().autoFocus).toBe(true);
  });
  it('Fills in clicked dates', () => {
    const wrapper = mount(<App />);
    wrapper.find(DateSelection).simulate('click');
    const element = wrapper.find(`.${stylesCalendarD.days}`).at(0);
    element.simulate('click');
    expect(wrapper.find(`.${stylesCalendarD.filled}`).hasClass('innerCell')).toBe(true);
  });
  it('Correctly assigns creates partial highlights and highlights dates between check-in/hovered dates', () => {
    const wrapper = mount(<App />);
    wrapper.find(DateSelection).simulate('click');
    const element = wrapper.find(`.${stylesCalendarD.days}`).at(0);
    const elePlusTwoDays = wrapper.find(`.${stylesCalendarD.days}`).at(2);
    element.simulate('click');
    elePlusTwoDays.simulate('mouseEnter');
    expect(wrapper.find(`.${stylesCalendarD.days}`).at(0).hasClass('highlight')).toBe(true);
    expect(wrapper.find(`.${stylesCalendarD.days}`).at(1).hasClass('highlight')).toBe(true);
    expect(wrapper.find(`.${stylesCalendarD.days}`).at(2).hasClass('endFocus')).toBe(true);
  });
});
