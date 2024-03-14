package com.kerrrusha.attorneyanalytics.service;

import com.kerrrusha.attorneyanalytics.model.user.User;

public interface UserFieldService {
    void update(User user, String[] values);
}
