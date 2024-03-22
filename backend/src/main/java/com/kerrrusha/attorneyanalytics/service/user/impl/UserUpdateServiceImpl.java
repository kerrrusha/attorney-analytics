package com.kerrrusha.attorneyanalytics.service.user.impl;

import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.mapper.UserMapper;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.model.user.UserAdmission;
import com.kerrrusha.attorneyanalytics.model.user.UserEmail;
import com.kerrrusha.attorneyanalytics.model.user.UserLocation;
import com.kerrrusha.attorneyanalytics.model.user.UserPhone;
import com.kerrrusha.attorneyanalytics.model.user.UserPracticeArea;
import com.kerrrusha.attorneyanalytics.repository.user.RoleRepository;
import com.kerrrusha.attorneyanalytics.repository.user.TitleRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserAdmissionRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserEmailRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserLocationRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserPhoneRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserPracticeAreaRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import com.kerrrusha.attorneyanalytics.service.user.UserUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.refine;
import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toCollection;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Service
@RequiredArgsConstructor
public class UserUpdateServiceImpl implements UserUpdateService {

    private final UserEmailRepository emailRepository;
    private final UserPhoneRepository phoneRepository;
    private final UserLocationRepository locationRepository;
    private final UserPracticeAreaRepository practiceAreaRepository;
    private final UserAdmissionRepository admissionRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TitleRepository titleRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponseDto update(UserUpdateRequestDto requestDto, String updatedByLogin) {
        User userToUpdate = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found by id: " + requestDto.getUserId()));
        User updatedBy = userRepository.findByLogin(updatedByLogin)
                .orElseThrow(() -> new RuntimeException("User not found by login: " + updatedByLogin));

        Role adminRole = roleRepository.findByName(Role.RoleName.ADMIN).orElseThrow();
        if (!updatedBy.getRoles().contains(adminRole) && !updatedBy.equals(userToUpdate)) {
            throw new AccessDeniedException("User id in request and in database are different");
        }

        if (nonNull(requestDto.getFirstName())) {
            updateFirstName(userToUpdate, requestDto);
        }
        if (isNotBlank(requestDto.getLastName())) {
            updateLastName(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getProfilePhotoUrl())) {
            updateProfilePhotoUrl(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getBio())) {
            updateBio(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getLinkedinUrl())) {
            updateLinkedinUrl(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getTitleId())) {
            updateTitle(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getEmails())) {
            updateEmails(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getPhones())) {
            updatePhones(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getLocations())) {
            updateLocations(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getAdmissions())) {
            updateAdmissions(userToUpdate, requestDto);
        }
        if (nonNull(requestDto.getPracticeAreas())) {
            updatePracticeAreas(userToUpdate, requestDto);
        }

        return userMapper.toDto(userRepository.findById(userToUpdate.getId()).orElseThrow());
    }

    private void updateFirstName(User userToUpdate, UserUpdateRequestDto requestDto) {
        userToUpdate.setFirstName(requestDto.getFirstName());
        userRepository.save(userToUpdate);
    }

    private void updateLastName(User userToUpdate, UserUpdateRequestDto requestDto) {
        userToUpdate.setLastName(requestDto.getLastName());
        userRepository.save(userToUpdate);
    }

    private void updateProfilePhotoUrl(User userToUpdate, UserUpdateRequestDto requestDto) {
        userToUpdate.setProfilePhotoUrl(requestDto.getProfilePhotoUrl());
        userRepository.save(userToUpdate);
    }

    private void updateBio(User userToUpdate, UserUpdateRequestDto requestDto) {
        userToUpdate.setBio(requestDto.getBio());
        userRepository.save(userToUpdate);
    }

    private void updateLinkedinUrl(User userToUpdate, UserUpdateRequestDto requestDto) {
        userToUpdate.setLinkedinUrl(requestDto.getLinkedinUrl());
        userRepository.save(userToUpdate);
    }

    private void updateTitle(User userToUpdate, UserUpdateRequestDto requestDto) {
        Title title = titleRepository.findById(requestDto.getTitleId())
                .orElseThrow(() -> new RuntimeException("Can't find title by id: " + requestDto.getTitleId()));
        userToUpdate.setTitle(title);
        userRepository.save(userToUpdate);
    }

    private void updateEmails(User userToUpdate, UserUpdateRequestDto requestDto) {
        List<UserEmail> emails = refine(requestDto.getEmails())
                .stream()
                .map(str -> new UserEmail(str, userToUpdate))
                .collect(toCollection(ArrayList::new));
        userToUpdate.getEmails().clear();
        emailRepository.deleteAllByUserId(userToUpdate.getId());
        userToUpdate.setEmails(emails);
        userRepository.save(userToUpdate);
    }

    private void updatePhones(User userToUpdate, UserUpdateRequestDto requestDto) {
        List<UserPhone> phones = refine(requestDto.getPhones())
                .stream()
                .map(str -> new UserPhone(str, userToUpdate))
                .collect(toCollection(ArrayList::new));
        userToUpdate.getPhones().clear();
        phoneRepository.deleteAllByUserId(userToUpdate.getId());
        userToUpdate.setPhones(phones);
        userRepository.save(userToUpdate);
    }

    private void updateLocations(User userToUpdate, UserUpdateRequestDto requestDto) {
        List<UserLocation> locations = refine(requestDto.getLocations())
                .stream()
                .map(str -> new UserLocation(str, userToUpdate))
                .collect(toCollection(ArrayList::new));
        userToUpdate.getLocations().clear();
        locationRepository.deleteAllByUserId(userToUpdate.getId());
        userToUpdate.setLocations(locations);
        userRepository.save(userToUpdate);
    }

    private void updateAdmissions(User userToUpdate, UserUpdateRequestDto requestDto) {
        List<UserAdmission> admissions = refine(requestDto.getAdmissions())
                .stream()
                .map(str -> new UserAdmission(str, userToUpdate))
                .collect(toCollection(ArrayList::new));
        userToUpdate.getAdmissions().clear();
        admissionRepository.deleteAllByUserId(userToUpdate.getId());
        userToUpdate.setAdmissions(admissions);
        userRepository.save(userToUpdate);
    }

    private void updatePracticeAreas(User userToUpdate, UserUpdateRequestDto requestDto) {
        List<UserPracticeArea> practiceAreas = refine(requestDto.getPracticeAreas())
                .stream()
                .map(str -> new UserPracticeArea(str, userToUpdate))
                .collect(toCollection(ArrayList::new));
        userToUpdate.getPracticeAreas().clear();
        practiceAreaRepository.deleteAllByUserId(userToUpdate.getId());
        userToUpdate.setPracticeAreas(practiceAreas);
        userRepository.save(userToUpdate);
    }
}
