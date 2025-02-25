import React from "react";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import {mockLists, mockPinnedLists, mockSimpleList, mockUserLists} from "../../../../util/mockData/mockData";
import Spinner from "../../../../components/Spinner/Spinner";
import ListsItem from "../../ListsItem/ListsItem";
import UserLists from "../UserLists";

describe("UserLists", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockListsStore = {
        ...mockStore,
        lists: {
            ...mockStore.lists,
            lists: mockLists,
            userLists: mockUserLists,
            pinnedLists: mockPinnedLists,
            simpleLists: mockSimpleList
        }
    };

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<UserLists/>, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Lists", () => {
        const wrapper = mountWithStore(<UserLists/>, mockListsStore);
        expect(wrapper.find(ListsItem).length).toEqual(1);
    });
});
