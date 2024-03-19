package com.kerrrusha.attorneyanalytics.dto.user.response;

import lombok.Data;

import java.util.List;

@Data
public class UsersGroupedByTitleDto {

    private String title;
    private List<ListingUserDto> data;

    @Data
    public static class ListingUserDto {
        private String fullName;
        private String title;
        private String profilePhotoUrl;
        private List<String> emails;
        private List<String> phones;
    }
}
