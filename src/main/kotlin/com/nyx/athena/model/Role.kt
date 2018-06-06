package com.nyx.athena.model

import org.hibernate.validator.constraints.NotBlank
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table
class Role(@Column(unique = true, nullable = false)
           @NotBlank
           val authority: String = Authority.ROLE_STUDENT.name) : CoreEntity() {
    enum class Authority { ROLE_ADMIN, ROLE_TUTOR, ROLE_STUDENT }
}
