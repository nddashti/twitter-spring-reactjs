import React from "react";
import {Link} from "react-router-dom";
import {ClickAwayListener, IconButton} from "@material-ui/core";
import {createMemoryHistory} from "history";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import UserPageActions from "../UserPageActions";
import {mockUserProfile} from "../../../../util/mockData/mockData";
import ListsModal from "../../../../components/ListsModal/ListsModal";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import HoverAction from "../../../../components/HoverAction/HoverAction";
import {LISTS_MEMBERSHIPS, PROFILE, TOPICS} from "../../../../util/pathConstants";
import {LoadingStatus} from "../../../../store/types/common";
import {ActionSnackbarTypes} from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("UserPageActions", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click and open User Page Actions", () => {
        const {wrapper} = createWrapper();
        expect(wrapper.text().includes("View Topics")).toBe(true);
        expect(wrapper.text().includes(`Add/remove @${mockUserProfile.username} from Lists`)).toBe(true);
        expect(wrapper.find(Link).at(1).prop("to")).toBe(`${LISTS_MEMBERSHIPS}/${mockUserProfile.id}`);
        expect(wrapper.text().includes("View Lists")).toBe(true);
        expect(wrapper.text().includes("View Moments")).toBe(true);
        expect(wrapper.text().includes("Share profile via...")).toBe(true);
        expect(wrapper.text().includes("Copy link to profile")).toBe(true);
        expect(wrapper.text().includes(`Mute @${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes(`Block @${mockUserProfile.username}`)).toBe(true);
        expect(wrapper.text().includes(`Report @${mockUserProfile.username}`)).toBe(true);
    });

    it("should click open and close ListsModal", () => {
        const {wrapper} = createWrapper();
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
        wrapper.find("#openListsModal").at(0).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(true);
        wrapper.find(ListsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(ListsModal).prop("visible")).toBe(false);
    });

    it("should click Copy Link To Profile", () => {
        const {wrapper} = createWrapper();
        wrapper.find("#copyLinkToProfile").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: "Copied to clipboard",
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click handle Mute User", () => {
        const {wrapper} = createWrapper();
        expect(wrapper.find(".makeStyles-dropdown-25").exists()).toBeTruthy();
        wrapper.find("#handleMuteUser").at(0).simulate("click");
        expect(wrapper.find(".makeStyles-dropdown-25").exists()).toBeFalsy();
    });

    it("should click away UserPageActions", () => {
        const {wrapper} = createWrapper();
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());
        expect(wrapper.find(ClickAwayListener).exists()).toBeTruthy();
    });

    it("should hover More icon and render Hover Action", () => {
        jest.useFakeTimers();
        const {wrapper} = createWrapper();
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("More");
    });

    it("should redirect to Topics page", () => {
        const {wrapper, pushSpy} = createWrapper();
        wrapper.find(Link).at(0).simulate("click", {button: 0});
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/${mockUserProfile.id}${TOPICS}`);
    });

    it("should redirect to Lists page", () => {
        const {wrapper, pushSpy} = createWrapper();
        wrapper.find(Link).at(1).simulate("click", {button: 0});
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${LISTS_MEMBERSHIPS}/${mockUserProfile.id}`);
    });

    it("should render muted user", () => {
        const {wrapper} = createWrapper(true, false);
        expect(wrapper.text().includes(`Unmute @${mockUserProfile.username}`)).toBe(true);
    });

    it("should render bocked user", () => {
        const {wrapper} = createWrapper(true, true);
        expect(wrapper.text().includes(`Unblock @${mockUserProfile.username}`)).toBe(true);
    });

    const createWrapper = (isUserMuted = false, isUserBlocked = false) => {
        const mockState = {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: {
                    ...mockUserProfile, isUserMuted, isUserBlocked
                }
            }
        };
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<UserPageActions/>, mockState, history);
        wrapper.find(IconButton).simulate("click");
        return {wrapper, pushSpy};
    };
});