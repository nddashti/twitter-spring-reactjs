import React from "react";
import {IconButton, Paper} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import Poll, {pollInitialState} from "../Poll";
import PollInput from "../PollInput/PollInput";
import {FilledSelect} from "../../../FilledSelect/FilledSelect";
import HoverAction from "../../../HoverAction/HoverAction";
import {LoadingStatus} from "../../../../store/types/common";

describe("Poll", () => {

    it("should render correctly and click Add Poll Choice Button", () => {
        const {wrapper} = createPollWrapper();

        expect(wrapper.find(PollInput).at(0).prop("label")).toBe("Choice 1");
        expect(wrapper.find(PollInput).at(1).prop("label")).toBe("Choice 2");
        expect(wrapper.find(PollInput).at(2).exists()).toBeFalsy();
        expect(wrapper.find(PollInput).at(3).exists()).toBeFalsy();

        wrapper.find("#addPollChoiceButton").at(0).find(IconButton).simulate("click");

        expect(wrapper.find(PollInput).at(2).prop("label")).toBe("Choice 3 (optional)");
        expect(wrapper.find(PollInput).at(3).exists()).toBeFalsy();

        wrapper.find("#addPollChoiceButton").at(0).find(IconButton).simulate("click");

        expect(wrapper.find(PollInput).at(2).prop("label")).toBe("Choice 3 (optional)");
        expect(wrapper.find(PollInput).at(3).prop("label")).toBe("Choice 4 (optional)");
        expect(wrapper.find("#addPollChoiceButton").exists()).toBeFalsy();
        expect(wrapper.text().includes("Poll length")).toBe(true);
        expect(wrapper.text().includes("Days")).toBe(true);
        expect(wrapper.text().includes("Hours")).toBe(true);
        expect(wrapper.text().includes("Minutes")).toBe(true);
        expect(wrapper.text().includes("Remove poll")).toBe(true);
    });

    it("should change poll input and select date", () => {
        const {wrapper, mockOnClose, mockSetPollData} = createPollWrapper();

        wrapper.find("#addPollChoiceButton").at(0).find(IconButton).simulate("click");
        wrapper.find("#addPollChoiceButton").at(0).find(IconButton).simulate("click");
        wrapper.find(PollInput).at(0).find("input").at(0).simulate("change", {target: {value: "test poll 1"}});
        wrapper.find(PollInput).at(1).find("input").at(0).simulate("change", {target: {value: "test poll 2"}});
        wrapper.find(PollInput).at(2).find("input").at(0).simulate("change", {target: {value: "test poll 3"}});
        wrapper.find(PollInput).at(3).find("input").at(0).simulate("change", {target: {value: "test poll 4"}});
        wrapper.find(FilledSelect).at(0).find("select").simulate("change", {target: {value: 7}});
        wrapper.find(FilledSelect).at(1).find("select").simulate("change", {target: {value: 23}});
        wrapper.find(FilledSelect).at(2).find("select").simulate("change", {target: {value: 59}});

        expect(mockSetPollData).toHaveBeenCalled();
        expect(mockSetPollData).toHaveBeenCalledTimes(7);

        wrapper.find("#removePoll").at(0).simulate("click");

        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should hover Add icon and render Hover Action", () => {
        jest.useFakeTimers();
        const {wrapper} = createPollWrapper();
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Add");
        wrapper.find(IconButton).simulate("mouseleave");

        expect(wrapper.find(HoverAction).prop("visible")).toBe(false);
    });

    it("should Poll not exist", () => {
        const {wrapper} = createPollWrapper(false);
        expect(wrapper.find(Paper).exists()).toBeFalsy();
    });

    const createPollWrapper = (visiblePoll = true) => {
        const mockSetPollData = jest.fn();
        const mockOnClose = jest.fn();

        const wrapper = mountWithStore(
            <Poll
                pollData={pollInitialState}
                setPollData={mockSetPollData}
                visiblePoll={visiblePoll}
                onClose={mockOnClose}
            />, createMockRootState(LoadingStatus.LOADED));

        return {wrapper, mockOnClose, mockSetPollData};
    };
});
