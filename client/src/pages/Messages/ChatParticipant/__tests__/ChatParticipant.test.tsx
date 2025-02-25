import React from "react";
import {ListItem} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockChats} from "../../../../util/mockData/mockData";
import ChatParticipant from "../ChatParticipant";

describe("ChatParticipant", () => {
    it("should render correctly", () => {
        const mockChat = mockChats[0];
        const mockHandleListItemClick = jest.fn()
        const wrapper = mountWithStore(
            <ChatParticipant
                chat={mockChat}
                participantUserId={1}
                handleListItemClick={mockHandleListItemClick}
            />, createMockRootState(LoadingStatus.LOADED));
        wrapper.find(ListItem).simulate("click");
        expect(mockHandleListItemClick).toHaveBeenCalled();
        expect(wrapper.text().includes(mockChat.participants[0].user.fullName)).toBe(true);
        expect(wrapper.text().includes(mockChat.participants[0].user.username)).toBe(true);
    });
});
