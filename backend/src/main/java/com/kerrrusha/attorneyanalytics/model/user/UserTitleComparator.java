package com.kerrrusha.attorneyanalytics.model.user;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

public class UserTitleComparator implements Comparator<User> {

    private static final Map<String, Integer> TITLE_ORDER = new HashMap<>();

    static {
        TITLE_ORDER.put("Chief Executive Officer (CEO)", 1);
        TITLE_ORDER.put("Senior Partner", 2);
        TITLE_ORDER.put("Partner", 3);
        TITLE_ORDER.put("Principal Attorney", 4);
        TITLE_ORDER.put("Senior Counsel", 5);
        TITLE_ORDER.put("Of Counsel", 6);
        TITLE_ORDER.put("Associate", 7);
        TITLE_ORDER.put("Staff Attorney", 8);
    }

    @Override
    public int compare(User user1, User user2) {
        int order1 = TITLE_ORDER.getOrDefault(user1.getTitle().getName(), Integer.MAX_VALUE);
        int order2 = TITLE_ORDER.getOrDefault(user2.getTitle().getName(), Integer.MAX_VALUE);

        if (order1 != order2) {
            return Integer.compare(order1, order2);
        } else {
            return user1.getTitle().getName().compareTo(user2.getTitle().getName());
        }
    }
}
