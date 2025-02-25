create sequence bookmarks_seq start 100 increment 1;
create sequence chat_messages_seq start 100 increment 1;
create sequence chats_participants_seq start 100 increment 1;
create sequence chats_seq start 100 increment 1;
create sequence images_seq start 100 increment 1;
create sequence like_tweets_seq start 100 increment 1;
create sequence lists_seq start 100 increment 1;
create sequence notifications_seq start 100 increment 1;
create sequence pool_choices_seq start 100 increment 1;
create sequence pools_seq start 100 increment 1;
create sequence retweets_seq start 100 increment 1;
create sequence tags_seq start 100 increment 1;
create sequence topics_seq start 100 increment 1;
create sequence tweets_seq start 100 increment 1;
create sequence users_seq start 100 increment 1;
create table bookmarks
(
    id            int8 not null,
    bookmark_date timestamp,
    tweet_id      int8,
    users_id      int8,
    primary key (id)
);
create table chat_messages
(
    id       int8 not null,
    date     timestamp,
    text     varchar(255),
    user_id  int8,
    chat_id  int8,
    tweet_id int8,
    primary key (id)
);
create table chats
(
    id            int8 not null,
    creation_date timestamp,
    primary key (id)
);
create table chats_participants
(
    id        int8 not null,
    left_chat boolean default false,
    chat_id   int8,
    user_id   int8,
    primary key (id)
);
create table images
(
    id  int8 not null,
    src varchar(255),
    primary key (id)
);
create table like_tweets
(
    id              int8 not null,
    like_tweet_date timestamp,
    tweets_id       int8,
    users_id        int8,
    primary key (id)
);
create table lists
(
    id            int8 not null,
    alt_wallpaper varchar(255),
    description   varchar(255),
    private       boolean,
    name          varchar(255),
    pinned_date   timestamp,
    user_id       int8,
    wallpaper_id  int8,
    primary key (id)
);
create table lists_followers
(
    lists_id     int8 not null,
    followers_id int8 not null
);
create table lists_members
(
    lists_id   int8 not null,
    members_id int8 not null
);
create table lists_tweets
(
    lists_id  int8 not null,
    tweets_id int8 not null
);
create table notifications
(
    id                int8 not null,
    date              timestamp,
    notification_type varchar(255),
    list_id           int8,
    notified_user_id  int8,
    tweet_id          int8,
    user_id           int8,
    user_to_follow_id int8,
    primary key (id)
);
create table pool_choices
(
    id     int8 not null,
    choice varchar(255),
    primary key (id)
);
create table pool_choices_voted_user
(
    poll_choice_id int8 not null,
    voted_user_id  int8 not null
);
create table pools
(
    id        int8 not null,
    date_time timestamp,
    primary key (id)
);
create table pools_poll_choices
(
    poll_id         int8 not null,
    poll_choices_id int8 not null
);
create table quotes
(
    tweets_id int8 not null,
    quote_id  int8 not null
);
create table replies
(
    tweets_id int8 not null,
    reply_id  int8 not null
);
create table retweets
(
    id           int8 not null,
    retweet_date timestamp,
    tweets_id    int8,
    users_id     int8,
    primary key (id)
);
create table subscribers
(
    user_id       int8 not null,
    subscriber_id int8 not null
);
create table tags
(
    id              int8 not null,
    tag_name        varchar(255),
    tweets_quantity int8,
    primary key (id)
);
create table topic_followers
(
    topic_id int8 not null,
    user_id  int8 not null
);
create table topic_not_interested
(
    topic_id int8 not null,
    user_id  int8 not null
);
create table topics
(
    id             int8 not null,
    topic_category varchar(255),
    topic_name     varchar(255),
    primary key (id)
);
create table tweet_pool
(
    pools_id  int8,
    tweets_id int8 not null,
    primary key (tweets_id)
);
create table tweet_quote
(
    quote_tweet_id int8,
    tweets_id      int8 not null,
    primary key (tweets_id)
);
create table tweets
(
    id                 int8 not null,
    addressed_id       int8,
    addressed_tweet_id int8,
    addressed_username varchar(255),
    date_time          timestamp,
    deleted            boolean,
    link               varchar(255),
    link_cover         varchar(255),
    link_cover_size    varchar(255),
    link_description   varchar(255),
    link_title         varchar(255),
    reply_type         varchar(255),
    scheduled_date     timestamp,
    text               text,
    users_id           int8,
    primary key (id)
);
create table tweets_images
(
    tweet_id  int8 not null,
    images_id int8 not null
);
create table tweets_tags
(
    tags_id   int8 not null,
    tweets_id int8 not null
);
create table unread_messages
(
    user_id         int8 not null,
    chat_message_id int8 not null
);
create table user_avatar
(
    avatar_id int8,
    user_id   int8 not null,
    primary key (user_id)
);
create table user_blocked
(
    user_id         int8 not null,
    blocked_user_id int8 not null
);
create table user_follower_requests
(
    user_id     int8 not null,
    follower_id int8 not null
);
create table user_muted
(
    user_id       int8 not null,
    muted_user_id int8 not null
);
create table user_pinned_tweet
(
    tweet_id int8,
    user_id  int8 not null,
    primary key (user_id)
);
create table user_subscriptions
(
    subscriber_id int8 not null,
    user_id       int8 not null
);
create table user_wallpaper
(
    wallpaper_id int8,
    user_id      int8 not null,
    primary key (user_id)
);
create table users
(
    id                    int8 not null,
    about                 varchar(255),
    activation_code       varchar(255),
    active                boolean default false,
    background_color      varchar(255),
    birthday              varchar(255),
    color_scheme          varchar(255),
    country               varchar(255),
    country_code          varchar(255),
    email                 varchar(255),
    full_name             varchar(255),
    gender                varchar(255),
    language              varchar(255),
    like_count            int8    default 0,
    location              varchar(255),
    media_tweet_count     int8    default 0,
    muted_direct_messages boolean default false,
    notifications_count   int8    default 0,
    password              varchar(255),
    password_reset_code   varchar(255),
    phone                 int8,
    private_profile       boolean default false,
    profile_customized    boolean default false,
    profile_started       boolean default false,
    registration_date     timestamp,
    role                  varchar(255),
    tweet_count           int8    default 0,
    username              varchar(255),
    website               varchar(255),
    primary key (id)
);
create table users_lists
(
    user_id  int8 not null,
    lists_id int8 not null
);
create table users_notifications
(
    user_id          int8 not null,
    notifications_id int8 not null
);
create table users_tweets
(
    user_id   int8 not null,
    tweets_id int8 not null
);
alter table if exists pools_poll_choices
    add constraint UK_l2rmjmwo83tkbv42fipfqh30y unique (poll_choices_id);
alter table if exists quotes
    add constraint UK_iuv1sbh2mxfhdvwpemnnhveyp unique (quote_id);
alter table if exists tweets_images
    add constraint UK_r0mdr0mxkjw13pm37pqs86vl unique (images_id);
alter table if exists users_notifications
    add constraint UK_fqai0p0e0nsyh9pp2j0h32ggq unique (notifications_id);
alter table if exists bookmarks
    add constraint FK85o30yuaayc2kofhc3kljt5wc foreign key (tweet_id) references tweets;
alter table if exists bookmarks
    add constraint FK8xot3y0nq4q3aa476cai9q93d foreign key (users_id) references users;
alter table if exists chat_messages
    add constraint FK6f0y4l43ihmgfswkgy9yrtjkh foreign key (user_id) references users;
alter table if exists chat_messages
    add constraint FKt56nsqjwt7t4sian6vts9wg3t foreign key (chat_id) references chats;
alter table if exists chat_messages
    add constraint FKpmkrx4gyp9tnhwcsyst5y0cqb foreign key (tweet_id) references tweets;
alter table if exists chats_participants
    add constraint FKjrfpltus8r643670taov8pana foreign key (chat_id) references chats;
alter table if exists chats_participants
    add constraint FKhj23i3pyecs1n258gfhcxg74y foreign key (user_id) references users;
alter table if exists like_tweets
    add constraint FK6hb4ee6u0e9ljyp7gp1utqqcq foreign key (tweets_id) references tweets;
alter table if exists like_tweets
    add constraint FK1qkohfdrx5cta7p8y8f4o32nv foreign key (users_id) references users;
alter table if exists lists
    add constraint FKe59kv852m4k3g8kmefph4i3kx foreign key (user_id) references users;
alter table if exists lists
    add constraint FK768jm1btcmvyih0w5ry4yjo7a foreign key (wallpaper_id) references images;
alter table if exists lists_followers
    add constraint FKoncv8qbxpkfdj5261mhoritlw foreign key (followers_id) references users;
alter table if exists lists_followers
    add constraint FKqhwa4ls14obxpwodux07eqoie foreign key (lists_id) references lists;
alter table if exists lists_members
    add constraint FK3eyxgv67fr9v8v1hoyuntj499 foreign key (members_id) references users;
alter table if exists lists_members
    add constraint FK2jagg2qq4hgojny4m0vab1a41 foreign key (lists_id) references lists;
alter table if exists lists_tweets
    add constraint FKki3q16adfmnrsxq5gtkjigeuk foreign key (tweets_id) references tweets;
alter table if exists lists_tweets
    add constraint FKekr4n4mx3h0wfjoqabkwvb2yh foreign key (lists_id) references lists;
alter table if exists notifications
    add constraint FKl9wo2rxxj0mfx56n2b72tsf18 foreign key (list_id) references lists;
alter table if exists notifications
    add constraint FKigkypq9wdtg7a1n12lp39pkas foreign key (notified_user_id) references users;
alter table if exists notifications
    add constraint FKq7of7il7xw8qn87ermsd51gv1 foreign key (tweet_id) references tweets;
alter table if exists notifications
    add constraint FK9y21adhxn0ayjhfocscqox7bh foreign key (user_id) references users;
alter table if exists notifications
    add constraint FKkm4kxtpw8ab56e3v6tuy0pebo foreign key (user_to_follow_id) references users;
alter table if exists pool_choices_voted_user
    add constraint FKcr0cypmwnffwhb8uob3s5phym foreign key (voted_user_id) references users;
alter table if exists pool_choices_voted_user
    add constraint FKo4sv895ipikev3ups6nbvk5aq foreign key (poll_choice_id) references pool_choices;
alter table if exists pools_poll_choices
    add constraint FKaqrysc0redvxxcq6s1s13bp2b foreign key (poll_choices_id) references pool_choices;
alter table if exists pools_poll_choices
    add constraint FKfw9hxy44hoab6qcfth1c50x8i foreign key (poll_id) references pools;
alter table if exists quotes
    add constraint FK1cfwrx9kkp9fufamcbbf4n31y foreign key (quote_id) references tweets;
alter table if exists quotes
    add constraint FKnaftxirm45fovgfqhjudyf2s0 foreign key (tweets_id) references tweets;
alter table if exists replies
    add constraint FKftas7wbrv961d6th8yy5nqdq7 foreign key (reply_id) references tweets;
alter table if exists replies
    add constraint FK1og4qeuvwr4yt0py1yq2jk794 foreign key (tweets_id) references tweets;
alter table if exists retweets
    add constraint FKdhta73liq2531r0u670a0ea73 foreign key (tweets_id) references tweets;
alter table if exists retweets
    add constraint FKij375t6rmy7uvvc7kb0cl233d foreign key (users_id) references users;
alter table if exists subscribers
    add constraint FKh0b65sm1qah4q8iy69k8aaxij foreign key (subscriber_id) references users;
alter table if exists subscribers
    add constraint FKll9lhik8xj3ep6ahtdt7me7pu foreign key (user_id) references users;
alter table if exists topic_followers
    add constraint FKmns6yuero7mqfqm36m5tihgfn foreign key (user_id) references users;
alter table if exists topic_followers
    add constraint FK61aoq1yc5828mhhqpgp37tadp foreign key (topic_id) references topics;
alter table if exists topic_not_interested
    add constraint FKbbo35w3ciycwcc1y66yjsqi0 foreign key (user_id) references users;
alter table if exists topic_not_interested
    add constraint FKl7w9th05emxw92vkf9relbvbj foreign key (topic_id) references topics;
alter table if exists tweet_pool
    add constraint FKfd0dxawayvyp132ntdhi8ptfa foreign key (pools_id) references pools;
alter table if exists tweet_pool
    add constraint FKgia483b845hgruqemh2skyy2v foreign key (tweets_id) references tweets;
alter table if exists tweet_quote
    add constraint FKftie7ivytjuvpm6118d05upa7 foreign key (quote_tweet_id) references tweets;
alter table if exists tweet_quote
    add constraint FK3an4vbda2c9lw7gla5tng2um4 foreign key (tweets_id) references tweets;
alter table if exists tweets
    add constraint FKfiem2tfp0dq1xsgsax6ju8pa8 foreign key (users_id) references users;
alter table if exists tweets_images
    add constraint FKn08la7vf9dnjm23ddlupi7hjo foreign key (images_id) references images;
alter table if exists tweets_images
    add constraint FKgka7vl35am9mwo21xiy4o3dw3 foreign key (tweet_id) references tweets;
alter table if exists tweets_tags
    add constraint FK1tgno5q3spbt9k8nc9jor8xnu foreign key (tweets_id) references tweets;
alter table if exists tweets_tags
    add constraint FK6kghpwtue5ty6ac1mu15bxogh foreign key (tags_id) references tags;
alter table if exists unread_messages
    add constraint FKhvny6bgm4d8lv0yhk2c5r9bl8 foreign key (chat_message_id) references chat_messages;
alter table if exists unread_messages
    add constraint FKh84h4eq2rt6ams9mbbb0keadp foreign key (user_id) references users;
alter table if exists user_avatar
    add constraint FKpcws10nq0scpwil3ubjsjlkya foreign key (avatar_id) references images;
alter table if exists user_avatar
    add constraint FKlatwcvwggmxieyymk3e3aah09 foreign key (user_id) references users;
alter table if exists user_blocked
    add constraint FK3ft7jt92le6bivrrwj25f87i9 foreign key (blocked_user_id) references users;
alter table if exists user_blocked
    add constraint FK1wp478xhxe2jjsagyb0vnrixm foreign key (user_id) references users;
alter table if exists user_follower_requests
    add constraint FKjnjcgbpbaxgnu81g9mardqve9 foreign key (follower_id) references users;
alter table if exists user_follower_requests
    add constraint FKld8j4caa828qwhp4ca3rf4732 foreign key (user_id) references users;
alter table if exists user_muted
    add constraint FKmfbgdwng6x29fotlaeeo5sdfq foreign key (muted_user_id) references users;
alter table if exists user_muted
    add constraint FKe0j9buuo6ht4pphao101ne08e foreign key (user_id) references users;
alter table if exists user_pinned_tweet
    add constraint FKoyalrx1wxyfmhmnkixxxemcy2 foreign key (tweet_id) references tweets;
alter table if exists user_pinned_tweet
    add constraint FKphsi8xxot1g5oqtfghnxi7kih foreign key (user_id) references users;
alter table if exists user_subscriptions
    add constraint FK3l40lbyji8kj5xoc20ycwsc8g foreign key (user_id) references users;
alter table if exists user_subscriptions
    add constraint FK6dh0jqt57w1molih5xjhb8nd0 foreign key (subscriber_id) references users;
alter table if exists user_wallpaper
    add constraint FKj5r6vfnl1ng92trfw95nuj8ck foreign key (wallpaper_id) references images;
alter table if exists user_wallpaper
    add constraint FKl6rrb8qu4wyp9g6eyd1gqs2c6 foreign key (user_id) references users;
alter table if exists users_lists
    add constraint FKcswqmdei3nib5x5gq25weuftw foreign key (lists_id) references lists;
alter table if exists users_lists
    add constraint FKjgo95u0dtudqcry0l04rkjmfp foreign key (user_id) references users;
alter table if exists users_notifications
    add constraint FK17pt2krtfgoof65xdvtbpf5aw foreign key (notifications_id) references notifications;
alter table if exists users_notifications
    add constraint FKil3tssmpyic5ruavb9jbbw2bb foreign key (user_id) references users;
alter table if exists users_tweets
    add constraint FKerekrgspn5at6l8sb5jg2m9ol foreign key (tweets_id) references tweets;
alter table if exists users_tweets
    add constraint FK7v5uijppxedcnbbknqyl7unqq foreign key (user_id) references users;
