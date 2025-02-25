package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.twitterspringreactjs.enums.TopicCategory;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopicResponse {
    private Long id;
    private String topicName;
    private TopicCategory topicCategory;

    @JsonProperty("isTopicFollowed")
    private boolean isTopicFollowed;

    @JsonProperty("isTopicNotInterested")
    private boolean isTopicNotInterested;
}
