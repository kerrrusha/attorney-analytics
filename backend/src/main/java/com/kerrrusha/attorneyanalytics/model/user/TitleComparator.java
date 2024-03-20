package com.kerrrusha.attorneyanalytics.model.user;

import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

@Component
public class TitleComparator implements Comparator<Title> {

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
    public int compare(Title title1, Title title2) {
        int order1 = TITLE_ORDER.getOrDefault(title1.getName(), Integer.MAX_VALUE);
        int order2 = TITLE_ORDER.getOrDefault(title2.getName(), Integer.MAX_VALUE);

        if (order1 != order2) {
            return Integer.compare(order1, order2);
        } else {
            return title1.getName().compareTo(title2.getName());
        }
    }
}
