import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockFullTweet} from "../../../../util/mockData/mockData";
import AddTweetForm from "../../../../components/AddTweetForm/AddTweetForm";
import AddReplyToTweet from "../AddReplyToTweet";

describe("AddReplyToTweet", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<AddReplyToTweet/>, mockStore);
        expect(wrapper.text().includes(`Replying to @${mockFullTweet.user.username}`)).toBe(true);
        expect(wrapper.find(AddTweetForm).prop("title")).toBe("Tweet your reply");
        expect(wrapper.find(AddTweetForm).prop("buttonName")).toBe("Reply");
    });
});
