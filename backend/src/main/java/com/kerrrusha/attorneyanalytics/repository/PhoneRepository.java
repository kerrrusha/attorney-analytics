package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.user.Phone;
import com.kerrrusha.attorneyanalytics.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhoneRepository extends JpaRepository<Phone, Long> {
    void deleteAllByUser(User user);
}
