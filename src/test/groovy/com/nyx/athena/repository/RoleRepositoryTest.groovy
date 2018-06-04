package com.nyx.athena.repository

import com.nyx.athena.BaseIntegrationTest
import com.nyx.athena.model.Role
import org.springframework.beans.factory.annotation.Autowired

class RoleRepositoryTest extends BaseIntegrationTest {
    @Autowired
    RoleRepository roleRepository

    def "test create Role"() {
        given:
        Role adminRole = new Role()
        adminRole.id = UUID.randomUUID()

        when:
        roleRepository.save(adminRole)

        then:
        roleRepository.findOne(adminRole.id) == adminRole

        cleanup:
        roleRepository.deleteAll()
    }
}
