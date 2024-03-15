package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.user.UserPracticeArea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PracticeAreaRepository extends JpaRepository<UserPracticeArea, Long> {
    void deleteAllByUserId(Long userId);
}
