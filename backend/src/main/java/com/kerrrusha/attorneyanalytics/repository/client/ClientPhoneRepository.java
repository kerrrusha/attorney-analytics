package com.kerrrusha.attorneyanalytics.repository.client;

import com.kerrrusha.attorneyanalytics.model.client.ClientPhone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientPhoneRepository extends JpaRepository<ClientPhone, Long> {
    void deleteAllByClientId(Long clientId);
}
