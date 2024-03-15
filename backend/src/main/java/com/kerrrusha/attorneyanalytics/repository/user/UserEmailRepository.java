package com.kerrrusha.attorneyanalytics.repository.user;

import com.kerrrusha.attorneyanalytics.model.user.UserEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEmailRepository extends JpaRepository<UserEmail, Long> {
    void deleteAllByUserId(Long userId);
}
