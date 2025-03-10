// DonorInfo.java
package com.ngo.donationservice.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonorInfo {

    private String firstName;
    private String lastName;

    @Email
    private String email;

    private String phone;
    private Boolean anonymous;
}
