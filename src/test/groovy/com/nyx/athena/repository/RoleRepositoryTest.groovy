package com.nyx.athena.repository

import com.nyx.athena.BaseIntegrationTest
import com.nyx.athena.model.Role
import org.springframework.beans.factory.annotation.Autowired

import static com.nyx.athena.model.Role.Authority.ROLE_STUDENT

class RoleRepositoryTest extends BaseIntegrationTest {
    @Autowired
    RoleRepository roleRepository

    def "test create Role"() {
        given:
        Role adminRole = new Role(ROLE_STUDENT.name())

        when:
        roleRepository.save(adminRole)

        then:
        roleRepository.findByAuthority(ROLE_STUDENT.name()) == adminRole

        cleanup:
        roleRepository.deleteAll()
    }
}
