package com.kerrrusha.attorneyanalytics.model;

import static org.apache.commons.lang3.StringUtils.SPACE;

public interface FullNameProvider {

    String getFirstName();

    String getLastName();

    default String getFullName() {
        return String.join(SPACE, getFirstName(), getLastName());
    }
}
