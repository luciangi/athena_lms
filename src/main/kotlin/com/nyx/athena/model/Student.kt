package com.nyx.athena.model

import javax.persistence.Entity

@Entity
class Student(username: String,
              password: String,
              email: String,
              var firstName: String,
              var lastName: String,
              var address: String? = null,
              var otherDetails: String? = null)
    : AthenaUser(username,
        password,
        email) {
    @Suppress("unused")
    constructor() : this(username = "", password = "", email = "", firstName = "", lastName = "")
}
