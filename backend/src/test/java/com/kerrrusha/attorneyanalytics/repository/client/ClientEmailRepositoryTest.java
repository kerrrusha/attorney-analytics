package com.kerrrusha.attorneyanalytics.repository.client;

import com.kerrrusha.attorneyanalytics.model.client.Client;
import com.kerrrusha.attorneyanalytics.model.client.ClientEmail;
import lombok.extern.slf4j.Slf4j;
import org.junit.Ignore;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.createList;
import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Ignore
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ClientEmailRepositoryTest {

    private static final long ID = 12345L;
    private static final String FIRST_NAME = "Testfirst";
    private static final String LAST_NAME = "Testlast";
    private static final String EMAIL = "mail@mail.com";

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ClientEmailRepository clientEmailRepository;

    @Test
    void user_setEmails_ok() {
        Client client = insertClient();

        ClientEmail expectedEmail = new ClientEmail(EMAIL, client);
        List<ClientEmail> expected = createList(expectedEmail);
        client.setEmails(new ArrayList<>(expected));
        clientRepository.save(client);

        List<ClientEmail> actual = getClientFromDB(client).getEmails();
        assertEquals(1, actual.size());
        ClientEmail actualClientEmail = actual.get(0);

        log.info("Expected: {}", expectedEmail.getValue());
        log.info("Actual: {}", actualClientEmail.getValue());

        assertIterableEquals(expected, actual);
    }

    @Test
    void email_deleteAllByUserId_ok() {
        Client client = insertClient();

        List<ClientEmail> prevClientEmails = createList(new ClientEmail(EMAIL, client));
        client.setEmails(prevClientEmails);
        clientRepository.save(client);

        assertIterableEquals(prevClientEmails, getClientFromDB(client).getEmails());

        List<ClientEmail> expected = emptyList();
        client.setEmails(expected);
        clientRepository.save(client);

        assertIterableEquals(expected, getClientFromDB(client).getEmails());
    }

    @Test
    void user_updateEmails_ok() {
        Client client = insertClient();
        List<ClientEmail> prevClientEmails = createList(
                new ClientEmail("client_updateEmails_ok@test.com", client)
        );
        client.setEmails(prevClientEmails);
        clientRepository.save(client);

        assertIterableEquals(prevClientEmails, getClientFromDB(client).getEmails());

        List<ClientEmail> newClientEmails = createList(
                new ClientEmail("client_updateEmails_ok@test.com", client),
                new ClientEmail("client_123_updateEmails_ok@test.com", client)
        );
        client.getEmails().clear();
        clientEmailRepository.deleteAllByClientId(client.getId());
        client.setEmails(newClientEmails);
        clientRepository.save(client);

        assertIterableEquals(newClientEmails, getClientFromDB(client).getEmails());
    }

    private Client insertClient() {
        Client client = Client.builder()
                .id(ID)
                .firstName(FIRST_NAME)
                .lastName(LAST_NAME)
                .build();
        clientRepository.save(client);

        return getClientFromDB(client);
    }
    
    private Client getClientFromDB(Client detached) {
        return clientRepository.findByFirstNameAndLastName(detached.getFirstName(), detached.getLastName()).orElseThrow();
    }
}
