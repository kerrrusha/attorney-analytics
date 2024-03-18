package com.kerrrusha.attorneyanalytics.common;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Vector2 <A, B> {

    private A first;
    private B second;
}
