package com.kerrrusha.attorneyanalytics.repository;

import com.kerrrusha.attorneyanalytics.model.user.Location;
import com.kerrrusha.attorneyanalytics.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
    void deleteAllByUser(User user);
}
