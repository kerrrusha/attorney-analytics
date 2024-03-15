package com.kerrrusha.attorneyanalytics.repository.user;

import com.kerrrusha.attorneyanalytics.model.user.UserPhone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPhoneRepository extends JpaRepository<UserPhone, Long> {
    void deleteAllByUserId(Long userId);
}
