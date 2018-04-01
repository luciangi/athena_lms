package com.nyx.athena.tutor

import com.nyx.athena.security.model.User
import javax.persistence.Entity
import javax.persistence.Table


@Entity
@Table
class Tutor(
        username: String,
        password: String,
        email: String,
        var firstname: String,
        var lastname: String,
        var otherDetails: String? = null) : User(username, password, email)
