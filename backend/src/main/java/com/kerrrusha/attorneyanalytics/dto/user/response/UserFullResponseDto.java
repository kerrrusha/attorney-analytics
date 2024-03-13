package com.kerrrusha.attorneyanalytics.dto.user.response;

import com.kerrrusha.attorneyanalytics.model.user.Admission;
import com.kerrrusha.attorneyanalytics.model.user.Email;
import com.kerrrusha.attorneyanalytics.model.user.Location;
import com.kerrrusha.attorneyanalytics.model.user.Phone;
import com.kerrrusha.attorneyanalytics.model.user.PracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class UserFullResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private String firstName;
    private String lastName;
    private String profilePhotoUrl;
    private String login;
    private String bio;
    private String linkedinUrl;
    private Title title;
    private List<Email> emails;
    private List<Phone> phones;
    private List<Location> locations;
    private List<Admission> admissions;
    private List<PracticeArea> practiceAreas;
    private Set<Role> roles;
}
