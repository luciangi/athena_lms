package com.nyx.athena.model

import javax.persistence.Entity

@Entity
class Tutor(username: String,
            password: String,
            email: String,
            var firstName: String,
            var lastName: String,
            var otherDetails: String? = null)
    : AthenaUser(username,
        password,
        email) {
    @Suppress("unused")
    constructor() : this(username = "", password = "", email = "", firstName = "", lastName = "")
}
