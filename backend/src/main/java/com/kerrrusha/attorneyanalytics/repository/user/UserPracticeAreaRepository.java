package com.kerrrusha.attorneyanalytics.repository.user;

import com.kerrrusha.attorneyanalytics.model.user.UserPracticeArea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPracticeAreaRepository extends JpaRepository<UserPracticeArea, Long> {
    void deleteAllByUserId(Long userId);
}
