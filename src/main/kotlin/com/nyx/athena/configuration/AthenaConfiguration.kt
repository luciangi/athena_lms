package com.nyx.athena.configuration

import com.nyx.athena.model.Role
import com.nyx.athena.model.Role.Authority.*
import com.nyx.athena.model.Tutor
import com.nyx.athena.model.User
import com.nyx.athena.repository.RoleRepository
import com.nyx.athena.repository.TutorRepository
import com.nyx.athena.repository.UserRepository
import org.springframework.beans.factory.InitializingBean
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
                            tutorRepository: TutorRepository,
                            passwordEncoder: PasswordEncoder) = InitializingBean {
        val adminRole = Role(ROLE_ADMIN.name)
        val tutorRole = Role(ROLE_TUTOR.name)
        val studentRole = Role(ROLE_STUDENT.name)
        roleRepository.save(hashSetOf(adminRole, tutorRole, studentRole))

        val adminUser = User("admin",
                passwordEncoder.encode("admin"),
                "admin@email.com")
        adminUser.roles += adminRole

        val tutorUser = Tutor(
                "tutor",
                passwordEncoder.encode("tutor"),
                "tutor@email.com",
                "Tutor",
                "Demo",
                "A tutor user used for demo purposes"
        )
        tutorUser.roles += roleRepository.findByAuthority(Role.Authority.ROLE_TUTOR.name)
        tutorRepository.save(tutorUser)

        val studentUser = User("student",
                passwordEncoder.encode("student"),
                "student@email.com")
        studentUser.roles += studentRole

        userRepository.save(hashSetOf(adminUser, studentUser))
    }
}
