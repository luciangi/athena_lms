package com.nyx.athena.security.model

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import org.hibernate.validator.constraints.Email
import org.hibernate.validator.constraints.Length
import org.hibernate.validator.constraints.NotEmpty
import org.springframework.data.annotation.Transient
import java.util.*
import java.util.UUID.randomUUID
import javax.persistence.*
import javax.persistence.CascadeType.ALL

@Entity
@Table(name = "\"user\"")
open class User(@NotEmpty(message = "{user.username.notEmpty}")
                var username: String,

                @NotEmpty(message = "{user.password.notEmpty}")
                @Length(min = 5, message = "{user.password.length}")
                @Transient
                var password: String,

                @NotEmpty(message = "{user.email.notEmpty}")
                @Email(message = "{user.email.email}")
                var email: String) {
    @Id
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    @Type(type = "pg-uuid")
    val id: UUID = randomUUID()

    var active: Boolean = true

    @ManyToMany(cascade = [ALL])
    @JoinTable
    var roles: Set<Role> = hashSetOf()
}
