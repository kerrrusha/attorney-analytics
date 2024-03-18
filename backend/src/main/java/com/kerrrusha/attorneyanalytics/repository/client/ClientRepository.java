package com.kerrrusha.attorneyanalytics.repository.client;

import com.kerrrusha.attorneyanalytics.model.client.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByFirstNameAndLastName(String firstName, String lastName);

    Page<Client> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
