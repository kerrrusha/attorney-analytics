package com.kerrrusha.attorneyanalytics.repository.user;

import com.kerrrusha.attorneyanalytics.model.user.UserAdmission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAdmissionRepository extends JpaRepository<UserAdmission, Long> {
    void deleteAllByUserId(Long userId);
}
