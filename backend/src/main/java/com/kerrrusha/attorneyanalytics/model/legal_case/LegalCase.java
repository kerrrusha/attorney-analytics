package com.kerrrusha.attorneyanalytics.model.legal_case;

import com.kerrrusha.attorneyanalytics.model.client.Client;
import com.kerrrusha.attorneyanalytics.model.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
@SQLDelete(sql = "UPDATE legal_case SET deleted = true WHERE id=?")
public class LegalCase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String title;

    private String description;

    @ToString.Exclude
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "legal_case_user",
            joinColumns = @JoinColumn(name = "legal_case_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> assignedUsers = new ArrayList<>();

    @ToString.Exclude
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "case_client",
            joinColumns = @JoinColumn(name = "case_id"),
            inverseJoinColumns = @JoinColumn(name = "client_id")
    )
    private List<Client> assignedClients = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "legal_case_status_id")
    private LegalCaseStatus legalCaseStatus;

    @ManyToOne
    @JoinColumn(name = "legal_case_type_id")
    private LegalCaseType legalCaseType;

    @Column(nullable = false)
    private boolean deleted = false;
}
