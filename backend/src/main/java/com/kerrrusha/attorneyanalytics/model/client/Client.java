package com.kerrrusha.attorneyanalytics.model.client;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("deleted=false")
@SQLDelete(sql = "UPDATE client SET deleted = true WHERE id=?")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @ToString.Exclude
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<ClientEmail> emails;

    @ToString.Exclude
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<ClientPhone> phones = new ArrayList<>();

    @Column(nullable = false)
    private boolean deleted = false;

    public void setEmails(List<ClientEmail> emails) {
        if (this.emails == null) {
            this.emails = new ArrayList<>(emails);
            return;
        }
        this.emails.clear();
        this.emails.addAll(emails);
    }

    public void setPhones(List<ClientPhone> phones) {
        if (this.phones == null) {
            this.phones = new ArrayList<>(phones);
            return;
        }
        this.phones.clear();
        this.phones.addAll(phones);
    }
}
