package com.nyx.athena.model

import org.hibernate.annotations.GenericGenerator
import org.hibernate.annotations.Type
import org.hibernate.annotations.TypeDef
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
@TypeDef(name = "uuid-custom", typeClass = UUIDCustomType::class)
open class User(@NotEmpty(message = "{user.username.notEmpty}")
                var username: String, @NotEmpty(message = "{user.password.notEmpty}")
                @Length(min = 5, message = "{user.password.length}")
                @Transient
                var password: String, @NotEmpty(message = "{user.email.notEmpty}")
                @Email(message = "{user.email.email}")
                var email: String) {
    @Suppress("unused")
    constructor() : this(username = "", password = "", email = "")

    @Id
    @GenericGenerator(name = "uuid-gen", strategy = "uuid2")
    @GeneratedValue(generator = "uuid-gen")
    @Type(type = "uuid-custom")
    @Suppress("unused")
    val id: UUID = randomUUID()

    var active: Boolean = true

    @ManyToMany(cascade = [ALL])
    @JoinTable
    var roles: Set<Role> = hashSetOf()
}
