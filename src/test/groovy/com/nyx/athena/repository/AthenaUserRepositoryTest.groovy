package com.nyx.athena.repository

import com.nyx.athena.BaseIntegrationTest
import com.nyx.athena.model.AthenaUser
import com.nyx.athena.model.Role
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException

import static com.nyx.athena.model.Role.Authority.ROLE_STUDENT

class AthenaUserRepositoryTest extends BaseIntegrationTest {
    @Autowired
    RoleRepository roleRepository
    @Autowired
    AthenaUserRepository athenaUserRepository

    def "test save"() {
        given:
        def user = new AthenaUser("USERNAME", "PASSWORD", "A@A.com")
        user.roles += new Role(ROLE_STUDENT.name())
        when:
        athenaUserRepository.save(user)
        List<AthenaUser> athenaUsers = athenaUserRepository.findAll() as List

        then:
        athenaUsers.size() == 1
        athenaUsers[0].username == user.username
        athenaUsers[0].password == user.password
        athenaUsers[0].email == user.email
        athenaUsers[0].active
        roleRepository.findAll().size() == 1
    }

    def "test username unique constraint"() {
        given:
        def user1 = new AthenaUser("USERNAME", "PASSWORD", "A1@A.com")
        def user2 = new AthenaUser("USERNAME", "PASSWORD", "A2@A.com")
        def role = new Role(ROLE_STUDENT.name())
        user1.roles += role
        user2.roles += role

        when:
        athenaUserRepository.save(user1)
        athenaUserRepository.save(user2)

        then:
        thrown(DataIntegrityViolationException)
        athenaUserRepository.findAll().size() == 1
    }

    def "test email unique constraint"() {
        given:
        def user1 = new AthenaUser("USERNAME1", "PASSWORD", "A@A.com")
        def user2 = new AthenaUser("USERNAME2", "PASSWORD", "A@A.com")
        def role = new Role(ROLE_STUDENT.name())
        user1.roles += role
        user2.roles += role

        when:
        athenaUserRepository.save(user1)
        athenaUserRepository.save(user2)

        then:
        thrown(DataIntegrityViolationException)
        athenaUserRepository.findAll().size() == 1
    }
}
