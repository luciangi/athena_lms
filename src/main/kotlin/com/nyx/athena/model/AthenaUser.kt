package com.nyx.athena.model

import org.hibernate.validator.constraints.Email
import org.hibernate.validator.constraints.Length
import org.hibernate.validator.constraints.NotBlank
import org.hibernate.validator.constraints.NotEmpty
import org.springframework.data.annotation.Transient
import javax.persistence.CascadeType.ALL
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.JoinTable
import javax.persistence.ManyToMany

@Entity
open class AthenaUser(@Column(unique = true, nullable = false)
                      @NotBlank
                      var username: String,
                      @Column(nullable = false)
                      @Length(min = 5)
                      @NotBlank
                      @Transient
                      var password: String,
                      @Column(unique = true, nullable = false)
                      @Email
                      @NotBlank
                      var email: String) : CoreEntity() {
    var active: Boolean = true

    @ManyToMany(cascade = [ALL])
    @JoinTable
    @NotEmpty
    var roles: Set<Role> = hashSetOf()
}
