package com.nyx.athena

import com.nyx.athena.security.model.Role
import com.nyx.athena.security.model.Role.Authority.*
import com.nyx.athena.security.model.User
import com.nyx.athena.security.repository.RoleRepository
import com.nyx.athena.security.service.AuthService
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
open class AthenaConfiguration {
    @Bean
    open fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    open fun dataSourceInit(roleRepository: RoleRepository, authService: AuthService) = CommandLineRunner {
        val admin = User("admin", "admin", "admin@email.com", hashSetOf(Role(ROLE_ADMIN.name)))
        authService.registerUser(admin)

        val student = User("student", "student", "student@email.com", hashSetOf(Role(ROLE_STUDENT.name)))
        authService.registerUser(student)

        val tutor = User("tutor", "tutor", "tutor@email.com", hashSetOf(Role(ROLE_TUTOR.name)))
        authService.registerUser(tutor)
    }
}
