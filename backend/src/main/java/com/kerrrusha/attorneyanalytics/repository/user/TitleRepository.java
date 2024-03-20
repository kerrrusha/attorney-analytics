package com.kerrrusha.attorneyanalytics.repository.user;

import com.kerrrusha.attorneyanalytics.model.user.Title;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TitleRepository extends JpaRepository<Title, Long> {
}
