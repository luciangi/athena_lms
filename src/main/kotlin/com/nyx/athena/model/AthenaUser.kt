package com.nyx.athena.model

import org.hibernate.validator.constraints.Email
import org.hibernate.validator.constraints.Length
import org.hibernate.validator.constraints.NotEmpty
import org.springframework.data.annotation.Transient
import javax.persistence.CascadeType.ALL
import javax.persistence.Entity
import javax.persistence.JoinTable
import javax.persistence.ManyToMany

@Entity
open class AthenaUser(@NotEmpty(message = "{athenaUser.username.notEmpty}")
                      var username: String, @NotEmpty(message = "{athenaUser.password.notEmpty}")
                      @Length(min = 5, message = "{athenaUser.password.length}")
                      @Transient
                      var password: String, @NotEmpty(message = "{athenaUser.email.notEmpty}")
                      @Email(message = "{athenaUser.email.email}")
                      var email: String) : CoreEntity() {
    @Suppress("unused")
    constructor() : this(username = "", password = "", email = "")

    var active: Boolean = true

    @ManyToMany(cascade = [ALL])
    @JoinTable
    var roles: Set<Role> = hashSetOf()
}
