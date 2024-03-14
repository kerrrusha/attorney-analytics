package com.kerrrusha.attorneyanalytics.model.user;

import jakarta.persistence.CascadeType;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("deleted=false")
@SQLDelete(sql = "UPDATE user SET deleted = true WHERE id=?")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String profilePhotoUrl;

    @jakarta.validation.constraints.Email
    @Column(unique = true, nullable = false)
    private String login;

    @Column(nullable = false)
    private String password;

    private String bio;

    private String linkedinUrl;

    @ManyToOne
    @JoinColumn(name = "title_id")
    private Title title;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<Email> emails;

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<Phone> phones = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<Location> locations = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<Admission> admissions = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<PracticeArea> practiceAreas = new ArrayList<>();

    @ToString.Exclude
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @Column(nullable = false)
    private boolean deleted = false;

    public void setEmails(List<Email> emails) {
        if (this.emails == null) {
            this.emails = new ArrayList<>(emails);
            return;
        }
        this.emails.clear();
        this.emails.addAll(emails);
    }

    public void setPhones(List<Phone> phones) {
        if (this.phones == null) {
            this.phones = new ArrayList<>(phones);
            return;
        }
        this.phones.clear();
        this.phones.addAll(phones);
    }

    public void setLocations(List<Location> locations) {
        if (this.locations == null) {
            this.locations = new ArrayList<>(locations);
            return;
        }
        this.locations.clear();
        this.locations.addAll(locations);
    }

    public void setPracticeAreas(List<PracticeArea> practiceAreas) {
        if (this.practiceAreas == null) {
            this.practiceAreas = new ArrayList<>(practiceAreas);
            return;
        }
        this.practiceAreas.clear();
        this.practiceAreas.addAll(practiceAreas);
    }

    public void setAdmissions(List<Admission> admissions) {
        if (this.admissions == null) {
            this.admissions = new ArrayList<>(admissions);
            return;
        }
        this.admissions.clear();
        this.admissions.addAll(admissions);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .toList();
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
