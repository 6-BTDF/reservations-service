import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DateSelection from '../../client/src/components/DateSelection';
import styles from '../../client/src/components/DateSelection.css';

configure({ adapter: new Adapter() });

describe('<DateSelection />', () => {
  const mockToggle = jest.fn();
  const mockSetCheckIn = jest.fn();
  const mockSetCheckOut = jest.fn();
  const mockSetFocusedDate = jest.fn();
  const mockSetCheckingDatesSet = jest.fn();
  const dateSelectionProps = {
    checkingDates: [undefined, undefined],
    dropDownCheckingToggle: mockToggle,
  };
  const propsOnDropdown = {
    checkingDates: [undefined, undefined],
    setCheckInDate: mockSetCheckIn,
    setCheckOutDate: mockSetCheckOut,
    dropDownCheckingToggle: mockToggle,
    focusedDate: undefined,
    setFocusedDate: mockSetFocusedDate,
    setCheckingDatesSet: mockSetCheckingDatesSet,
  };
  let wrapper = shallow(<DateSelection
    onDropdown={false}
    dateSelectionProps={dateSelectionProps}
  />);
  it('Renders without crashing', () => {
    expect(wrapper.find(`.${styles.checkingContainer}`)).toHaveLength(1);
  });
  it('Toggles the dropdown menu on click', () => {
    wrapper.find(`.${styles.checkingContainer}`).simulate('click');
    expect(mockToggle).toHaveBeenCalled();
  });
  it('Accepts correctly formatted dates, clears dates, and rejects correctly for check-in', () => {
    wrapper = mount(<DateSelection onDropdown dateSelectionProps={propsOnDropdown} />);
    const checkInForm = wrapper.find('form').at(0);
    const checkInInput = wrapper.find('input').at(0);
    checkInInput.blur = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(() => { });
    checkInForm.simulate('submit', {
      preventDefault: () => { },
      target: {
        checkIn: { value: '5/12/2021' },
        children: [checkInInput],
      },
    });
    checkInForm.simulate('submit', {
      preventDefault: () => { },
      target: {
        checkIn: { value: '' },
        children: [checkInInput],
      },
    });
    checkInForm.simulate('submit', {
      preventDefault: () => { },
      target: {
        checkIn: { value: '555' },
        children: [checkInInput],
      },
    });
    expect(mockSetCheckIn).toHaveBeenCalled();
    expect(mockSetCheckIn).toHaveBeenCalledTimes(2);
    expect(window.alert).toHaveBeenCalled();
  });
  it('Accepts correctly formatted dates, clears dates, and rejects correctly for check-in', () => {
    const propsCheckout = { ...propsOnDropdown };
    propsCheckout.checkingDates = [new Date(2020, 4, 10), undefined];
    wrapper = mount(<DateSelection onDropdown dateSelectionProps={propsCheckout} />);
    const checkOutForm = wrapper.find('form').at(1);
    const checkOutInput = wrapper.find('input').at(1);
    checkOutInput.blur = jest.fn();
    checkOutForm.simulate('submit', {
      preventDefault: () => { },
      target: {
        checkOut: { value: '5/12/2021' },
        children: [checkOutInput],
      },
    });
    checkOutForm.simulate('submit', {
      preventDefault: () => { },
      target: {
        checkOut: { value: '' },
        children: [checkOutInput],
      },
    });
    expect(mockSetCheckOut).toHaveBeenCalled();
    expect(mockSetCheckIn).toHaveBeenCalledTimes(2);
  });
});
