package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.user.PracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PracticeAreaRepository extends JpaRepository<PracticeArea, Long> {
    void deleteAllByUser(User user);
}
