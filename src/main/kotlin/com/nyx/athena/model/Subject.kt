package com.nyx.athena.model

import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table
class Subject(var name: String,
              var description: String? = null) : CoreEntity() {
    @Suppress("unused")
    constructor() : this(name = "", description = "")
}
