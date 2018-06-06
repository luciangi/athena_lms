package com.nyx.athena.model

import org.hibernate.validator.constraints.NotBlank
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table
class Subject(@Column(unique = true, nullable = false)
              @NotBlank
              var name: String,
              var description: String? = null)
    : CoreEntity()
