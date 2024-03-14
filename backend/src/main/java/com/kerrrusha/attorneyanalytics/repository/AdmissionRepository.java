package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.user.Admission;
import com.kerrrusha.attorneyanalytics.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdmissionRepository extends JpaRepository<Admission, Long> {
    void deleteAllByUser(User user);
}
