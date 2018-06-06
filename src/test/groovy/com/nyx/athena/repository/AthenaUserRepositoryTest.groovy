package com.nyx.athena.repository

import com.nyx.athena.BaseIntegrationTest
import com.nyx.athena.model.AthenaUser
import com.nyx.athena.model.Role
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException

import static com.nyx.athena.model.Role.Authority.ROLE_STUDENT

class AthenaUserRepositoryTest extends BaseIntegrationTest {
    @Autowired
    private RoleRepository roleRepository
    @Autowired
    private AthenaUserRepository athenaUserRepository

    def "test save"() {
        given: "An athenaUser"
        def user = new AthenaUser("USERNAME", "PASSWORD", "A@A.com")
        user.roles += new Role(ROLE_STUDENT.name())

        when: "Saving the given user"
        athenaUserRepository.save(user)

        then: "The repository contains only the given user and role"
        roleRepository.findAll().size() == 1
        List<AthenaUser> athenaUsers = athenaUserRepository.findAll() as List
        athenaUsers.size() == 1

        and: "The user contains the given values"
        with(athenaUsers[0]) {
            username == user.username
            password == user.password
            email == user.email
            active
        }
    }

    def "test username unique constraint"() {
        given: "2 athena users"
        def user1Email = "A1@A.com"
        def user1 = new AthenaUser("USERNAME", "PASSWORD", user1Email)
        def user2 = new AthenaUser("USERNAME", "PASSWORD", "A2@A.com")
        def role = new Role(ROLE_STUDENT.name())
        user1.roles += role
        user2.roles += role

        when: "Saving the given users"
        athenaUserRepository.save(user1)
        athenaUserRepository.save(user2)

        then: "The repository contains only the first user"
        def users = athenaUserRepository.findAll()
        users.size() == 1
        users[0].email == user1Email

        and: "The second save throws the username unique constraint error"
        thrown(DataIntegrityViolationException)
    }

    def "test email unique constraint"() {
        given: "2 users"
        def user1Username = "USERNAME1"
        def user1 = new AthenaUser(user1Username, "PASSWORD", "A@A.com")
        def user2 = new AthenaUser("USERNAME2", "PASSWORD", "A@A.com")
        def role = new Role(ROLE_STUDENT.name())
        user1.roles += role
        user2.roles += role

        when: "Saving the given users"
        athenaUserRepository.save(user1)
        athenaUserRepository.save(user2)

        then:
        def users = athenaUserRepository.findAll()
        users.size() == 1
        users[0].username == user1Username

        and: "The second save throws the email unique constraint error"
        thrown(DataIntegrityViolationException)
    }
}
