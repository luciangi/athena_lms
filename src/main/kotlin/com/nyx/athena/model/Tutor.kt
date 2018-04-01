package com.nyx.athena.model

import javax.persistence.Entity

@Entity
class Tutor(username: String,
            password: String,
            email: String,
            firstName: String,
            lastName: String,
            var otherDetails: String? = null)
    : User(username,
        password,
        email) {
    @Suppress("unused")
    constructor() : this(username = "", password = "", email = "", firstName = "", lastName = "")

    var firstname: String = firstName
    var lastname: String = lastName
}
