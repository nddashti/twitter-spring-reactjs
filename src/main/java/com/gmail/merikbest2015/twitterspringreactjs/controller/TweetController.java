package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetDeleteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.VoteRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationReplyResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.HeaderResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetAdditionalInfoResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.TweetMapper;
import com.gmail.merikbest2015.twitterspringreactjs.enums.ReplyType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tweets")
public class TweetController {

    private final TweetMapper tweetMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping
    public ResponseEntity<List<TweetResponse>> getTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetResponse> getTweetById(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetById(tweetId));
    }

    @GetMapping("/{tweetId}/info")
    public ResponseEntity<TweetAdditionalInfoResponse> getTweetAdditionalInfoById(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getTweetAdditionalInfoById(tweetId));
    }

    @GetMapping("/{tweetId}/replies") // TODO add pagination
    public ResponseEntity<List<TweetResponse>> getRepliesByTweetId(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getRepliesByTweetId(tweetId));
    }

    @GetMapping("/{tweetId}/quotes")
    public ResponseEntity<List<TweetResponse>> getQuotesByTweetId(@PageableDefault(size = 10) Pageable pageable, @PathVariable Long tweetId) {
        HeaderResponse<TweetResponse> response = tweetMapper.getQuotesByTweetId(pageable, tweetId);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/{tweetId}/liked-users")
    public ResponseEntity<List<UserResponse>> getLikedUsersByTweetId(@PathVariable Long tweetId, @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = tweetMapper.getLikedUsersByTweetId(tweetId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/{tweetId}/retweeted-users")
    public ResponseEntity<List<UserResponse>> getRetweetedUsersByTweetId(@PathVariable Long tweetId, @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserResponse> response = tweetMapper.getRetweetedUsersByTweetId(tweetId, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/media")
    public ResponseEntity<List<TweetResponse>> getMediaTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getMediaTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/video")
    public ResponseEntity<List<TweetResponse>> getTweetsWithVideo(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getTweetsWithVideo(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/follower")
    public ResponseEntity<List<TweetResponse>> getFollowersTweets(@PageableDefault(size = 10) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getFollowersTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<TweetResponse>> getScheduledTweets(@PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.getScheduledTweets(pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @PostMapping
    public ResponseEntity<TweetResponse> createTweet(@RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = tweetMapper.createTweet(tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/poll")
    public ResponseEntity<TweetResponse> createPoll(@RequestBody TweetRequest tweetRequest) {
        TweetResponse tweet = tweetMapper.createPoll(tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/schedule")
    public ResponseEntity<TweetResponse> createScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.createTweet(tweetRequest));
    }

    @PutMapping("/schedule")
    public ResponseEntity<TweetResponse> updateScheduledTweet(@RequestBody TweetRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.updateScheduledTweet(tweetRequest));
    }

    @DeleteMapping("/schedule")
    public ResponseEntity<String> deleteScheduledTweets(@RequestBody TweetDeleteRequest tweetRequest) {
        return ResponseEntity.ok(tweetMapper.deleteScheduledTweets(tweetRequest));
    }

    @DeleteMapping("/{tweetId}")
    public ResponseEntity<String> deleteTweet(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.deleteTweet(tweetId));
    }

    @GetMapping("/search/{text}")
    public ResponseEntity<List<TweetResponse>> searchTweets(@PathVariable String text, @PageableDefault Pageable pageable) {
        HeaderResponse<TweetResponse> response = tweetMapper.searchTweets(text, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }

    @GetMapping("/like/{userId}/{tweetId}")
    public ResponseEntity<NotificationTweetResponse> likeTweet(@PathVariable Long userId, @PathVariable Long tweetId) {
        NotificationResponse notification = tweetMapper.likeTweet(tweetId);

        if (notification.getId() != null) {
            messagingTemplate.convertAndSend("/topic/notifications/" + notification.getTweet().getUser().getId(), notification);
        }
        messagingTemplate.convertAndSend("/topic/feed", notification);
        messagingTemplate.convertAndSend("/topic/tweet/" + notification.getTweet().getId(), notification);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + userId, notification);
        return ResponseEntity.ok(notification.getTweet());
    }

    @GetMapping("/retweet/{userId}/{tweetId}")
    public ResponseEntity<NotificationTweetResponse> retweet(@PathVariable Long userId, @PathVariable Long tweetId) {
        NotificationResponse notification = tweetMapper.retweet(tweetId);

        if (notification.getId() != null) {
            messagingTemplate.convertAndSend("/topic/notifications/" + notification.getTweet().getUser().getId(), notification);
        }
        messagingTemplate.convertAndSend("/topic/feed", notification);
        messagingTemplate.convertAndSend("/topic/tweet/" + notification.getTweet().getId(), notification);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + userId, notification);
        return ResponseEntity.ok(notification.getTweet());
    }

    @PostMapping("/reply/{userId}/{tweetId}")
    public ResponseEntity<NotificationReplyResponse> replyTweet(
            @PathVariable Long userId,
            @PathVariable Long tweetId,
            @RequestBody TweetRequest tweetRequest
    ) {
        NotificationReplyResponse notification = tweetMapper.replyTweet(tweetId, tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed", notification);
        messagingTemplate.convertAndSend("/topic/tweet/" + notification.getTweetId(), notification);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + userId, notification);
        return ResponseEntity.ok(notification);
    }

    @PostMapping("/quote/{userId}/{tweetId}")
    public ResponseEntity<TweetResponse> quoteTweet(
            @PathVariable Long userId,
            @PathVariable Long tweetId,
            @RequestBody TweetRequest tweetRequest
    ) {
        TweetResponse tweet = tweetMapper.quoteTweet(tweetId, tweetRequest);
        messagingTemplate.convertAndSend("/topic/feed/add", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/add/tweet/" + userId, tweet);
        return ResponseEntity.ok(tweet);
    }

    @GetMapping("/reply/change/{userId}/{tweetId}")
    public ResponseEntity<TweetResponse> changeTweetReplyType(
            @PathVariable Long userId,
            @PathVariable Long tweetId,
            @RequestParam ReplyType replyType
    ) {
        TweetResponse tweet = tweetMapper.changeTweetReplyType(tweetId, replyType);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + userId, tweet);
        return ResponseEntity.ok(tweet);
    }

    @PostMapping("/vote") // TODO validate and fix
    public ResponseEntity<TweetResponse> voteInPoll(@RequestBody VoteRequest voteRequest) {
        TweetResponse tweet = tweetMapper.voteInPoll(voteRequest);
        messagingTemplate.convertAndSend("/topic/feed", tweet);
        messagingTemplate.convertAndSend("/topic/tweet/" + tweet.getId(), tweet);
        messagingTemplate.convertAndSend("/topic/user/update/tweet/" + tweet.getUser().getId(), tweet);
        return ResponseEntity.ok(tweet);
    }

    @GetMapping("/{tweetId}/bookmarked")
    public ResponseEntity<Boolean> getIsTweetBookmarked(@PathVariable Long tweetId) {
        return ResponseEntity.ok(tweetMapper.getIsTweetBookmarked(tweetId));
    }
}
