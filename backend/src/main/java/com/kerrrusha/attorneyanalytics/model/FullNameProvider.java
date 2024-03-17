package com.kerrrusha.attorneyanalytics.model;

public interface FullNameProvider {

    String getFirstName();

    String getLastName();

    default String getFullName() {
        return getFirstName() + " " + getLastName();
    }
}
