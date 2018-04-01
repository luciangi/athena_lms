package com.nyx.athena.security.model

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table
class Role(val authority: String = Authority.ROLE_STUDENT.name) {
    enum class Authority { ROLE_ADMIN, ROLE_TUTOR, ROLE_STUDENT }

    @Id
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    @Type(type = "pg-uuid")
    val id: UUID = UUID.randomUUID()
}
