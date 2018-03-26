package com.nyx.athena

import com.nyx.athena.security.model.Role
import com.nyx.athena.security.model.Role.Authority.*
import com.nyx.athena.security.model.User
import com.nyx.athena.security.repository.RoleRepository
import com.nyx.athena.security.repository.UserRepository
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
    open fun dataSourceInit(roleRepository: RoleRepository, userRepository: UserRepository, passwordEncoder: PasswordEncoder) = CommandLineRunner {
        userRepository.save(User("admin",
                passwordEncoder.encode("admin"),
                "admin@email.com",
                hashSetOf(Role(ROLE_ADMIN.name))))
        userRepository.save(User("student",
                passwordEncoder.encode("student"),
                "student@email.com",
                hashSetOf(Role(ROLE_STUDENT.name))))
        userRepository.save(User("tutor",
                passwordEncoder.encode("tutor"),
                "tutor@email.com",
                hashSetOf(Role(ROLE_TUTOR.name))))
    }
}
