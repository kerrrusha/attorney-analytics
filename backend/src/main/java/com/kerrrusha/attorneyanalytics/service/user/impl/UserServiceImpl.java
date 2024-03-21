package com.kerrrusha.attorneyanalytics.service.user.impl;

import com.kerrrusha.attorneyanalytics.dto.user.request.FireEmployeeRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.HireEmployeeRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserUpdateRequestDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.EmployeeResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserListingResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UserResponseDto;
import com.kerrrusha.attorneyanalytics.dto.user.response.UsersGroupedByTitleDto;
import com.kerrrusha.attorneyanalytics.exception.UserAlreadyExistsException;
import com.kerrrusha.attorneyanalytics.model.user.UserAdmission;
import com.kerrrusha.attorneyanalytics.model.user.UserEmail;
import com.kerrrusha.attorneyanalytics.model.user.UserLocation;
import com.kerrrusha.attorneyanalytics.model.user.UserPhone;
import com.kerrrusha.attorneyanalytics.model.user.UserPracticeArea;
import com.kerrrusha.attorneyanalytics.model.user.Role;
import com.kerrrusha.attorneyanalytics.model.user.Title;
import com.kerrrusha.attorneyanalytics.model.user.UserTitleComparator;
import com.kerrrusha.attorneyanalytics.repository.user.UserAdmissionRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserEmailRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserLocationRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserPhoneRepository;
import com.kerrrusha.attorneyanalytics.repository.user.UserPracticeAreaRepository;
import com.kerrrusha.attorneyanalytics.repository.user.RoleRepository;
import com.kerrrusha.attorneyanalytics.repository.user.TitleRepository;
import com.kerrrusha.attorneyanalytics.security.RandomPasswordGenerator;
import com.kerrrusha.attorneyanalytics.service.user.UserService;
import com.kerrrusha.attorneyanalytics.model.user.User;
import com.kerrrusha.attorneyanalytics.dto.user.request.UserRegistrationRequestDto;
import com.kerrrusha.attorneyanalytics.mapper.UserMapper;
import com.kerrrusha.attorneyanalytics.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.kerrrusha.attorneyanalytics.common.CommonHelper.toStringList;
import static java.util.Collections.singleton;
import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toCollection;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final RandomPasswordGenerator randomPasswordGenerator;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final TitleRepository titleRepository;
    private final UserEmailRepository emailRepository;
    private final UserPhoneRepository phoneRepository;
    private final UserLocationRepository locationRepository;
    private final UserPracticeAreaRepository practiceAreaRepository;
    private final UserAdmissionRepository admissionRepository;
    private final UserTitleComparator userTitleComparator;

    @Override
    public UserResponseDto register(UserRegistrationRequestDto request) {
        if (userRepository.findByLogin(request.getLogin()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists with such login: " + request.getLogin());
        }

        User user = new User();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setLogin(request.getLogin());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setProfilePhotoUrl(request.getProfilePhotoUrl());

        Role workerRole = roleRepository.findByName(Role.RoleName.WORKER).orElseThrow();
        user.setRoles(singleton(workerRole));

        if (request.getTitleId() != null) {
            Title title = titleRepository.findById(request.getTitleId())
                    .orElseThrow(() -> new RuntimeException("Can't find title by id: " + request.getTitleId()));
            user.setTitle(title);
        }

        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public void hireEmployee(HireEmployeeRequestDto requestDto) {
        UserRegistrationRequestDto registrationRequestDto = new UserRegistrationRequestDto();

        registrationRequestDto.setTitleId(requestDto.getTitleId());
        registrationRequestDto.setPassword(randomPasswordGenerator.generatePassword());
        registrationRequestDto.setFirstName(requestDto.getFirstName());
        registrationRequestDto.setLastName(requestDto.getLastName());
        registrationRequestDto.setLogin(requestDto.getLogin());

        register(registrationRequestDto);
    }

    @Override
    public void fireEmployee(FireEmployeeRequestDto requestDto) {
        userRepository.deleteById(requestDto.getId());
    }

    @Override
    @Transactional
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
            userToUpdate.setFirstName(requestDto.getFirstName());
        }
        if (isNotBlank(requestDto.getLastName())) {
            userToUpdate.setLastName(requestDto.getLastName());
        }
        if (nonNull(requestDto.getProfilePhotoUrl())) {
            userToUpdate.setProfilePhotoUrl(requestDto.getProfilePhotoUrl());
        }
        if (nonNull(requestDto.getBio())) {
            userToUpdate.setBio(requestDto.getBio());
        }
        if (nonNull(requestDto.getLinkedinUrl())) {
            userToUpdate.setLinkedinUrl(requestDto.getLinkedinUrl());
        }
        if (nonNull(requestDto.getTitleId())) {
            Title title = titleRepository.findById(requestDto.getTitleId())
                    .orElseThrow(() -> new RuntimeException("Can't find title by id: " + requestDto.getTitleId()));
            userToUpdate.setTitle(title);
        }
        if (nonNull(requestDto.getEmails())) {
            List<UserEmail> emails = Arrays.stream(requestDto.getEmails())
                    .map(str -> new UserEmail(str, userToUpdate))
                    .collect(toCollection(ArrayList::new));
            userToUpdate.getEmails().clear();
            emailRepository.deleteAllByUserId(userToUpdate.getId());
            userToUpdate.setEmails(emails);
        }
        if (nonNull(requestDto.getPhones())) {
            List<UserPhone> phones = Arrays.stream(requestDto.getPhones())
                    .map(str -> new UserPhone(str, userToUpdate))
                    .collect(toCollection(ArrayList::new));
            userToUpdate.getPhones().clear();
            phoneRepository.deleteAllByUserId(userToUpdate.getId());
            userToUpdate.setPhones(phones);
        }
        if (nonNull(requestDto.getLocations())) {
            List<UserLocation> locations = Arrays.stream(requestDto.getLocations())
                    .map(str -> new UserLocation(str, userToUpdate))
                    .collect(toCollection(ArrayList::new));
            userToUpdate.getLocations().clear();
            locationRepository.deleteAllByUserId(userToUpdate.getId());
            userToUpdate.setLocations(locations);
        }
        if (nonNull(requestDto.getAdmissions())) {
            List<UserAdmission> admissions = Arrays.stream(requestDto.getAdmissions())
                    .map(str -> new UserAdmission(str, userToUpdate))
                    .collect(toCollection(ArrayList::new));
            userToUpdate.getAdmissions().clear();
            admissionRepository.deleteAllByUserId(userToUpdate.getId());
            userToUpdate.setAdmissions(admissions);
        }
        if (nonNull(requestDto.getPracticeAreas())) {
            List<UserPracticeArea> practiceAreas = Arrays.stream(requestDto.getPracticeAreas())
                    .map(str -> new UserPracticeArea(str, userToUpdate))
                    .collect(toCollection(ArrayList::new));
            userToUpdate.getPracticeAreas().clear();
            practiceAreaRepository.deleteAllByUserId(userToUpdate.getId());
            userToUpdate.setPracticeAreas(practiceAreas);
        }
        return userMapper.toDto(userRepository.save(userToUpdate));
    }

    @Override
    public List<UsersGroupedByTitleDto> getGroupedByTitle() {
        Map<Title, List<User>> usersByTitle = userRepository.findAll().stream()
                .filter(user -> user.getTitle() != null)
                .collect(groupingBy(User::getTitle));

        return usersByTitle.entrySet().stream()
                .sorted((usersByTitle1, usersByTitle2) ->
                        userTitleComparator.compare(usersByTitle1.getValue().get(0), usersByTitle2.getValue().get(0)))
                .map(this::mapToGroupedByTitle)
                .toList();
    }

    @Override
    public EmployeeResponseDto findByFullName(String fullNameKebabCased) {
        String firstName = fullNameKebabCased.split("-")[0];
        String lastName = fullNameKebabCased.split("-")[1];
        User user = userRepository.findByFirstNameAndLastNameIgnoreCase(firstName, lastName)
                .orElseThrow(() -> new RuntimeException("Can't find user by first: " + firstName + " and last name: " + lastName));
        return userMapper.toEmployeeDto(user);
    }

    @Override
    public List<UserResponseDto> findByLastName(String lastName) {
        return userRepository.findByLastNameContainingIgnoreCase(lastName).stream()
                .map(userMapper::toDto)
                .toList();
    }

    private UsersGroupedByTitleDto mapToGroupedByTitle(Map.Entry<Title, List<User>> entry) {
        UsersGroupedByTitleDto result = new UsersGroupedByTitleDto();

        result.setTitle(entry.getKey().getName());

        result.setData(entry.getValue().stream()
                .map(this::mapToListingUser)
                .toList());

        return result;
    }

    private UserListingResponseDto mapToListingUser(User user) {
        var result = new UserListingResponseDto();

        result.setFullName(user.getFullName());
        result.setProfilePhotoUrl(user.getProfilePhotoUrl());
        result.setTitle(user.getTitle().getName());
        result.setPhones(toStringList(user.getPhones()));
        result.setEmails(toStringList(user.getEmails()));

        return result;
    }

    @Override
    public UserResponseDto findByEmail(String email) {
        User user = findUserByEmail(email);
        return userMapper.toDto(user);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByLogin(email)
                .orElseThrow(() -> new RuntimeException("User not found by login: " + email));
    }
}
