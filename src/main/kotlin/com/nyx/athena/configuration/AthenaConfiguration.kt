package com.nyx.athena.configuration

import com.nyx.athena.model.*
import com.nyx.athena.model.Role.Authority.*
import com.nyx.athena.repository.*
import org.springframework.beans.factory.InitializingBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
open class AthenaConfiguration {
    @Bean
    open fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    @Profile("prod")
    open fun dataSourceInit(roleRepository: RoleRepository,
                            userRepository: UserRepository,
                            tutorRepository: TutorRepository,
                            studentRepository: StudentRepository,
                            passwordEncoder: PasswordEncoder,
                            subjectRepository: SubjectRepository) = InitializingBean {
        authInit(roleRepository, passwordEncoder, tutorRepository, studentRepository, userRepository)

        subjectsInit(subjectRepository)
    }

    private fun authInit(roleRepository: RoleRepository,
                         passwordEncoder: PasswordEncoder,
                         tutorRepository: TutorRepository,
                         studentRepository: StudentRepository,
                         userRepository: UserRepository) {
        val adminRole = Role(ROLE_ADMIN.name)
        val tutorRole = Role(ROLE_TUTOR.name)
        val studentRole = Role(ROLE_STUDENT.name)
        roleRepository.save(hashSetOf(adminRole, tutorRole, studentRole))

        val adminUser = User(
                username = "admin",
                password = passwordEncoder.encode("admin"),
                email = "admin@email.com"
        )
        adminUser.roles += roleRepository.findByAuthority(ROLE_ADMIN.name)
        userRepository.save(adminUser)

        val tutorUser = Tutor(
                username = "tutor",
                password = passwordEncoder.encode("tutor"),
                email = "tutor@email.com",
                firstName = "Tutor",
                lastName = "Demo",
                otherDetails = "A tutor user for demo purposes"
        )
        tutorUser.roles += roleRepository.findByAuthority(ROLE_TUTOR.name)
        tutorRepository.save(tutorUser)

        val studentUser = Student(
                username = "student",
                password = passwordEncoder.encode("student"),
                email = "student@email.com",
                firstName = "Student",
                lastName = "Demo",
                address = "Street address",
                otherDetails = "A student for demo purposes"
        )
        studentUser.roles += roleRepository.findByAuthority(ROLE_STUDENT.name)

        studentRepository.save(studentUser)
    }

    private fun subjectsInit(subjectRepository: SubjectRepository) {
        subjectRepository.save(Subject(
                name = "Development",
                description = "Software development"
        ))
        subjectRepository.save(Subject(
                name = "OOP",
                description = "Object Oriented Programming"
        ))
        subjectRepository.save(Subject(
                name = "SQL",
                description = "Structured Query Language"
        ))
        subjectRepository.save(Subject(
                name = "Business",
                description = "Business subjects"
        ))
        subjectRepository.save(Subject(
                name = "IT",
                description = "It and Networking"
        ))
        subjectRepository.save(Subject(
                name = "Personal Development",
                description = "Personal Development"
        ))
        subjectRepository.save(Subject(
                name = "Design",
                description = "Graphic Design"
        ))
        subjectRepository.save(Subject(
                name = "Marketing",
                description = "Marketing courses and programs"
        ))
        subjectRepository.save(Subject(
                name = "Language",
                description = "Language learning"
        ))
        subjectRepository.save(Subject(
                name = "Data Science",
                description = "Data Science courses and programs"
        ))
        subjectRepository.save(Subject(
                name = "Math",
                description = "Algebra and Geometry"
        ))
        subjectRepository.save(Subject(
                name = "Physics",
                description = "Mechanics and Thermodynamics"
        ))
    }
}
