package com.nyx.athena

import com.nyx.athena.security.model.Role
import com.nyx.athena.security.model.Role.Authority.*
import com.nyx.athena.security.model.User
import com.nyx.athena.security.repository.RoleRepository
import com.nyx.athena.security.repository.UserRepository
import com.nyx.athena.tutor.TutorService
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
    open fun dataSourceInit(roleRepository: RoleRepository,
                            userRepository: UserRepository,
                            tutorService: TutorService,
                            passwordEncoder: PasswordEncoder) = CommandLineRunner {
        val adminRole = Role(ROLE_ADMIN.name)
        val tutorRole = Role(ROLE_TUTOR.name)
        val studentRole = Role(ROLE_STUDENT.name)
        roleRepository.save(hashSetOf(adminRole, tutorRole, studentRole))

        val adminUser = User("admin",
                passwordEncoder.encode("admin"),
                "admin@email.com")
        adminUser.roles += adminRole

        tutorService.registerTutor()

        val studentUser = User("student",
                passwordEncoder.encode("student"),
                "student@email.com")
        studentUser.roles += studentRole

        userRepository.save(hashSetOf(adminUser, studentUser))
    }
}
