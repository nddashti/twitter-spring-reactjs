import React from "react";
import {IconButton} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import UsersListModal from "../../../../../components/UsersListModal/UsersListModal";
import CloseButton from "../../../../../components/CloseButton/CloseButton";
import RetweetsCount from "../RetweetsCount";

describe("RetweetsCount", () => {
    it("should open/close UsersListModal", () => {
        const wrapper = mountWithStore(<RetweetsCount/>, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(UsersListModal).prop("visible")).toBe(false);
        wrapper.find("a").simulate("click");
        expect(wrapper.find(UsersListModal).prop("visible")).toBe(true);
        wrapper.find(UsersListModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(UsersListModal).prop("visible")).toBe(false);
    });
});
