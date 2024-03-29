package com.kerrrusha.attorneyanalytics.repository.user;

import com.kerrrusha.attorneyanalytics.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);

    List<User> findByFirstNameAndLastNameIgnoreCase(String firstName, String lastName);

    List<User> findByLastNameContainingIgnoreCase(String lastName);
}
