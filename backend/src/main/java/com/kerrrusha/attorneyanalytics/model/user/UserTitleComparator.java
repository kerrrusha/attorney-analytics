package com.kerrrusha.attorneyanalytics.model.user;

import org.springframework.stereotype.Component;

import java.util.Comparator;

@Component
public class UserTitleComparator implements Comparator<User> {

    private final TitleComparator titleComparator = new TitleComparator();

    @Override
    public int compare(User user1, User user2) {
        return titleComparator.compare(user1.getTitle(), user2.getTitle());
    }
}
