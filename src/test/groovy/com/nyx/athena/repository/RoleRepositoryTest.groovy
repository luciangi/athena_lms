package com.nyx.athena.repository

import com.nyx.athena.BaseIntegrationTest
import com.nyx.athena.model.Role
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException

import static com.nyx.athena.model.Role.Authority.ROLE_STUDENT

class RoleRepositoryTest extends BaseIntegrationTest {
    @Autowired
    RoleRepository roleRepository

    def "test save"() {
        when:
        roleRepository.save(new Role(ROLE_STUDENT.name()))
        then:
        roleRepository.findAll().size() == 1
    }

    def "test authority unique constraint"() {
        when:
        roleRepository.save(new Role(ROLE_STUDENT.name()))
        roleRepository.save(new Role(ROLE_STUDENT.name()))
        then:
        thrown(DataIntegrityViolationException)
        roleRepository.findAll().size() == 1
    }
}
