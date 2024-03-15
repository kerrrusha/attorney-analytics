package com.kerrrusha.attorneyanalytics.repository.client;

import com.kerrrusha.attorneyanalytics.model.client.ClientEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientEmailRepository extends JpaRepository<ClientEmail, Long> {
    void deleteAllByClientId(Long clientId);
}
