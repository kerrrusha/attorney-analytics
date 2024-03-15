package com.kerrrusha.attorneyanalytics.helper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CommonHelper {

    @SafeVarargs
    public static <T> List<T> createList(T... elements) {
        List<T> result = new ArrayList<>();
        Collections.addAll(result, elements);
        return result;
    }
}
