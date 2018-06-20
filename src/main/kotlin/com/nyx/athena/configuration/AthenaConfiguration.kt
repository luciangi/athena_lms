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
import org.springframework.util.ResourceUtils


@Configuration
class AthenaConfiguration {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    @Profile("prod")
    fun dataSourceInit(roleRepository: RoleRepository,
                       athenaUserRepository: AthenaUserRepository,
                       tutorRepository: TutorRepository,
                       studentRepository: StudentRepository,
                       passwordEncoder: PasswordEncoder,
                       subjectRepository: SubjectRepository,
                       courseRepository: CourseRepository) = InitializingBean {
        val adminRole = Role(ROLE_ADMIN.name)
        val tutorRole = Role(ROLE_TUTOR.name)
        val studentRole = Role(ROLE_STUDENT.name)
        roleRepository.save(hashSetOf(adminRole, tutorRole, studentRole))

        val adminUser = AthenaUser(
                username = "admin",
                password = passwordEncoder.encode("admin"),
                email = "admin@email.com"
        )
        adminUser.roles += adminRole
        athenaUserRepository.save(adminUser)

        val tutorUser1 = Tutor(
                username = "tutor",
                password = passwordEncoder.encode("tutor"),
                email = "tutor@email.com",
                firstName = "Tutor",
                lastName = "Demo",
                otherDetails = "A tutor user for demo purposes"
        )
        tutorUser1.roles += tutorRole
        tutorRepository.save(tutorUser1)

        val tutorUser2 = Tutor(
                username = "tutor2",
                password = passwordEncoder.encode("tutor2"),
                email = "tutor2@email.com",
                firstName = "Tutor2",
                lastName = "Demo",
                otherDetails = "A tutor user for demo purposes"
        )
        tutorUser2.roles += tutorRole
        tutorRepository.save(tutorUser2)

        val studentUser = Student(
                username = "student",
                password = passwordEncoder.encode("student"),
                email = "student@email.com",
                firstName = "Student",
                lastName = "Demo",
                address = "Street address",
                otherDetails = "A student for demo purposes"
        )
        studentUser.roles += studentRole

        studentRepository.save(studentUser)

        val developmentSubject = Subject(
                name = "Development",
                description = "Software development"
        )
        subjectRepository.save(developmentSubject)
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
        val mathSubject = Subject(
                name = "Math",
                description = "Algebra and Geometry"
        )
        subjectRepository.save(mathSubject)
        val physicsSubject = Subject(
                name = "Physics",
                description = "Mechanics and Thermodynamics"
        )
        subjectRepository.save(physicsSubject)

        courseRepository.save(Course(
                author = tutorUser1,
                subject = developmentSubject,
                name = "Java Development",
                description = "A new course on Java development",
                image = ResourceUtils.getFile("classpath:static/images/courses/course1.jpg").readBytes()
        ))

        courseRepository.save(Course(
                author = tutorUser1,
                subject = developmentSubject,
                name = "Kotlin Development",
                description = "A new course on Kotlin development",
                image = ResourceUtils.getFile("classpath:static/images/courses/course2.jpg").readBytes()
        ))

        courseRepository.save(Course(
                author = tutorUser1,
                subject = developmentSubject,
                name = "Groovy Development",
                description = "A new course on Groovy development",
                image = ResourceUtils.getFile("classpath:static/images/courses/course3.jpg").readBytes()
        ))

        courseRepository.save(Course(
                author = tutorUser2,
                subject = mathSubject,
                name = "Trigonometry for beginners",
                description = "A new course regarding Trigonometry",
                image = ResourceUtils.getFile("classpath:static/images/courses/course4.jpg").readBytes()
        ))

        courseRepository.save(Course(
                author = tutorUser2,
                subject = mathSubject,
                name = "Trigonometry Advanced Level",
                description = "A second course regarding Trigonometry",
                image = ResourceUtils.getFile("classpath:static/images/courses/course5.jpg").readBytes()
        ))

        courseRepository.save(Course(
                author = tutorUser2,
                subject = physicsSubject,
                name = "Mechanics",
                description = "A new course regarding Mechanics",
                image = ResourceUtils.getFile("classpath:static/images/courses/course6.jpg").readBytes()
        ))

        courseRepository.save(Course(
                author = tutorUser2,
                subject = physicsSubject,
                name = "Thermodynamics",
                description = "A new course regarding Thermodynamics",
                image = ResourceUtils.getFile("classpath:static/images/courses/course7.jpg").readBytes()
        ))

        courseRepository.save(Course(
                author = tutorUser2,
                subject = physicsSubject,
                name = "Advanced Thermodynamics",
                description = "A new course regarding Advanced Thermodynamics",
                image = ResourceUtils.getFile("classpath:static/images/courses/course8.jpg").readBytes()
        ))
    }
}
